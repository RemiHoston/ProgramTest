CREATE TABLE [dbo].[Readme]
(
	[Key] NVARCHAR(50) NOT NULL , 
    [Name] NVARCHAR(200) NOT NULL, 
    [Remark] NVARCHAR(2000) NULL, 
    CONSTRAINT [PK_Readme] PRIMARY KEY ([Key])
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'关键字',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Readme',
    @level2type = N'COLUMN',
    @level2name = N'Key'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'名称',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Readme',
    @level2type = N'COLUMN',
    @level2name = N'Name'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'说明',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Readme',
    @level2type = N'COLUMN',
    @level2name = N'Remark'