# Live Location Tracking - Files to Upload

## Instructions

### Step 1: Upload PHP Files
Upload these files to your server at: `https://ubaya.cloud/hybrid/160422018/`

- `update_location.php` - Stores user's location
- `get_location.php` - Retrieves friend's location

### Step 2: Create Database Table
Run this SQL query on your database:

```sql
CREATE TABLE IF NOT EXISTS locations (
  username VARCHAR(100) PRIMARY KEY,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Or import the `create_locations_table.sql` file

### Step 3: Configure Your App
In `src/app/location/location.page.ts`, change this line:
```typescript
friendUsername = "user1"; // Change to your friend's username
```

### Step 4: How It Works
1. **Your Device:** Runs the app, uploads your location every 5 seconds via `update_location.php`
2. **Friend's Device:** Same - uploads their location every 5 seconds
3. **Your Map:** Displays both markers - your location (blue) and friend's location (blue)
4. **Updates:** Every 5 seconds, it fetches friend's latest location from `get_location.php`

### Test
- Ask your friend to run the app on their device
- Make sure their `login.fullname` matches the `friendUsername` you set
- Both of you should see each other's live location on the map
