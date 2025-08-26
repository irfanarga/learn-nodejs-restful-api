BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[addresses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [street] VARCHAR(255),
    [city] VARCHAR(100),
    [province] VARCHAR(100),
    [country] VARCHAR(100) NOT NULL,
    [postal_code] VARCHAR(10) NOT NULL,
    [contact_id] INT NOT NULL,
    CONSTRAINT [addresses_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_contact_id_fkey] FOREIGN KEY ([contact_id]) REFERENCES [dbo].[contacts]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
