import React from 'react';


const Footer = (props) => {
	return(
			<footer>
				<div class="footer">
				<div class="span9 footer-links">
				<a href="/nyc-resources/agencies.page">Directory of City Agencies </a><a href="/home/contact-us.page">Contact NYC Government </a><a href="https://a127-ess.nyc.gov">City Employees </a><a href="http://www.nyc.gov/notifynyc">Notify NYC </a><a href="http://a856-citystore.nyc.gov/">CityStore </a><a href="/connect/social-media.page">Stay Connected </a><a href="/connect/mobile-applications.page">NYC Mobile Apps  </a><a href="/nyc-resources/nyc-maps.page">Maps </a><a href="/nyc-resources/resident-toolkit.page">Resident Toolkit</a>
				</div>
				<div class="span3">
				<span class="logo-nyc">NYC</span>
				<form class="form-search" method="get" action="/home/search/index.page">
				<input type="text" placeholder="Search" class="input-search placeholder" name="search-terms"><button class="ico-search">Search</button>
				</form>
				<div class="copyright"><p>City of New York. 2018 All Rights Reserved,</p>
				<p>NYC is a trademark and service mark of the City of New York</p>
				<p style="display: block; width: 100%;"><a href="/home/privacy-policy.page" title="Privacy Ploicy ">Privacy Policy.</a>&nbsp;<a href="/home/terms-of-use.page" title="Terms of Use">Terms of Use.</a>&nbsp;<a href="http://www.nyc.gov/mopd"><img src="/assets/home/images/global/accessibility_icon.svg" alt="Learn about services for people with disabilities" height="20px" width="20px"></a></p></div>
				</div>
				</div>
			</footer>
		)
}