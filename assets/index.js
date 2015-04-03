$('#builder-basic').queryBuilder('validate');

$('#tree-common').treeview({
  showTags: true,
  highlightSelected: false,
  levels: 3,
  data: [{
    text: 'Rule & Group',
    color: '#FFFFFF',
    backColor: '#428BCA',
    nodes: [{
      text: 'Attributes',
      color: '#FFFFFF',
      backColor: '#5CB85C',
      nodes: [{
        text: '$el',
        tags: ['jQuery'],
        backColor: '#EAFFEA'
      }, {
        text: 'parent',
        tags: ['Group'],
        backColor: '#EAFFEA'
      }, {
        text: 'level',
        tags: ['int'],
        backColor: '#EAFFEA'
      }, {
        text: 'id',
        tags: ['string'],
        backColor: '#EAFFEA'
      }, {
        text: 'error',
        tags: ['string'],
        backColor: '#EAFFEA'
      }, {
        text: 'data',
        tags: ['object'],
        backColor: '#EAFFEA'
      }]
    }, {
      text: 'Methods',
      color: '#FFFFFF',
      backColor: '#D9534F',
      nodes: [{
        text: 'isRoot()',
        tags: ['bool'],
        backColor: '#FFF4F4'
      }, {
        text: 'getPos()',
        tags: ['int'],
        backColor: '#FFF4F4'
      }, {
        text: 'drop()',
        backColor: '#FFF4F4'
      }, {
        text: 'moveAfter(Rule|Group)',
        backColor: '#FFF4F4'
      }, {
        text: 'moveAtBegin(Group)',
        backColor: '#FFF4F4'
      }, {
        text: 'moveAtEnd(Group)',
        backColor: '#FFF4F4'
      }]
    }]
  }]
});

$('#tree-rule').treeview({
  showTags: true,
  highlightSelected: false,
  levels: 3,
  data: [{
    text: 'Rule',
    color: '#FFFFFF',
    backColor: '#428BCA',
    nodes: [{
      text: 'Attributes',
      color: '#FFFFFF',
      backColor: '#5CB85C',
      nodes: [{
        text: 'filter',
        tags: ['object'],
        backColor: '#EAFFEA'
      }, {
        text: 'operator',
        tags: ['object'],
        backColor: '#EAFFEA'
      }, {
        text: 'flags',
        tags: ['object'],
        backColor: '#EAFFEA'
      }]
    }]
  }]
});

$('#tree-group').treeview({
  showTags: true,
  highlightSelected: false,
  levels: 3,
  data: [{
    text: 'Group',
    color: '#FFFFFF',
    backColor: '#428BCA',
    nodes: [{
      text: 'Attributes',
      color: '#FFFFFF',
      backColor: '#5CB85C',
      nodes: [{
        text: 'condition',
        tags: ['string'],
        backColor: '#EAFFEA'
      }]
    }, {
      text: 'Methods',
      color: '#FFFFFF',
      backColor: '#D9534F',
      nodes: [{
        text: 'empty()',
        backColor: '#FFF4F4'
      }, {
        text: 'length()',
        tags: ['int'],
        backColor: '#FFF4F4'
      }, {
        text: 'addGroup(jQuery, int)',
        tags: ['Group'],
        backColor: '#FFF4F4'
      }, {
        text: 'addRule(jQuery, int)',
        tags: ['Rule'],
        backColor: '#FFF4F4'
      }, {
        text: 'each(...)',
        backColor: '#FFF4F4'
      }, {
        text: 'contains(Rule|Group, bool)',
        tags: ['bool'],
        backColor: '#FFF4F4'
      }]
    }]
  }]
});