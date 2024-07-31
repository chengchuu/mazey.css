import '../z-style/confluence.scss';

// Area: `.wiki-content`
if (window.$) {
  // Format
  $('.wiki-content>p>br').hide();
  // Table
  $('.wiki-content td.confluenceTd>a').after("<br />");
}
