import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CircleStackIcon } from '@heroicons/react/24/outline'

export const ssmsCheatSheet: CheatSheetDefinition = {
  id: 'ssms',
  title: 'SQL Server Management Studio (SSMS)',
  description: 'Essential SSMS shortcuts, T-SQL queries, and database management tips',
  category: 'Database Tools',
  tags: ['ssms', 'sql-server', 't-sql', 'database', 'queries', 'management'],
  lastUpdated: '2025-10-04',
  icon: createElement(CircleStackIcon),
  sections: [
    {
      title: 'SSMS Shortcuts',
      items: [
        {
          title: 'New Query',
          shortcut: 'Ctrl+N',
          description: 'Open new query window',
          os: 'windows'
        },
        {
          title: 'Execute Query',
          shortcut: 'F5 or Ctrl+E',
          description: 'Execute selected query or all queries',
          os: 'windows'
        },
        {
          title: 'Parse Query',
          shortcut: 'Ctrl+F5',
          description: 'Check query syntax without executing',
          os: 'windows'
        },
        {
          title: 'Comment/Uncomment',
          shortcut: 'Ctrl+K, Ctrl+C / Ctrl+K, Ctrl+U',
          description: 'Toggle line comments',
          os: 'windows'
        },
        {
          title: 'IntelliSense',
          shortcut: 'Ctrl+Space',
          description: 'Trigger auto-completion',
          os: 'windows'
        },
        {
          title: 'Object Explorer',
          shortcut: 'F8',
          description: 'Show/hide Object Explorer',
          os: 'windows'
        },
        {
          title: 'Results in Text',
          shortcut: 'Ctrl+T',
          description: 'Display results as text',
          os: 'windows'
        },
        {
          title: 'Results in Grid',
          shortcut: 'Ctrl+D',
          description: 'Display results in grid format',
          os: 'windows'
        },
        {
          title: 'Include Actual Execution Plan',
          shortcut: 'Ctrl+M',
          description: 'Include execution plan in results',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Basic T-SQL Queries',
      items: [
        {
          title: 'Select All Records',
          code: 'SELECT * FROM TableName',
          description: 'Retrieve all columns and rows from table'
        },
        {
          title: 'Select Specific Columns',
          code: 'SELECT Column1, Column2 FROM TableName',
          description: 'Retrieve specific columns'
        },
        {
          title: 'Filter with WHERE',
          code: 'SELECT * FROM TableName WHERE Column1 = \'value\'',
          description: 'Filter records based on condition'
        },
        {
          title: 'Order Results',
          code: 'SELECT * FROM TableName ORDER BY Column1 ASC',
          description: 'Sort results (ASC/DESC)'
        },
        {
          title: 'Limit Results',
          code: 'SELECT TOP 10 * FROM TableName',
          description: 'Return only first N records'
        },
        {
          title: 'Count Records',
          code: 'SELECT COUNT(*) FROM TableName',
          description: 'Count total number of records'
        }
      ]
    },
    {
      title: 'Database Operations',
      items: [
        {
          title: 'List All Databases',
          code: 'SELECT name FROM sys.databases',
          description: 'Show all databases on server'
        },
        {
          title: 'Use Database',
          code: 'USE DatabaseName',
          description: 'Switch to specific database context'
        },
        {
          title: 'Create Database',
          code: 'CREATE DATABASE MyDatabase',
          description: 'Create new database'
        },
        {
          title: 'Drop Database',
          code: 'DROP DATABASE MyDatabase',
          description: 'Delete database (use with caution!)'
        },
        {
          title: 'Backup Database',
          code: 'BACKUP DATABASE MyDB TO DISK = \'C:\\Backup\\MyDB.bak\'',
          description: 'Create database backup'
        },
        {
          title: 'Restore Database',
          code: 'RESTORE DATABASE MyDB FROM DISK = \'C:\\Backup\\MyDB.bak\'',
          description: 'Restore database from backup'
        }
      ]
    },
    {
      title: 'Table Operations',
      items: [
        {
          title: 'List All Tables',
          code: 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = \'BASE TABLE\'',
          description: 'Show all user tables in current database'
        },
        {
          title: 'Describe Table Structure',
          code: 'SP_HELP TableName',
          description: 'Show table columns, types, and constraints'
        },
        {
          title: 'Create Table',
          code: 'CREATE TABLE Users (Id INT PRIMARY KEY, Name NVARCHAR(50), Email NVARCHAR(100))',
          description: 'Create new table with columns'
        },
        {
          title: 'Drop Table',
          code: 'DROP TABLE TableName',
          description: 'Delete table and all data'
        },
        {
          title: 'Add Column',
          code: 'ALTER TABLE TableName ADD NewColumn NVARCHAR(50)',
          description: 'Add new column to existing table'
        },
        {
          title: 'Drop Column',
          code: 'ALTER TABLE TableName DROP COLUMN ColumnName',
          description: 'Remove column from table'
        }
      ]
    },
    {
      title: 'Data Manipulation',
      items: [
        {
          title: 'Insert Single Record',
          code: 'INSERT INTO TableName (Col1, Col2) VALUES (\'value1\', \'value2\')',
          description: 'Add new record to table'
        },
        {
          title: 'Insert Multiple Records',
          code: 'INSERT INTO TableName (Col1, Col2) VALUES (\'val1\', \'val2\'), (\'val3\', \'val4\')',
          description: 'Add multiple records in one statement'
        },
        {
          title: 'Update Records',
          code: 'UPDATE TableName SET Column1 = \'newvalue\' WHERE Column2 = \'condition\'',
          description: 'Modify existing records'
        },
        {
          title: 'Delete Records',
          code: 'DELETE FROM TableName WHERE Column1 = \'value\'',
          description: 'Remove records matching condition'
        },
        {
          title: 'Truncate Table',
          code: 'TRUNCATE TABLE TableName',
          description: 'Remove all records (faster than DELETE)'
        }
      ]
    },
    {
      title: 'Joins and Relationships',
      items: [
        {
          title: 'Inner Join',
          code: 'SELECT * FROM Table1 INNER JOIN Table2 ON Table1.Id = Table2.ForeignId',
          description: 'Return matching records from both tables'
        },
        {
          title: 'Left Join',
          code: 'SELECT * FROM Table1 LEFT JOIN Table2 ON Table1.Id = Table2.ForeignId',
          description: 'Return all from left table, matching from right'
        },
        {
          title: 'Right Join',
          code: 'SELECT * FROM Table1 RIGHT JOIN Table2 ON Table1.Id = Table2.ForeignId',
          description: 'Return all from right table, matching from left'
        },
        {
          title: 'Full Outer Join',
          code: 'SELECT * FROM Table1 FULL OUTER JOIN Table2 ON Table1.Id = Table2.ForeignId',
          description: 'Return all records from both tables'
        }
      ]
    },
    {
      title: 'Indexes and Performance',
      items: [
        {
          title: 'Create Index',
          code: 'CREATE INDEX IX_TableName_ColumnName ON TableName (ColumnName)',
          description: 'Create index to improve query performance'
        },
        {
          title: 'Drop Index',
          code: 'DROP INDEX IX_TableName_ColumnName ON TableName',
          description: 'Remove existing index'
        },
        {
          title: 'Show Execution Plan',
          code: 'SET SHOWPLAN_ALL ON',
          description: 'Display estimated execution plan'
        },
        {
          title: 'Update Statistics',
          code: 'UPDATE STATISTICS TableName',
          description: 'Refresh table statistics for better performance'
        },
        {
          title: 'Rebuild Index',
          code: 'ALTER INDEX ALL ON TableName REBUILD',
          description: 'Rebuild all indexes on table'
        }
      ]
    },
    {
      title: 'System Information',
      items: [
        {
          title: 'Current Database',
          code: 'SELECT DB_NAME()',
          description: 'Show current database name'
        },
        {
          title: 'Current User',
          code: 'SELECT CURRENT_USER',
          description: 'Show current login username'
        },
        {
          title: 'Server Version',
          code: 'SELECT @@VERSION',
          description: 'Display SQL Server version information'
        },
        {
          title: 'Database Size',
          code: 'SP_SPACEUSED',
          description: 'Show database size and space usage'
        },
        {
          title: 'Active Connections',
          code: 'SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE is_user_process = 1',
          description: 'Count active user connections'
        },
        {
          title: 'Lock Information',
          code: 'SP_LOCK',
          description: 'Display current locks and blocking'
        }
      ]
    },
    {
      title: 'Stored Procedures',
      items: [
        {
          title: 'Create Stored Procedure',
          code: 'CREATE PROCEDURE GetUserById @UserId INT AS BEGIN SELECT * FROM Users WHERE Id = @UserId END',
          description: 'Create stored procedure with parameter'
        },
        {
          title: 'Execute Stored Procedure',
          code: 'EXEC GetUserById @UserId = 1',
          description: 'Execute stored procedure with parameter'
        },
        {
          title: 'List Stored Procedures',
          code: 'SELECT name FROM sys.procedures',
          description: 'Show all stored procedures in database'
        },
        {
          title: 'Drop Stored Procedure',
          code: 'DROP PROCEDURE ProcedureName',
          description: 'Delete stored procedure'
        },
        {
          title: 'View Procedure Definition',
          code: 'SP_HELPTEXT ProcedureName',
          description: 'Display stored procedure source code'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          title: 'Check Running Queries',
          code: 'SELECT session_id, status, command, cpu_time FROM sys.dm_exec_requests',
          description: 'View currently executing queries'
        },
        {
          title: 'Kill Session',
          code: 'KILL 52',
          description: 'Terminate specific session (use session ID)'
        },
        {
          title: 'Check Blocked Processes',
          code: 'SELECT * FROM sys.dm_exec_requests WHERE blocking_session_id > 0',
          description: 'Find queries being blocked by other processes'
        },
        {
          title: 'Error Log',
          code: 'EXEC xp_readerrorlog 0, 1',
          description: 'Read SQL Server error log'
        },
        {
          title: 'Check Database Status',
          code: 'SELECT name, state_desc FROM sys.databases',
          description: 'View status of all databases'
        },
        {
          title: 'Shrink Database',
          code: 'DBCC SHRINKDATABASE(DatabaseName)',
          description: 'Reduce database file size (use carefully)'
        }
      ]
    }
  ]
}