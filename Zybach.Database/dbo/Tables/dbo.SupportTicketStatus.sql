CREATE TABLE [dbo].[SupportTicketStatus](
	[SupportTicketStatusID] [int] NOT NULL,
	[SupportTicketStatusName] [varchar](50) NOT NULL,
	[SupportTicketStatusDisplayName] [varchar](50) NOT NULL,
	[SortOrder] [int] NOT NULL,
 CONSTRAINT [PK_SupportTicketStatus_SupportTicketStatusID] PRIMARY KEY CLUSTERED 
(
	[SupportTicketStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
