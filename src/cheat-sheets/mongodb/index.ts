import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CircleStackIcon } from '@heroicons/react/24/outline'

export const mongodbCheatSheet: CheatSheetDefinition = {
  id: 'mongodb',
  title: 'MongoDB Shell',
  description: 'Essential MongoDB queries, operations, aggregation pipelines, and database management commands',
  category: 'Database',
  tags: ['mongodb', 'mongo', 'database', 'nosql', 'queries', 'aggregation', 'shell'],
  lastUpdated: '2025-10-04',
  icon: createElement(CircleStackIcon),
  sections: [
    {
      title: 'Connection & Basics',
      items: [
        {
          title: 'Connect to MongoDB',
          code: 'mongosh\nmongosh "mongodb://localhost:27017"\nmongosh "mongodb://user:pass@host:port/db"',
          description: 'Connect to MongoDB instance',
          example: 'mongosh is the modern MongoDB shell'
        },
        {
          title: 'Database Operations',
          code: 'show dbs\nuse myDatabase\ndb.getName()\ndb.dropDatabase()',
          description: 'List, switch, and manage databases',
          example: 'use creates database if it doesn\'t exist'
        },
        {
          title: 'Collection Operations',
          code: 'show collections\ndb.createCollection("users")\ndb.users.drop()',
          description: 'List, create, and drop collections',
          example: 'Collections are created automatically when first document is inserted'
        },
        {
          title: 'Help Commands',
          code: 'help\ndb.help()\ndb.users.help()\ndb.users.find.help()',
          description: 'Get help for various operations'
        },
        {
          title: 'Exit Shell',
          code: 'exit\nquit()\nCtrl+C',
          description: 'Exit the MongoDB shell'
        }
      ]
    },
    {
      title: 'CRUD Operations',
      items: [
        {
          title: 'Insert Documents',
          code: 'db.users.insertOne({name: "John", age: 30})\ndb.users.insertMany([{name: "Jane"}, {name: "Bob"}])',
          description: 'Insert single or multiple documents',
          example: 'Returns insertedId(s) and acknowledgment'
        },
        {
          title: 'Find Documents',
          code: 'db.users.find()\ndb.users.find({age: 30})\ndb.users.findOne({name: "John"})',
          description: 'Query documents from collection',
          example: 'find() returns cursor, findOne() returns single document'
        },
        {
          title: 'Update Documents',
          code: 'db.users.updateOne({name: "John"}, {$set: {age: 31}})\ndb.users.updateMany({age: {$lt: 25}}, {$set: {status: "young"}})',
          description: 'Update single or multiple documents',
          example: 'Use $set, $inc, $unset, $push operators'
        },
        {
          title: 'Replace Documents',
          code: 'db.users.replaceOne({name: "John"}, {name: "John", age: 32, city: "NYC"})',
          description: 'Replace entire document',
          example: 'Replaces all fields except _id'
        },
        {
          title: 'Delete Documents',
          code: 'db.users.deleteOne({name: "John"})\ndb.users.deleteMany({age: {$lt: 18}})',
          description: 'Delete single or multiple documents',
          example: 'Returns count of deleted documents'
        },
        {
          title: 'Upsert Operations',
          code: 'db.users.updateOne({name: "Alice"}, {$set: {age: 25}}, {upsert: true})',
          description: 'Insert if document doesn\'t exist, update if it does',
          example: 'upsert: true creates document if no match found'
        }
      ]
    },
    {
      title: 'Query Operations',
      items: [
        {
          title: 'Comparison Operators',
          code: 'db.users.find({age: {$eq: 30}})\ndb.users.find({age: {$ne: 30}})\ndb.users.find({age: {$gt: 25, $lt: 40}})',
          description: 'Compare field values',
          example: '$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin'
        },
        {
          title: 'Logical Operators',
          code: 'db.users.find({$and: [{age: {$gt: 20}}, {city: "NYC"}]})\ndb.users.find({$or: [{age: {$lt: 25}}, {status: "active"}]})',
          description: 'Combine multiple conditions',
          example: '$and, $or, $not, $nor operators'
        },
        {
          title: 'Element Operators',
          code: 'db.users.find({email: {$exists: true}})\ndb.users.find({age: {$type: "number"}})',
          description: 'Query based on field existence and type',
          example: '$exists checks if field exists, $type checks field type'
        },
        {
          title: 'Array Operators',
          code: 'db.users.find({tags: {$in: ["developer", "designer"]}})\ndb.users.find({scores: {$all: [85, 90]}})',
          description: 'Query array fields',
          example: '$in: any value matches, $all: all values must match'
        },
        {
          title: 'Regular Expressions',
          code: 'db.users.find({name: /^John/})\ndb.users.find({email: {$regex: "gmail.com$", $options: "i"}})',
          description: 'Pattern matching with regex',
          example: 'Use / / syntax or $regex operator with $options'
        },
        {
          title: 'Field Selection',
          code: 'db.users.find({}, {name: 1, age: 1, _id: 0})\ndb.users.find({}, {password: 0})',
          description: 'Include or exclude specific fields',
          example: '1: include field, 0: exclude field'
        }
      ]
    },
    {
      title: 'Query Modifiers',
      items: [
        {
          title: 'Sorting',
          code: 'db.users.find().sort({age: 1})\ndb.users.find().sort({name: 1, age: -1})',
          description: 'Sort query results',
          example: '1: ascending, -1: descending'
        },
        {
          title: 'Limiting Results',
          code: 'db.users.find().limit(10)\ndb.users.find().skip(20).limit(10)',
          description: 'Control number of returned documents',
          example: 'skip() for pagination, limit() for page size'
        },
        {
          title: 'Counting',
          code: 'db.users.countDocuments()\ndb.users.countDocuments({age: {$gt: 30}})\ndb.users.estimatedDocumentCount()',
          description: 'Count documents in collection',
          example: 'countDocuments() is accurate, estimatedDocumentCount() is faster'
        },
        {
          title: 'Distinct Values',
          code: 'db.users.distinct("city")\ndb.users.distinct("age", {status: "active"})',
          description: 'Get unique values for a field',
          example: 'Second parameter is optional query filter'
        },
        {
          title: 'Cursor Methods',
          code: 'db.users.find().forEach(function(doc) { print(doc.name); })\ndb.users.find().pretty()',
          description: 'Process query results',
          example: 'forEach() iterates, pretty() formats output'
        }
      ]
    },
    {
      title: 'Indexing',
      items: [
        {
          title: 'Create Indexes',
          code: 'db.users.createIndex({name: 1})\ndb.users.createIndex({name: 1, age: -1})\ndb.users.createIndex({email: 1}, {unique: true})',
          description: 'Create single and compound indexes',
          example: 'Indexes improve query performance'
        },
        {
          title: 'List Indexes',
          code: 'db.users.getIndexes()\ndb.users.getIndexKeys()',
          description: 'View existing indexes on collection'
        },
        {
          title: 'Drop Indexes',
          code: 'db.users.dropIndex({name: 1})\ndb.users.dropIndex("name_1")\ndb.users.dropIndexes()',
          description: 'Remove indexes from collection',
          example: 'dropIndexes() removes all except _id index'
        },
        {
          title: 'Index Types',
          code: 'db.users.createIndex({location: "2dsphere"})\ndb.users.createIndex({content: "text"})\ndb.users.createIndex({tags: 1}, {sparse: true})',
          description: 'Special index types',
          example: '2dsphere: geospatial, text: full-text search, sparse: skip null values'
        },
        {
          title: 'Index Performance',
          code: 'db.users.find({name: "John"}).explain("executionStats")\ndb.users.createIndex({name: 1}, {background: true})',
          description: 'Analyze and optimize index performance',
          example: 'explain() shows query execution plan'
        }
      ]
    },
    {
      title: 'Aggregation Pipeline',
      items: [
        {
          title: 'Basic Aggregation',
          code: 'db.users.aggregate([\n  {$match: {age: {$gt: 25}}},\n  {$group: {_id: "$city", count: {$sum: 1}}}\n])',
          description: 'Filter and group documents',
          example: 'Pipeline stages process documents sequentially'
        },
        {
          title: 'Match Stage',
          code: 'db.users.aggregate([{$match: {status: "active", age: {$gte: 18}}}])',
          description: 'Filter documents (like WHERE clause)',
          example: 'Should be early in pipeline for performance'
        },
        {
          title: 'Group Stage',
          code: 'db.sales.aggregate([\n  {$group: {\n    _id: "$category",\n    totalSales: {$sum: "$amount"},\n    avgPrice: {$avg: "$price"}\n  }}\n])',
          description: 'Group documents and calculate aggregates',
          example: '$sum, $avg, $min, $max, $count, $push, $addToSet'
        },
        {
          title: 'Project Stage',
          code: 'db.users.aggregate([\n  {$project: {\n    name: 1,\n    ageGroup: {$cond: [{$gte: ["$age", 18]}, "adult", "minor"]}\n  }}\n])',
          description: 'Reshape documents and add computed fields',
          example: 'Include, exclude, or transform fields'
        },
        {
          title: 'Sort and Limit',
          code: 'db.users.aggregate([\n  {$sort: {age: -1}},\n  {$limit: 10}\n])',
          description: 'Sort and limit aggregation results',
          example: 'Order matters in pipeline stages'
        },
        {
          title: 'Lookup (Join)',
          code: 'db.orders.aggregate([\n  {$lookup: {\n    from: "users",\n    localField: "userId",\n    foreignField: "_id",\n    as: "userInfo"\n  }}\n])',
          description: 'Join collections (like LEFT JOIN)',
          example: 'Results stored in array field specified by "as"'
        }
      ]
    },
    {
      title: 'Advanced Aggregation',
      items: [
        {
          title: 'Unwind Arrays',
          code: 'db.users.aggregate([\n  {$unwind: "$tags"},\n  {$group: {_id: "$tags", count: {$sum: 1}}}\n])',
          description: 'Deconstruct array fields into separate documents',
          example: 'Creates one document per array element'
        },
        {
          title: 'Add Fields',
          code: 'db.users.aggregate([\n  {$addFields: {\n    fullName: {$concat: ["$firstName", " ", "$lastName"]},\n    isAdult: {$gte: ["$age", 18]}\n  }}\n])',
          description: 'Add computed fields to documents',
          example: 'Similar to $project but preserves existing fields'
        },
        {
          title: 'Date Operations',
          code: 'db.events.aggregate([\n  {$group: {\n    _id: {$dateToString: {format: "%Y-%m", date: "$createdAt"}},\n    count: {$sum: 1}\n  }}\n])',
          description: 'Extract and format date components',
          example: '$year, $month, $dayOfMonth, $dateToString'
        },
        {
          title: 'Conditional Logic',
          code: 'db.products.aggregate([\n  {$project: {\n    name: 1,\n    priceCategory: {\n      $switch: {\n        branches: [\n          {case: {$lt: ["$price", 100]}, then: "cheap"},\n          {case: {$lt: ["$price", 500]}, then: "moderate"}\n        ],\n        default: "expensive"\n      }\n    }\n  }}\n])',
          description: 'Complex conditional expressions',
          example: '$cond, $switch, $ifNull operators'
        },
        {
          title: 'Array Operations',
          code: 'db.users.aggregate([\n  {$project: {\n    name: 1,\n    skillCount: {$size: "$skills"},\n    hasJavaScript: {$in: ["JavaScript", "$skills"]}\n  }}\n])',
          description: 'Work with array fields in aggregation',
          example: '$size, $in, $arrayElemAt, $slice, $filter'
        }
      ]
    },
    {
      title: 'Data Modeling',
      items: [
        {
          title: 'Document Structure',
          code: '{\n  _id: ObjectId("..."),\n  name: "John Doe",\n  email: "john@example.com",\n  address: {\n    street: "123 Main St",\n    city: "New York"\n  },\n  tags: ["developer", "javascript"]\n}',
          description: 'Typical MongoDB document structure',
          example: 'Supports nested objects and arrays'
        },
        {
          title: 'ObjectId',
          code: 'ObjectId()\nObjectId("507f1f77bcf86cd799439011")\nObjectId().getTimestamp()',
          description: 'MongoDB\'s unique identifier type',
          example: 'Contains timestamp, machine ID, process ID, counter'
        },
        {
          title: 'Data Types',
          code: 'String, Number, Boolean, Date, Array, Object, ObjectId, null, undefined',
          description: 'Supported BSON data types',
          example: 'ISODate("2023-01-01") for dates, NumberLong() for 64-bit integers'
        },
        {
          title: 'Schema Validation',
          code: 'db.createCollection("users", {\n  validator: {\n    $jsonSchema: {\n      bsonType: "object",\n      required: ["name", "email"],\n      properties: {\n        name: {bsonType: "string"},\n        age: {bsonType: "int", minimum: 0}\n      }\n    }\n  }\n})',
          description: 'Add schema validation to collections',
          example: 'Enforces document structure and data types'
        }
      ]
    },
    {
      title: 'Performance & Optimization',
      items: [
        {
          title: 'Query Profiling',
          code: 'db.setProfilingLevel(2)\ndb.system.profile.find().pretty()\ndb.users.find().explain("executionStats")',
          description: 'Profile and analyze query performance',
          example: 'Level 0: off, 1: slow ops, 2: all ops'
        },
        {
          title: 'Collection Stats',
          code: 'db.users.stats()\ndb.stats()\ndb.users.totalSize()',
          description: 'Get collection and database statistics',
          example: 'Shows document count, size, index information'
        },
        {
          title: 'Query Hints',
          code: 'db.users.find({name: "John"}).hint({name: 1})\ndb.users.find().hint({$natural: 1})',
          description: 'Force MongoDB to use specific index',
          example: '$natural: 1 forces natural order (no index)'
        },
        {
          title: 'Bulk Operations',
          code: 'db.users.bulkWrite([\n  {insertOne: {document: {name: "Alice"}}},\n  {updateOne: {filter: {name: "Bob"}, update: {$set: {age: 30}}}}\n])',
          description: 'Perform multiple operations efficiently',
          example: 'Reduces round trips to database'
        },
        {
          title: 'Read Preferences',
          code: 'db.users.find().readPref("secondary")\ndb.users.find().readPref("primaryPreferred")',
          description: 'Control which replica set member to read from',
          example: 'primary, secondary, primaryPreferred, secondaryPreferred'
        }
      ]
    },
    {
      title: 'Administration',
      items: [
        {
          title: 'Database Administration',
          code: 'db.runCommand({serverStatus: 1})\ndb.adminCommand({listCollections: 1})\ndb.repairDatabase()',
          description: 'Administrative commands and operations'
        },
        {
          title: 'User Management',
          code: 'db.createUser({\n  user: "myUser",\n  pwd: "password",\n  roles: ["readWrite", "dbAdmin"]\n})\ndb.dropUser("myUser")',
          description: 'Create and manage database users',
          example: 'Roles: read, readWrite, dbAdmin, userAdmin'
        },
        {
          title: 'Backup & Restore',
          code: 'mongodump --db mydb --out /backup/\nmongorestore --db mydb /backup/mydb/',
          description: 'Backup and restore database data',
          example: 'Run from system shell, not MongoDB shell'
        },
        {
          title: 'Import & Export',
          code: 'mongoexport --db mydb --collection users --out users.json\nmongoimport --db mydb --collection users --file users.json',
          description: 'Export/import collections to/from JSON/CSV',
          example: 'Useful for data migration and backups'
        },
        {
          title: 'Replica Set Status',
          code: 'rs.status()\nrs.conf()\nrs.initiate()',
          description: 'Monitor and configure replica sets',
          example: 'Replica sets provide high availability'
        }
      ]
    },
    {
      title: 'Useful Tips & Tricks',
      items: [
        {
          title: 'Pretty Print',
          code: 'db.users.find().pretty()\nDBQuery.shellBatchSize = 10',
          description: 'Format output and control batch size',
          example: 'shellBatchSize controls how many docs shown at once'
        },
        {
          title: 'Date Queries',
          code: 'db.events.find({date: {$gte: ISODate("2023-01-01")}})\ndb.events.find({date: {$gte: new Date("2023-01-01")}})',
          description: 'Query with date values',
          example: 'Use ISODate() or new Date() for date literals'
        },
        {
          title: 'Regular Expression Tips',
          code: 'db.users.find({name: {$regex: "^John", $options: "i"}})\ndb.users.find({email: /.*@gmail\\.com$/})',
          description: 'Case-insensitive and anchored regex patterns',
          example: 'Options: i (case insensitive), m (multiline), s (dotall)'
        },
        {
          title: 'Array Query Shortcuts',
          code: 'db.users.find({"skills.0": "JavaScript"})\ndb.users.find({skills: {$elemMatch: {$eq: "JavaScript"}}})',
          description: 'Query specific array positions and elements',
          example: 'Use dot notation for array indices'
        },
        {
          title: 'Variable Usage',
          code: 'var user = db.users.findOne({name: "John"});\ndb.orders.find({userId: user._id});',
          description: 'Store query results in variables for reuse',
          example: 'Helpful for complex multi-step operations'
        }
      ]
    }
  ]
}