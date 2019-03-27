import AdminLayout from './Containers/AdminLayout';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Auth/Logout';
import LostPassword from './Components/Auth/LostPassword';
// import PasswordSetting from './Components/Auth/PasswordSetting';

import Users from './Components/User/Users';
import EditUser from './Components/User/EditUser';
import UserDetail from './Components/User/UserDetail';
import CreateUser from './Components/User/CreateUser';
import Profile from './Components/User/UserProfile';

import Events from './Components/Event/Events';
import CreateEvent from './Components/Event/CreateEvent';
import EditEvent from './Components/Event/EditEvent';
import EventDetail from './Components/Event/EventDetail';

import PerCountryDetail from './Components/Dashboard/Charts/PerCountryDetail';

import BlockFeatures from './Components/BlockFeatures/BlockFeatures';
import Configuration from './Components/Configuration/Configuration';


import CreateNotification from './Components/PushNotification/CreateNotification';

export default [
  { path: "/", exact: true, name: "Home", Component: AdminLayout },
  { path: "/dashboard", name: "Dashboard", Component: Dashboard },
  { path: "/logout", name: "Logout", Component: Logout },
  { path: "/lostpassword", name: "LostPassword", Component: LostPassword },

  { path: "/users", name: "Users", Component: Users },
  { path: "/user/create", name: "CreateUser", Component: CreateUser },
  { path: "/user/edit", name: "EditUser", Component: EditUser },
  { path: "/user/detail/", name: "UserDetail", Component: UserDetail },
  { path: "/user/profile", name: "Profile", Component: Profile },

  { path: "/events", name: "Events", Component: Events },
  { path: "/event/create", name: "CreateEvent", Component: CreateEvent },
  { path: "/event/edit", name: "EditEvent", Component: EditEvent },
  { path: "/event/detail", name: "EventDetail", Component: EventDetail },

  { path: "/notificaton/create", name: "Create Notification", Component: CreateNotification },
  { path: "/event/edit", name: "EditEvent", Component: EditEvent },
  { path: "/event/detail", name: "EventDetail", Component: EventDetail },
  
  { path: "/users_per_country", name: "PerCountryDetail", Component: PerCountryDetail },

  { path: "/blockfeatures", name: "BlockFeatures", Component: BlockFeatures },
  { path: "/configuration", name: "Configuration", Component: Configuration },
  // { path: "/setting", name: "PasswordSetting", Component: PasswordSetting },
  
];