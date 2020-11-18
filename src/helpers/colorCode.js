export function getColor(type) {
    var x = type.split(' ').join('');
    switch (x) {
      case 'Bootcamp':
        return 'Red';
        break;
      case 'Charity':
        return 'Blue';
        break;
      case 'Charitableauctions':
        return 'Yellow';
        break;
      case 'Exhibitions':
        return 'Violet';
        break;
      case 'Corporate':
        return 'Orange';
        break;
      case 'Family':
        return 'SlateBlue';
        break;
      case 'Fundraising':
        return 'Gray';
        break;
      case 'Holiday':
        return 'LightGray';
        break;
      case 'Musicevents':
        return 'DodgerBlue';
        break;
      case 'Networkingevents':
        return 'Tomato';
        break;
      case 'Productlaunches':
        return 'MediumSeaGreen';
        break;
      case 'Sportsevents':
        return 'Magenta';
        break;
      case 'Sponsoredruns':
        return 'mediumorchid';
        break;
      case 'Tradeshows':
        return 'mediumpurple';
        break;
      default:
        return 'white';
        break;
    }
  }
  