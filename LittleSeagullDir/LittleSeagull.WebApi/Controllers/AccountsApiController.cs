using LittleSeagull.DataService;
using LittleSeagull.Interface;
using LittleSeagull.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LittleSeagull.WebApi.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsApiController : ApiController
    {
        IAccountsDataService accountsDataService;
        public AccountsApiController()
        {
            if (DateTime.Now.Year / 2 == 0)
            {
                accountsDataService = new AccountsDataService();
            }
            else {
                accountsDataService = new AccountsDataServiceII();
            }
           
        }
        [Route("Login")]
        [HttpPost]
        public HttpResponseMessage Login(HttpRequestMessage request, [FromBody] LoginParam param)
        {
            var result =new  { Satus=1,Message="Success"};
            var response = Request.CreateResponse<object>(HttpStatusCode.OK, result);
            return response;
        }
        [Route("GetUser")]
        [HttpGet]
        public HttpResponseMessage GetUser([FromUri] Guid userID)
        {
            User user = accountsDataService.GetUser(userID);
            var response = Request.CreateResponse<User>(HttpStatusCode.OK, user);
            return response;


        }

    }
    public class LoginParam
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}