using LittleSeagull.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LittleSeagull.Model;

namespace LittleSeagull.DataService
{
    public class StudentsService : IStudents
    {
        public Result<int> DeleteStudents(string[] ids)
        {
            Result<int> r = new Result<int>();
            try
            {
                using (var db = new TestEntities())
                {
                    foreach(string id in ids)
                    {
                        var st = db.Student.FirstOrDefault(w => w.UserId == id);
                        if(st!=null)
                        {
                            db.Student.Remove(st);
                            r.Data += 1;
                        }
                     
                    }
                    db.SaveChanges();
                }
                r.IsSuccess = true;
            }
            catch (Exception ex)
            {
                r.Massage = ex.ToString();
            }
            return r;
        }

        public Result<Student> GetStudent(string id)
        {
            Result<Student> r = new Result<Student>();
            try
            {
                using (var db = new TestEntities())
                {
                    var query = db.Student.Where(s => s.UserId == id);
                    r.Data = query.FirstOrDefault();
                }
                r.IsSuccess = true;
            }
            catch (Exception ex)
            {
                r.Massage = ex.ToString();
            }
            return r;
        }

        public Result<List<Student>> GetStudents(int pageIndex, int pageSize)
        {
            Result<List<Student>> r = new Result<List<Student>>();
            try
            {
                using (var db = new TestEntities())
                {
                    var query = db.Student.Skip((pageIndex - 1) * pageSize).Take(pageSize);
                    r.Data = query.ToList();
                    r.TotalCount = db.Student.Count();
                }
                r.IsSuccess = true;
            }
            catch(Exception ex)
            {
                r.Massage = ex.ToString();
            }
            return r;
        }

        public Result<int> SaveStudent(Student st)
        {
            Result<int> r = new Result<int>();
            try
            {
                if(string.IsNullOrWhiteSpace(st.UserId))
                {
                    r.Massage = "UserID不能为空";
                    return r;
                }
                using (var db = new TestEntities())
                {
                    var oldst = db.Student.FirstOrDefault(a => a.UserId == st.UserId);
                    if(oldst==null)
                    {
                        db.Student.Add(st);
                    }
                    else
                    {
                        db.Student.Remove(oldst);
                        db.Student.Add(st);
                    }
                    db.SaveChanges();
                    
                }
                r.Data = 1;
                r.IsSuccess = true;
            }
            catch (Exception ex)
            {
                r.Massage = ex.ToString();
            }
            return r;
        }
    }
}
