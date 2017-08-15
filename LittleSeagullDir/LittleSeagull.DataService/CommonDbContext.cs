using LittleSeagull.Model;
using System.Data.Entity;
namespace LittleSeagull.DataService
{
    public class CommonDbContext : DbContext
    {
        public CommonDbContext() : base("LittleSeagull_DB") { }       

        /// <summary>
        /// 银行
        /// </summary>
        public virtual DbSet<UserObject> UserObject { get; set; }
        
    }
}