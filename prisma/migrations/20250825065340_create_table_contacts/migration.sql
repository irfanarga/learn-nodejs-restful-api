BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[contacts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [first_name] VARCHAR(100) NOT NULL,
    [last_name] VARCHAR(100),
    [email] VARCHAR(200),
    [phone] VARCHAR(20),
    [username] VARCHAR(100) NOT NULL,
    CONSTRAINT [contacts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[contacts] ADD CONSTRAINT [contacts_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[users]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
