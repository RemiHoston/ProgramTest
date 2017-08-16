using LittleSeagull.DataService;
using LittleSeagull.Interface;
using LittleSeagull.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace LittleSeagull.WebApi.Controllers
{
    [RoutePrefix("api/student")]
    public class StudentController : ApiController
    {
        protected IStudents Service = new StudentsService();


        [Route("DeleteStudents")]
        [HttpPost]
        public HttpResponseMessage DeleteStudents(string[] ids)
        {
            Result<int> r = Service.DeleteStudents(ids);
            var response = Request.CreateResponse(HttpStatusCode.OK, r);
            return response;
        }
        [Route("GetStudent")]
        [HttpGet]
        public HttpResponseMessage GetStudent(string id)
        {
            Result<Student> r = Service.GetStudent(id);
            var response = Request.CreateResponse(HttpStatusCode.OK, r);
            return response;
        }
        [Route("New")]
        [HttpGet]
        public HttpResponseMessage NewStudent()
        {
             
            var response = Request.CreateResponse(HttpStatusCode.OK, new Student());
            return response;
        }
        [Route("GetStudents")]
        [HttpPost]
        public HttpResponseMessage GetStudents(dynamic d)
        {
            int pageIndex = Convert.ToInt32(d.pageIndex.Value);
            int pageSize = Convert.ToInt32(d.pageSize.Value);
            Result<List<Student>> r = Service.GetStudents(pageIndex, pageSize);
            var response = Request.CreateResponse(HttpStatusCode.OK, r);
            return response;
        }

        [Route("SaveStudent")]
        [HttpPost]
        public HttpResponseMessage SaveStudent(Student st)
        {
            Result<int> r = Service.SaveStudent(st);
            var response = Request.CreateResponse(HttpStatusCode.OK, r);
            return response;
        }
    }
}