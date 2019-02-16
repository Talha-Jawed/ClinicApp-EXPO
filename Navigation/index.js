import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../src/Authentication/LogIn'
import SignUp from '../src/Authentication/SignUp'
import Home from '../src/Screen/Dashboard'
import ClinicInfo from '../src/Screen/Company/info'
import ClinicLocation from '../src/Screen/Company/Map';
import Company from '../src/Screen/Company/Company';
import User from '../src/Screen/Users/User';



const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },
    SignUp: {
        screen: SignUp
    },
    Home: {
        screen: Home
    },
    ClinicInfo: {
        screen: ClinicInfo
    },
    Company: {
        screen: Company
    },
    ClinicLocation: {
        screen: ClinicLocation
    },
    Users: {
        screen: User
    }

})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;