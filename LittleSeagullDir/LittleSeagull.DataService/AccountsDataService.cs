using LittleSeagull.Interface;
using LittleSeagull.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LittleSeagull.DataService
{
    public class AccountsDataService : IAccountsDataService
    {
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public UserObject GetUser(Guid userID)
        {
            UserObject result = null;
            using (var context = new CommonDbContext())
            {
                List<UserObject> list = new List<UserObject>();
                list = context.UserObject.Where(d => d.UserID.Equals(userID.ToString())).ToList();
                if (list.Count()>0) {
                    result = list.FirstOrDefault();
                }
            }
            return result;
        }

        public UserObject GetUserByUserName(string userName)
        {
            throw new NotImplementedException();
        }

        public UserObject Login(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public void RegisterUser(UserObject user)
        {
            throw new NotImplementedException();
        }

        public void UpdateLastLogin(UserObject user)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(UserObject user)
        {
            throw new NotImplementedException();
        }
    }
}
