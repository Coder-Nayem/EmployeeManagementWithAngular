using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
	public class Employee
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public int DesignationId { get; set; }
		[Required]
		public DateTime JoinDate { get; set; }

		
		[Required]
		public decimal Salary { get; set; }
		public bool IsActive { get; set; } = true;


		

		public Designation? Designation { get; set; }

		public virtual IList<Experience>? Experiences { get; set; } = new List<Experience>();


	}
}
