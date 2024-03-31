using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmployeesController : ControllerBase
	{
		private readonly EmpDb _context;

		

		public EmployeesController(EmpDb context)
		{
			_context = context;
			
		}

		// GET: api/Employees
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
		{
			return await _context.Employees.Include(e => e.Experiences).Include(e => e.Designation).ToListAsync();
		}

		// GET: api/Employees/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Employee>> GetEmployee(int id)
		{
			var employee = await _context.Employees.Include(e => e.Experiences).Include(e => e.Designation).FirstOrDefaultAsync(e => e.Id == id);

			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		// PUT: api/Employees/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutEmployee(int id, Employee employee)
		{
			if (id != employee.Id)
			{
				return BadRequest();
			}

			try
			{
				_context.Update(employee);

				var itemsIdList = employee.Experiences.Select(i => i.Id).ToList();

				var delItems = await _context.Experiences.Where(i => i.EmployeeId == id).Where(i => !itemsIdList.Contains(i.Id)).ToListAsync();

				_context.Experiences.RemoveRange(delItems);


				await _context.SaveChangesAsync();
			}


			
			catch (DbUpdateConcurrencyException)
			{
				if (!EmployeeExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		


		// POST: api/Employees
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
		{

			

			_context.Employees.Add(employee);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
		}

		// DELETE: api/Employees/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteEmployee(int id)
		{
			var employee = await _context.Employees.Include(e => e.Experiences).FirstOrDefaultAsync(e => e.Id == id);
			if (employee == null)
			{
				return NotFound();
			}

			_context.Employees.Remove(employee);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool EmployeeExists(int id)
		{
			return _context.Employees.Any(e => e.Id == id);
		}
	}
}
