using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterUdhetariDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        // [RegularExpression("(?=.*\\d) (?=.*[a-z]) (?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        public DateTime Birthday { get; set;}

        [Required]
        public string Emri { get; set; }

        [Required]
        public string Mbiemri{ get; set;}
    }
}