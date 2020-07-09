// pollyfill 
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

if (window.fetch === undefined) {
	throw new Error('fetch pollyfill not found.');
}

const MemberCoupons = require('~/modules/MemberCoupons').default;

if ((window as any).BY_HEALTH) {
    (window as any).BY_HEALTH?.registerModule('MemberCoupons', MemberCoupons);
}

module.exports = MemberCoupons;
