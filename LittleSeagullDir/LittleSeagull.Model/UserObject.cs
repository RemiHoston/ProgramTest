using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LittleSeagull.Model
{

    [Table("User", Schema = "BB")]
    public class UserObject
    {
        /// <summary>
        /// 用户编码
        /// </summary>
        [Key]
        [Column("UserID")]
        public string UserID { get; set; }
        /// <summary>
        /// 显示名称
        /// </summary>
        [Column("DisplayName")]
        public string DisplayName { get; set; }
        /// <summary>
        /// 国家（英文）名称
        /// </summary>
        [Column("FirstName")]
        public string FirstName { get; set; }
        /// <summary>
        /// 姓氏
        /// </summary>
        [Column("LastName")]
        public string LastName { get; set; }        
    }
}
