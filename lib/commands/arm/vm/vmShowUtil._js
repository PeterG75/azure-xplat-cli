var utils = require('../../../util/utils');
var tagUtils = require('../tag/tagUtils');

var $ = utils.getLocaleString;

exports.show = function (virtualMachine, output) {
  var indent = 0;
  exports.showGeneralProfile(virtualMachine, output, indent);
  exports.showHardwareProfile(virtualMachine, output, indent);
  exports.showStorageProfile(virtualMachine, output, indent);
  exports.showOsProfile(virtualMachine, output, indent);
  exports.showNetworkProfile(virtualMachine, output, indent);
  exports.showAvailabilitySetProfile(virtualMachine, output, indent);
  exports.showExtensionsProfile(virtualMachine, output, indent);
};

exports.showGeneralProfile = function (virtualMachine, output, indent) {
  var showNameValue = exports.showNameValue;
  showNameValue($('Id'), virtualMachine.id, true, output, indent);
  showNameValue($('ProvisioningState'), virtualMachine.provisioningState, true, output, indent);
  showNameValue($('Name'), virtualMachine.name, true, output, indent);
  showNameValue($('Location'), virtualMachine.location, true, output, indent);
  showNameValue($('Type'), virtualMachine.type, true, output, indent);
  if (virtualMachine.tags) {
    showNameValue($('Tags'), tagUtils.getTagsInfo(virtualMachine.tags), true, output, indent);
  }
};

exports.showHardwareProfile = function (virtualMachine, output, indent) {
  if (virtualMachine.hardwareProfile) {
    exports.showHeader('Hardware Profile:', true, output, indent);
    indent = indent + 2;
    exports.showNameValue($('Size'), virtualMachine.hardwareProfile.virtualMachineSize, true, output, indent);
  }
};

exports.showStorageProfile = function (virtualMachine, output, indent) {
  var storageProfile = virtualMachine.storageProfile;
  if (storageProfile) {
    exports.showHeader('Storage Profile:', true, output, indent);
    indent = indent + 2;
    exports.showStorageProfileImageRef(virtualMachine, output, indent);
    exports.showStorageProfileSourceImage(virtualMachine, output, indent);
    exports.showOsDiskProfile(virtualMachine, output, indent);
    exports.showDataDisksProfile(virtualMachine, output, indent);
  }
};

exports.showStorageProfileImageRef = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.storageProfile) {
    return;
  }

  var imageReference = virtualMachine.storageProfile.imageReference;
  var showNameValue = exports.showNameValue;
  if (imageReference) {
    exports.showHeader('Image reference:', false, output, indent);
    indent = indent + 2;
    showNameValue($('Publisher'), imageReference.publisher, true, output, indent);
    showNameValue($('Offer'), imageReference.offer, true, output, indent);
    showNameValue($('Sku'), imageReference.sku, true, output, indent);
    showNameValue($('Version'), imageReference.version, true, output, indent);
  }
};

exports.showStorageProfileSourceImage = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.storageProfile) {
    return;
  }

  var sourceImage = virtualMachine.storageProfile.sourceImage;
  if (sourceImage) {
    exports.showHeader('Source image:', false, output, indent);
    indent = indent + 2;
    if (sourceImage.referenceUri) {
      exports.showNameValue($('Id'), sourceImage.referenceUri, true, output, indent);
    }
  }
};

exports.showOsDiskProfile = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.storageProfile) {
    return;
  }

  var osDisk = virtualMachine.storageProfile.oSDisk;
  var showNameValue = exports.showNameValue;
  if (osDisk) {
    exports.showHeader('OS Disk:', true, output, indent);
    indent = indent + 2;
    showNameValue($('OSType'), osDisk.operatingSystemType, true, output, indent);
    showNameValue($('Name'), osDisk.name, true, output, indent);
    showNameValue($('Caching'), osDisk.caching, true, output, indent);
    showNameValue($('CreateOption'), osDisk.createOption, true, output, indent);

    if (osDisk.virtualHardDisk) {
      var virtualHardDisk = osDisk.virtualHardDisk;
      if (virtualHardDisk.uri) {
        exports.showHeader('Vhd:', false, output, indent);
        showNameValue($('Uri'), virtualHardDisk.uri, true, output, indent + 2);
      }
    }

    if (osDisk.sourceImage) {
      var osDiskSourceImage = osDisk.sourceImage;
      if (osDiskSourceImage.uri) {
        exports.showHeader('Source Image:', false, output, indent);
        showNameValue($('Uri'), osDiskSourceImage.uri, true, output, indent + 2);
      }
    }
  }
};

exports.showDataDisksProfile = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.storageProfile) {
    return;
  }

  var dataDisks = virtualMachine.storageProfile.dataDisks;
  if (dataDisks && dataDisks.length > 0) {
    exports.showHeader('Data Disks:', true, output, indent);
    var i = 1;
    dataDisks.forEach(function (dataDisk) {
      exports.showHeader('Data Disk ' + i + ':', false, output, indent + 2);
      exports.showOneDataDisk(dataDisk, output, indent + 4);
      i++;
    });
  }
};

exports.showOneDataDisk = function (dataDisk, output, indent) {
  var showNameValue = exports.showNameValue;
  showNameValue($('Lun'), dataDisk.lun, true, output, indent);
  if (dataDisk.diskSizeGB) {
    showNameValue($('Size'), dataDisk.diskSizeGB + ' GB', true, output, indent);
  }

  showNameValue($('Name'), dataDisk.name, true, output, indent);
  if (dataDisk.virtualHardDisk) {
    if (dataDisk.virtualHardDisk.uri) {
      showNameValue($('Vhd Uri'), dataDisk.virtualHardDisk.uri, true, output, indent);
    }
  }

  if (dataDisk.sourceImage) {
    if (dataDisk.sourceImage.uri) {
      showNameValue($('Source image Uri'), dataDisk.sourceImage.uri, true, output, indent);
    }
  }

  showNameValue($('Caching'), dataDisk.caching, true, output, indent);
  showNameValue($('CreateOption'), dataDisk.createOption, true, output, indent);
};

exports.showOsProfile = function (virtualMachine, output, indent) {
  var showNameValue = exports.showNameValue;
  var oSProfile = virtualMachine.oSProfile;
  if (oSProfile) {
    exports.showHeader('OS Profile:', true, output, indent);
    indent = indent + 2;
    showNameValue($('Computer Name'),oSProfile.computerName, true, output, indent);
    showNameValue($('User Name'), oSProfile.adminUsername, true, output, indent);
    showNameValue($('Password'), oSProfile.adminPassword, true, output, indent);
    exports.showWindowsConfiguration(virtualMachine, output, indent);
    exports.showLinuxConfiguration(virtualMachine, output, indent);
  }
};

exports.showWindowsConfiguration = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.oSProfile) {
    return;
  }

  var windowsConfiguration = virtualMachine.oSProfile.windowsConfiguration;
  var showNameValue = exports.showNameValue;
  if (windowsConfiguration) {
    exports.showHeader('Windows Configuration:', false, output, indent);
    indent = indent + 2;
    var provisionVMAgent = windowsConfiguration.provisionVMAgent ? 'true' : 'false';
    showNameValue($('Provision VM Agent'), provisionVMAgent, true, output, indent);
    var enableAutomaticUpdates = windowsConfiguration.enableAutomaticUpdates ? 'true' : 'false';
    showNameValue($('Enable automatic updates'), enableAutomaticUpdates, true, output, indent);
    showNameValue($('Time zone'), windowsConfiguration.timeZone, true, output, indent);

    var winRMConfiguration = windowsConfiguration.winRMConfiguration;
    if (winRMConfiguration) {
      var listeners = winRMConfiguration.listeners;
      if (listeners) {
        exports.showHeader('WinRM Listeners:', false, output, indent);
        var i = 1;
        listeners.forEach(function(listener) {
          exports.showHeader('WinRM Listener #' + i + ':', false, output, indent + 2);
          exports.showOneWinRMListener(listener, output, indent + 4);
          i++;
        });
      }
    }
  }
};

exports.showOneWinRMListener = function (listener, output, indent) {
  exports.showNameValue($('Protocol'), listener.protocol, true, output, indent);
  exports.showNameValue($('Certificate url'), listener.certificateUrl, true, output, indent);
};

exports.showLinuxConfiguration = function (virtualMachine, output, indent) {
  if (!virtualMachine || !virtualMachine.oSProfile) {
    return;
  }

  var linuxConfiguration = virtualMachine.oSProfile.linuxConfiguration;
  var showNameValue = exports.showNameValue;
  if (linuxConfiguration) {
    exports.showHeader('Linux Configuration:', false, output, indent);
    indent = indent + 2;
    var disablePasswordAuthentication = linuxConfiguration.disablePasswordAuthentication ? 'true' : 'false';
    showNameValue($('Disable Password Auth'), disablePasswordAuthentication, true, output, indent);
    var sshConfiguration = linuxConfiguration.sshConfiguration;
    if (sshConfiguration) {
      var publicKeys = sshConfiguration.publicKeys;
      if (publicKeys) {
        exports.showHeader('SSH Public Keys:', false, output, indent);
        var i = 1;
        publicKeys.forEach(function(publicKey) {
          exports.showHeader('Public Key #' + i + ':', false, output, indent + 2);
          exports.showOneSshPublicKey(publicKey, output, indent + 4);
          i++;
        });
      }
    }
  }
};

exports.showOneSshPublicKey = function (publicKey, output, indent) {
  exports.showNameValue($('Path'), publicKey.path, true, output, indent);
  exports.showNameValue($('Key'), publicKey.keyData, true, output, indent);
};

exports.showNetworkProfile = function (virtualMachine, output, indent) {
  if (!virtualMachine) {
    return;
  }

  var networkProfile = virtualMachine.networkProfile;
  if (networkProfile) {
    exports.showHeader('Network Profile:', true, output, indent);
    indent = indent + 2;
    var networkInterfaces = networkProfile.networkInterfaces;
    if (networkInterfaces) {
      exports.showHeader('Network Interfaces:', false, output, indent);
      var i = 1;
      networkInterfaces.forEach(function(networkInterface) {
        exports.showHeader('Network Interface #' + i + ':', false, output, indent + 2);
        exports.showOneNic(networkInterface, output, indent + 4);
        i++;
      });
    }
  }
};

exports.showOneNic = function (networkInterface, output, indent) {
  var primary = networkInterface.primary ? 'true' : 'false';
  exports.showNameValue($('Primary'), primary, true, output, indent);
  exports.showNameValue($('Id'), networkInterface.referenceUri, true, output, indent);
};

exports.showAvailabilitySetProfile = function (virtualMachine, output, indent) {
  if (!virtualMachine) {
    return;
  }

  var availabilitySetReference = virtualMachine.availabilitySetReference;
  var showNameValue = exports.showNameValue;
  if (availabilitySetReference) {
    exports.showHeader('AvailabilitySet:', true, output, indent);
    showNameValue($('Id'), availabilitySetReference.referenceUri, true, output, indent + 2);
  }
};

exports.showExtensionsProfile = function (virtualMachine, output, indent) {
  if (!virtualMachine) {
    return;
  }

  var extensions = virtualMachine.extensions;
  if (extensions) {
    exports.showHeader('Extensions:', true, output, indent);
    var i = 1;
    extensions.forEach(function(extension) {
      exports.showHeader('Extension #' + i + ':', false, output, indent + 2);
      exports.showOneExtension(extension, output, indent + 4);
      i++;
    });
  }
};

exports.showOneExtension = function (extension, output, indent) {
  var showNameValue = exports.showNameValue;
  showNameValue($('Publisher'), extension.publisher, true, output, indent);
  showNameValue($('Type'), extension.extensionType, true, output, indent);
  showNameValue($('Type handler ver'), extension.typeHandlerVersion, true, output, indent);
  showNameValue($('Auto upgrade minor ver'), extension.autoUpgradeMinorVersion, true, output, indent);
  showNameValue($('Settings'), extension.settings, true, output, indent);
  showNameValue($('Protected settings'), extension.protectedSettings, true, output, indent);
  showNameValue($('Provisioning state'), extension.provisioningState, true, output, indent);
  showNameValue($('Id'), extension.id, true, output, indent);
  showNameValue($('Name'), extension.name, true, output, indent);
  showNameValue($('Type'), extension.type, true, output, indent);
  showNameValue($('Location'), extension.location, true, output, indent);
  exports.showExtensionInstanceView(extension, output, indent + 2);
};

exports.showExtensionInstanceView = function (extension, output, indent) {
  if (!extension || !extension.instanceView) {
    return;
  }

  exports.showHeader('Instance view:', false, output, indent);
  var showNameValue = exports.showNameValue;
  var extensionInstanceView = extension.instanceView;
  indent = indent + 2;
  showNameValue($('Name'), extensionInstanceView.name, true, output, indent);
  showNameValue($('Type'), extensionInstanceView.extensionType, true, output, indent);
  showNameValue($('Type handler ver'), extensionInstanceView.typeHandlerVersion, true, output, indent);
  var line1 = '';
  var subStatuses = extensionInstanceView.subStatuses;
  var i = 1;
  if (subStatuses) {
    subStatuses.forEach(function (subStatus) {
      line1 = '';
      if (subStatus.code) {
        line1 += 'code:' + subStatus.code + ' ';
      }

      if (subStatus.level) {
        line1 += 'level:' + subStatus.level + ' ';
      }

      if (subStatus.displayStatus) {
        line1 += 'displayStatus:' + subStatus.displayStatus + ' ';
      }

      if (subStatus.time) {
        line1 += 'time:' + subStatus.time + ' ';
      }

      showNameValue($('Substatus Info') + ' #' + i, line1, true, output, indent);
      showNameValue($('Substatus Message') + ' #' + i, subStatus.message, true, output, indent);
      i++;
    });
  }

  var statuses = extensionInstanceView.statuses;
  i = 1;
  if (statuses) {
    statuses.forEach(function (status) {
      line1 = '';
      if (status.code) {
        line1 += 'code:' + status.code + ' ';
      }

      if (status.level) {
        line1 += 'level:' + status.level + ' ';
      }

      if (status.displayStatus) {
        line1 += 'displayStatus:' + status.displayStatus + ' ';
      }

      if (status.time) {
        line1 += 'time:' + status.time + ' ';
      }

      showNameValue($('Status Info') + ' #' + i, line1, true, output, indent);
      showNameValue($('Status Message') + ' #' + i, status.message, true, output, indent);
      i++;
    });
  }

};

exports.showNameValue = function (name, value, discardNullValue, output, indent) {
  var key;
  if (value) {
    key = _spaces(indent) + name;
    key += _spaces(22 - key.length);
    output(key + ':' + value);
  } else if (!discardNullValue) {
    key = _spaces(indent) + name;
    key += _spaces(22 - key.length);
    output(key + ':' + '""');
  }
};

exports.showHeader = function (header, newline, output, indent) {
  if (newline) {
    output('');
  }
  output(_spaces(indent) + header);
};

function _spaces(count) {
  var space = '';
  for (var i = 0; i < count; i++) {
    space += ' ';
  }

  return space;
}