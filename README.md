
## Development 
In the project directory, you can run:
#### Install dependency 
`yarn install`
#### Start project
`yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- The init data will be save on local storage
- A fake backend will handle CRUD data when action is called

## User guide:
This is Leave request management system:
There are 2 different role: `Admin`, `User`:

##### User:

- Create/cancel a leave/medical request,
- View their list of request on leave request tab, and view detail by clicking on a request
- View a statistic have leave left and leave used by year
- View a calender that show holiday and people who leave on that day

##### Admin:

- Admin have all user feature except create request
- Accept or reject a request 
  - __Caution!__ when admin accept a __Canceling__ request, number of taken day will count from 
  start leave to current day
- Create/edit a Holiday
- Create/edit number of annual leave of year

##### Fixed user:
username/password
- Admin: 
    - admin/123456
- User: 
    - Robert/123456
    - William/123456
    - Jennifer/123456
    - Jessica/123456
    - Donald /123456
