export default {
  'device_time.title': 'Device timing',
  'device_time.form.timeArea': 'Time zone',
  'device_time.form.beijing': 'Beijing',
  'device_time.form.typeLabel': 'Timing method',
  'device_time.form.setManual': 'Manual timing',
  'device_time.form.selfTime': 'Local time',
  'device_time.form.tip1': 'Tips: The time will take effect after being set successfully if the device does not connect to the Internet;',
  'device_time.form.tip2': 'The device will use the Internet time if it connects to the Internet',
  'device_time.form.message': 'Please fill in the full time',
  'device_time.dialog.title': 'Timing failure',
  'device_time.dialog.deviceName': 'Device name',
  'device_time.dialog.deviceKey': 'Device serial number',
  'device_time.dialog.failReason': 'Failure reasons',
  'device_time.successMsg': 'Device timing success!',
  'device_wifi.title': 'Network configuration',
  'device_wifi.form.name': 'Wi-Fi name',
  'device_wifi.form.password': 'Wi-Fi password',
  'device_wifi.form.ipType.label': 'IP type',
  'device_wifi.form.ipType.value': 'Fixed IP',
  'device_wifi.form.getIpAuto': 'Obtain IP automatically',
  'device_wifi.form.fixSet': 'Fixed settings',
  'device_wifi.form.website': 'IP address',
  'device_wifi.form.gateway': 'Gateway',
  'device_wifi.form.btnConnect': 'Connect',
  'device_wifi.form.btnWiredSet': 'Wired configuration',
  'device_wifi.dialogWire.title': 'Wired configuration',
  'device_wifi.dialogWire.IpType': 'IP type',
  'device_wifi.dialogWire.fixIp': 'Fixed IP',
  'device_wifi.dialogWire.getIpAuto': 'Obtain IP automatically',
  'device_wifi.dialogWire.fixSet': 'Fixed settings',
  'device_wifi.dialogWire.website': 'IP address',
  'device_wifi.dialogWire.gateway': 'Gateway',
  'device_wifi.dialogWire.tip': 'Configuration will take immediate effect after saved successfully as device connects the network cable',
  'device_wifi.dialogFail.title': 'Network configuration failed',
  'device_wifi.dialogFail.deviceName': 'Device name',
  'device_wifi.dialogFail.deviceKey': 'Device serial number',
  'device_wifi.dialogFail.failReason': 'Failure reasons',
  'device_wifi.message.requiredName': 'Please input Wi-Fi name',
  'device_wifi.message.requiredPassword': 'Please input Wi-Fi password',
  'device_wifi.message.requiredIp': 'Please input the IP address',
  'device_wifi.message.requiredDNS': 'Please input the DNS',
  'device_wifi.message.requiredGateway': 'Please input the gateway',
  'device_wifi.setSuccessMsg': 'Device network configured successfully!',
  'device_wifi.saveSuccessMsg': 'Device network saved successfully!',
  'device_upgrade.title': 'Firmware upgrade',
  'device_upgrade.uploadLabel': 'Upload firmware:',
  'device_upgrade.select': 'Select',
  'device_upgrade.upgrade': 'Upgrade',
  'device_upgrade.dialog.title': 'Failed to upgrade device',
  'device_upgrade.dialog.deviceName': 'Device name',
  'device_upgrade.dialog.deviceKey': 'Device serial number',
  'device_upgrade.dialog.failReason': 'Failure reasons',
  'device_upgrade.message.requiredFirmware': 'Firmware not uploaded yet',
  'device_upgrade.message.upgradeSuccess': 'Firmware upgraded successfully!',
  'device_upgrade.message.fileNoSupport': 'File format not supported',
  'device_upgrade.message.packageError': 'Upgrade package name error, failed to upgrade',
  'device_config.title': 'Device configuration',
  'device_config.generalParams.title': 'General parameters',
  'device_config.generalParams.timeWindow': 'Time window',
  'device_config.generalParams.timeWindowTip': "In the time window, only the first record of person's recognition records would be uploaded",
  'device_config.generalParams.second': 'second',
  'device_config.generalParams.recRank': 'Living body detection',
  'device_config.generalParams.recRankTip': 'Detect whether it is a real person or a photo',
  'device_config.generalParams.identifyDistance': 'Recognition distance',
  'device_config.generalParams.identifyDistanceTip': 'For example, if the recognition distance is within 0.5 meter, the device will only detect faces within 0.5 meter range',
  'device_config.generalParams.miDistance': 'Within %{num} meter',
  'device_config.generalParams.miDistances': 'Within %{num} meters',
  'device_config.generalParams.noDistance': 'No limit',
  'device_config.generalParams.delayTimeForCloseDoor': 'Relay control time',
  'device_config.generalParams.delayTimeForCloseDoor_tip1': 'Relay controls the time interval between door opening and closing',
  'device_config.generalParams.delayTimeForCloseDoor_tip2': 'Please input integers between 100-25500, round down with hundreds',
  'device_config.identifyParams.title': 'Recognition parameters',
  'device_config.identifyParams.successParams': 'Parameter of recognition success',
  'device_config.identifyParams.ttsModType': 'Voice broadcast mode',
  'device_config.identifyParams.ttsModTypeTip': 'Voice broadcast the content after successful recognition',
  'device_config.identifyParams.ttsModTypeTip2': 'Allow {name}, {tag}, numbers, English and Chinese characters',
  'device_config.identifyParams.ttsModTypeTip3': 'Allow {phone}, {idcardNum}, {id}, numbers, English and English symbols',
  'device_config.identifyParams.ttsModTypeExample': 'For example: {name} welcome',
  'device_config.identifyParams.modName': 'Broadcast name',
  'device_config.identifyParams.modNone': 'Not broadcast',
  'device_config.identifyParams.modCustom': 'Custom',
  'device_config.identifyParams.screen1': 'Screen display text 1',
  'device_config.identifyParams.screen1ShowName': 'Display name',
  'device_config.identifyParams.screen1ShowNone': 'Not display content',
  'device_config.identifyParams.screen1ShowCustom': 'Custom',
  'device_config.identifyParams.screen2': 'Screen display text 2',
  'device_config.identifyParams.screen2IdentifySuccess': 'Recognition success',
  'device_config.identifyParams.screen2Custom': 'Custom',
  'device_config.identifyParams.comModType': 'Serial port output mode',
  'device_config.identifyParams.comModTypeTip1': 'Serial port supports outputting Wiegand signal, device needs external serial port → Wiegand signal conversion plate, which is customized by our company. Custom passing format of content',
  'device_config.identifyParams.comModTypeTip2': 'Wiegand 26: #26WG{idcardNum}#, Wiegand 34: #34WG{idcardNum}#',
  'device_config.identifyParams.comModTypeTip3': 'Attention: {idcardNum} + combination of numbers, the range of Wiegand 26 is 1-65535, effective range is 5-digit; the range of Wiegand 34 is 1-4294967295, effective range is 10-digit. If exceeds the range, output signal will be converted and output ineffective signal.',
  'device_config.identifyParams.comModTypeOpen': 'Open the door',
  'device_config.identifyParams.comModTypeNoOutPut': 'Not output',
  'device_config.identifyParams.comModTypeOutPutId': 'Output person ID',
  'device_config.identifyParams.comModTypeOutPutCard': 'Output idcardNum',
  'device_config.identifyParams.comModTypeOutPutPhone': 'Output phone',
  'device_config.identifyParams.comModTypeCustom': 'Custom',
  'device_config.identifyParams.recSucWiegandType': 'Wiegand output mode',
  'device_config.identifyParams.recSucWiegandTypeTip': '{idcardNum} + combination of numbers, the range of Wiegand 26 is 1-65535, effective range is 5-digit; the range of Wiegand 34 is 1-4294967295, effective range is 10-digit. If exceeds the range, output signal will be converted and output ineffective signal',
  'device_config.identifyParams.recSucWiegandTypeNoOutput': 'Not output',
  'device_config.identifyParams.recSucWiegandTypeWk': 'Wiegand',
  'device_config.identifyParams.onlyNumIdCard': 'Only allow {idcardNum}, {id} and numbers',
  'device_config.identifyParams.onlyNumber': 'Allow numbers only',
  'device_config.identifyParams.isOpenRelay': 'Relay output',
  'device_config.identifyParams.isOpenRelayTip': 'Turn on Relay output, digital signal will be output after recognition',
  'device_config.identifyParams.failParams': 'Parameter of recognition failure',
  'device_config.identifyParams.identifyFail': 'Recognition failure',
  'device_config.identifyParams.identifyFailTip': 'Control the device to remind recognition failure or not, stranger records and site capture photos will be saved after turned on',
  'device_config.identifyParams.identifyFailCount': 'Number of times for judging recognition failure',
  'device_config.identifyParams.identifyFailCountTip': 'Device will compare for a certain number of times, if not pass, then will judge as recognition failure. The more the number of times, the higher the accuracy, the longer the time; Range (integer between 1-20)',
  'device_config.identifyParams.modFailContent': 'Voice broadcast content after recognition failure',
  'device_config.identifyParams.modFailContent2': 'Broadcast recognition failure',
  'device_config.identifyParams.modRule': 'Only numbers, English and Chinese characters allowed',
  'device_config.identifyParams.modExample': 'For example: Stranger, attention please!',
  'device_config.identifyParams.screenShowText': 'Screen display text',
  'device_config.identifyParams.showFail': 'Display recognition failure',
  'device_config.identifyParams.modRule2': 'Only numbers, Chinese and English and Chinese and English symbols allowed',
  'device_config.identifyParams.modRule4': 'Allow numbers, English and English symbols',
  'device_config.identifyParams.thunkModeTip1': 'Serial port supports outputting Wiegand signal, device needs external serial port → Wiegand signal conversion plate, which is customized by our company.',
  'device_config.identifyParams.thunkModeTip2': 'Attention: the range of Wiegand 26 is 1-65535, effective range is 5-digit; the range of Wiegand 34 is 1-4294967295, effective range is 10-digit. If exceeds the range, output signal will be converted and output ineffective signal.',
  'device_config.identifyParams.thunkModeTip3': 'The range of Wiegand 26 is 1-65535, effective range is 5-digit; the range of Wiegand 34 is 1-4294967295, effective range is 10-digit. If exceeds the range, output signal will be converted and output ineffective signal.',
  'device_config.identifyParams.noAccessParams': 'Parameter of insufficient permission',
  'device_config.identifyParams.noAccessParamsTip': 'Remind insufficient permission after successful recognition, for example: A can enter into the company between 08:00-20:00, if he comes to the company at 21:00, then A has insufficient permission',
  'device_config.identifyParams.noAccessModTip': 'Voice broadcast the content when permission is insufficient',
  'device_config.identifyParams.noAccessNameTip': 'Broadcast name and insufficient permission',
  'device_config.identifyParams.modRule3': 'Allow {name}, {tag}, numbers, English and Chinese characters',
  'device_config.identifyParams.nameExample': 'For example: {name} insufficient permission',
  'device_config.identifyParams.name': 'Name',
  'device_config.identifyParams.deviceRule3': 'Allow {name}, {tag}, numbers, Chinese and English and Chinese and English symbols',
  'device_config.identifyParams.nameRule3': 'For example: {name} insufficient permission!',
  'device_config.identifyParams.noAccess': 'Insufficient permission',
  'device_config.identifyParams.thunkTip1': 'Serial port supports outputting Wiegand signal, device needs external serial port → Wiegand signal conversion plate, which is customized by our company. Custom content inputting format:',
  'device_config.identifyParams.thunkTip2': 'Wiegand 26: #26WG{idcardNum}#, Wiegand 34: #34WG{idcardNum}#',
  'device_config.identifyParams.thunkTip4': 'Allow {phone}, {idcardNum}, {id}, numbers, Chinese and English and Chinese and English symbols',
  'device_config.identifyParams.thunkTip3': 'Serial port supports outputting Wiegand signal',
  'device_config.showParams.title': 'Display parameters',
  'device_config.showParams.screenArrow': 'Screen direction',
  'device_config.showParams.arrowAcross': 'Landscape',
  'device_config.showParams.arrowColumn': 'Portrait',
  'device_config.showParams.showText': 'Display text',
  'device_config.showParams.hidden': 'Not display',
  'device_config.showParams.deviceGroup': 'Device group',
  'device_config.showParams.custom': 'Custom',
  'device_config.showParams.scrDisplayText1Content': 'For example: Uni-Ubi Technology Co., Ltd.',
  'device_config.showParams.deviceName': 'Device name',
  'device_config.showParams.scrDisplayText2Content': 'For example: Device at east gate',
  'device_config.showParams.showImg': 'Display image',
  'device_config.showParams.previewDefaultImg': 'Check default image',
  'device_config.showParams.imgStandard1': 'Photo scale is 1:1, photo size not exceeds 2M',
  'device_config.showParams.imgStandard2': 'File format supports jpg, jpeg and png',
  'device_config.showParams.imgStandard3': 'For example: company logo',
  'device_config.showParams.imgStandard4': 'For example: QR code',
  'device_config.showParams.imgStandard5': 'Used for the display when the device disabled',
  'device_config.showParams.showConfig': 'Display settings',
  'device_config.showParams.deviceKey': 'Device serial number',
  'device_config.showParams.personCount': 'Number of people',
  'device_config.showParams.disabledImg': 'Disabled interface image',
  'device_config.showParams.bigScreen': 'Big-screen mode',
  'device_config.showParams.normalType': 'Classic mode',
  'device_config.showParams.customType': 'Custom mode',
  'device_config.showParams.showForBig': 'Used for big-screen display',
  'device_config.showParams.slogan': 'Slogan',
  'device_config.showParams.intro': 'Introduction',
  'device_config.identifyType.title': 'Recognition mode',
  'device_config.identifyType.photoIdentify': 'Face recognition',
  'device_config.identifyType.identifyScores': 'Face recognition threshold',
  'device_config.identifyType.identifyScoresTip': '(Please input integer between 0-100, the higher the score, the higher the recognition accuracy. To guarantee accuracy, the suggested value is 50-100)',
  'device_config.identifyType.moreIdentify': 'Multi-people recognition',
  'device_config.identifyType.moreIdentifyTip': 'Faces shown within recognition area will all be detected',
  'device_config.identifyType.singleIdentify': 'Single-person recognition',
  'device_config.identifyType.singleIdentifyTip': 'Only detect the biggest face within recognition area',
  'device_config.identifyType.cardIdentify': 'Card recognition',
  'device_config.identifyType.cardIdentifyTip': 'Currently, IC Card and Face&IC Card cannot coexist, as they use the same serial port output',
  'device_config.identifyType.recModeCardIntf': 'Card number transmission interface',
  'device_config.identifyType.recModeCardIntfTip': '(Restart the device to take effect after the interface type switched)',
  'device_config.identifyType.chunk': 'Serial port ',
  'device_config.identifyType.recModeCardHardware': 'External hardware type',
  'device_config.identifyType.hardware1': 'IC card reader',
  'device_config.identifyType.hardware2': 'Synjones',
  'device_config.identifyType.hardware3': 'Routon',
  'device_config.identifyType.hardware4': 'ZKT',
  'device_config.identifyType.hardware5': 'China Vision',
  'device_config.identifyType.personCard': 'Face&IC Card',
  'device_config.identifyType.personCardTip': 'Currently, IC Card and Face&IC Card cannot coexist, as they use the same serial port output',
  'device_config.identifyType.pearsonWithCard': 'Face&ID Card',
  'device_config.identifyType.pearsonWithCardTip': 'The same card number transmission interface cannot be used for IC Card, Face&IC Card, Face&ID Card at the same time',
  'device_config.dialog.title': 'Device configuration failed',
  'device_config.dialog.deviceName': 'Device name',
  'device_config.dialog.deviceKey': 'Device serial number',
  'device_config.dialog.failReason': 'Failure reasons',
  'device_config.message.rule1': 'Please input voice broadcast custom content',
  'device_config.message.rule2': 'Please input 1-255-bit characters',
  'device_config.message.rule3': 'Allow {name}, {tag}, numbers, English and Chinese characters',
  'device_config.message.rule4': 'Please input screen display text',
  'device_config.message.rule5': 'Please input 1-255-bit characters',
  'device_config.message.rule6': 'Please input Wiegand output custom content',
  'device_config.message.rule7': 'Allow numbers only',
  'device_config.message.rule8': 'Range of Wiegand 26 is 1-65535',
  'device_config.message.rule9': 'Range of Wiegand 34 is 1-4294967295',
  'device_config.message.rule10': 'Please input face recognition threshold',
  'device_config.message.rule11': 'Please input integer between 1-100',
  'device_config.message.rule12': 'Please input serial output custom content',
  'device_config.message.rule13': 'Allow numbers, English and English symbols',
  'device_config.message.rule14': 'Allow {phone}, {idcardNum}, {id}, numbers, English and English symbols',
  'device_config.message.rule15': 'Please input time window',
  'device_config.message.rule16': 'Please input relay control time',
  'device_config.message.rule17': 'Please input integer between 100-25500',
  'device_config.message.rule18': 'Please input the number of times that can judge the recognition failure',
  'device_config.message.rule20': 'Please input Wiegand output custom content',
  'device_config.message.rule21': 'Range of Wiegand 26 is 1-65535',
  'device_config.message.rule22': 'Range of Wiegand 34 is 1-4294967295',
  'device_config.message.rule23': 'Please input display text content 1',
  'device_config.message.rule24': 'Please input display text content 2',
  'device_config.message.rule27': 'File format is incorrect, please re-select',
  'device_config.message.rule28': 'File is too large, please re-select',
  'device_config.message.rule29': 'Please input integer between 1-20',
  'device_config.message.rule30': 'Only allow {idcardNum}, {id} and numbers',
  'device_config.message.rule31': 'Please input integer between 0-2147483647',
  'device_config.configSuccess': 'Device configured successfully!',
  'device_config.configError': 'Device configuration content is error, please switch tabs and submit after verification',
  'device_check.title': 'Check the device',
  'device_check.search.checking': 'Checking',
  'device_check.search.tip1': 'Check if the device is the latest version',
  'device_check.search.tip2': 'Provide better service via version upgrade',
  'device_check.search.tip3': 'Device searched',
  'device_check.search.reCheck': 'Re-check',
  'device_check.search.checkRes': 'Device searched',
  'device_check.search.batchUpgrade': 'Batch upgrade',
  'device_check.search.noDataTip': 'No device or client requires upgrade',
  'device_check.table.tabs.tab1': 'Same version',
  'device_check.table.tabs.tab2': 'Device version is low',
  'device_check.table.tabs.tab3': 'Client version is low',
  'device_check.table.tabs.tab4': 'Offline device',
  'device_check.table.labels.deviceKey': 'Device serial number',
  'device_check.table.labels.version': 'Software version',
  'device_check.table.labels.ipAddress': 'IP address',
  'device_check.table.labels.devicePlateName': 'Device name',
  'device_check.table.labels.ClientPlateName': 'Client name',
  'device_check.table.labels.handle': 'Operation',
  'device_check.table.sync': 'Synchronize',
  'device_check.table.upgrade': 'Upgrade',
  'device_check.table.enable': 'Enable',
  'device_check.table.forceDelete': 'Force to delete',
  'device_check.table.tip': 'Please upgrade the client version in settings',
  'device_check.dialog.sync': 'Synchronize',
  'device_check.dialog.syncDevice': 'Synchronize to device name',
  'device_check.dialog.syncClient': 'Synchronize to client name',
  'device_check.deviceOffLine': 'Device offline',
  'device_check.deviceDisabled': 'Device disabled',
  'device_check.message.syncSuccess': 'Synchronized successfully',
  'device_check.message.requiredDevice': 'Please select the device to upgrade',
  'device_check.message.hasEnable': 'Device enabled',
  'device_check.message.forceDeleteTip': 'Force to delete the device, and will delete all device info stored in system, but keep all data in the device',
  'device_check.message.forceDelete': 'Force to delete',
  'device_check.message.delete': 'Delete',
  'device_check.message.hasDelete': 'Device already deleted',
  'device_addManual.title': 'Add manually',
  'device_addManual.name': 'Name',
  'device_addManual.ipAddress': 'IP address',
  'device_addManual.checkDevice': 'Device detected',
  'device_addManual.group': 'Group',
  'device_addManual.add': 'Add',
  'device_addManual.setPassword': 'Set device password',
  'device_addManual.userAdminPassword': 'Use Admin password',
  'device_addManual.setPasswordTip': 'Please set password',
  'device_addManual.samePassword': 'Repeat the password',
  'device_addManual.passwordLabel': 'Device password',
  'device_addManual.hasPasswordTip': 'Device already has password, please input the password',
  'device_addManual.message.requiredName': 'Please input device name',
  'device_addManual.message.requiredIpAddress': 'Please input IP address',
  'device_addManual.message.requiredPassword': 'Please input password',
  'device_addManual.message.requiredAgain': 'Please confirm password',
  'device_addManual.message.noIp': 'No device detected in current IP address',
  'device_addManual.message.requiredDevice': 'Please detect device first',
  'device_addManual.message.addSuccess': 'Added successfully',
  'device_addManual.message.nameLeg': 'Device name is limited to 255 characters in length',
  'device_addAuto.title': 'Auto add',
  'device_addAuto.search.searching': 'Searching',
  'device_addAuto.search.res': 'Device searched',
  'device_addAuto.search.reSearch': 'Check again',
  'device_addAuto.tableHeader.deviceKey': 'Device serial number',
  'device_addAuto.tableHeader.version': 'Software version',
  'device_addAuto.tableHeader.ipAddress': 'IP address',
  'device_addAuto.tableHeader.deviceName': 'Device name',
  'device_addAuto.tableHeader.deviceGroup': 'Device group',
  'device_addAuto.tableHeader.handle': 'Operation',
  'device_addAuto.hasAccess': 'Accessed',
  'device_addAuto.dialog.title': 'Auto add',
  'device_addAuto.dialog.labels.name': 'Name',
  'device_addAuto.dialog.labels.group': 'Group',
  'device_addAuto.dialog.setPassword': 'Set device password',
  'device_addAuto.dialog.userAdminPassword': 'Use Admin password',
  'device_addAuto.dialog.requiredPassword': 'Please input password',
  'device_addAuto.dialog.requireAgain': 'Please input password again',
  'device_addAuto.dialog.hasPasswordTip': 'Device already has password',
  'device_addAuto.message.requiredName': 'Please input device name',
  'device_addAuto.message.requiredPassword': 'Please input password',
  'device_addAuto.message.requiredAgain': 'Please confirm password',
  'device_addAuto.message.addSuccess': 'Added successfully',
  'device_addAuto.message.nameLeg': 'Device name is limited to 255 characters in length',
  'group_add.editTitle': 'Edit the device group',
  'group_add.addTitle': 'Add a device group',
  'group_add.form.name': 'Name',
  'group_add.form.remark': 'Notes',
  'group_add.form.device': 'Device ',
  'group_add.form.search': 'Search',
  'group_add.form.offLine': 'Offline',
  'group_add.form.disabled': 'Disable',
  'group_add.all': 'All',
  'group_add.outGroup': 'Not grouped',
  'group_add.message.requiredName': 'Please input the name',
  'group_add.message.updateSuccess': 'Changed successfully',
  'group_add.message.addSuccess': 'Added successfully',
  device_add_manual_confirm_self_message: 'Access control devices cannot be added to visitor verification terminal list',
  device_add_manual_confirm_self_message2: 'Whether to add this device to Access control device list?',
  device_add_manual_confirm_device_message: 'Failed to add visitor verification terminal to access control device list',
  device_add_manual_confirm_device_message2: 'Whether to add this device to visitor verification terminal list?',
  device_add_manual_confirm_button_text: 'Yes',
  device_add_manual_confirm_cancel_button_text: 'No',
  device_info_device_ip_type: 'IP type',
  device_info_device_ip_type_1: 'DHCP',
  device_info_device_ip_type_2: 'Fixed IP',
  device_info_device_has_password: 'Password',
  device_info_device_has_password_no: 'Null',
  device_info_device_has_password_exist: 'Yes',
  device_info_device_model: 'Device type',
  device_info_device_not_support: 'Not support',
  device_info_device_type1: 'Passenger analytical device',
  device_info_device_type2: 'Link',
  device_info_device_type3: '5C',
  device_info_device_type4: 'DV300 table',
  device_info_device_type5: 'DV300 module',
  device_info_device_type6: 'CV500 module',
  device_info_device_type7: '5K',
  device_info_device_type8: 'ID Verification AIO',
  ip_input_copy_error: 'Incorrect format',
  device_batch_operate_restore_text: 'Restore to default configuration',
  device_batch_operate_restore_fail: 'Device failed to restore to the default configuration',
  device_batch_operate_restore_comfirm_title: 'Restore to default configuration',
  device_batch_operate_restore_comfirm_centent: 'The device configuration will restore to the default value after restore operation',
  device_batch_operate_restore_comfirm_submit: 'Restore',
  device_batch_operate_restore_comfirm_success: 'Device restored success',
  device_config_tabs_tip: 'Please select parameters needed to be configured',
  device_config_form_recModeCardPhoto: 'Capture photo',
  device_config_form_whitelist: 'ID Card verification',
  device_config_form_whitelist_tip: 'After reading ID card information, whether it needs to be compared with the ID card number of the person in the database',
  device_upgrade_history_table_title: 'Upload history',
  device_upgrade_history_table_name: 'File name',
  device_upgrade_history_table_time: 'Upload time',
  device_upgrade_history_table_operate: 'Operation',
  device_upgrade_history_table_operate_upgrade: 'Upgrade',
  device_upgrade_history_table_operate_delete: 'Delete',
  device_upgrade_history_table_operate_delete_comfirm_title: 'Delete',
  device_upgrade_history_table_operate_delete_comfirm_content: 'It cannot be recovered after deletion',
  device_upgrade_history_table_operate_delete_comfirm_submit: 'Delete',
  device_upgrade_history_table_operate_delete_comfirm_success: 'Delete successfully',
  device_upgrade_leave_confirm_title: 'Leave',
  device_upgrade_leave_confirm_content: 'Upload will be canceled after leaving this page',
  device_upgrade_leave_confirm_submit: 'Leave',
  device_wifi_ip_conflict: 'IP address is occupied, please set another IP',
  device_add_form_lang: 'Set device language',
  device_batch_operate_lang_comfirm_title: 'Set device language',
  device_batch_operate_lang_text: 'Set device language',
  device_batch_operate_lang_fail: 'Device failed to set language',
  device_batch_operate_lang_success: 'Device set language successfully',
  device_batch_operate_lang_comfirm_form_lang_label: 'Language',
  device_batch_operate_lang_comfirm_form_submit: 'Save',
  device_batch_operate_empty_comfirm_title: 'Clear people',
  device_batch_operate_empty_comfirm_content: 'After clear, the person information will be empty in device, and all people  of the device will be revoked in authorization list of client',
  device_batch_operate_empty_text: 'Clear people',
  device_batch_operate_empty_fail: 'Device failed to clear people',
  device_batch_operate_empty_success: 'Device cleared people successfully',
  device_batch_operate_empty_comfirm_form_submit: 'Clear',
  device_config_check_ip_text: 'Verifying IP address...',
  device_batch_temperature_comfirm_title: 'Set body temperature detection',
  device_batch_operate_temperature_form_temp_check: 'Body temperature detection',
  device_batch_operate_temperature_form_temp_invalid: 'Abnormal body temperature',
  device_batch_operate_temperature_form_temp_invalid_voice: 'Voice broadcast of abnormal body temperature',
  device_batch_operate_temperature_form_temp_voice_type1: 'Broadcast abnormal body temperature and value',
  device_batch_operate_temperature_form_temp_voice_type2: 'No broadcast',
  device_batch_operate_temperature_form_temp_voice_type3: 'Custom',
  device_batch_operate_temperature_form_custom_voice_placeholder: 'Allow {temperature}, numbers, English and Chinese characters',
  device_batch_operate_temperature_form_custom_voice_example: 'e.g: {temperature} abnormal body temperature',
  device_batch_operate_temperature_form_custom_voice_validator1: 'Please input voice broadcast custom content',
  device_batch_operate_temperature_text: 'Set body temperature detection',
  device_batch_operate_temperature_fail: 'Device set body temperature detection failure',
  device_batch_operate_temperature_success: 'Set body temperature detection successfully',
  device_identify_person_temperature_number: 'Body TEMP',
  device_identify_person_temperature_state: 'TEMP state',
  device_batch_operate_device_style1: 'Tablet gate machine',
  device_batch_operate_device_style2: 'Vertical all-in-one machine',
  device_batch_operate_device_style3: 'Simple UI',
  device_batch_operate_device_style: 'Other',
  device_batch_operate_device_style_label: 'Device mode',
  device_batch_operate_device_style_tip: 'The temperature area displayed on device screen is different according to the device mode',
  device_batch_operate_device_style_placeholder: 'Please other type of device mode',
  device_batch_operate_read_temperature_type_label: 'Type of temperature measuring module',
  device_batch_operate_read_temperature_type_tip: 'It is necessary to check whether the device matches the type of temperature measuring module',
  device_batch_operate_read_temperature_type_placeholcer: 'Please input the type of temperature measuring module',
  device_batch_operate_over_lab_value_label: 'Overlap rate of temperature measuring area',
  device_batch_operate_over_lab_value_tip: 'The larger the value, the higher the matching degree between face and temperature measuring area on the screen; This parameter is not valid for device mode - tablet gate machine',
  device_batch_operate_over_lab_value_placeholder: 'Please input the overlap rate of temperature measuring area',
  device_batch_operate_temperature_position: 'Temperature measuring of body parts',
  device_batch_operate_temperature_position_label1: 'Forehead',
  device_batch_operate_temperature_position_label2: 'Wrist',
  device_batch_operate_temperature_position_tip: 'The prompt sound and the prompt screen of the device are different with the temperature measuring of body parts',
  device_batch_operate_temperature_pass: 'Whether pass when body temperature is abnormal',
  device_batch_operate_temperature_pass_label1: 'Not allow',
  device_batch_operate_temperature_pass_label2: 'Allow',
  device_batch_operate_temperature_measure_range: 'Effective temperature range',
  device_batch_operate_temperature_measure_range_tip: 'If the temperature is not in this range, the device will prompt to remeasure temperature',
  device_batch_operate_temperature_measure_range_label1: 'Minimum',
  device_batch_operate_temperature_measure_range_label2: 'Maximum',
  device_batch_operate_temperature_measure_validator: 'Only allow the numerical value with one decimal fraction within {min}-{max}',
  device_batch_operate_temperature_measure_placeholder1: 'Please enter the minimum effective temperature',
  device_batch_operate_temperature_measure_placeholder2: 'Please enter the maximum effective temperature',
  device_batch_operate_temperature_env_effect1: 'Low temperature compensation',
  device_batch_operate_temperature_env_effect1_tip: 'When the measuring temperature is lower than the normal body temperature due to the influence of the environment, it will be automatically compensated as the normal body temperature',
  device_batch_operate_temperature_env_effect_label1: 'Mapping source',
  device_batch_operate_temperature_env_effect_label2: 'Mapping target',
  device_batch_operate_temperature_env_effect2: 'High temperature compensation',
  device_batch_operate_temperature_env_effect2_tip: 'When turned on, the temperature detected to be in the range of the mapping source below will be adjusted to the mapping target range',
  device_batch_operate_temperature_env_effect_validator5: 'The highest value should be greater than the lowest',
  device_batch_operate_temperature_env_effect_validator6: 'The mapping source range of low temperature compensation should be smaller than that of high temperature compensation',
  device_batch_operate_temperature_env_effect_validator7: 'Please input the minimum temperature',
  device_batch_operate_temperature_env_effect_validator8: 'Please input the maximum temperature',
  device_batch_operate_temperature_env_effect: 'Environmental compensation',
  device_batch_operate_temperature_env_effect_tip: 'When turned on, it can reduce the influence of the environment on the temperature detection results',
  device_batch_operate_temperature_more_btn1: 'Fold',
  device_batch_operate_temperature_more_btn2: 'Unfold more',
  device_batch_operate_temperature_unit: 'Unit of temperature',
  device_batch_operate_temperature_unit_type1: 'Degree Celsius ℃',
  device_batch_operate_temperature_unit_type2: 'Fahrenheit ℉',
  device_batch_mask_check_comfirm_title: 'Set face mask detection',
  device_batch_operate_mask_check_form_temp_check: 'Face mask detection',
  device_batch_operate_mask_check_form_temp_invalid_voice: 'Voice broadcast of no mask',
  device_batch_operate_mask_check_form_temp_voice_type1: 'Broadcast no mask',
  device_batch_operate_mask_check_form_temp_voice_type2: 'No broadcast',
  device_batch_operate_mask_check_form_temp_voice_type3: 'Custom',
  device_batch_operate_mask_check_form_custom_voice_placeholder: 'Allow numbers, English and Chinese characters',
  device_batch_operate_mask_check_form_custom_voice_example: 'e.g: No mask is not allowed to pass',
  device_batch_operate_mask_check_form_custom_voice_validator1: 'Please input voice broadcast custom content',
  device_batch_operate_mask_check_text: 'Set face mask detection',
  device_batch_operate_mask_check_fail: 'Device set face mask detection failure',
  device_batch_operate_mask_check_success: 'Set face mask detection successfully',
  device_batch_operate_remote_opendoor_text: 'Remote door-opening',
  device_batch_operate_remote_opendoor_fail: 'Device remote door-opening failure',
  device_batch_operate_remote_opendoor_success: 'Remote door-opening successfully',
  device_batch_operate_device_config: 'Configuration plan',
  device_batch_operate_device_config_add: 'Add configuration',
  device_batch_operate_device_config_update_time: 'Latest update time',
  device_batch_operate_device_config_default_name: 'Default Plan A',
  device_batch_operate_device_config_button1: 'Save the plan',
  device_batch_operate_device_config_button2: 'Apply to the device'
};
