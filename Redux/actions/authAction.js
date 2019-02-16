import actionTypes from '../Constant/Constant'
import firebase from '../../src/Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';

// sign up
export function userAction(FirstName, LastName, Mobile, Email, Password) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(Email, Password)
            .then((success) => {
                console.log('Success*****', success.user)
                console.log('token*****', success.user.accessToken)

                var currentUserUid = success.user.uid;

                let obj = {
                    Name: FirstName + ' ' + LastName,
                    UID: success.user.uid,
                    Mobile: Mobile,
                    Token: 'token'
                }
                console.log('signup successfully', obj);
                firebase.database().ref('/UserData/' + currentUserUid).push(obj);
            })
            .catch((error) => {
                alert(error)
                console.log('something went wrong', error);

            })
    }
}

// LogIn
export function Action(Email, Password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((success) => {
                alert('Success')
                console.log(success);

            })
            .catch((error) => {
                alert('Invalid Email & Password')
                console.log('something went wrong', error)
            })
    }
}

// Fb LogIn
export function fb_Action(type, token) {
    return dispatch => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {
                console.log(success.additionalUserInfo.profile.name, 'success******');
                var currentUID = success.user.uid
                var obj = {
                    Name: success.additionalUserInfo.profile.name,
                    UID: success.user.uid,
                    Photo: success.user.photoURL,
                    Token: token
                }
                firebase.database().ref('/UserData/' + currentUID).update(obj);

            })
                .catch((error) => {
                    console.log(error, '********');
                    alert(error)
                })
            console.log("fb login");

        } else {
            type === 'cancel'
        }

    }
}


// current User
export function current_User(currentUser) {
    return dispatch => {
        var tokenArr = [];
        var clinics = [];
        const UID = currentUser.uid
        dispatch(
            { type: actionTypes.UID, payload: UID }
        )
        firebase.database().ref('/UserData/' + UID).on('value', snapShot => {
            const UserData = snapShot.val()
            dispatch(
                { type: actionTypes.CLINICDATA, payload: UserData }
            )
        })
        firebase.database().ref('/UserData/').on('child_added', Snap => {
            const users = Snap.val()
            clinics.push(users)
            dispatch(
                { type: actionTypes.CLINICS, payload: clinics }
            )
        })
        firebase.database().ref('/Tokens/' + UID).on('child_added', snapshot => {
            const tokens = snapshot.val().CurrentUser;
            console.log('Tokens', tokens)
            tokenArr.push(tokens)
            dispatch(
                { type: actionTypes.TOKENREQUEST, payload: tokenArr }
            )
        })
    }
}


// submit CLinic Data
export function _submit(UID, ClinicName, Since, OpenTime, CloseTIme, Certificates, where) {
    return dispatch => {
        var currentUID = UID
        var obj = {
            ClinicName, Since, OpenTime, CloseTIme, Certificates, where
        }
        firebase.database().ref('/UserData/' + currentUID).update(obj);
    }
}

// Token no
export function Token_No(Count, UID) {
    return dispatch => {
        var currentUID = UID;
        var obj = {
            Count
        }
        firebase.database().ref('/UserData/' + currentUID).update(obj);

    }
}

// Get Token

export function Get_Token(CurrentUser, UID) {
    return dispatch => {
        var uid = UID;
        var obj = {
            CurrentUser
        }
        firebase.database().ref('/Tokens/' + uid + '/').push(obj);
    }
}