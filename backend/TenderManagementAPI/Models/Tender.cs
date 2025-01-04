using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TenderManagementAPI.Models
{
    public class Tender
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        [Required]
        public string TenderReferenceNumber { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public DateTime ClosingDate { get; set; }
        
        [Required]
        public string Status { get; set; }
    }
}