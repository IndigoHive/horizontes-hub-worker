# POC HORIZONTES HUB SITEMAP HANDLE

## About
When user creates new page in Framer application, this page have to be inside Cogfy to provide Hori RAG context.

## Algorithm
1. **Retrieve Sitemap**: Access and download the `sitemap.xml` file provided by Framer.
2. **Extract URLs**: Parse the `sitemap.xml` file to extract all listed URLs.
3. **Synchronize with Cogfy Collections**:
   - **Check for New URLs**: Compare the extracted URLs with existing Cogfy collection records.
     - If a URL does not exist in Cogfy collections, create a new record.
   - **Check for Removed URLs**: Identify any URLs present in Cogfy collections but missing from the extracted URLs.
     - If a URL exists in Cogfy collections but is not found in the extracted list, remove it from the collection.
4. **Frequency**: Script runs every hour
