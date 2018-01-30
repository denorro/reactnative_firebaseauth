class User { 
    constructor(email = '', emailVerified = '', phoneNumber = '', photoUrl = 'https://www.shareicon.net/data/128x128/2016/09/15/829444_man_512x512.png', displayName = ''){
        this.email = email;
        this.emailVerified = email;
        this.phoneNumber = phoneNumber;
        this.photoUrl = photoUrl;
        this.displayName = displayName;
    }
}

export default User;