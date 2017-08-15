/*
 预先部署脚本模板							
--------------------------------------------------------------------------------------
 此文件包含将在生成脚本之前执行的 SQL 语句。	
 使用 SQLCMD 语法将文件包含在预先部署脚本中。			
 示例:      :r .\myfile.sql								
 使用 SQLCMD 语法引用预先部署脚本中的变量。		
 示例:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
TRUNCATE TABLE [dbo].[Readme]  --说明表
INSERT INTO [dbo].[Readme]([Key],[Name],[Remark]) VALUES('BB',N'基础维度',N'基础维度数据');

TRUNCATE TABLE BB.[User] --说明表
INSERT INTO BB.[User] ([UserID],[DisplayName],[FirstName],[LastName]) VALUES('edb7ffef-9fa5-4ec6-a0ab-6f58d844985b',N'老贺',N'贺',N'成德');



