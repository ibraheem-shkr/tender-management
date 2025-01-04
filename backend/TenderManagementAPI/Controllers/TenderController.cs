using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenderManagementAPI.Data;
using TenderManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TenderManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenderController : ControllerBase
    {
        private readonly TenderContext _context;

        public TenderController(TenderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tender>>> GetTenders()
        {
            return await _context.Tenders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tender>> GetTender(int id)
        {
            var tender = await _context.Tenders.FindAsync(id);
            if (tender == null)
            {
                return NotFound();
            }
            return tender;
        }

        [HttpPost]
        public async Task<ActionResult<Tender>> PostTender(Tender tender)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (tender == null || string.IsNullOrEmpty(tender.TenderReferenceNumber) || string.IsNullOrEmpty(tender.CustomerName) || string.IsNullOrEmpty(tender.Description) || tender.IssueDate == default || tender.ClosingDate == default || string.IsNullOrEmpty(tender.Status)) { return BadRequest("All fields are mandatory."); }

            _context.Tenders.Add(tender);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTender), new { id = tender.Id }, tender);
        }
    }
}