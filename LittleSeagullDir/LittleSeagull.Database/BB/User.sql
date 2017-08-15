CREATE TABLE [BB].[User]
(
	[UserID] NVARCHAR(36) NOT NULL, 
    [DisplayName] NVARCHAR(100) NULL, 
    [FirstName] NVARCHAR(100) NULL, 
    [LastName] NVARCHAR(100) NULL, 
    [EmailAddress] NVARCHAR(200) NULL, 
    CONSTRAINT [PK_User] PRIMARY KEY ([UserID]) 
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'用户编号',
    @level0type = N'SCHEMA',
    @level0name = N'BB',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'UserID'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'用户显示名',
    @level0type = N'SCHEMA',
    @level0name = N'BB',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = 'DisplayName'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'姓氏',
    @level0type = N'SCHEMA',
    @level0name = N'BB',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'FirstName'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'名称',
    @level0type = N'SCHEMA',
    @level0name = N'BB',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'LastName'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'邮箱地址',
    @level0type = N'SCHEMA',
    @level0name = N'BB',
    @level1type = N'TABLE',
    @level1name = N'User',
    @level2type = N'COLUMN',
    @level2name = N'EmailAddress'