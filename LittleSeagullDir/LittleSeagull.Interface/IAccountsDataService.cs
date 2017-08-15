using LittleSeagull.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleSeagull.Interface
{
    public interface IAccountsDataService : IDisposable
    {

        void RegisterUser(UserObject user);
        UserObject GetUserByUserName(string userName);
        UserObject Login(string userName, string password);
        void UpdateLastLogin(UserObject user);
        UserObject GetUser(Guid userID);
        void UpdateUser(UserObject user);
            
    }
}
