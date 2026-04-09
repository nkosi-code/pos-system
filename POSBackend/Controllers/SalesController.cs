using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POSBackend.Data;
using POSBackend.Models;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly AppDbContext _context;

    public SalesController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost]
    public async Task<IActionResult> SellProduct(Sale sale)
    {
        var product = await _context.Products.FindAsync(sale.ProductId);
        if (product == null) return NotFound("Product not found");

        if (product.Quantity < sale.QuantitySold)
            return BadRequest("Not enough stock");

        product.Quantity -= sale.QuantitySold;

        sale.Date = DateTime.Now;
        _context.Sales.Add(sale);

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetSales()
    {
        return Ok(await _context.Sales.ToListAsync());
    }

    [HttpGet("total")]
    public IActionResult GetTotalRevenue()
    {
        var sales = _context.Sales.ToList();
        var products = _context.Products.ToList();

        var totalRevenue = sales.Sum(s =>
        {
            var product = products.FirstOrDefault(p => p.Id == s.ProductId);
            return product != null ? product.Price * s.QuantitySold : 0;
        });

        return Ok(totalRevenue);
    }

    [HttpGet("revenue")]
    public async Task<IActionResult> GetRevenue()
    {
        var revenue = await _context.Sales
            .Join(_context.Products,
                sale => sale.ProductId,
                product => product.Id,
                (sale, product) => new
                {
                    sale.QuantitySold,
                    product.Price
                })
            .SumAsync(x => x.QuantitySold * x.Price);

        return Ok(revenue);
    }
}