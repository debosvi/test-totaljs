exports.install = function() {
    F.route('/', redirect_signup, ['unauthorize']);

    F.route('/signup', view_signup, ['unauthorize']);
    F.route('/', view_profile, ['authorize', '@chief']);
    F.route('/', view_profile, ['authorize', '@gunner']);
    F.route('/', view_profile, ['authorize', '@driver']);

    F.route('/login/', redirect_login, ['unauthorize']);
    F.route('/logoff/', redirect_logoff);
}

function view_profile() {
    var self = this;
    self.view('profile');
}

function redirect_signup() {
    var self=this
    self.redirect('/signup');
}

function view_signup() {
    var self=this
    self.layout('layout-signup');
    self.view('signup');
}

function redirect_login() {
    var self = this;
    switch (self.query.user) {
        case 'chief':
        case 'gunner':
        case 'driver':
            self.res.cookie('__user', self.query.user, '1 day');
            self.redirect('/');
            break;
        default:
            self.throw401();
            return;
    }
}

function redirect_logoff() {
	var self = this;
	self.res.cookie('__user', '', new Date().add('d', -1));
	self.redirect('/');
}
