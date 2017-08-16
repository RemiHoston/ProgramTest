using LittleSeagull.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LittleSeagull.Interface
{
    public class Result<T> {
        public T Data { get; set; }

        public bool IsSuccess { get; set; }

        public String Massage { get; set; }

        public int TotalCount { get; set; }
    }

    public interface IStudents
    {
        Result<List<Student>> GetStudents(int pageIndex,int pageSize);
        Result<Student> GetStudent(string id);
        Result<int> DeleteStudents(string []id);
        Result<int> SaveStudent(Student st);
    }
}
