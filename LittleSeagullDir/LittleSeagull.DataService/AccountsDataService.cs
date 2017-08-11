using LittleSeagull.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LittleSeagull.Model;

namespace LittleSeagull.DataService
{
    public class AccountsDataService : IAccountsDataService
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public User GetUser(Guid userID)
        {
            User user = new User();
            user.UserId = userID;
            user.FirstName = "贺";
            user.LastName = "成德";
            user.EmailAddress = "laohe1114@126.com";
            user.UserName = "laohe";
            return user;
        }

        public User GetUserByUserName(string userName)
        {
            throw new NotImplementedException();
        }

        public User Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public void RegisterUser(User user)
        {
            throw new NotImplementedException();
        }

        public void UpdateLastLogin(User user)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
