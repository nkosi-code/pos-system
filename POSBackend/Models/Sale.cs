namespace POSBackend.Models;

public class Sale
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int QuantitySold { get; set; }
    public DateTime Date { get; set; }
}