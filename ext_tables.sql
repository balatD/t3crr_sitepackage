#
# Table structure for table 'pages'
#
CREATE TABLE pages
(
	color varchar(60) DEFAULT '' NOT NULL
);

#
# Table structure for table 'sys_file_reference'
#
CREATE TABLE sys_file_reference
(
	position varchar(60) DEFAULT '' NOT NULL
);

#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content
(
	parent             int(11) DEFAULT '0' NOT NULL,
	children           int(11) DEFAULT '0' NOT NULL,
	size               varchar(5) DEFAULT '' NOT NULL,
	size_subheader     varchar(5) DEFAULT '' NOT NULL,
	speed              int(11) DEFAULT '0' NOT NULL,
	mirrored           int(4) DEFAULT '0' NOT NULL
);
