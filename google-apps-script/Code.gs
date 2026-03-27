const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

const WEBSITE_TOPICS = ['UI / Visual Design', 'Navigation', 'Content Clarity', 'Information Structure', 'Responsiveness'];
const PRODUCT_TOPICS = ['Features', 'User Interface', 'Performance', 'Reliability', 'Output Quality'];

function doPost(e) {
  try {
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      data = JSON.parse(e.parameter.data || '{}');
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheetName = data.type === 'website' ? 'Website' : 'Product';
    var topics = data.type === 'website' ? WEBSITE_TOPICS : PRODUCT_TOPICS;

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = ['Timestamp', 'Name', 'Email', 'Overall Rating', 'Satisfaction'];
      for (var i = 0; i < topics.length; i++) {
        headers.push(topics[i] + ' Rating');
      }
      headers.push('Comment');
      sheet.appendRow(headers);
    }

    var topicRatings = data.topicRatings || {};
    var topicValues = [];
    for (var j = 0; j < topics.length; j++) {
      topicValues.push(topicRatings[topics[j]] || 0);
    }

    var row = [
      data.timestamp || new Date().toISOString(),
      data.name || 'Anonymous',
      data.email || '',
      data.overallRating,
      data.satisfaction || ''
    ];
    for (var k = 0; k < topicValues.length; k++) {
      row.push(topicValues[k]);
    }
    row.push(data.comment || '');

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Feedback API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
