<template>
	<div class="welcome-back-page">
		<div class="welcome">Welcome to {{ this.$root.$data.venueName }}</div>

		<div class="welcome-back-not-complete">
			<div class="strapline" v-if="isEmailShown">
				We'd like to know more about you!
			</div>
			<div class="strapline" v-else>
				There's still some things we don't know about you - but we'd like to!
				We only use this information for demographics, and it won't be shared
				with third parties.
			</div>

			<div class="profile-form">
				<TextInput type="email" autocomplete="email" v-model="email" placeholder="EMAIL" v-if="isEmailShown" />
				
				<DropdownInput v-model="gender" autocomplete="sex" placeholder="GENDER" v-if="isGenderShown">
					<option disabled value="">Select gender:</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="neither">Neither</option>
				</DropdownInput>

				<DateInput placeholder="DATE OF BIRTH" autocomplete="bday" v-model="dob" v-if="isDobShown" :defaultDate="new Date('2000-01-01')" />
			</div>
			<div class="checkboxes" v-if="isSubscribeShown">
				<div class="offers">
					<input class="checkbox" v-model="mailingList" type="checkbox" />
					<div class="offers-text">
						Receive news and offers from
						{{ this.$root.$data.venueName }}
					</div>
				</div>
			</div>
			<button class="button" @click="submit">CONTINUE</button>
			<div class="user-messages">
				<div v-if="showEmailError" class="user-message">
					Please enter a valid email address
				</div>
				<div v-if="showDobError" class="user-message">
					You must be over 18 to use Bowimi
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DateInput from './DateInput.vue';
	import DropdownInput from './DropdownInput.vue';
	import TextInput from './TextInput.vue';

	export default {
		components: {
			DateInput,
			DropdownInput,
			TextInput,
		},

		data() {
			return {
				email: null,
				termsAccepted: false,
				mailingList: (this.$root.mailingListState == 'Accepted'),
				gender: null,
				dob: null,
				showEmailError: false,
				showDobError: false,
			}
		},

		computed: {
			isEmailShown() {
				return this.$root.emailState == 'Missing' || this.$root.emailState == 'Expired';
			},

			isGenderShown() {
				return this.$root.genderState == 'Missing';
			},

			isDobShown() {
				return this.$root.dobState == 'Missing';
			},

			isSubscribeShown() {
				return this.$root.isMailingListRequested;
			},
		},

		methods: {
			toTitleCase(string) {
				return string[0].toUpperCase() + string.substring(1)
			},

			submit() {
				this.showEmailError = false;
				this.showDobError = false;

				if (this.dob) this.checkBirthday();

				if (this.isEmailShown && this.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
					this.showEmailError = true;
					this.$refs.email.focus();
					return false;
				}

				this.$root.busy = 'Updating profile...';
				fetch(
					"/portal/add-details" + window.location.search,
					{
						method: "POST",
						credentials: "same-origin",
						body: JSON.stringify(
							{
								EmailAddress: this.email,
								Gender: this.gender,
								DateOfBirth: this.dob ? this.dob.toISOString().slice(0,10) : null,
								JoinMailingList: this.mailingList,
							}
						),
					}
				).then(
					(response) => {
						switch (response.status) {
							case 200:
								if (this.$root.isCaptive) {
									window.location.href = "/portal/grant" + window.location.search;
									break;
								} else {
									this.$root.busy = null;
									this.$root.accountPage = 'home';
									break;
								}
							default:
								this.$root.busy = null;
								this.$root.error = true;
						}
					}
				);
			},

			checkBirthday() {
				let today = new Date();
				let birth = new Date(this.dob);
				let day = today.getDate();
				let month = today.getMonth();
				let year = today.getFullYear();
				let birthDay = birth.getDate();
				let birthMonth = birth.getMonth();
				let birthYear = birth.getFullYear();
				var age = year - birthYear;
				var age_month = month - birthMonth;
				var age_day = day - birthDay;

				if (age_month < 0 || (age_month == 0 && age_day < 0)) {
					age = parseInt(age) - 1;
				}

				if ((age == 18 && age_month <= 0 && age_day < 0) || age < 18) {
					this.showDobError = true;
					return false;
				}
			},


		}
	};
</script>

<style></style>
