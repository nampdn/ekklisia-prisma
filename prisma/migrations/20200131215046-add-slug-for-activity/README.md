# Migration `20200131215046-add-slug-for-activity`

This migration has been generated by nampdn at 1/31/2020, 9:50:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Activity" ADD COLUMN "slug" text  NOT NULL DEFAULT '' ;

CREATE UNIQUE INDEX "Activity.slug" ON "public"."Activity"("slug")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200109084935-add-relationship..20200131215046-add-slug-for-activity
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model Post {
   id        String   @default(cuid()) @id
@@ -79,8 +79,9 @@
 }
 model Activity {
   id   String @default(cuid()) @id
+  slug String @unique
   name String
   type String
   org  Org
 }
```


