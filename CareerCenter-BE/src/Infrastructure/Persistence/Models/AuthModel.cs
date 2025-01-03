﻿namespace Persistence.Models
{
    public class AuthModel
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public bool IisAuthenticated { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresOn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
