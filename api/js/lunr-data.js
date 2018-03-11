window.lunrData = {
  "index": {
    "version": "0.7.2",
    "fields": [
      {
        "name": "longname",
        "boost": 1000
      },
      {
        "name": "name",
        "boost": 500
      },
      {
        "name": "tags",
        "boost": 300
      },
      {
        "name": "kind",
        "boost": 110
      },
      {
        "name": "title",
        "boost": 100
      },
      {
        "name": "summary",
        "boost": 70
      },
      {
        "name": "description",
        "boost": 50
      },
      {
        "name": "body",
        "boost": 1
      }
    ],
    "ref": "id",
    "tokenizer": "default",
    "documentStore": {
      "store": {
        "index.html": [
          "api",
          "creator",
          "friendli",
          "index",
          "jqueri",
          "plugin",
          "query/filt",
          "querybuild",
          "readm",
          "user"
        ],
        "list_class.html": [
          "class",
          "document",
          "list",
          "list:class"
        ],
        "list_event.html": [
          "document",
          "event",
          "list",
          "list:ev"
        ],
        "list_external.html": [
          "document",
          "extern",
          "list",
          "list:extern",
          "member"
        ],
        "list_module.html": [
          "document",
          "list",
          "list:modul",
          "modul"
        ],
        "list_namespace.html": [
          "document",
          "list",
          "list:namespac",
          "namespac"
        ],
        "Group.html": [
          "class",
          "group",
          "object"
        ],
        "Group.html#$el": [
          "el",
          "group#$el",
          "jqueri",
          "lt;readonly&gt",
          "member"
        ],
        "Group.html#condition": [
          "condit",
          "group#condit",
          "member",
          "string"
        ],
        "Group.html#data": [
          "data",
          "group#data",
          "member",
          "object"
        ],
        "Group.html#error": [
          "error",
          "group#error",
          "member",
          "string"
        ],
        "Group.html#flags": [
          "flag",
          "group#flag",
          "lt;readonly&gt",
          "member",
          "object"
        ],
        "Group.html#id": [
          "group#id",
          "id",
          "lt;readonly&gt",
          "member",
          "string"
        ],
        "Group.html#level": [
          "group#level",
          "int",
          "level",
          "lt;readonly&gt",
          "member"
        ],
        "Group.html#model": [
          "group#model",
          "lt;readonly&gt",
          "member",
          "model"
        ],
        "Group.html#not": [
          "boolean",
          "group#not",
          "member",
          "module:plugins.notgroup"
        ],
        "Group.html#parent": [
          "group",
          "group#par",
          "lt;readonly&gt",
          "member",
          "parent"
        ],
        "Group.html#rules": [
          "array.&lt;object&gt",
          "group#rul",
          "lt;readonly&gt",
          "member",
          "rule"
        ],
        "Group.html#addGroup": [
          "add",
          "addgroup",
          "el",
          "function",
          "group",
          "group#addgroup",
          "index",
          "new",
          "specifi"
        ],
        "Group.html#addRule": [
          "add",
          "addrul",
          "el",
          "function",
          "group#addrul",
          "index",
          "new",
          "rule",
          "specifi"
        ],
        "Group.html#contains": [
          "boolean",
          "check",
          "contain",
          "function",
          "group",
          "group#contain",
          "node",
          "particular",
          "recurs"
        ],
        "Group.html#drop": [
          "delet",
          "drop",
          "function",
          "group#drop",
          "self"
        ],
        "Group.html#each": [
          "boolean",
          "cbgroup",
          "cbrule",
          "context",
          "each",
          "function",
          "group#each",
          "iter",
          "node",
          "over",
          "revers"
        ],
        "Group.html#empty": [
          "content",
          "empti",
          "function",
          "group#empti",
          "group'",
          "remov"
        ],
        "Group.html#getNodePos": [
          "child",
          "function",
          "getnodepo",
          "group#getnodepo",
          "int",
          "node",
          "posit",
          "return"
        ],
        "Group.html#getPos": [
          "function",
          "getpo",
          "group#getpo",
          "insid",
          "int",
          "node",
          "parent",
          "posit",
          "return"
        ],
        "Group.html#insertNode": [
          "add",
          "function",
          "group#insertnod",
          "index",
          "insertnod",
          "node",
          "specifi",
          "trigger"
        ],
        "Group.html#isRoot": [
          "boolean",
          "check",
          "function",
          "group#isroot",
          "isroot",
          "node",
          "root"
        ],
        "Group.html#length": [
          "children",
          "function",
          "group#length",
          "int",
          "length",
          "number",
          "return"
        ],
        "Group.html#move": [
          "function",
          "group",
          "group#mov",
          "index",
          "itself",
          "move",
          "posit",
          "specif",
          "target"
        ],
        "Group.html#moveAfter": [
          "anoth",
          "function",
          "group#moveaft",
          "itself",
          "move",
          "moveaft",
          "node",
          "target"
        ],
        "Group.html#moveAtBegin": [
          "anoth",
          "begin",
          "function",
          "group",
          "group#moveatbegin",
          "itself",
          "move",
          "moveatbegin",
          "parent",
          "target"
        ],
        "Group.html#moveAtEnd": [
          "anoth",
          "end",
          "function",
          "group",
          "group#moveatend",
          "itself",
          "move",
          "moveatend",
          "parent",
          "target"
        ],
        "Group.html#removeNode": [
          "delet",
          "function",
          "group#removenod",
          "node",
          "removenod",
          "specif"
        ],
        "Model.html": [
          "class",
          "data",
          "emit",
          "event",
          "main",
          "model",
          "object",
          "store"
        ],
        "Model.html#root": [
          "group",
          "lt;readonly&gt",
          "member",
          "model#root",
          "root"
        ],
        "Model.html#off": [
          "cb",
          "event",
          "function",
          "listen",
          "model",
          "model#off",
          "remov",
          "type"
        ],
        "Model.html#on": [
          "attach",
          "cb",
          "event",
          "function",
          "listen",
          "model",
          "model#on",
          "type"
        ],
        "Model.html#once": [
          "attach",
          "call",
          "cb",
          "event",
          "function",
          "listen",
          "model",
          "model#onc",
          "onc",
          "type"
        ],
        "Model.html#trigger": [
          "event",
          "function",
          "model",
          "model#trigg",
          "trigger",
          "type"
        ],
        "Model.html#GroupIteratee": [
          "boolean",
          "groupiterate",
          "model#groupiterate",
          "node",
          "typedef"
        ],
        "module-plugins.BtCheckbox.html": [
          "appli",
          "awesom",
          "bootstrap",
          "btcheckbox",
          "checkbox",
          "class",
          "input",
          "module:plugins.btcheckbox",
          "plugins.btcheckbox",
          "radio"
        ],
        "module-plugins.BtSelectpicker.html": [
          "btselectpick",
          "class",
          "module:plugins.btselectpick",
          "plugins.btselectpick"
        ],
        "module-plugins.BtTooltipErrors.html": [
          "appli",
          "bootstrap",
          "bttooltiperror",
          "class",
          "error",
          "messag",
          "module:plugins.bttooltiperror",
          "plugins.bttooltiperror",
          "tooltip",
          "valid"
        ],
        "module-plugins.ChangeFilters.html": [
          "allow",
          "avail",
          "chang",
          "changefilt",
          "class",
          "filter",
          "initi",
          "module:plugins.changefilt",
          "plugin",
          "plugins.changefilt"
        ],
        "module-plugins.ChangeFilters.html#addFilter": [
          "add",
          "addfilt",
          "builder",
          "changefilters#addfilt",
          "filter",
          "function",
          "module:plugins.changefilters#addfilt",
          "new",
          "newfilt",
          "posit"
        ],
        "module-plugins.ChangeFilters.html#removeFilter": [
          "builder",
          "changefilters#removefilt",
          "deleteorphan",
          "filter",
          "filterid",
          "function",
          "module:plugins.changefilters#removefilt",
          "remov",
          "removefilt"
        ],
        "module-plugins.ChangeFilters.html#setFilters": [
          "builder",
          "chang",
          "changefilters#setfilt",
          "deleteorphan",
          "filter",
          "function",
          "module:plugins.changefilters#setfilt",
          "setfilt"
        ],
        "module-plugins.ChosenSelectpicker.html": [
          "chosenselectpick",
          "class",
          "module:plugins.chosenselectpick",
          "plugins.chosenselectpick"
        ],
        "module-plugins.FilterDescription.html": [
          "bootbox",
          "bootsrap",
          "class",
          "descript",
          "display",
          "filter",
          "filterdescript",
          "inlin",
          "module:plugins.filterdescript",
          "plugins.filterdescript",
          "popov",
          "provid",
          "three",
          "way"
        ],
        "module-plugins.Invert.html": [
          "allow",
          "builder",
          "class",
          "condit",
          "entir",
          "group",
          "invert",
          "module:plugins.invert",
          "oper",
          "plugins.invert",
          "rule"
        ],
        "module-plugins.Invert.html#invert": [
          "builder",
          "function",
          "group",
          "invert",
          "invert#invert",
          "module:plugins.invert#invert",
          "node",
          "option",
          "rule",
          "whole"
        ],
        "module-plugins.MongoDbSupport.html": [
          "allow",
          "builder",
          "class",
          "export",
          "find",
          "module:plugins.mongodbsupport",
          "mongodb",
          "mongodbsupport",
          "object",
          "plugins.mongodbsupport",
          "popul",
          "rule",
          "well"
        ],
        "module-plugins.MongoDbSupport.html#getMongo": [
          "data",
          "function",
          "getmongo",
          "module:plugins.mongodbsupport#getmongo",
          "mongodb",
          "mongodbsupport#getmongo",
          "object",
          "queri",
          "return",
          "rule"
        ],
        "module-plugins.MongoDbSupport.html#getRulesFromMongo": [
          "convert",
          "function",
          "getrulesfrommongo",
          "module:plugins.mongodbsupport#getrulesfrommongo",
          "mongodb",
          "mongodbsupport#getrulesfrommongo",
          "object",
          "queri",
          "rule"
        ],
        "module-plugins.MongoDbSupport.html#setRulesFromMongo": [
          "function",
          "module:plugins.mongodbsupport#setrulesfrommongo",
          "mongodb",
          "mongodbsupport#setrulesfrommongo",
          "queri",
          "rule",
          "set",
          "setrulesfrommongo"
        ],
        "module-plugins.NotGroup.html": [
          "add",
          "checkbox",
          "class",
          "condit",
          "front",
          "group",
          "module:plugins.notgroup",
          "notgroup",
          "plugins.notgroup",
          "quot;not&quot"
        ],
        "module-plugins.Sortable.html": [
          "amp",
          "class",
          "drag",
          "drop",
          "enabl",
          "module:plugins.sort",
          "plugins.sort",
          "rule",
          "sort",
          "sortabl"
        ],
        "module-plugins.SqlSupport.html": [
          "allow",
          "builder",
          "class",
          "export",
          "module:plugins.sqlsupport",
          "plugins.sqlsupport",
          "popul",
          "queri",
          "rule",
          "sql",
          "sqlsupport",
          "statement",
          "well"
        ],
        "module-plugins.SqlSupport.html#getRulesFromSQL": [
          "convert",
          "function",
          "getrulesfromsql",
          "module:plugins.sqlsupport#getrulesfromsql",
          "object",
          "queri",
          "rule",
          "sql",
          "sqlsupport#getrulesfromsql",
          "stmt"
        ],
        "module-plugins.SqlSupport.html#getSQL": [
          "data",
          "function",
          "getsql",
          "module:plugins.sqlsupport#getsql",
          "module:plugins.sqlsupport.sqlqueri",
          "nl",
          "queri",
          "return",
          "rule",
          "sql",
          "sqlsupport#getsql",
          "stmt"
        ],
        "module-plugins.SqlSupport.html#setRulesFromSQL": [
          "builder'",
          "function",
          "module:plugins.sqlsupport#setrulesfromsql",
          "queri",
          "rule",
          "set",
          "setrulesfromsql",
          "sql",
          "sqlsupport#setrulesfromsql"
        ],
        "module-plugins.SqlSupport.html#.SqlQuery": [
          "module:plugins.sqlsupport.sqlqueri",
          "sqlqueri",
          "sqlsupport.sqlqueri",
          "typedef"
        ],
        "module-plugins.UniqueFilter.html": [
          "allow",
          "class",
          "defin",
          "filter",
          "global",
          "group",
          "ie",
          "module:plugins.uniquefilt",
          "on",
          "plugins.uniquefilt",
          "quot;unique&quot",
          "rule",
          "same",
          "uniquefilt",
          "us"
        ],
        "Node.html": [
          "abstract",
          "class",
          "node",
          "object",
          "root"
        ],
        "Node.html#$el": [
          "el",
          "jqueri",
          "lt;readonly&gt",
          "member",
          "node#$el"
        ],
        "Node.html#data": [
          "data",
          "member",
          "node#data",
          "object"
        ],
        "Node.html#error": [
          "error",
          "member",
          "node#error",
          "string"
        ],
        "Node.html#flags": [
          "flag",
          "lt;readonly&gt",
          "member",
          "node#flag",
          "object"
        ],
        "Node.html#id": [
          "id",
          "lt;readonly&gt",
          "member",
          "node#id",
          "string"
        ],
        "Node.html#level": [
          "int",
          "level",
          "lt;readonly&gt",
          "member",
          "node#level"
        ],
        "Node.html#model": [
          "lt;readonly&gt",
          "member",
          "model",
          "node#model"
        ],
        "Node.html#parent": [
          "group",
          "lt;readonly&gt",
          "member",
          "node#par",
          "parent"
        ],
        "Node.html#drop": [
          "delet",
          "drop",
          "function",
          "node#drop",
          "self"
        ],
        "Node.html#getPos": [
          "function",
          "getpo",
          "insid",
          "int",
          "node",
          "node#getpo",
          "parent",
          "posit",
          "return"
        ],
        "Node.html#isRoot": [
          "boolean",
          "check",
          "function",
          "isroot",
          "node",
          "node#isroot",
          "root"
        ],
        "Node.html#move": [
          "function",
          "group",
          "index",
          "itself",
          "move",
          "node#mov",
          "posit",
          "specif",
          "target"
        ],
        "Node.html#moveAfter": [
          "anoth",
          "function",
          "itself",
          "move",
          "moveaft",
          "node",
          "node#moveaft",
          "target"
        ],
        "Node.html#moveAtBegin": [
          "anoth",
          "begin",
          "function",
          "group",
          "itself",
          "move",
          "moveatbegin",
          "node#moveatbegin",
          "parent",
          "target"
        ],
        "Node.html#moveAtEnd": [
          "anoth",
          "end",
          "function",
          "group",
          "itself",
          "move",
          "moveatend",
          "node#moveatend",
          "parent",
          "target"
        ],
        "QueryBuilder.html": [
          "class",
          "querybuild"
        ],
        "QueryBuilder.html#.DEFAULTS": [
          "configur",
          "default",
          "lt;static",
          "member",
          "object",
          "querybuilder.default",
          "readonly&gt"
        ],
        "QueryBuilder.html#.Group": [
          "function",
          "group",
          "lt;static&gt",
          "member",
          "querybuilder.group"
        ],
        "QueryBuilder.html#.OPERATORS": [
          "default",
          "lt;static",
          "member",
          "object&gt",
          "object.&lt;str",
          "oper",
          "querybuilder.oper",
          "readonly&gt"
        ],
        "QueryBuilder.html#.regional": [
          "i18n",
          "local",
          "lt;static",
          "member",
          "object&gt",
          "object.&lt;str",
          "querybuilder.region",
          "readonly&gt",
          "region",
          "see",
          "string"
        ],
        "QueryBuilder.html#.Rule": [
          "function",
          "lt;static&gt",
          "member",
          "querybuilder.rul",
          "rule"
        ],
        "QueryBuilder.html#.selectors": [
          "common",
          "compon",
          "css",
          "lt;static",
          "member",
          "object.&lt;str",
          "querybuilder.selector",
          "readonly&gt",
          "selector",
          "string&gt"
        ],
        "QueryBuilder.html#.templates": [
          "lt;static",
          "member",
          "object.&lt;str",
          "querybuilder.templ",
          "readonly&gt",
          "see",
          "string",
          "string&gt",
          "templat",
          "template.j"
        ],
        "QueryBuilder.html#.utils": [
          "lt;static&gt",
          "member",
          "object",
          "querybuilder.util",
          "util"
        ],
        "QueryBuilder.html#$el": [
          "contain",
          "el",
          "element",
          "jqueri",
          "lt;readonly&gt",
          "member",
          "querybuilder#$el"
        ],
        "QueryBuilder.html#filters": [
          "array.&lt;querybuilder.filter&gt",
          "filter",
          "list",
          "lt;readonly&gt",
          "member",
          "querybuilder#filt"
        ],
        "QueryBuilder.html#icons": [
          "icon",
          "list",
          "lt;readonly&gt",
          "member",
          "object.&lt;str",
          "querybuilder#icon",
          "string&gt"
        ],
        "QueryBuilder.html#lang": [
          "lang",
          "lt;readonly&gt",
          "member",
          "object",
          "querybuilder#lang",
          "translat"
        ],
        "QueryBuilder.html#model": [
          "intern",
          "lt;readonly&gt",
          "member",
          "model",
          "querybuilder#model"
        ],
        "QueryBuilder.html#operators": [
          "array.&lt;querybuilder.operator&gt",
          "list",
          "lt;readonly&gt",
          "member",
          "oper",
          "querybuilder#oper"
        ],
        "QueryBuilder.html#plugins": [
          "configur",
          "lt;readonly&gt",
          "member",
          "object&gt",
          "object.&lt;str",
          "plugin",
          "querybuilder#plugin"
        ],
        "QueryBuilder.html#settings": [
          "configur",
          "lt;readonly&gt",
          "member",
          "object",
          "querybuilder#set",
          "set"
        ],
        "QueryBuilder.html#templates": [
          "function()&gt",
          "list",
          "lt;readonly&gt",
          "member",
          "object.&lt;str",
          "querybuilder#templ",
          "templat"
        ],
        "QueryBuilder.html#addGroup": [
          "add",
          "addgroup",
          "addrul",
          "data",
          "flag",
          "function",
          "group",
          "new",
          "parent",
          "querybuilder#addgroup"
        ],
        "QueryBuilder.html#addRule": [
          "add",
          "addrul",
          "data",
          "flag",
          "function",
          "new",
          "parent",
          "querybuilder#addrul",
          "rule"
        ],
        "QueryBuilder.html#change": [
          "builder",
          "chang",
          "contain",
          "event",
          "function",
          "modifi",
          "querybuilder#chang",
          "return",
          "trigger",
          "type",
          "valu"
        ],
        "QueryBuilder.html#checkFilters": [
          "array.&lt;querybuilder.filter&gt",
          "check",
          "checkfilt",
          "configur",
          "each",
          "filter",
          "function",
          "querybuilder#checkfilt"
        ],
        "QueryBuilder.html#checkOperators": [
          "array.&lt;querybuilder.operator&gt",
          "check",
          "checkoper",
          "configur",
          "each",
          "function",
          "oper",
          "querybuilder#checkoper"
        ],
        "QueryBuilder.html#clear": [
          "clear",
          "function",
          "group",
          "querybuilder#clear",
          "remov",
          "root",
          "rule"
        ],
        "QueryBuilder.html#clearErrors": [
          "clear",
          "clearerror",
          "error",
          "function",
          "marker",
          "node",
          "querybuilder#clearerror"
        ],
        "QueryBuilder.html#deleteGroup": [
          "boolean",
          "delet",
          "deletegroup",
          "flag",
          "function",
          "group",
          "no_delet",
          "on",
          "querybuilder#deletegroup",
          "rule",
          "tri"
        ],
        "QueryBuilder.html#deleteRule": [
          "boolean",
          "delet",
          "deleterul",
          "function",
          "querybuilder#deleterul",
          "rule",
          "tri"
        ],
        "QueryBuilder.html#destroy": [
          "builder",
          "destroy",
          "function",
          "querybuilder#destroy"
        ],
        "QueryBuilder.html#getModel": [
          "associ",
          "dom",
          "function",
          "getmodel",
          "model",
          "node",
          "object",
          "querybuilder#getmodel",
          "return",
          "root",
          "target"
        ],
        "QueryBuilder.html#getRules": [
          "current",
          "function",
          "get",
          "getrul",
          "object",
          "option",
          "querybuilder#getrul",
          "repres",
          "rule"
        ],
        "QueryBuilder.html#off": [
          "builder",
          "cb",
          "contain",
          "event",
          "function",
          "listen",
          "querybuild",
          "querybuilder#off",
          "remov",
          "type"
        ],
        "QueryBuilder.html#on": [
          "attach",
          "builder",
          "cb",
          "contain",
          "event",
          "function",
          "listen",
          "querybuild",
          "querybuilder#on",
          "type"
        ],
        "QueryBuilder.html#once": [
          "attach",
          "builder",
          "call",
          "cb",
          "contain",
          "event",
          "function",
          "listen",
          "onc",
          "querybuild",
          "querybuilder#onc",
          "type"
        ],
        "QueryBuilder.html#reset": [
          "clear",
          "function",
          "group",
          "querybuilder#reset",
          "reset",
          "root",
          "rule"
        ],
        "QueryBuilder.html#setOptions": [
          "builder",
          "configur",
          "defin",
          "function",
          "modifi",
          "option",
          "querybuilder#setopt",
          "querybuilder.modifiable_opt",
          "setopt"
        ],
        "QueryBuilder.html#setRoot": [
          "addrul",
          "creat",
          "data",
          "flag",
          "function",
          "group",
          "querybuilder#setroot",
          "root",
          "setroot"
        ],
        "QueryBuilder.html#setRules": [
          "data",
          "function",
          "object",
          "option",
          "querybuilder#setrul",
          "rule",
          "set",
          "setrul"
        ],
        "QueryBuilder.html#translate": [
          "categori",
          "code",
          "function",
          "it'",
          "itself",
          "key",
          "label",
          "lang",
          "languag",
          "look",
          "object",
          "querybuilder#transl",
          "string",
          "translat"
        ],
        "QueryBuilder.html#trigger": [
          "builder",
          "contain",
          "event",
          "function",
          "querybuilder#trigg",
          "trigger",
          "type"
        ],
        "QueryBuilder.html#validate": [
          "boolean",
          "builder",
          "function",
          "option",
          "querybuilder#valid",
          "valid",
          "whole"
        ],
        "QueryBuilder.html#validateValue": [
          "array|boolean",
          "function",
          "perform",
          "querybuilder#validatevalu",
          "rule",
          "valid",
          "validatevalu",
          "valu"
        ],
        "QueryBuilder.html#.Filter": [
          "filter",
          "http://querybuilder.js.org/index.html#filt",
          "querybuilder.filt",
          "see",
          "typedef"
        ],
        "QueryBuilder.html#.Operator": [
          "http://querybuilder.js.org/index.html#oper",
          "oper",
          "querybuilder.oper",
          "see",
          "typedef"
        ],
        "Rule.html": [
          "class",
          "object",
          "rule"
        ],
        "Rule.html#$el": [
          "el",
          "jqueri",
          "lt;readonly&gt",
          "member",
          "rule#$el"
        ],
        "Rule.html#data": [
          "data",
          "member",
          "object",
          "rule#data"
        ],
        "Rule.html#error": [
          "error",
          "member",
          "rule#error",
          "string"
        ],
        "Rule.html#filter": [
          "filter",
          "member",
          "querybuilder.filt",
          "rule#filt"
        ],
        "Rule.html#flags": [
          "flag",
          "lt;readonly&gt",
          "member",
          "object",
          "rule#flag"
        ],
        "Rule.html#id": [
          "id",
          "lt;readonly&gt",
          "member",
          "rule#id",
          "string"
        ],
        "Rule.html#level": [
          "int",
          "level",
          "lt;readonly&gt",
          "member",
          "rule#level"
        ],
        "Rule.html#model": [
          "lt;readonly&gt",
          "member",
          "model",
          "rule#model"
        ],
        "Rule.html#operator": [
          "member",
          "oper",
          "querybuilder.oper",
          "rule#oper"
        ],
        "Rule.html#parent": [
          "group",
          "lt;readonly&gt",
          "member",
          "parent",
          "rule#par"
        ],
        "Rule.html#value": [
          "member",
          "rule#valu",
          "valu"
        ],
        "Rule.html#drop": [
          "delet",
          "drop",
          "function",
          "rule#drop",
          "self"
        ],
        "Rule.html#getPos": [
          "function",
          "getpo",
          "insid",
          "int",
          "node",
          "parent",
          "posit",
          "return",
          "rule#getpo"
        ],
        "Rule.html#isRoot": [
          "boolean",
          "check",
          "function",
          "isroot",
          "node",
          "root",
          "rule#isroot"
        ],
        "Rule.html#move": [
          "function",
          "group",
          "index",
          "itself",
          "move",
          "posit",
          "rule#mov",
          "specif",
          "target"
        ],
        "Rule.html#moveAfter": [
          "anoth",
          "function",
          "itself",
          "move",
          "moveaft",
          "node",
          "rule#moveaft",
          "target"
        ],
        "Rule.html#moveAtBegin": [
          "anoth",
          "begin",
          "function",
          "group",
          "itself",
          "move",
          "moveatbegin",
          "parent",
          "rule#moveatbegin",
          "target"
        ],
        "Rule.html#moveAtEnd": [
          "anoth",
          "end",
          "function",
          "group",
          "itself",
          "move",
          "moveatend",
          "parent",
          "rule#moveatend",
          "target"
        ],
        "external-_jQuery.fn_.html": [
          "extern",
          "external:\"jquery.fn",
          "fn",
          "jqueri",
          "jquery.fn",
          "namespac",
          "plugin",
          "quot;jquery.fn&quot"
        ],
        "module-plugins.html": [
          "modul",
          "module:plugin",
          "plugin"
        ],
        "Utils.html": [
          "namespac",
          "util"
        ],
        "Utils.html#.changeType": [
          "bool",
          "chang",
          "changetyp",
          "float",
          "function",
          "int",
          "lt;static&gt",
          "type",
          "utils.changetyp",
          "valu"
        ],
        "Utils.html#.defineModelProperties": [
          "__",
          "defin",
          "definemodelproperti",
          "emit",
          "enumer",
          "event",
          "field",
          "function",
          "getter",
          "lt;static&gt",
          "model",
          "node",
          "non",
          "obj",
          "object",
          "properti",
          "prototyp",
          "root",
          "setter",
          "store",
          "through",
          "updat",
          "utils.definemodelproperti",
          "valu"
        ],
        "Utils.html#.error": [
          "arg",
          "custom",
          "dothrow",
          "error",
          "function",
          "log",
          "lt;static&gt",
          "messag",
          "name",
          "object",
          "throw",
          "type",
          "utils.error"
        ],
        "Utils.html#.escapeElementId": [
          "element",
          "escap",
          "escapeelementid",
          "function",
          "html",
          "id",
          "lt;static&gt",
          "str",
          "string",
          "us",
          "utils.escapeelementid"
        ],
        "Utils.html#.escapeRegExp": [
          "escap",
          "escaperegexp",
          "function",
          "lt;static&gt",
          "regex",
          "str",
          "string",
          "us",
          "utils.escaperegexp"
        ],
        "Utils.html#.escapeString": [
          "escap",
          "escapestr",
          "function",
          "lt;static&gt",
          "mysql_real_escape_str",
          "php'",
          "string",
          "utils.escapestr",
          "valu"
        ],
        "Utils.html#.fmt": [
          "0",
          "1",
          "arg",
          "fmt",
          "function",
          "lt;static&gt",
          "replac",
          "str",
          "string",
          "utils.fmt"
        ],
        "Utils.html#.groupSort": [
          "array.&lt;object&gt",
          "function",
          "group",
          "groupsort",
          "initi",
          "item",
          "key",
          "lt;static&gt",
          "object",
          "order",
          "possibl",
          "preserv",
          "sort",
          "utils.groupsort"
        ],
        "Utils.html#.iterateOptions": [
          "accept",
          "format",
          "four",
          "function",
          "iter",
          "iterateopt",
          "lt;static&gt",
          "option",
          "over",
          "radio/checkbox/select",
          "tpl",
          "utils.iterateopt"
        ],
        "Utils.html#OptionsIteratee": [
          "key",
          "optgroup",
          "optionsiterate",
          "typedef",
          "utils#optionsiterate",
          "valu"
        ]
      },
      "length": 155
    },
    "tokenStore": {
      "root": {
        "0": {
          "docs": {
            "Utils.html#.fmt": {
              "ref": "Utils.html#.fmt",
              "tf": 12.5
            }
          }
        },
        "1": {
          "docs": {
            "Utils.html#.fmt": {
              "ref": "Utils.html#.fmt",
              "tf": 12.5
            }
          }
        },
        "docs": {},
        "a": {
          "docs": {},
          "p": {
            "docs": {},
            "i": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 200
                }
              }
            },
            "p": {
              "docs": {},
              "l": {
                "docs": {},
                "i": {
                  "docs": {
                    "module-plugins.BtCheckbox.html": {
                      "ref": "module-plugins.BtCheckbox.html",
                      "tf": 7.142857142857142
                    },
                    "module-plugins.BtTooltipErrors.html": {
                      "ref": "module-plugins.BtTooltipErrors.html",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "a": {
                "docs": {},
                "y": {
                  "docs": {},
                  ".": {
                    "docs": {},
                    "&": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          ";": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "j": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "&": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "Group.html#rules": {
                                                  "ref": "Group.html#rules",
                                                  "tf": 33.33333333333333
                                                },
                                                "Utils.html#.groupSort": {
                                                  "ref": "Utils.html#.groupSort",
                                                  "tf": 20
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "q": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "y": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "d": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    ".": {
                                                      "docs": {},
                                                      "f": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "l": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "&": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {
                                                                          "QueryBuilder.html#filters": {
                                                                            "ref": "QueryBuilder.html#filters",
                                                                            "tf": 33.33333333333333
                                                                          },
                                                                          "QueryBuilder.html#checkFilters": {
                                                                            "ref": "QueryBuilder.html#checkFilters",
                                                                            "tf": 33.33333333333333
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "o": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {},
                                                                  "o": {
                                                                    "docs": {},
                                                                    "r": {
                                                                      "docs": {},
                                                                      "&": {
                                                                        "docs": {},
                                                                        "g": {
                                                                          "docs": {},
                                                                          "t": {
                                                                            "docs": {
                                                                              "QueryBuilder.html#operators": {
                                                                                "ref": "QueryBuilder.html#operators",
                                                                                "tf": 33.33333333333333
                                                                              },
                                                                              "QueryBuilder.html#checkOperators": {
                                                                                "ref": "QueryBuilder.html#checkOperators",
                                                                                "tf": 33.33333333333333
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "|": {
                    "docs": {},
                    "b": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "QueryBuilder.html#validateValue": {
                                      "ref": "QueryBuilder.html#validateValue",
                                      "tf": 25
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {
                "Utils.html#.error": {
                  "ref": "Utils.html#.error",
                  "tf": 16.666666666666664
                },
                "Utils.html#.fmt": {
                  "ref": "Utils.html#.fmt",
                  "tf": 20
                }
              }
            }
          },
          "d": {
            "docs": {},
            "d": {
              "docs": {
                "Group.html#addGroup": {
                  "ref": "Group.html#addGroup",
                  "tf": 10
                },
                "Group.html#addRule": {
                  "ref": "Group.html#addRule",
                  "tf": 10
                },
                "Group.html#insertNode": {
                  "ref": "Group.html#insertNode",
                  "tf": 12.5
                },
                "module-plugins.ChangeFilters.html#addFilter": {
                  "ref": "module-plugins.ChangeFilters.html#addFilter",
                  "tf": 12.5
                },
                "module-plugins.NotGroup.html": {
                  "ref": "module-plugins.NotGroup.html",
                  "tf": 8.333333333333332
                },
                "QueryBuilder.html#addGroup": {
                  "ref": "QueryBuilder.html#addGroup",
                  "tf": 16.666666666666664
                },
                "QueryBuilder.html#addRule": {
                  "ref": "QueryBuilder.html#addRule",
                  "tf": 16.666666666666664
                }
              },
              "g": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "Group.html#addGroup": {
                            "ref": "Group.html#addGroup",
                            "tf": 675
                          },
                          "QueryBuilder.html#addGroup": {
                            "ref": "QueryBuilder.html#addGroup",
                            "tf": 666.6666666666666
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "Group.html#addRule": {
                        "ref": "Group.html#addRule",
                        "tf": 675
                      },
                      "QueryBuilder.html#addGroup": {
                        "ref": "QueryBuilder.html#addGroup",
                        "tf": 16.666666666666664
                      },
                      "QueryBuilder.html#addRule": {
                        "ref": "QueryBuilder.html#addRule",
                        "tf": 670
                      },
                      "QueryBuilder.html#setRoot": {
                        "ref": "QueryBuilder.html#setRoot",
                        "tf": 20
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "module-plugins.ChangeFilters.html#addFilter": {
                          "ref": "module-plugins.ChangeFilters.html#addFilter",
                          "tf": 633.3333333333334
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "o": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {
                    "Group.html#moveAfter": {
                      "ref": "Group.html#moveAfter",
                      "tf": 12.5
                    },
                    "Group.html#moveAtBegin": {
                      "ref": "Group.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Group.html#moveAtEnd": {
                      "ref": "Group.html#moveAtEnd",
                      "tf": 8.333333333333332
                    },
                    "Node.html#moveAfter": {
                      "ref": "Node.html#moveAfter",
                      "tf": 12.5
                    },
                    "Node.html#moveAtBegin": {
                      "ref": "Node.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Node.html#moveAtEnd": {
                      "ref": "Node.html#moveAtEnd",
                      "tf": 8.333333333333332
                    },
                    "Rule.html#moveAfter": {
                      "ref": "Rule.html#moveAfter",
                      "tf": 12.5
                    },
                    "Rule.html#moveAtBegin": {
                      "ref": "Rule.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Rule.html#moveAtEnd": {
                      "ref": "Rule.html#moveAtEnd",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {},
                "c": {
                  "docs": {},
                  "h": {
                    "docs": {
                      "Model.html#on": {
                        "ref": "Model.html#on",
                        "tf": 12.5
                      },
                      "Model.html#once": {
                        "ref": "Model.html#once",
                        "tf": 8.333333333333332
                      },
                      "QueryBuilder.html#on": {
                        "ref": "QueryBuilder.html#on",
                        "tf": 10
                      },
                      "QueryBuilder.html#once": {
                        "ref": "QueryBuilder.html#once",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          "w": {
            "docs": {},
            "e": {
              "docs": {},
              "s": {
                "docs": {},
                "o": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "module-plugins.BtCheckbox.html": {
                        "ref": "module-plugins.BtCheckbox.html",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "l": {
              "docs": {},
              "o": {
                "docs": {},
                "w": {
                  "docs": {
                    "module-plugins.ChangeFilters.html": {
                      "ref": "module-plugins.ChangeFilters.html",
                      "tf": 8.333333333333332
                    },
                    "module-plugins.Invert.html": {
                      "ref": "module-plugins.Invert.html",
                      "tf": 6.25
                    },
                    "module-plugins.MongoDbSupport.html": {
                      "ref": "module-plugins.MongoDbSupport.html",
                      "tf": 4.545454545454546
                    },
                    "module-plugins.SqlSupport.html": {
                      "ref": "module-plugins.SqlSupport.html",
                      "tf": 5
                    },
                    "module-plugins.UniqueFilter.html": {
                      "ref": "module-plugins.UniqueFilter.html",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "module-plugins.ChangeFilters.html": {
                      "ref": "module-plugins.ChangeFilters.html",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "p": {
              "docs": {
                "module-plugins.Sortable.html": {
                  "ref": "module-plugins.Sortable.html",
                  "tf": 8.333333333333332
                }
              }
            }
          },
          "b": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "Node.html": {
                            "ref": "Node.html",
                            "tf": 16.666666666666664
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "s": {
              "docs": {},
              "o": {
                "docs": {},
                "c": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "QueryBuilder.html#getModel": {
                        "ref": "QueryBuilder.html#getModel",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "c": {
              "docs": {},
              "e": {
                "docs": {},
                "p": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Utils.html#.iterateOptions": {
                        "ref": "Utils.html#.iterateOptions",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "docs": {},
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "QueryBuilder.html#setRoot": {
                      "ref": "QueryBuilder.html#setRoot",
                      "tf": 16.666666666666664
                    }
                  },
                  "o": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "index.html": {
                          "ref": "index.html",
                          "tf": 11.666666666666666
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {
                    "list_class.html": {
                      "ref": "list_class.html",
                      "tf": 635
                    },
                    "Group.html": {
                      "ref": "Group.html",
                      "tf": 110
                    },
                    "Model.html": {
                      "ref": "Model.html",
                      "tf": 110
                    },
                    "module-plugins.BtCheckbox.html": {
                      "ref": "module-plugins.BtCheckbox.html",
                      "tf": 110
                    },
                    "module-plugins.BtSelectpicker.html": {
                      "ref": "module-plugins.BtSelectpicker.html",
                      "tf": 110
                    },
                    "module-plugins.BtTooltipErrors.html": {
                      "ref": "module-plugins.BtTooltipErrors.html",
                      "tf": 110
                    },
                    "module-plugins.ChangeFilters.html": {
                      "ref": "module-plugins.ChangeFilters.html",
                      "tf": 110
                    },
                    "module-plugins.ChosenSelectpicker.html": {
                      "ref": "module-plugins.ChosenSelectpicker.html",
                      "tf": 110
                    },
                    "module-plugins.FilterDescription.html": {
                      "ref": "module-plugins.FilterDescription.html",
                      "tf": 110
                    },
                    "module-plugins.Invert.html": {
                      "ref": "module-plugins.Invert.html",
                      "tf": 110
                    },
                    "module-plugins.MongoDbSupport.html": {
                      "ref": "module-plugins.MongoDbSupport.html",
                      "tf": 110
                    },
                    "module-plugins.NotGroup.html": {
                      "ref": "module-plugins.NotGroup.html",
                      "tf": 110
                    },
                    "module-plugins.Sortable.html": {
                      "ref": "module-plugins.Sortable.html",
                      "tf": 110
                    },
                    "module-plugins.SqlSupport.html": {
                      "ref": "module-plugins.SqlSupport.html",
                      "tf": 110
                    },
                    "module-plugins.UniqueFilter.html": {
                      "ref": "module-plugins.UniqueFilter.html",
                      "tf": 110
                    },
                    "Node.html": {
                      "ref": "Node.html",
                      "tf": 110
                    },
                    "QueryBuilder.html": {
                      "ref": "QueryBuilder.html",
                      "tf": 110
                    },
                    "Rule.html": {
                      "ref": "Rule.html",
                      "tf": 110
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "r": {
                  "docs": {
                    "QueryBuilder.html#clear": {
                      "ref": "QueryBuilder.html#clear",
                      "tf": 760
                    },
                    "QueryBuilder.html#clearErrors": {
                      "ref": "QueryBuilder.html#clearErrors",
                      "tf": 16.666666666666664
                    },
                    "QueryBuilder.html#reset": {
                      "ref": "QueryBuilder.html#reset",
                      "tf": 10
                    }
                  },
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "r": {
                            "docs": {
                              "QueryBuilder.html#clearErrors": {
                                "ref": "QueryBuilder.html#clearErrors",
                                "tf": 700
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "n": {
              "docs": {},
              "d": {
                "docs": {},
                "i": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Group.html#condition": {
                        "ref": "Group.html#condition",
                        "tf": 700
                      },
                      "module-plugins.Invert.html": {
                        "ref": "module-plugins.Invert.html",
                        "tf": 6.25
                      },
                      "module-plugins.NotGroup.html": {
                        "ref": "module-plugins.NotGroup.html",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Group.html#contains": {
                          "ref": "Group.html#contains",
                          "tf": 685
                        },
                        "QueryBuilder.html#$el": {
                          "ref": "QueryBuilder.html#$el",
                          "tf": 25
                        },
                        "QueryBuilder.html#change": {
                          "ref": "QueryBuilder.html#change",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#off": {
                          "ref": "QueryBuilder.html#off",
                          "tf": 10
                        },
                        "QueryBuilder.html#on": {
                          "ref": "QueryBuilder.html#on",
                          "tf": 10
                        },
                        "QueryBuilder.html#once": {
                          "ref": "QueryBuilder.html#once",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#trigger": {
                          "ref": "QueryBuilder.html#trigger",
                          "tf": 12.5
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "x": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Group.html#each": {
                          "ref": "Group.html#each",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  },
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Group.html#empty": {
                          "ref": "Group.html#empty",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  }
                }
              },
              "v": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                          "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                          "tf": 12.5
                        },
                        "module-plugins.SqlSupport.html#getRulesFromSQL": {
                          "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                          "tf": 12.5
                        }
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "QueryBuilder.html#.DEFAULTS": {
                            "ref": "QueryBuilder.html#.DEFAULTS",
                            "tf": 25
                          },
                          "QueryBuilder.html#plugins": {
                            "ref": "QueryBuilder.html#plugins",
                            "tf": 25
                          },
                          "QueryBuilder.html#settings": {
                            "ref": "QueryBuilder.html#settings",
                            "tf": 25
                          },
                          "QueryBuilder.html#checkFilters": {
                            "ref": "QueryBuilder.html#checkFilters",
                            "tf": 12.5
                          },
                          "QueryBuilder.html#checkOperators": {
                            "ref": "QueryBuilder.html#checkOperators",
                            "tf": 12.5
                          },
                          "QueryBuilder.html#setOptions": {
                            "ref": "QueryBuilder.html#setOptions",
                            "tf": 7.142857142857142
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "m": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "QueryBuilder.html#.selectors": {
                        "ref": "QueryBuilder.html#.selectors",
                        "tf": 12.5
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "QueryBuilder.html#.selectors": {
                        "ref": "QueryBuilder.html#.selectors",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "QueryBuilder.html#translate": {
                    "ref": "QueryBuilder.html#translate",
                    "tf": 4.545454545454546
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "k": {
                  "docs": {
                    "Group.html#contains": {
                      "ref": "Group.html#contains",
                      "tf": 10
                    },
                    "Group.html#isRoot": {
                      "ref": "Group.html#isRoot",
                      "tf": 16.666666666666664
                    },
                    "Node.html#isRoot": {
                      "ref": "Node.html#isRoot",
                      "tf": 16.666666666666664
                    },
                    "QueryBuilder.html#checkFilters": {
                      "ref": "QueryBuilder.html#checkFilters",
                      "tf": 12.5
                    },
                    "QueryBuilder.html#checkOperators": {
                      "ref": "QueryBuilder.html#checkOperators",
                      "tf": 12.5
                    },
                    "Rule.html#isRoot": {
                      "ref": "Rule.html#isRoot",
                      "tf": 16.666666666666664
                    }
                  },
                  "b": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "x": {
                        "docs": {
                          "module-plugins.BtCheckbox.html": {
                            "ref": "module-plugins.BtCheckbox.html",
                            "tf": 14.285714285714285
                          },
                          "module-plugins.NotGroup.html": {
                            "ref": "module-plugins.NotGroup.html",
                            "tf": 8.333333333333332
                          }
                        }
                      }
                    }
                  },
                  "f": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "QueryBuilder.html#checkFilters": {
                              "ref": "QueryBuilder.html#checkFilters",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  },
                  "o": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {
                            "QueryBuilder.html#checkOperators": {
                              "ref": "QueryBuilder.html#checkOperators",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "d": {
                  "docs": {
                    "Group.html#getNodePos": {
                      "ref": "Group.html#getNodePos",
                      "tf": 12.5
                    }
                  },
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "Group.html#length": {
                            "ref": "Group.html#length",
                            "tf": 16.666666666666664
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "n": {
                "docs": {},
                "g": {
                  "docs": {
                    "module-plugins.ChangeFilters.html": {
                      "ref": "module-plugins.ChangeFilters.html",
                      "tf": 8.333333333333332
                    },
                    "module-plugins.ChangeFilters.html#setFilters": {
                      "ref": "module-plugins.ChangeFilters.html#setFilters",
                      "tf": 16.666666666666664
                    },
                    "QueryBuilder.html#change": {
                      "ref": "QueryBuilder.html#change",
                      "tf": 683.3333333333334
                    },
                    "Utils.html#.changeType": {
                      "ref": "Utils.html#.changeType",
                      "tf": 8.333333333333332
                    }
                  },
                  "e": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "module-plugins.ChangeFilters.html": {
                                "ref": "module-plugins.ChangeFilters.html",
                                "tf": 650
                              }
                            },
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "#": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "d": {
                                          "docs": {},
                                          "f": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "module-plugins.ChangeFilters.html#addFilter": {
                                                      "ref": "module-plugins.ChangeFilters.html#addFilter",
                                                      "tf": 100
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "r": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "v": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "f": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {
                                                          "module-plugins.ChangeFilters.html#removeFilter": {
                                                            "ref": "module-plugins.ChangeFilters.html#removeFilter",
                                                            "tf": 100
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "s": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "f": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "module-plugins.ChangeFilters.html#setFilters": {
                                                      "ref": "module-plugins.ChangeFilters.html#setFilters",
                                                      "tf": 100
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "t": {
                      "docs": {},
                      "y": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "Utils.html#.changeType": {
                              "ref": "Utils.html#.changeType",
                              "tf": 675
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "k": {
                                        "docs": {
                                          "module-plugins.ChosenSelectpicker.html": {
                                            "ref": "module-plugins.ChosenSelectpicker.html",
                                            "tf": 650
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "b": {
            "docs": {
              "Model.html#off": {
                "ref": "Model.html#off",
                "tf": 33.33333333333333
              },
              "Model.html#on": {
                "ref": "Model.html#on",
                "tf": 33.33333333333333
              },
              "Model.html#once": {
                "ref": "Model.html#once",
                "tf": 25
              },
              "QueryBuilder.html#off": {
                "ref": "QueryBuilder.html#off",
                "tf": 33.33333333333333
              },
              "QueryBuilder.html#on": {
                "ref": "QueryBuilder.html#on",
                "tf": 33.33333333333333
              },
              "QueryBuilder.html#once": {
                "ref": "QueryBuilder.html#once",
                "tf": 25
              }
            },
            "g": {
              "docs": {},
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "p": {
                      "docs": {
                        "Group.html#each": {
                          "ref": "Group.html#each",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "u": {
                "docs": {},
                "l": {
                  "docs": {},
                  "e": {
                    "docs": {
                      "Group.html#each": {
                        "ref": "Group.html#each",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "Model.html#once": {
                    "ref": "Model.html#once",
                    "tf": 8.333333333333332
                  },
                  "QueryBuilder.html#once": {
                    "ref": "QueryBuilder.html#once",
                    "tf": 7.142857142857142
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "g": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "QueryBuilder.html#translate": {
                            "ref": "QueryBuilder.html#translate",
                            "tf": 25
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "s": {
              "docs": {
                "QueryBuilder.html#.selectors": {
                  "ref": "QueryBuilder.html#.selectors",
                  "tf": 12.5
                }
              }
            }
          },
          "u": {
            "docs": {},
            "r": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "QueryBuilder.html#getRules": {
                          "ref": "QueryBuilder.html#getRules",
                          "tf": 10
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "Utils.html#.error": {
                        "ref": "Utils.html#.error",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "f": {
          "docs": {},
          "r": {
            "docs": {},
            "i": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "index.html": {
                            "ref": "index.html",
                            "tf": 11.666666666666666
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {
                    "module-plugins.NotGroup.html": {
                      "ref": "module-plugins.NotGroup.html",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "g": {
                "docs": {
                  "Group.html#flags": {
                    "ref": "Group.html#flags",
                    "tf": 683.3333333333334
                  },
                  "Node.html#flags": {
                    "ref": "Node.html#flags",
                    "tf": 683.3333333333334
                  },
                  "QueryBuilder.html#addGroup": {
                    "ref": "QueryBuilder.html#addGroup",
                    "tf": 16.666666666666664
                  },
                  "QueryBuilder.html#addRule": {
                    "ref": "QueryBuilder.html#addRule",
                    "tf": 20
                  },
                  "QueryBuilder.html#deleteGroup": {
                    "ref": "QueryBuilder.html#deleteGroup",
                    "tf": 5.555555555555555
                  },
                  "QueryBuilder.html#setRoot": {
                    "ref": "QueryBuilder.html#setRoot",
                    "tf": 20
                  },
                  "Rule.html#flags": {
                    "ref": "Rule.html#flags",
                    "tf": 683.3333333333334
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "Utils.html#.changeType": {
                      "ref": "Utils.html#.changeType",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "c": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "Group.html#addGroup": {
                            "ref": "Group.html#addGroup",
                            "tf": 110
                          },
                          "Group.html#addRule": {
                            "ref": "Group.html#addRule",
                            "tf": 110
                          },
                          "Group.html#contains": {
                            "ref": "Group.html#contains",
                            "tf": 110
                          },
                          "Group.html#drop": {
                            "ref": "Group.html#drop",
                            "tf": 110
                          },
                          "Group.html#each": {
                            "ref": "Group.html#each",
                            "tf": 110
                          },
                          "Group.html#empty": {
                            "ref": "Group.html#empty",
                            "tf": 110
                          },
                          "Group.html#getNodePos": {
                            "ref": "Group.html#getNodePos",
                            "tf": 110
                          },
                          "Group.html#getPos": {
                            "ref": "Group.html#getPos",
                            "tf": 110
                          },
                          "Group.html#insertNode": {
                            "ref": "Group.html#insertNode",
                            "tf": 110
                          },
                          "Group.html#isRoot": {
                            "ref": "Group.html#isRoot",
                            "tf": 110
                          },
                          "Group.html#length": {
                            "ref": "Group.html#length",
                            "tf": 110
                          },
                          "Group.html#move": {
                            "ref": "Group.html#move",
                            "tf": 110
                          },
                          "Group.html#moveAfter": {
                            "ref": "Group.html#moveAfter",
                            "tf": 110
                          },
                          "Group.html#moveAtBegin": {
                            "ref": "Group.html#moveAtBegin",
                            "tf": 110
                          },
                          "Group.html#moveAtEnd": {
                            "ref": "Group.html#moveAtEnd",
                            "tf": 110
                          },
                          "Group.html#removeNode": {
                            "ref": "Group.html#removeNode",
                            "tf": 110
                          },
                          "Model.html#off": {
                            "ref": "Model.html#off",
                            "tf": 110
                          },
                          "Model.html#on": {
                            "ref": "Model.html#on",
                            "tf": 110
                          },
                          "Model.html#once": {
                            "ref": "Model.html#once",
                            "tf": 110
                          },
                          "Model.html#trigger": {
                            "ref": "Model.html#trigger",
                            "tf": 110
                          },
                          "module-plugins.ChangeFilters.html#addFilter": {
                            "ref": "module-plugins.ChangeFilters.html#addFilter",
                            "tf": 110
                          },
                          "module-plugins.ChangeFilters.html#removeFilter": {
                            "ref": "module-plugins.ChangeFilters.html#removeFilter",
                            "tf": 110
                          },
                          "module-plugins.ChangeFilters.html#setFilters": {
                            "ref": "module-plugins.ChangeFilters.html#setFilters",
                            "tf": 110
                          },
                          "module-plugins.Invert.html#invert": {
                            "ref": "module-plugins.Invert.html#invert",
                            "tf": 110
                          },
                          "module-plugins.MongoDbSupport.html#getMongo": {
                            "ref": "module-plugins.MongoDbSupport.html#getMongo",
                            "tf": 110
                          },
                          "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                            "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                            "tf": 110
                          },
                          "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                            "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                            "tf": 110
                          },
                          "module-plugins.SqlSupport.html#getRulesFromSQL": {
                            "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                            "tf": 110
                          },
                          "module-plugins.SqlSupport.html#getSQL": {
                            "ref": "module-plugins.SqlSupport.html#getSQL",
                            "tf": 110
                          },
                          "module-plugins.SqlSupport.html#setRulesFromSQL": {
                            "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                            "tf": 110
                          },
                          "Node.html#drop": {
                            "ref": "Node.html#drop",
                            "tf": 110
                          },
                          "Node.html#getPos": {
                            "ref": "Node.html#getPos",
                            "tf": 110
                          },
                          "Node.html#isRoot": {
                            "ref": "Node.html#isRoot",
                            "tf": 110
                          },
                          "Node.html#move": {
                            "ref": "Node.html#move",
                            "tf": 110
                          },
                          "Node.html#moveAfter": {
                            "ref": "Node.html#moveAfter",
                            "tf": 110
                          },
                          "Node.html#moveAtBegin": {
                            "ref": "Node.html#moveAtBegin",
                            "tf": 110
                          },
                          "Node.html#moveAtEnd": {
                            "ref": "Node.html#moveAtEnd",
                            "tf": 110
                          },
                          "QueryBuilder.html#.Group": {
                            "ref": "QueryBuilder.html#.Group",
                            "tf": 33.33333333333333
                          },
                          "QueryBuilder.html#.Rule": {
                            "ref": "QueryBuilder.html#.Rule",
                            "tf": 33.33333333333333
                          },
                          "QueryBuilder.html#addGroup": {
                            "ref": "QueryBuilder.html#addGroup",
                            "tf": 110
                          },
                          "QueryBuilder.html#addRule": {
                            "ref": "QueryBuilder.html#addRule",
                            "tf": 110
                          },
                          "QueryBuilder.html#change": {
                            "ref": "QueryBuilder.html#change",
                            "tf": 110
                          },
                          "QueryBuilder.html#checkFilters": {
                            "ref": "QueryBuilder.html#checkFilters",
                            "tf": 110
                          },
                          "QueryBuilder.html#checkOperators": {
                            "ref": "QueryBuilder.html#checkOperators",
                            "tf": 110
                          },
                          "QueryBuilder.html#clear": {
                            "ref": "QueryBuilder.html#clear",
                            "tf": 110
                          },
                          "QueryBuilder.html#clearErrors": {
                            "ref": "QueryBuilder.html#clearErrors",
                            "tf": 110
                          },
                          "QueryBuilder.html#deleteGroup": {
                            "ref": "QueryBuilder.html#deleteGroup",
                            "tf": 110
                          },
                          "QueryBuilder.html#deleteRule": {
                            "ref": "QueryBuilder.html#deleteRule",
                            "tf": 110
                          },
                          "QueryBuilder.html#destroy": {
                            "ref": "QueryBuilder.html#destroy",
                            "tf": 110
                          },
                          "QueryBuilder.html#getModel": {
                            "ref": "QueryBuilder.html#getModel",
                            "tf": 110
                          },
                          "QueryBuilder.html#getRules": {
                            "ref": "QueryBuilder.html#getRules",
                            "tf": 110
                          },
                          "QueryBuilder.html#off": {
                            "ref": "QueryBuilder.html#off",
                            "tf": 110
                          },
                          "QueryBuilder.html#on": {
                            "ref": "QueryBuilder.html#on",
                            "tf": 110
                          },
                          "QueryBuilder.html#once": {
                            "ref": "QueryBuilder.html#once",
                            "tf": 110
                          },
                          "QueryBuilder.html#reset": {
                            "ref": "QueryBuilder.html#reset",
                            "tf": 110
                          },
                          "QueryBuilder.html#setOptions": {
                            "ref": "QueryBuilder.html#setOptions",
                            "tf": 110
                          },
                          "QueryBuilder.html#setRoot": {
                            "ref": "QueryBuilder.html#setRoot",
                            "tf": 110
                          },
                          "QueryBuilder.html#setRules": {
                            "ref": "QueryBuilder.html#setRules",
                            "tf": 110
                          },
                          "QueryBuilder.html#translate": {
                            "ref": "QueryBuilder.html#translate",
                            "tf": 110
                          },
                          "QueryBuilder.html#trigger": {
                            "ref": "QueryBuilder.html#trigger",
                            "tf": 110
                          },
                          "QueryBuilder.html#validate": {
                            "ref": "QueryBuilder.html#validate",
                            "tf": 110
                          },
                          "QueryBuilder.html#validateValue": {
                            "ref": "QueryBuilder.html#validateValue",
                            "tf": 110
                          },
                          "Rule.html#drop": {
                            "ref": "Rule.html#drop",
                            "tf": 110
                          },
                          "Rule.html#getPos": {
                            "ref": "Rule.html#getPos",
                            "tf": 110
                          },
                          "Rule.html#isRoot": {
                            "ref": "Rule.html#isRoot",
                            "tf": 110
                          },
                          "Rule.html#move": {
                            "ref": "Rule.html#move",
                            "tf": 110
                          },
                          "Rule.html#moveAfter": {
                            "ref": "Rule.html#moveAfter",
                            "tf": 110
                          },
                          "Rule.html#moveAtBegin": {
                            "ref": "Rule.html#moveAtBegin",
                            "tf": 110
                          },
                          "Rule.html#moveAtEnd": {
                            "ref": "Rule.html#moveAtEnd",
                            "tf": 110
                          },
                          "Utils.html#.changeType": {
                            "ref": "Utils.html#.changeType",
                            "tf": 110
                          },
                          "Utils.html#.defineModelProperties": {
                            "ref": "Utils.html#.defineModelProperties",
                            "tf": 110
                          },
                          "Utils.html#.error": {
                            "ref": "Utils.html#.error",
                            "tf": 110
                          },
                          "Utils.html#.escapeElementId": {
                            "ref": "Utils.html#.escapeElementId",
                            "tf": 110
                          },
                          "Utils.html#.escapeRegExp": {
                            "ref": "Utils.html#.escapeRegExp",
                            "tf": 110
                          },
                          "Utils.html#.escapeString": {
                            "ref": "Utils.html#.escapeString",
                            "tf": 110
                          },
                          "Utils.html#.fmt": {
                            "ref": "Utils.html#.fmt",
                            "tf": 110
                          },
                          "Utils.html#.groupSort": {
                            "ref": "Utils.html#.groupSort",
                            "tf": 110
                          },
                          "Utils.html#.iterateOptions": {
                            "ref": "Utils.html#.iterateOptions",
                            "tf": 110
                          }
                        },
                        "(": {
                          "docs": {},
                          ")": {
                            "docs": {},
                            "&": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "QueryBuilder.html#templates": {
                                      "ref": "QueryBuilder.html#templates",
                                      "tf": 25
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "l": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "module-plugins.ChangeFilters.html": {
                        "ref": "module-plugins.ChangeFilters.html",
                        "tf": 8.333333333333332
                      },
                      "module-plugins.ChangeFilters.html#addFilter": {
                        "ref": "module-plugins.ChangeFilters.html#addFilter",
                        "tf": 12.5
                      },
                      "module-plugins.ChangeFilters.html#removeFilter": {
                        "ref": "module-plugins.ChangeFilters.html#removeFilter",
                        "tf": 16.666666666666664
                      },
                      "module-plugins.ChangeFilters.html#setFilters": {
                        "ref": "module-plugins.ChangeFilters.html#setFilters",
                        "tf": 49.99999999999999
                      },
                      "module-plugins.FilterDescription.html": {
                        "ref": "module-plugins.FilterDescription.html",
                        "tf": 5
                      },
                      "module-plugins.UniqueFilter.html": {
                        "ref": "module-plugins.UniqueFilter.html",
                        "tf": 4.545454545454546
                      },
                      "QueryBuilder.html#filters": {
                        "ref": "QueryBuilder.html#filters",
                        "tf": 708.3333333333334
                      },
                      "QueryBuilder.html#checkFilters": {
                        "ref": "QueryBuilder.html#checkFilters",
                        "tf": 45.83333333333333
                      },
                      "QueryBuilder.html#.Filter": {
                        "ref": "QueryBuilder.html#.Filter",
                        "tf": 750
                      },
                      "Rule.html#filter": {
                        "ref": "Rule.html#filter",
                        "tf": 700
                      }
                    },
                    "i": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "module-plugins.ChangeFilters.html#removeFilter": {
                            "ref": "module-plugins.ChangeFilters.html#removeFilter",
                            "tf": 33.33333333333333
                          }
                        }
                      }
                    },
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "module-plugins.FilterDescription.html": {
                                        "ref": "module-plugins.FilterDescription.html",
                                        "tf": 650
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "module-plugins.MongoDbSupport.html": {
                    "ref": "module-plugins.MongoDbSupport.html",
                    "tf": 4.545454545454546
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "l": {
                "docs": {},
                "d": {
                  "docs": {
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 25
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "external-_jQuery.fn_.html": {
                "ref": "external-_jQuery.fn_.html",
                "tf": 150
              }
            }
          },
          "m": {
            "docs": {},
            "t": {
              "docs": {
                "Utils.html#.fmt": {
                  "ref": "Utils.html#.fmt",
                  "tf": 670
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "m": {
                "docs": {},
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Utils.html#.iterateOptions": {
                        "ref": "Utils.html#.iterateOptions",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "r": {
                "docs": {
                  "Utils.html#.iterateOptions": {
                    "ref": "Utils.html#.iterateOptions",
                    "tf": 7.142857142857142
                  }
                }
              }
            }
          }
        },
        "i": {
          "1": {
            "8": {
              "docs": {},
              "n": {
                "docs": {
                  "QueryBuilder.html#.regional": {
                    "ref": "QueryBuilder.html#.regional",
                    "tf": 12.5
                  }
                }
              }
            },
            "docs": {}
          },
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 1300
                    },
                    "Group.html#addGroup": {
                      "ref": "Group.html#addGroup",
                      "tf": 35
                    },
                    "Group.html#addRule": {
                      "ref": "Group.html#addRule",
                      "tf": 35
                    },
                    "Group.html#insertNode": {
                      "ref": "Group.html#insertNode",
                      "tf": 32.5
                    },
                    "Group.html#move": {
                      "ref": "Group.html#move",
                      "tf": 33.33333333333333
                    },
                    "Node.html#move": {
                      "ref": "Node.html#move",
                      "tf": 33.33333333333333
                    },
                    "Rule.html#move": {
                      "ref": "Rule.html#move",
                      "tf": 33.33333333333333
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {
                "Group.html#level": {
                  "ref": "Group.html#level",
                  "tf": 33.33333333333333
                },
                "Group.html#getNodePos": {
                  "ref": "Group.html#getNodePos",
                  "tf": 33.33333333333333
                },
                "Group.html#getPos": {
                  "ref": "Group.html#getPos",
                  "tf": 50
                },
                "Group.html#length": {
                  "ref": "Group.html#length",
                  "tf": 50
                },
                "Node.html#level": {
                  "ref": "Node.html#level",
                  "tf": 33.33333333333333
                },
                "Node.html#getPos": {
                  "ref": "Node.html#getPos",
                  "tf": 50
                },
                "Rule.html#level": {
                  "ref": "Rule.html#level",
                  "tf": 33.33333333333333
                },
                "Rule.html#getPos": {
                  "ref": "Rule.html#getPos",
                  "tf": 50
                },
                "Utils.html#.changeType": {
                  "ref": "Utils.html#.changeType",
                  "tf": 8.333333333333332
                }
              },
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "QueryBuilder.html#model": {
                        "ref": "QueryBuilder.html#model",
                        "tf": 25
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "d": {
                  "docs": {
                    "Group.html#getPos": {
                      "ref": "Group.html#getPos",
                      "tf": 10
                    },
                    "Node.html#getPos": {
                      "ref": "Node.html#getPos",
                      "tf": 10
                    },
                    "Rule.html#getPos": {
                      "ref": "Rule.html#getPos",
                      "tf": 10
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Group.html#insertNode": {
                              "ref": "Group.html#insertNode",
                              "tf": 670
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "u": {
                "docs": {},
                "t": {
                  "docs": {
                    "module-plugins.BtCheckbox.html": {
                      "ref": "module-plugins.BtCheckbox.html",
                      "tf": 7.142857142857142
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {
                    "module-plugins.ChangeFilters.html": {
                      "ref": "module-plugins.ChangeFilters.html",
                      "tf": 8.333333333333332
                    },
                    "Utils.html#.groupSort": {
                      "ref": "Utils.html#.groupSort",
                      "tf": 6.25
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "module-plugins.FilterDescription.html": {
                      "ref": "module-plugins.FilterDescription.html",
                      "tf": 5
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "module-plugins.Invert.html": {
                        "ref": "module-plugins.Invert.html",
                        "tf": 656.25
                      },
                      "module-plugins.Invert.html#invert": {
                        "ref": "module-plugins.Invert.html#invert",
                        "tf": 643.3333333333334
                      }
                    },
                    "#": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "v": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "module-plugins.Invert.html#invert": {
                                      "ref": "module-plugins.Invert.html#invert",
                                      "tf": 100
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {
              "Group.html#id": {
                "ref": "Group.html#id",
                "tf": 683.3333333333334
              },
              "Node.html#id": {
                "ref": "Node.html#id",
                "tf": 683.3333333333334
              },
              "Rule.html#id": {
                "ref": "Rule.html#id",
                "tf": 683.3333333333334
              },
              "Utils.html#.escapeElementId": {
                "ref": "Utils.html#.escapeElementId",
                "tf": 8.333333333333332
              }
            }
          },
          "t": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "Group.html#each": {
                    "ref": "Group.html#each",
                    "tf": 16.666666666666664
                  },
                  "Utils.html#.iterateOptions": {
                    "ref": "Utils.html#.iterateOptions",
                    "tf": 7.142857142857142
                  }
                },
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "Utils.html#.iterateOptions": {
                                "ref": "Utils.html#.iterateOptions",
                                "tf": 675
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "m": {
                "docs": {
                  "Utils.html#.groupSort": {
                    "ref": "Utils.html#.groupSort",
                    "tf": 20
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "Group.html#move": {
                        "ref": "Group.html#move",
                        "tf": 10
                      },
                      "Group.html#moveAfter": {
                        "ref": "Group.html#moveAfter",
                        "tf": 12.5
                      },
                      "Group.html#moveAtBegin": {
                        "ref": "Group.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Group.html#moveAtEnd": {
                        "ref": "Group.html#moveAtEnd",
                        "tf": 8.333333333333332
                      },
                      "Node.html#move": {
                        "ref": "Node.html#move",
                        "tf": 10
                      },
                      "Node.html#moveAfter": {
                        "ref": "Node.html#moveAfter",
                        "tf": 12.5
                      },
                      "Node.html#moveAtBegin": {
                        "ref": "Node.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Node.html#moveAtEnd": {
                        "ref": "Node.html#moveAtEnd",
                        "tf": 8.333333333333332
                      },
                      "QueryBuilder.html#translate": {
                        "ref": "QueryBuilder.html#translate",
                        "tf": 4.545454545454546
                      },
                      "Rule.html#move": {
                        "ref": "Rule.html#move",
                        "tf": 10
                      },
                      "Rule.html#moveAfter": {
                        "ref": "Rule.html#moveAfter",
                        "tf": 12.5
                      },
                      "Rule.html#moveAtBegin": {
                        "ref": "Rule.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Rule.html#moveAtEnd": {
                        "ref": "Rule.html#moveAtEnd",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            },
            "'": {
              "docs": {
                "QueryBuilder.html#translate": {
                  "ref": "QueryBuilder.html#translate",
                  "tf": 4.545454545454546
                }
              }
            }
          },
          "s": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "o": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Group.html#isRoot": {
                        "ref": "Group.html#isRoot",
                        "tf": 700
                      },
                      "Node.html#isRoot": {
                        "ref": "Node.html#isRoot",
                        "tf": 700
                      },
                      "Rule.html#isRoot": {
                        "ref": "Rule.html#isRoot",
                        "tf": 700
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {
              "module-plugins.UniqueFilter.html": {
                "ref": "module-plugins.UniqueFilter.html",
                "tf": 4.545454545454546
              }
            }
          },
          "c": {
            "docs": {},
            "o": {
              "docs": {},
              "n": {
                "docs": {
                  "QueryBuilder.html#icons": {
                    "ref": "QueryBuilder.html#icons",
                    "tf": 700
                  }
                }
              }
            }
          }
        },
        "j": {
          "docs": {},
          "q": {
            "docs": {},
            "u": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 211.66666666666666
                      },
                      "Group.html#$el": {
                        "ref": "Group.html#$el",
                        "tf": 33.33333333333333
                      },
                      "Node.html#$el": {
                        "ref": "Node.html#$el",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#$el": {
                        "ref": "QueryBuilder.html#$el",
                        "tf": 33.33333333333333
                      },
                      "Rule.html#$el": {
                        "ref": "Rule.html#$el",
                        "tf": 33.33333333333333
                      },
                      "external-_jQuery.fn_.html": {
                        "ref": "external-_jQuery.fn_.html",
                        "tf": 16.666666666666664
                      }
                    }
                  },
                  "y": {
                    "docs": {},
                    ".": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "n": {
                          "docs": {
                            "external-_jQuery.fn_.html": {
                              "ref": "external-_jQuery.fn_.html",
                              "tf": 500
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "p": {
          "docs": {},
          "l": {
            "docs": {},
            "u": {
              "docs": {},
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 11.666666666666666
                      },
                      "module-plugins.ChangeFilters.html": {
                        "ref": "module-plugins.ChangeFilters.html",
                        "tf": 8.333333333333332
                      },
                      "QueryBuilder.html#plugins": {
                        "ref": "QueryBuilder.html#plugins",
                        "tf": 700
                      },
                      "external-_jQuery.fn_.html": {
                        "ref": "external-_jQuery.fn_.html",
                        "tf": 16.666666666666664
                      },
                      "module-plugins.html": {
                        "ref": "module-plugins.html",
                        "tf": 600
                      }
                    },
                    "s": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "b": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "h": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "k": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "x": {
                                            "docs": {
                                              "module-plugins.BtCheckbox.html": {
                                                "ref": "module-plugins.BtCheckbox.html",
                                                "tf": 100
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "s": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "k": {
                                                "docs": {
                                                  "module-plugins.BtSelectpicker.html": {
                                                    "ref": "module-plugins.BtSelectpicker.html",
                                                    "tf": 100
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "t": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {
                                                      "module-plugins.BtTooltipErrors.html": {
                                                        "ref": "module-plugins.BtTooltipErrors.html",
                                                        "tf": 100
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "c": {
                          "docs": {},
                          "h": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "module-plugins.ChangeFilters.html": {
                                                "ref": "module-plugins.ChangeFilters.html",
                                                "tf": 100
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "o": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "k": {
                                                        "docs": {
                                                          "module-plugins.ChosenSelectpicker.html": {
                                                            "ref": "module-plugins.ChosenSelectpicker.html",
                                                            "tf": 100
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "f": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "c": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "module-plugins.FilterDescription.html": {
                                                        "ref": "module-plugins.FilterDescription.html",
                                                        "tf": 100
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "i": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "v": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "module-plugins.Invert.html": {
                                        "ref": "module-plugins.Invert.html",
                                        "tf": 100
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "m": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "d": {
                                    "docs": {},
                                    "b": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "p": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "module-plugins.MongoDbSupport.html": {
                                                        "ref": "module-plugins.MongoDbSupport.html",
                                                        "tf": 100
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "n": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "p": {
                                        "docs": {
                                          "module-plugins.NotGroup.html": {
                                            "ref": "module-plugins.NotGroup.html",
                                            "tf": 100
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "s": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "module-plugins.Sortable.html": {
                                    "ref": "module-plugins.Sortable.html",
                                    "tf": 100
                                  }
                                }
                              }
                            }
                          },
                          "q": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "module-plugins.SqlSupport.html": {
                                                "ref": "module-plugins.SqlSupport.html",
                                                "tf": 100
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "u": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "q": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "module-plugins.UniqueFilter.html": {
                                                "ref": "module-plugins.UniqueFilter.html",
                                                "tf": 100
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Group.html#parent": {
                        "ref": "Group.html#parent",
                        "tf": 683.3333333333334
                      },
                      "Group.html#getPos": {
                        "ref": "Group.html#getPos",
                        "tf": 10
                      },
                      "Group.html#moveAtBegin": {
                        "ref": "Group.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Group.html#moveAtEnd": {
                        "ref": "Group.html#moveAtEnd",
                        "tf": 8.333333333333332
                      },
                      "Node.html#parent": {
                        "ref": "Node.html#parent",
                        "tf": 683.3333333333334
                      },
                      "Node.html#getPos": {
                        "ref": "Node.html#getPos",
                        "tf": 10
                      },
                      "Node.html#moveAtBegin": {
                        "ref": "Node.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Node.html#moveAtEnd": {
                        "ref": "Node.html#moveAtEnd",
                        "tf": 8.333333333333332
                      },
                      "QueryBuilder.html#addGroup": {
                        "ref": "QueryBuilder.html#addGroup",
                        "tf": 16.666666666666664
                      },
                      "QueryBuilder.html#addRule": {
                        "ref": "QueryBuilder.html#addRule",
                        "tf": 20
                      },
                      "Rule.html#parent": {
                        "ref": "Rule.html#parent",
                        "tf": 683.3333333333334
                      },
                      "Rule.html#getPos": {
                        "ref": "Rule.html#getPos",
                        "tf": 10
                      },
                      "Rule.html#moveAtBegin": {
                        "ref": "Rule.html#moveAtBegin",
                        "tf": 8.333333333333332
                      },
                      "Rule.html#moveAtEnd": {
                        "ref": "Rule.html#moveAtEnd",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "i": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "r": {
                            "docs": {
                              "Group.html#contains": {
                                "ref": "Group.html#contains",
                                "tf": 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "t": {
                  "docs": {
                    "Group.html#getNodePos": {
                      "ref": "Group.html#getNodePos",
                      "tf": 12.5
                    },
                    "Group.html#getPos": {
                      "ref": "Group.html#getPos",
                      "tf": 10
                    },
                    "Group.html#move": {
                      "ref": "Group.html#move",
                      "tf": 10
                    },
                    "module-plugins.ChangeFilters.html#addFilter": {
                      "ref": "module-plugins.ChangeFilters.html#addFilter",
                      "tf": 33.33333333333333
                    },
                    "Node.html#getPos": {
                      "ref": "Node.html#getPos",
                      "tf": 10
                    },
                    "Node.html#move": {
                      "ref": "Node.html#move",
                      "tf": 10
                    },
                    "Rule.html#getPos": {
                      "ref": "Rule.html#getPos",
                      "tf": 10
                    },
                    "Rule.html#move": {
                      "ref": "Rule.html#move",
                      "tf": 10
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "i": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Utils.html#.groupSort": {
                          "ref": "Utils.html#.groupSort",
                          "tf": 6.25
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "o": {
                "docs": {},
                "v": {
                  "docs": {
                    "module-plugins.FilterDescription.html": {
                      "ref": "module-plugins.FilterDescription.html",
                      "tf": 5
                    }
                  }
                }
              },
              "u": {
                "docs": {},
                "l": {
                  "docs": {
                    "module-plugins.MongoDbSupport.html": {
                      "ref": "module-plugins.MongoDbSupport.html",
                      "tf": 4.545454545454546
                    },
                    "module-plugins.SqlSupport.html": {
                      "ref": "module-plugins.SqlSupport.html",
                      "tf": 5
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "module-plugins.FilterDescription.html": {
                        "ref": "module-plugins.FilterDescription.html",
                        "tf": 5
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "Utils.html#.defineModelProperties": {
                            "ref": "Utils.html#.defineModelProperties",
                            "tf": 4.761904761904762
                          }
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "y": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "Utils.html#.defineModelProperties": {
                            "ref": "Utils.html#.defineModelProperties",
                            "tf": 2.380952380952381
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "v": {
                      "docs": {
                        "Utils.html#.groupSort": {
                          "ref": "Utils.html#.groupSort",
                          "tf": 6.25
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "f": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "QueryBuilder.html#validateValue": {
                          "ref": "QueryBuilder.html#validateValue",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "p": {
              "docs": {},
              "'": {
                "docs": {
                  "Utils.html#.escapeString": {
                    "ref": "Utils.html#.escapeString",
                    "tf": 12.5
                  }
                }
              }
            }
          }
        },
        "q": {
          "docs": {},
          "u": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {},
                "y": {
                  "docs": {},
                  "/": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "index.html": {
                                "ref": "index.html",
                                "tf": 11.666666666666666
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "b": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "d": {
                            "docs": {
                              "index.html": {
                                "ref": "index.html",
                                "tf": 200
                              },
                              "QueryBuilder.html": {
                                "ref": "QueryBuilder.html",
                                "tf": 1900
                              },
                              "QueryBuilder.html#off": {
                                "ref": "QueryBuilder.html#off",
                                "tf": 33.33333333333333
                              },
                              "QueryBuilder.html#on": {
                                "ref": "QueryBuilder.html#on",
                                "tf": 33.33333333333333
                              },
                              "QueryBuilder.html#once": {
                                "ref": "QueryBuilder.html#once",
                                "tf": 25
                              }
                            },
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                ".": {
                                  "docs": {},
                                  "d": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "f": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "QueryBuilder.html#.DEFAULTS": {
                                                    "ref": "QueryBuilder.html#.DEFAULTS",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "g": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "QueryBuilder.html#.Group": {
                                                "ref": "QueryBuilder.html#.Group",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {
                                            "QueryBuilder.html#.OPERATORS": {
                                              "ref": "QueryBuilder.html#.OPERATORS",
                                              "tf": 1150
                                            },
                                            "QueryBuilder.html#.Operator": {
                                              "ref": "QueryBuilder.html#.Operator",
                                              "tf": 1150
                                            },
                                            "Rule.html#operator": {
                                              "ref": "Rule.html#operator",
                                              "tf": 50
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "r": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "n": {
                                              "docs": {
                                                "QueryBuilder.html#.regional": {
                                                  "ref": "QueryBuilder.html#.regional",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "u": {
                                      "docs": {},
                                      "l": {
                                        "docs": {
                                          "QueryBuilder.html#.Rule": {
                                            "ref": "QueryBuilder.html#.Rule",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "c": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {
                                                    "QueryBuilder.html#.selectors": {
                                                      "ref": "QueryBuilder.html#.selectors",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "t": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "l": {
                                            "docs": {
                                              "QueryBuilder.html#.templates": {
                                                "ref": "QueryBuilder.html#.templates",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "u": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "l": {
                                          "docs": {
                                            "QueryBuilder.html#.utils": {
                                              "ref": "QueryBuilder.html#.utils",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "m": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "f": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {},
                                                  "l": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "_": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "p": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "QueryBuilder.html#setOptions": {
                                                                  "ref": "QueryBuilder.html#setOptions",
                                                                  "tf": 7.142857142857142
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "f": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "QueryBuilder.html#.Filter": {
                                              "ref": "QueryBuilder.html#.Filter",
                                              "tf": 1150
                                            },
                                            "Rule.html#filter": {
                                              "ref": "Rule.html#filter",
                                              "tf": 50
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "#": {
                                  "docs": {},
                                  "$": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "l": {
                                        "docs": {
                                          "QueryBuilder.html#$el": {
                                            "ref": "QueryBuilder.html#$el",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "f": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "QueryBuilder.html#filters": {
                                              "ref": "QueryBuilder.html#filters",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "i": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "QueryBuilder.html#icons": {
                                              "ref": "QueryBuilder.html#icons",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "l": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "g": {
                                          "docs": {
                                            "QueryBuilder.html#lang": {
                                              "ref": "QueryBuilder.html#lang",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "m": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "l": {
                                            "docs": {
                                              "QueryBuilder.html#model": {
                                                "ref": "QueryBuilder.html#model",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {
                                            "QueryBuilder.html#operators": {
                                              "ref": "QueryBuilder.html#operators",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "f": {
                                      "docs": {},
                                      "f": {
                                        "docs": {
                                          "QueryBuilder.html#off": {
                                            "ref": "QueryBuilder.html#off",
                                            "tf": 1300
                                          }
                                        }
                                      }
                                    },
                                    "n": {
                                      "docs": {
                                        "QueryBuilder.html#on": {
                                          "ref": "QueryBuilder.html#on",
                                          "tf": 1300
                                        }
                                      },
                                      "c": {
                                        "docs": {
                                          "QueryBuilder.html#once": {
                                            "ref": "QueryBuilder.html#once",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "p": {
                                    "docs": {},
                                    "l": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "g": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "n": {
                                              "docs": {
                                                "QueryBuilder.html#plugins": {
                                                  "ref": "QueryBuilder.html#plugins",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "QueryBuilder.html#settings": {
                                            "ref": "QueryBuilder.html#settings",
                                            "tf": 1150
                                          }
                                        },
                                        "o": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "QueryBuilder.html#setOptions": {
                                                  "ref": "QueryBuilder.html#setOptions",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "r": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "QueryBuilder.html#setRoot": {
                                                    "ref": "QueryBuilder.html#setRoot",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "u": {
                                            "docs": {},
                                            "l": {
                                              "docs": {
                                                "QueryBuilder.html#setRules": {
                                                  "ref": "QueryBuilder.html#setRules",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "t": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "l": {
                                            "docs": {
                                              "QueryBuilder.html#templates": {
                                                "ref": "QueryBuilder.html#templates",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "r": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "l": {
                                              "docs": {
                                                "QueryBuilder.html#translate": {
                                                  "ref": "QueryBuilder.html#translate",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "i": {
                                        "docs": {},
                                        "g": {
                                          "docs": {},
                                          "g": {
                                            "docs": {
                                              "QueryBuilder.html#trigger": {
                                                "ref": "QueryBuilder.html#trigger",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "a": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "g": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {
                                                    "QueryBuilder.html#addGroup": {
                                                      "ref": "QueryBuilder.html#addGroup",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "r": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "l": {
                                              "docs": {
                                                "QueryBuilder.html#addRule": {
                                                  "ref": "QueryBuilder.html#addRule",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "c": {
                                    "docs": {},
                                    "h": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "g": {
                                            "docs": {
                                              "QueryBuilder.html#change": {
                                                "ref": "QueryBuilder.html#change",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "e": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "k": {
                                            "docs": {},
                                            "f": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "QueryBuilder.html#checkFilters": {
                                                        "ref": "QueryBuilder.html#checkFilters",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "o": {
                                              "docs": {},
                                              "p": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {
                                                      "QueryBuilder.html#checkOperators": {
                                                        "ref": "QueryBuilder.html#checkOperators",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "l": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "QueryBuilder.html#clear": {
                                                "ref": "QueryBuilder.html#clear",
                                                "tf": 1150
                                              }
                                            },
                                            "e": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {
                                                        "QueryBuilder.html#clearErrors": {
                                                          "ref": "QueryBuilder.html#clearErrors",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "d": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {
                                                          "QueryBuilder.html#deleteGroup": {
                                                            "ref": "QueryBuilder.html#deleteGroup",
                                                            "tf": 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              },
                                              "r": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "l": {
                                                    "docs": {
                                                      "QueryBuilder.html#deleteRule": {
                                                        "ref": "QueryBuilder.html#deleteRule",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "y": {
                                                "docs": {
                                                  "QueryBuilder.html#destroy": {
                                                    "ref": "QueryBuilder.html#destroy",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "g": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {
                                                    "QueryBuilder.html#getModel": {
                                                      "ref": "QueryBuilder.html#getModel",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "r": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "l": {
                                              "docs": {
                                                "QueryBuilder.html#getRules": {
                                                  "ref": "QueryBuilder.html#getRules",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "r": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "QueryBuilder.html#reset": {
                                                "ref": "QueryBuilder.html#reset",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "v": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "d": {
                                            "docs": {
                                              "QueryBuilder.html#validate": {
                                                "ref": "QueryBuilder.html#validate",
                                                "tf": 1150
                                              }
                                            },
                                            "a": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "v": {
                                                    "docs": {},
                                                    "a": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "u": {
                                                          "docs": {
                                                            "QueryBuilder.html#validateValue": {
                                                              "ref": "QueryBuilder.html#validateValue",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "i": {
                  "docs": {
                    "module-plugins.MongoDbSupport.html#getMongo": {
                      "ref": "module-plugins.MongoDbSupport.html#getMongo",
                      "tf": 12.5
                    },
                    "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                      "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                      "tf": 45.83333333333333
                    },
                    "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                      "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                      "tf": 12.5
                    },
                    "module-plugins.SqlSupport.html": {
                      "ref": "module-plugins.SqlSupport.html",
                      "tf": 5
                    },
                    "module-plugins.SqlSupport.html#getRulesFromSQL": {
                      "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                      "tf": 37.5
                    },
                    "module-plugins.SqlSupport.html#getSQL": {
                      "ref": "module-plugins.SqlSupport.html#getSQL",
                      "tf": 12.5
                    },
                    "module-plugins.SqlSupport.html#setRulesFromSQL": {
                      "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                      "tf": 10
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "t": {
                "docs": {},
                ";": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "q": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "module-plugins.NotGroup.html": {
                                      "ref": "module-plugins.NotGroup.html",
                                      "tf": 8.333333333333332
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "u": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "q": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "&": {
                                "docs": {},
                                "q": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "module-plugins.UniqueFilter.html": {
                                            "ref": "module-plugins.UniqueFilter.html",
                                            "tf": 4.545454545454546
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "j": {
                    "docs": {},
                    "q": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "y": {
                              "docs": {},
                              ".": {
                                "docs": {},
                                "f": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "&": {
                                      "docs": {},
                                      "q": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "external-_jQuery.fn_.html": {
                                                  "ref": "external-_jQuery.fn_.html",
                                                  "tf": 100
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "r": {
          "docs": {},
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "m": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 110
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "y": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "QueryBuilder.html#.DEFAULTS": {
                                  "ref": "QueryBuilder.html#.DEFAULTS",
                                  "tf": 25
                                },
                                "QueryBuilder.html#.OPERATORS": {
                                  "ref": "QueryBuilder.html#.OPERATORS",
                                  "tf": 20
                                },
                                "QueryBuilder.html#.regional": {
                                  "ref": "QueryBuilder.html#.regional",
                                  "tf": 20
                                },
                                "QueryBuilder.html#.selectors": {
                                  "ref": "QueryBuilder.html#.selectors",
                                  "tf": 20
                                },
                                "QueryBuilder.html#.templates": {
                                  "ref": "QueryBuilder.html#.templates",
                                  "tf": 20
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Group.html#contains": {
                        "ref": "Group.html#contains",
                        "tf": 25
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Group.html#each": {
                        "ref": "Group.html#each",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "o": {
                "docs": {},
                "v": {
                  "docs": {
                    "Group.html#empty": {
                      "ref": "Group.html#empty",
                      "tf": 16.666666666666664
                    },
                    "Model.html#off": {
                      "ref": "Model.html#off",
                      "tf": 12.5
                    },
                    "module-plugins.ChangeFilters.html#removeFilter": {
                      "ref": "module-plugins.ChangeFilters.html#removeFilter",
                      "tf": 16.666666666666664
                    },
                    "QueryBuilder.html#clear": {
                      "ref": "QueryBuilder.html#clear",
                      "tf": 10
                    },
                    "QueryBuilder.html#off": {
                      "ref": "QueryBuilder.html#off",
                      "tf": 10
                    }
                  },
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Group.html#removeNode": {
                              "ref": "Group.html#removeNode",
                              "tf": 700
                            }
                          }
                        }
                      }
                    },
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "module-plugins.ChangeFilters.html#removeFilter": {
                                "ref": "module-plugins.ChangeFilters.html#removeFilter",
                                "tf": 633.3333333333334
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Group.html#getNodePos": {
                        "ref": "Group.html#getNodePos",
                        "tf": 12.5
                      },
                      "Group.html#getPos": {
                        "ref": "Group.html#getPos",
                        "tf": 10
                      },
                      "Group.html#length": {
                        "ref": "Group.html#length",
                        "tf": 16.666666666666664
                      },
                      "module-plugins.MongoDbSupport.html#getMongo": {
                        "ref": "module-plugins.MongoDbSupport.html#getMongo",
                        "tf": 12.5
                      },
                      "module-plugins.SqlSupport.html#getSQL": {
                        "ref": "module-plugins.SqlSupport.html#getSQL",
                        "tf": 12.5
                      },
                      "Node.html#getPos": {
                        "ref": "Node.html#getPos",
                        "tf": 10
                      },
                      "QueryBuilder.html#change": {
                        "ref": "QueryBuilder.html#change",
                        "tf": 7.142857142857142
                      },
                      "QueryBuilder.html#getModel": {
                        "ref": "QueryBuilder.html#getModel",
                        "tf": 7.142857142857142
                      },
                      "Rule.html#getPos": {
                        "ref": "Rule.html#getPos",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "QueryBuilder.html#.regional": {
                        "ref": "QueryBuilder.html#.regional",
                        "tf": 670
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "Utils.html#.escapeRegExp": {
                      "ref": "Utils.html#.escapeRegExp",
                      "tf": 12.5
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "QueryBuilder.html#getRules": {
                        "ref": "QueryBuilder.html#getRules",
                        "tf": 10
                      }
                    }
                  }
                }
              },
              "l": {
                "docs": {},
                "a": {
                  "docs": {},
                  "c": {
                    "docs": {
                      "Utils.html#.fmt": {
                        "ref": "Utils.html#.fmt",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "t": {
                  "docs": {
                    "QueryBuilder.html#reset": {
                      "ref": "QueryBuilder.html#reset",
                      "tf": 760
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "Group.html#rules": {
                    "ref": "Group.html#rules",
                    "tf": 683.3333333333334
                  },
                  "Group.html#addRule": {
                    "ref": "Group.html#addRule",
                    "tf": 35
                  },
                  "module-plugins.Invert.html": {
                    "ref": "module-plugins.Invert.html",
                    "tf": 6.25
                  },
                  "module-plugins.Invert.html#invert": {
                    "ref": "module-plugins.Invert.html#invert",
                    "tf": 10
                  },
                  "module-plugins.MongoDbSupport.html": {
                    "ref": "module-plugins.MongoDbSupport.html",
                    "tf": 4.545454545454546
                  },
                  "module-plugins.MongoDbSupport.html#getMongo": {
                    "ref": "module-plugins.MongoDbSupport.html#getMongo",
                    "tf": 12.5
                  },
                  "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                    "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                    "tf": 12.5
                  },
                  "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                    "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                    "tf": 12.5
                  },
                  "module-plugins.Sortable.html": {
                    "ref": "module-plugins.Sortable.html",
                    "tf": 8.333333333333332
                  },
                  "module-plugins.SqlSupport.html": {
                    "ref": "module-plugins.SqlSupport.html",
                    "tf": 5
                  },
                  "module-plugins.SqlSupport.html#getRulesFromSQL": {
                    "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                    "tf": 12.5
                  },
                  "module-plugins.SqlSupport.html#getSQL": {
                    "ref": "module-plugins.SqlSupport.html#getSQL",
                    "tf": 12.5
                  },
                  "module-plugins.SqlSupport.html#setRulesFromSQL": {
                    "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                    "tf": 10
                  },
                  "module-plugins.UniqueFilter.html": {
                    "ref": "module-plugins.UniqueFilter.html",
                    "tf": 4.545454545454546
                  },
                  "QueryBuilder.html#.Rule": {
                    "ref": "QueryBuilder.html#.Rule",
                    "tf": 683.3333333333334
                  },
                  "QueryBuilder.html#addRule": {
                    "ref": "QueryBuilder.html#addRule",
                    "tf": 36.666666666666664
                  },
                  "QueryBuilder.html#clear": {
                    "ref": "QueryBuilder.html#clear",
                    "tf": 10
                  },
                  "QueryBuilder.html#deleteGroup": {
                    "ref": "QueryBuilder.html#deleteGroup",
                    "tf": 5.555555555555555
                  },
                  "QueryBuilder.html#deleteRule": {
                    "ref": "QueryBuilder.html#deleteRule",
                    "tf": 49.99999999999999
                  },
                  "QueryBuilder.html#getRules": {
                    "ref": "QueryBuilder.html#getRules",
                    "tf": 10
                  },
                  "QueryBuilder.html#reset": {
                    "ref": "QueryBuilder.html#reset",
                    "tf": 10
                  },
                  "QueryBuilder.html#setRules": {
                    "ref": "QueryBuilder.html#setRules",
                    "tf": 16.666666666666664
                  },
                  "QueryBuilder.html#validateValue": {
                    "ref": "QueryBuilder.html#validateValue",
                    "tf": 25
                  },
                  "Rule.html": {
                    "ref": "Rule.html",
                    "tf": 1925
                  }
                },
                "#": {
                  "docs": {},
                  "$": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {
                          "Rule.html#$el": {
                            "ref": "Rule.html#$el",
                            "tf": 1150
                          }
                        }
                      }
                    }
                  },
                  "d": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "a": {
                          "docs": {
                            "Rule.html#data": {
                              "ref": "Rule.html#data",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "Rule.html#drop": {
                              "ref": "Rule.html#drop",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "r": {
                            "docs": {
                              "Rule.html#error": {
                                "ref": "Rule.html#error",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "f": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Rule.html#filter": {
                              "ref": "Rule.html#filter",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "g": {
                          "docs": {
                            "Rule.html#flags": {
                              "ref": "Rule.html#flags",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "i": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Rule.html#id": {
                          "ref": "Rule.html#id",
                          "tf": 1150
                        }
                      }
                    },
                    "s": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Rule.html#isRoot": {
                                  "ref": "Rule.html#isRoot",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "v": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "Rule.html#level": {
                                "ref": "Rule.html#level",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "Rule.html#model": {
                                "ref": "Rule.html#model",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "v": {
                        "docs": {
                          "Rule.html#move": {
                            "ref": "Rule.html#move",
                            "tf": 1150
                          }
                        },
                        "e": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "f": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "Rule.html#moveAfter": {
                                    "ref": "Rule.html#moveAfter",
                                    "tf": 1150
                                  }
                                }
                              }
                            },
                            "t": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "g": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "n": {
                                        "docs": {
                                          "Rule.html#moveAtBegin": {
                                            "ref": "Rule.html#moveAtBegin",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "d": {
                                    "docs": {
                                      "Rule.html#moveAtEnd": {
                                        "ref": "Rule.html#moveAtEnd",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "o": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {
                            "Rule.html#operator": {
                              "ref": "Rule.html#operator",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "p": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "Rule.html#parent": {
                            "ref": "Rule.html#parent",
                            "tf": 1150
                          }
                        }
                      }
                    }
                  },
                  "v": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "u": {
                          "docs": {
                            "Rule.html#value": {
                              "ref": "Rule.html#value",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "g": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "o": {
                            "docs": {
                              "Rule.html#getPos": {
                                "ref": "Rule.html#getPos",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "t": {
                "docs": {
                  "Group.html#isRoot": {
                    "ref": "Group.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "Model.html#root": {
                    "ref": "Model.html#root",
                    "tf": 683.3333333333334
                  },
                  "Node.html": {
                    "ref": "Node.html",
                    "tf": 16.666666666666664
                  },
                  "Node.html#isRoot": {
                    "ref": "Node.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "QueryBuilder.html#clear": {
                    "ref": "QueryBuilder.html#clear",
                    "tf": 10
                  },
                  "QueryBuilder.html#getModel": {
                    "ref": "QueryBuilder.html#getModel",
                    "tf": 7.142857142857142
                  },
                  "QueryBuilder.html#reset": {
                    "ref": "QueryBuilder.html#reset",
                    "tf": 10
                  },
                  "QueryBuilder.html#setRoot": {
                    "ref": "QueryBuilder.html#setRoot",
                    "tf": 16.666666666666664
                  },
                  "Rule.html#isRoot": {
                    "ref": "Rule.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "Utils.html#.defineModelProperties": {
                    "ref": "Utils.html#.defineModelProperties",
                    "tf": 2.380952380952381
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "d": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {
                    "module-plugins.BtCheckbox.html": {
                      "ref": "module-plugins.BtCheckbox.html",
                      "tf": 7.142857142857142
                    }
                  },
                  "/": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "k": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "x": {
                                    "docs": {},
                                    "/": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "c": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "Utils.html#.iterateOptions": {
                                                      "ref": "Utils.html#.iterateOptions",
                                                      "tf": 7.142857142857142
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "u": {
          "docs": {},
          "s": {
            "docs": {
              "module-plugins.UniqueFilter.html": {
                "ref": "module-plugins.UniqueFilter.html",
                "tf": 4.545454545454546
              },
              "Utils.html#.escapeElementId": {
                "ref": "Utils.html#.escapeElementId",
                "tf": 8.333333333333332
              },
              "Utils.html#.escapeRegExp": {
                "ref": "Utils.html#.escapeRegExp",
                "tf": 12.5
              }
            },
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 11.666666666666666
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "i": {
              "docs": {},
              "q": {
                "docs": {},
                "u": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "module-plugins.UniqueFilter.html": {
                                "ref": "module-plugins.UniqueFilter.html",
                                "tf": 650
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "i": {
              "docs": {},
              "l": {
                "docs": {
                  "QueryBuilder.html#.utils": {
                    "ref": "QueryBuilder.html#.utils",
                    "tf": 683.3333333333334
                  },
                  "Utils.html": {
                    "ref": "Utils.html",
                    "tf": 1900
                  }
                },
                "s": {
                  "docs": {},
                  ".": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "y": {
                                    "docs": {},
                                    "p": {
                                      "docs": {
                                        "Utils.html#.changeType": {
                                          "ref": "Utils.html#.changeType",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {
                                                            "Utils.html#.defineModelProperties": {
                                                              "ref": "Utils.html#.defineModelProperties",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "Utils.html#.error": {
                                  "ref": "Utils.html#.error",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      },
                      "s": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "Utils.html#.escapeElementId": {
                                                      "ref": "Utils.html#.escapeElementId",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "r": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "x": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "Utils.html#.escapeRegExp": {
                                                "ref": "Utils.html#.escapeRegExp",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "s": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "r": {
                                      "docs": {
                                        "Utils.html#.escapeString": {
                                          "ref": "Utils.html#.escapeString",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "f": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Utils.html#.fmt": {
                              "ref": "Utils.html#.fmt",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "Utils.html#.groupSort": {
                                          "ref": "Utils.html#.groupSort",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "i": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "Utils.html#.iterateOptions": {
                                            "ref": "Utils.html#.iterateOptions",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "#": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "e": {
                                                "docs": {
                                                  "Utils.html#OptionsIteratee": {
                                                    "ref": "Utils.html#OptionsIteratee",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "d": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 2.380952380952381
                    }
                  }
                }
              }
            }
          }
        },
        "d": {
          "docs": {},
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "list_class.html": {
                            "ref": "list_class.html",
                            "tf": 35
                          },
                          "list_event.html": {
                            "ref": "list_event.html",
                            "tf": 35
                          },
                          "list_external.html": {
                            "ref": "list_external.html",
                            "tf": 23.333333333333332
                          },
                          "list_module.html": {
                            "ref": "list_module.html",
                            "tf": 35
                          },
                          "list_namespace.html": {
                            "ref": "list_namespace.html",
                            "tf": 35
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {
                "QueryBuilder.html#getModel": {
                  "ref": "QueryBuilder.html#getModel",
                  "tf": 7.142857142857142
                }
              }
            },
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "w": {
                      "docs": {
                        "Utils.html#.error": {
                          "ref": "Utils.html#.error",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {
                  "Group.html#data": {
                    "ref": "Group.html#data",
                    "tf": 700
                  },
                  "Model.html": {
                    "ref": "Model.html",
                    "tf": 6.25
                  },
                  "module-plugins.MongoDbSupport.html#getMongo": {
                    "ref": "module-plugins.MongoDbSupport.html#getMongo",
                    "tf": 33.33333333333333
                  },
                  "module-plugins.SqlSupport.html#getSQL": {
                    "ref": "module-plugins.SqlSupport.html#getSQL",
                    "tf": 20
                  },
                  "Node.html#data": {
                    "ref": "Node.html#data",
                    "tf": 700
                  },
                  "QueryBuilder.html#addGroup": {
                    "ref": "QueryBuilder.html#addGroup",
                    "tf": 16.666666666666664
                  },
                  "QueryBuilder.html#addRule": {
                    "ref": "QueryBuilder.html#addRule",
                    "tf": 20
                  },
                  "QueryBuilder.html#setRoot": {
                    "ref": "QueryBuilder.html#setRoot",
                    "tf": 20
                  },
                  "QueryBuilder.html#setRules": {
                    "ref": "QueryBuilder.html#setRules",
                    "tf": 33.33333333333333
                  },
                  "Rule.html#data": {
                    "ref": "Rule.html#data",
                    "tf": 700
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "t": {
                  "docs": {
                    "Group.html#drop": {
                      "ref": "Group.html#drop",
                      "tf": 25
                    },
                    "Group.html#removeNode": {
                      "ref": "Group.html#removeNode",
                      "tf": 16.666666666666664
                    },
                    "Node.html#drop": {
                      "ref": "Node.html#drop",
                      "tf": 25
                    },
                    "QueryBuilder.html#deleteGroup": {
                      "ref": "QueryBuilder.html#deleteGroup",
                      "tf": 11.11111111111111
                    },
                    "QueryBuilder.html#deleteRule": {
                      "ref": "QueryBuilder.html#deleteRule",
                      "tf": 16.666666666666664
                    },
                    "Rule.html#drop": {
                      "ref": "Rule.html#drop",
                      "tf": 25
                    }
                  },
                  "e": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "h": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "n": {
                                "docs": {
                                  "module-plugins.ChangeFilters.html#removeFilter": {
                                    "ref": "module-plugins.ChangeFilters.html#removeFilter",
                                    "tf": 33.33333333333333
                                  },
                                  "module-plugins.ChangeFilters.html#setFilters": {
                                    "ref": "module-plugins.ChangeFilters.html#setFilters",
                                    "tf": 33.33333333333333
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {
                                "QueryBuilder.html#deleteGroup": {
                                  "ref": "QueryBuilder.html#deleteGroup",
                                  "tf": 683.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "l": {
                          "docs": {
                            "QueryBuilder.html#deleteRule": {
                              "ref": "QueryBuilder.html#deleteRule",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "c": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "module-plugins.FilterDescription.html": {
                            "ref": "module-plugins.FilterDescription.html",
                            "tf": 5
                          }
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "y": {
                      "docs": {
                        "QueryBuilder.html#destroy": {
                          "ref": "QueryBuilder.html#destroy",
                          "tf": 775
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "module-plugins.UniqueFilter.html": {
                      "ref": "module-plugins.UniqueFilter.html",
                      "tf": 4.545454545454546
                    },
                    "QueryBuilder.html#setOptions": {
                      "ref": "QueryBuilder.html#setOptions",
                      "tf": 7.142857142857142
                    },
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 2.380952380952381
                    }
                  },
                  "e": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "p": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "i": {
                                              "docs": {
                                                "Utils.html#.defineModelProperties": {
                                                  "ref": "Utils.html#.defineModelProperties",
                                                  "tf": 675
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "QueryBuilder.html#.DEFAULTS": {
                          "ref": "QueryBuilder.html#.DEFAULTS",
                          "tf": 700
                        },
                        "QueryBuilder.html#.OPERATORS": {
                          "ref": "QueryBuilder.html#.OPERATORS",
                          "tf": 25
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "p": {
                "docs": {
                  "Group.html#drop": {
                    "ref": "Group.html#drop",
                    "tf": 750
                  },
                  "module-plugins.Sortable.html": {
                    "ref": "module-plugins.Sortable.html",
                    "tf": 8.333333333333332
                  },
                  "Node.html#drop": {
                    "ref": "Node.html#drop",
                    "tf": 750
                  },
                  "Rule.html#drop": {
                    "ref": "Rule.html#drop",
                    "tf": 750
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "g": {
                "docs": {
                  "module-plugins.Sortable.html": {
                    "ref": "module-plugins.Sortable.html",
                    "tf": 8.333333333333332
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "p": {
                "docs": {},
                "l": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "y": {
                      "docs": {
                        "module-plugins.FilterDescription.html": {
                          "ref": "module-plugins.FilterDescription.html",
                          "tf": 5
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "l": {
          "docs": {},
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "list_event.html": {
                    "ref": "list_event.html",
                    "tf": 110
                  },
                  "list_external.html": {
                    "ref": "list_external.html",
                    "tf": 110
                  },
                  "list_module.html": {
                    "ref": "list_module.html",
                    "tf": 110
                  },
                  "list_namespace.html": {
                    "ref": "list_namespace.html",
                    "tf": 110
                  },
                  "QueryBuilder.html#filters": {
                    "ref": "QueryBuilder.html#filters",
                    "tf": 25
                  },
                  "QueryBuilder.html#icons": {
                    "ref": "QueryBuilder.html#icons",
                    "tf": 25
                  },
                  "QueryBuilder.html#operators": {
                    "ref": "QueryBuilder.html#operators",
                    "tf": 25
                  },
                  "QueryBuilder.html#templates": {
                    "ref": "QueryBuilder.html#templates",
                    "tf": 25
                  }
                },
                ":": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "list_class.html": {
                                "ref": "list_class.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "e": {
                    "docs": {},
                    "v": {
                      "docs": {
                        "list_event.html": {
                          "ref": "list_event.html",
                          "tf": 1300
                        }
                      }
                    },
                    "x": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "n": {
                              "docs": {
                                "list_external.html": {
                                  "ref": "list_external.html",
                                  "tf": 1300
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "list_module.html": {
                                "ref": "list_module.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "n": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "c": {
                                  "docs": {
                                    "list_namespace.html": {
                                      "ref": "list_namespace.html",
                                      "tf": 1300
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Model.html#off": {
                        "ref": "Model.html#off",
                        "tf": 12.5
                      },
                      "Model.html#on": {
                        "ref": "Model.html#on",
                        "tf": 12.5
                      },
                      "Model.html#once": {
                        "ref": "Model.html#once",
                        "tf": 8.333333333333332
                      },
                      "QueryBuilder.html#off": {
                        "ref": "QueryBuilder.html#off",
                        "tf": 10
                      },
                      "QueryBuilder.html#on": {
                        "ref": "QueryBuilder.html#on",
                        "tf": 10
                      },
                      "QueryBuilder.html#once": {
                        "ref": "QueryBuilder.html#once",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            ";": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "y": {
                              "docs": {},
                              "&": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "Group.html#$el": {
                                        "ref": "Group.html#$el",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#flags": {
                                        "ref": "Group.html#flags",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#id": {
                                        "ref": "Group.html#id",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#level": {
                                        "ref": "Group.html#level",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#model": {
                                        "ref": "Group.html#model",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#parent": {
                                        "ref": "Group.html#parent",
                                        "tf": 33.33333333333333
                                      },
                                      "Group.html#rules": {
                                        "ref": "Group.html#rules",
                                        "tf": 33.33333333333333
                                      },
                                      "Model.html#root": {
                                        "ref": "Model.html#root",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#$el": {
                                        "ref": "Node.html#$el",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#flags": {
                                        "ref": "Node.html#flags",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#id": {
                                        "ref": "Node.html#id",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#level": {
                                        "ref": "Node.html#level",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#model": {
                                        "ref": "Node.html#model",
                                        "tf": 33.33333333333333
                                      },
                                      "Node.html#parent": {
                                        "ref": "Node.html#parent",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#$el": {
                                        "ref": "QueryBuilder.html#$el",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#filters": {
                                        "ref": "QueryBuilder.html#filters",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#icons": {
                                        "ref": "QueryBuilder.html#icons",
                                        "tf": 25
                                      },
                                      "QueryBuilder.html#lang": {
                                        "ref": "QueryBuilder.html#lang",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#model": {
                                        "ref": "QueryBuilder.html#model",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#operators": {
                                        "ref": "QueryBuilder.html#operators",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#plugins": {
                                        "ref": "QueryBuilder.html#plugins",
                                        "tf": 25
                                      },
                                      "QueryBuilder.html#settings": {
                                        "ref": "QueryBuilder.html#settings",
                                        "tf": 33.33333333333333
                                      },
                                      "QueryBuilder.html#templates": {
                                        "ref": "QueryBuilder.html#templates",
                                        "tf": 25
                                      },
                                      "Rule.html#$el": {
                                        "ref": "Rule.html#$el",
                                        "tf": 33.33333333333333
                                      },
                                      "Rule.html#flags": {
                                        "ref": "Rule.html#flags",
                                        "tf": 33.33333333333333
                                      },
                                      "Rule.html#id": {
                                        "ref": "Rule.html#id",
                                        "tf": 33.33333333333333
                                      },
                                      "Rule.html#level": {
                                        "ref": "Rule.html#level",
                                        "tf": 33.33333333333333
                                      },
                                      "Rule.html#model": {
                                        "ref": "Rule.html#model",
                                        "tf": 33.33333333333333
                                      },
                                      "Rule.html#parent": {
                                        "ref": "Rule.html#parent",
                                        "tf": 33.33333333333333
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "t": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "c": {
                          "docs": {
                            "QueryBuilder.html#.DEFAULTS": {
                              "ref": "QueryBuilder.html#.DEFAULTS",
                              "tf": 25
                            },
                            "QueryBuilder.html#.OPERATORS": {
                              "ref": "QueryBuilder.html#.OPERATORS",
                              "tf": 20
                            },
                            "QueryBuilder.html#.regional": {
                              "ref": "QueryBuilder.html#.regional",
                              "tf": 20
                            },
                            "QueryBuilder.html#.selectors": {
                              "ref": "QueryBuilder.html#.selectors",
                              "tf": 20
                            },
                            "QueryBuilder.html#.templates": {
                              "ref": "QueryBuilder.html#.templates",
                              "tf": 20
                            }
                          },
                          "&": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "QueryBuilder.html#.Group": {
                                    "ref": "QueryBuilder.html#.Group",
                                    "tf": 33.33333333333333
                                  },
                                  "QueryBuilder.html#.Rule": {
                                    "ref": "QueryBuilder.html#.Rule",
                                    "tf": 33.33333333333333
                                  },
                                  "QueryBuilder.html#.utils": {
                                    "ref": "QueryBuilder.html#.utils",
                                    "tf": 33.33333333333333
                                  },
                                  "Utils.html#.changeType": {
                                    "ref": "Utils.html#.changeType",
                                    "tf": 25
                                  },
                                  "Utils.html#.defineModelProperties": {
                                    "ref": "Utils.html#.defineModelProperties",
                                    "tf": 25
                                  },
                                  "Utils.html#.error": {
                                    "ref": "Utils.html#.error",
                                    "tf": 16.666666666666664
                                  },
                                  "Utils.html#.escapeElementId": {
                                    "ref": "Utils.html#.escapeElementId",
                                    "tf": 25
                                  },
                                  "Utils.html#.escapeRegExp": {
                                    "ref": "Utils.html#.escapeRegExp",
                                    "tf": 25
                                  },
                                  "Utils.html#.escapeString": {
                                    "ref": "Utils.html#.escapeString",
                                    "tf": 25
                                  },
                                  "Utils.html#.fmt": {
                                    "ref": "Utils.html#.fmt",
                                    "tf": 20
                                  },
                                  "Utils.html#.groupSort": {
                                    "ref": "Utils.html#.groupSort",
                                    "tf": 20
                                  },
                                  "Utils.html#.iterateOptions": {
                                    "ref": "Utils.html#.iterateOptions",
                                    "tf": 25
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {
                    "Group.html#level": {
                      "ref": "Group.html#level",
                      "tf": 683.3333333333334
                    },
                    "Node.html#level": {
                      "ref": "Node.html#level",
                      "tf": 683.3333333333334
                    },
                    "Rule.html#level": {
                      "ref": "Rule.html#level",
                      "tf": 683.3333333333334
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "g": {
                "docs": {},
                "t": {
                  "docs": {},
                  "h": {
                    "docs": {
                      "Group.html#length": {
                        "ref": "Group.html#length",
                        "tf": 700
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {
                    "QueryBuilder.html#.regional": {
                      "ref": "QueryBuilder.html#.regional",
                      "tf": 12.5
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "k": {
                "docs": {
                  "QueryBuilder.html#translate": {
                    "ref": "QueryBuilder.html#translate",
                    "tf": 4.545454545454546
                  }
                }
              }
            },
            "g": {
              "docs": {
                "Utils.html#.error": {
                  "ref": "Utils.html#.error",
                  "tf": 7.142857142857142
                }
              }
            }
          },
          "a": {
            "docs": {},
            "n": {
              "docs": {},
              "g": {
                "docs": {
                  "QueryBuilder.html#lang": {
                    "ref": "QueryBuilder.html#lang",
                    "tf": 683.3333333333334
                  },
                  "QueryBuilder.html#translate": {
                    "ref": "QueryBuilder.html#translate",
                    "tf": 4.545454545454546
                  }
                },
                "u": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "g": {
                      "docs": {
                        "QueryBuilder.html#translate": {
                          "ref": "QueryBuilder.html#translate",
                          "tf": 4.545454545454546
                        }
                      }
                    }
                  }
                }
              }
            },
            "b": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {
                    "QueryBuilder.html#translate": {
                      "ref": "QueryBuilder.html#translate",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          }
        },
        "e": {
          "docs": {},
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {
                    "list_event.html": {
                      "ref": "list_event.html",
                      "tf": 635
                    },
                    "Model.html": {
                      "ref": "Model.html",
                      "tf": 6.25
                    },
                    "Model.html#off": {
                      "ref": "Model.html#off",
                      "tf": 12.5
                    },
                    "Model.html#on": {
                      "ref": "Model.html#on",
                      "tf": 12.5
                    },
                    "Model.html#once": {
                      "ref": "Model.html#once",
                      "tf": 8.333333333333332
                    },
                    "Model.html#trigger": {
                      "ref": "Model.html#trigger",
                      "tf": 49.99999999999999
                    },
                    "QueryBuilder.html#change": {
                      "ref": "QueryBuilder.html#change",
                      "tf": 7.142857142857142
                    },
                    "QueryBuilder.html#off": {
                      "ref": "QueryBuilder.html#off",
                      "tf": 10
                    },
                    "QueryBuilder.html#on": {
                      "ref": "QueryBuilder.html#on",
                      "tf": 10
                    },
                    "QueryBuilder.html#once": {
                      "ref": "QueryBuilder.html#once",
                      "tf": 7.142857142857142
                    },
                    "QueryBuilder.html#trigger": {
                      "ref": "QueryBuilder.html#trigger",
                      "tf": 45.83333333333333
                    },
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 2.380952380952381
                    }
                  }
                }
              }
            }
          },
          "x": {
            "docs": {},
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "list_external.html": {
                        "ref": "list_external.html",
                        "tf": 623.3333333333334
                      },
                      "external-_jQuery.fn_.html": {
                        "ref": "external-_jQuery.fn_.html",
                        "tf": 110
                      }
                    },
                    "a": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        ":": {
                          "docs": {},
                          "\"": {
                            "docs": {},
                            "j": {
                              "docs": {},
                              "q": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "y": {
                                        "docs": {},
                                        ".": {
                                          "docs": {},
                                          "f": {
                                            "docs": {},
                                            "n": {
                                              "docs": {
                                                "external-_jQuery.fn_.html": {
                                                  "ref": "external-_jQuery.fn_.html",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "module-plugins.MongoDbSupport.html": {
                        "ref": "module-plugins.MongoDbSupport.html",
                        "tf": 4.545454545454546
                      },
                      "module-plugins.SqlSupport.html": {
                        "ref": "module-plugins.SqlSupport.html",
                        "tf": 5
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {
              "Group.html#$el": {
                "ref": "Group.html#$el",
                "tf": 683.3333333333334
              },
              "Group.html#addGroup": {
                "ref": "Group.html#addGroup",
                "tf": 25
              },
              "Group.html#addRule": {
                "ref": "Group.html#addRule",
                "tf": 25
              },
              "Node.html#$el": {
                "ref": "Node.html#$el",
                "tf": 683.3333333333334
              },
              "QueryBuilder.html#$el": {
                "ref": "QueryBuilder.html#$el",
                "tf": 683.3333333333334
              },
              "Rule.html#$el": {
                "ref": "Rule.html#$el",
                "tf": 683.3333333333334
              }
            },
            "e": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "QueryBuilder.html#$el": {
                          "ref": "QueryBuilder.html#$el",
                          "tf": 25
                        },
                        "Utils.html#.escapeElementId": {
                          "ref": "Utils.html#.escapeElementId",
                          "tf": 8.333333333333332
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {
                    "Group.html#error": {
                      "ref": "Group.html#error",
                      "tf": 700
                    },
                    "module-plugins.BtTooltipErrors.html": {
                      "ref": "module-plugins.BtTooltipErrors.html",
                      "tf": 8.333333333333332
                    },
                    "Node.html#error": {
                      "ref": "Node.html#error",
                      "tf": 700
                    },
                    "QueryBuilder.html#clearErrors": {
                      "ref": "QueryBuilder.html#clearErrors",
                      "tf": 16.666666666666664
                    },
                    "Rule.html#error": {
                      "ref": "Rule.html#error",
                      "tf": 700
                    },
                    "Utils.html#.error": {
                      "ref": "Utils.html#.error",
                      "tf": 680.952380952381
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {
                  "Group.html#each": {
                    "ref": "Group.html#each",
                    "tf": 666.6666666666666
                  },
                  "QueryBuilder.html#checkFilters": {
                    "ref": "QueryBuilder.html#checkFilters",
                    "tf": 12.5
                  },
                  "QueryBuilder.html#checkOperators": {
                    "ref": "QueryBuilder.html#checkOperators",
                    "tf": 12.5
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "p": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {
                    "Group.html#empty": {
                      "ref": "Group.html#empty",
                      "tf": 750
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "t": {
                "docs": {
                  "Model.html": {
                    "ref": "Model.html",
                    "tf": 6.25
                  },
                  "Utils.html#.defineModelProperties": {
                    "ref": "Utils.html#.defineModelProperties",
                    "tf": 2.380952380952381
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "d": {
              "docs": {
                "Group.html#moveAtEnd": {
                  "ref": "Group.html#moveAtEnd",
                  "tf": 8.333333333333332
                },
                "Node.html#moveAtEnd": {
                  "ref": "Node.html#moveAtEnd",
                  "tf": 8.333333333333332
                },
                "Rule.html#moveAtEnd": {
                  "ref": "Rule.html#moveAtEnd",
                  "tf": 8.333333333333332
                }
              }
            },
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "r": {
                  "docs": {
                    "module-plugins.Invert.html": {
                      "ref": "module-plugins.Invert.html",
                      "tf": 6.25
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "module-plugins.Sortable.html": {
                      "ref": "module-plugins.Sortable.html",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Utils.html#.defineModelProperties": {
                        "ref": "Utils.html#.defineModelProperties",
                        "tf": 2.380952380952381
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "c": {
              "docs": {},
              "a": {
                "docs": {},
                "p": {
                  "docs": {
                    "Utils.html#.escapeElementId": {
                      "ref": "Utils.html#.escapeElementId",
                      "tf": 8.333333333333332
                    },
                    "Utils.html#.escapeRegExp": {
                      "ref": "Utils.html#.escapeRegExp",
                      "tf": 12.5
                    },
                    "Utils.html#.escapeString": {
                      "ref": "Utils.html#.escapeString",
                      "tf": 12.5
                    }
                  },
                  "e": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "m": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "Utils.html#.escapeElementId": {
                                          "ref": "Utils.html#.escapeElementId",
                                          "tf": 675
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "g": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "x": {
                              "docs": {},
                              "p": {
                                "docs": {
                                  "Utils.html#.escapeRegExp": {
                                    "ref": "Utils.html#.escapeRegExp",
                                    "tf": 675
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "s": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "r": {
                          "docs": {
                            "Utils.html#.escapeString": {
                              "ref": "Utils.html#.escapeString",
                              "tf": 675
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "m": {
          "docs": {},
          "e": {
            "docs": {},
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "list_external.html": {
                        "ref": "list_external.html",
                        "tf": 23.333333333333332
                      },
                      "Group.html#$el": {
                        "ref": "Group.html#$el",
                        "tf": 110
                      },
                      "Group.html#condition": {
                        "ref": "Group.html#condition",
                        "tf": 110
                      },
                      "Group.html#data": {
                        "ref": "Group.html#data",
                        "tf": 110
                      },
                      "Group.html#error": {
                        "ref": "Group.html#error",
                        "tf": 110
                      },
                      "Group.html#flags": {
                        "ref": "Group.html#flags",
                        "tf": 110
                      },
                      "Group.html#id": {
                        "ref": "Group.html#id",
                        "tf": 110
                      },
                      "Group.html#level": {
                        "ref": "Group.html#level",
                        "tf": 110
                      },
                      "Group.html#model": {
                        "ref": "Group.html#model",
                        "tf": 110
                      },
                      "Group.html#not": {
                        "ref": "Group.html#not",
                        "tf": 110
                      },
                      "Group.html#parent": {
                        "ref": "Group.html#parent",
                        "tf": 110
                      },
                      "Group.html#rules": {
                        "ref": "Group.html#rules",
                        "tf": 110
                      },
                      "Model.html#root": {
                        "ref": "Model.html#root",
                        "tf": 110
                      },
                      "Node.html#$el": {
                        "ref": "Node.html#$el",
                        "tf": 110
                      },
                      "Node.html#data": {
                        "ref": "Node.html#data",
                        "tf": 110
                      },
                      "Node.html#error": {
                        "ref": "Node.html#error",
                        "tf": 110
                      },
                      "Node.html#flags": {
                        "ref": "Node.html#flags",
                        "tf": 110
                      },
                      "Node.html#id": {
                        "ref": "Node.html#id",
                        "tf": 110
                      },
                      "Node.html#level": {
                        "ref": "Node.html#level",
                        "tf": 110
                      },
                      "Node.html#model": {
                        "ref": "Node.html#model",
                        "tf": 110
                      },
                      "Node.html#parent": {
                        "ref": "Node.html#parent",
                        "tf": 110
                      },
                      "QueryBuilder.html#.DEFAULTS": {
                        "ref": "QueryBuilder.html#.DEFAULTS",
                        "tf": 110
                      },
                      "QueryBuilder.html#.Group": {
                        "ref": "QueryBuilder.html#.Group",
                        "tf": 110
                      },
                      "QueryBuilder.html#.OPERATORS": {
                        "ref": "QueryBuilder.html#.OPERATORS",
                        "tf": 110
                      },
                      "QueryBuilder.html#.regional": {
                        "ref": "QueryBuilder.html#.regional",
                        "tf": 110
                      },
                      "QueryBuilder.html#.Rule": {
                        "ref": "QueryBuilder.html#.Rule",
                        "tf": 110
                      },
                      "QueryBuilder.html#.selectors": {
                        "ref": "QueryBuilder.html#.selectors",
                        "tf": 110
                      },
                      "QueryBuilder.html#.templates": {
                        "ref": "QueryBuilder.html#.templates",
                        "tf": 110
                      },
                      "QueryBuilder.html#.utils": {
                        "ref": "QueryBuilder.html#.utils",
                        "tf": 110
                      },
                      "QueryBuilder.html#$el": {
                        "ref": "QueryBuilder.html#$el",
                        "tf": 110
                      },
                      "QueryBuilder.html#filters": {
                        "ref": "QueryBuilder.html#filters",
                        "tf": 110
                      },
                      "QueryBuilder.html#icons": {
                        "ref": "QueryBuilder.html#icons",
                        "tf": 110
                      },
                      "QueryBuilder.html#lang": {
                        "ref": "QueryBuilder.html#lang",
                        "tf": 110
                      },
                      "QueryBuilder.html#model": {
                        "ref": "QueryBuilder.html#model",
                        "tf": 110
                      },
                      "QueryBuilder.html#operators": {
                        "ref": "QueryBuilder.html#operators",
                        "tf": 110
                      },
                      "QueryBuilder.html#plugins": {
                        "ref": "QueryBuilder.html#plugins",
                        "tf": 110
                      },
                      "QueryBuilder.html#settings": {
                        "ref": "QueryBuilder.html#settings",
                        "tf": 110
                      },
                      "QueryBuilder.html#templates": {
                        "ref": "QueryBuilder.html#templates",
                        "tf": 110
                      },
                      "Rule.html#$el": {
                        "ref": "Rule.html#$el",
                        "tf": 110
                      },
                      "Rule.html#data": {
                        "ref": "Rule.html#data",
                        "tf": 110
                      },
                      "Rule.html#error": {
                        "ref": "Rule.html#error",
                        "tf": 110
                      },
                      "Rule.html#filter": {
                        "ref": "Rule.html#filter",
                        "tf": 110
                      },
                      "Rule.html#flags": {
                        "ref": "Rule.html#flags",
                        "tf": 110
                      },
                      "Rule.html#id": {
                        "ref": "Rule.html#id",
                        "tf": 110
                      },
                      "Rule.html#level": {
                        "ref": "Rule.html#level",
                        "tf": 110
                      },
                      "Rule.html#model": {
                        "ref": "Rule.html#model",
                        "tf": 110
                      },
                      "Rule.html#operator": {
                        "ref": "Rule.html#operator",
                        "tf": 110
                      },
                      "Rule.html#parent": {
                        "ref": "Rule.html#parent",
                        "tf": 110
                      },
                      "Rule.html#value": {
                        "ref": "Rule.html#value",
                        "tf": 110
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "s": {
                "docs": {},
                "a": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "module-plugins.BtTooltipErrors.html": {
                        "ref": "module-plugins.BtTooltipErrors.html",
                        "tf": 8.333333333333332
                      },
                      "Utils.html#.error": {
                        "ref": "Utils.html#.error",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "d": {
              "docs": {},
              "u": {
                "docs": {},
                "l": {
                  "docs": {
                    "list_module.html": {
                      "ref": "list_module.html",
                      "tf": 635
                    },
                    "module-plugins.html": {
                      "ref": "module-plugins.html",
                      "tf": 110
                    }
                  },
                  "e": {
                    "docs": {},
                    ":": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "module-plugins.html": {
                                      "ref": "module-plugins.html",
                                      "tf": 1300
                                    }
                                  },
                                  "s": {
                                    "docs": {},
                                    ".": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "g": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "p": {
                                                      "docs": {
                                                        "Group.html#not": {
                                                          "ref": "Group.html#not",
                                                          "tf": 50
                                                        },
                                                        "module-plugins.NotGroup.html": {
                                                          "ref": "module-plugins.NotGroup.html",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "b": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "c": {
                                            "docs": {},
                                            "h": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "c": {
                                                  "docs": {},
                                                  "k": {
                                                    "docs": {},
                                                    "b": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "x": {
                                                          "docs": {
                                                            "module-plugins.BtCheckbox.html": {
                                                              "ref": "module-plugins.BtCheckbox.html",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "s": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "c": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "c": {
                                                            "docs": {},
                                                            "k": {
                                                              "docs": {
                                                                "module-plugins.BtSelectpicker.html": {
                                                                  "ref": "module-plugins.BtSelectpicker.html",
                                                                  "tf": 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "t": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "o": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {
                                                                    "module-plugins.BtTooltipErrors.html": {
                                                                      "ref": "module-plugins.BtTooltipErrors.html",
                                                                      "tf": 1150
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "c": {
                                        "docs": {},
                                        "h": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "n": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "f": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "module-plugins.ChangeFilters.html": {
                                                              "ref": "module-plugins.ChangeFilters.html",
                                                              "tf": 1150
                                                            }
                                                          },
                                                          "e": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "#": {
                                                                  "docs": {},
                                                                  "a": {
                                                                    "docs": {},
                                                                    "d": {
                                                                      "docs": {},
                                                                      "d": {
                                                                        "docs": {},
                                                                        "f": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "l": {
                                                                              "docs": {},
                                                                              "t": {
                                                                                "docs": {
                                                                                  "module-plugins.ChangeFilters.html#addFilter": {
                                                                                    "ref": "module-plugins.ChangeFilters.html#addFilter",
                                                                                    "tf": 1100
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  },
                                                                  "r": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "m": {
                                                                        "docs": {},
                                                                        "o": {
                                                                          "docs": {},
                                                                          "v": {
                                                                            "docs": {},
                                                                            "e": {
                                                                              "docs": {},
                                                                              "f": {
                                                                                "docs": {},
                                                                                "i": {
                                                                                  "docs": {},
                                                                                  "l": {
                                                                                    "docs": {},
                                                                                    "t": {
                                                                                      "docs": {
                                                                                        "module-plugins.ChangeFilters.html#removeFilter": {
                                                                                          "ref": "module-plugins.ChangeFilters.html#removeFilter",
                                                                                          "tf": 1100
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  },
                                                                  "s": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {},
                                                                        "f": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "l": {
                                                                              "docs": {},
                                                                              "t": {
                                                                                "docs": {
                                                                                  "module-plugins.ChangeFilters.html#setFilters": {
                                                                                    "ref": "module-plugins.ChangeFilters.html#setFilters",
                                                                                    "tf": 1100
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "o": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "c": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "p": {
                                                                "docs": {},
                                                                "i": {
                                                                  "docs": {},
                                                                  "c": {
                                                                    "docs": {},
                                                                    "k": {
                                                                      "docs": {
                                                                        "module-plugins.ChosenSelectpicker.html": {
                                                                          "ref": "module-plugins.ChosenSelectpicker.html",
                                                                          "tf": 1150
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "f": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "d": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "c": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "p": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {
                                                                    "module-plugins.FilterDescription.html": {
                                                                      "ref": "module-plugins.FilterDescription.html",
                                                                      "tf": 1150
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "v": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "module-plugins.Invert.html": {
                                                      "ref": "module-plugins.Invert.html",
                                                      "tf": 1150
                                                    }
                                                  },
                                                  "#": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "v": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {
                                                                  "module-plugins.Invert.html#invert": {
                                                                    "ref": "module-plugins.Invert.html#invert",
                                                                    "tf": 1100
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "m": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "g": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {},
                                                  "b": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {},
                                                          "p": {
                                                            "docs": {},
                                                            "o": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {
                                                                    "module-plugins.MongoDbSupport.html": {
                                                                      "ref": "module-plugins.MongoDbSupport.html",
                                                                      "tf": 1150
                                                                    }
                                                                  },
                                                                  "#": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "e": {
                                                                        "docs": {},
                                                                        "t": {
                                                                          "docs": {},
                                                                          "m": {
                                                                            "docs": {},
                                                                            "o": {
                                                                              "docs": {},
                                                                              "n": {
                                                                                "docs": {},
                                                                                "g": {
                                                                                  "docs": {},
                                                                                  "o": {
                                                                                    "docs": {
                                                                                      "module-plugins.MongoDbSupport.html#getMongo": {
                                                                                        "ref": "module-plugins.MongoDbSupport.html#getMongo",
                                                                                        "tf": 1100
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          },
                                                                          "r": {
                                                                            "docs": {},
                                                                            "u": {
                                                                              "docs": {},
                                                                              "l": {
                                                                                "docs": {},
                                                                                "e": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {},
                                                                                    "f": {
                                                                                      "docs": {},
                                                                                      "r": {
                                                                                        "docs": {},
                                                                                        "o": {
                                                                                          "docs": {},
                                                                                          "m": {
                                                                                            "docs": {},
                                                                                            "m": {
                                                                                              "docs": {},
                                                                                              "o": {
                                                                                                "docs": {},
                                                                                                "n": {
                                                                                                  "docs": {},
                                                                                                  "g": {
                                                                                                    "docs": {},
                                                                                                    "o": {
                                                                                                      "docs": {
                                                                                                        "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                                                                                                          "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                                                                                                          "tf": 1100
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    },
                                                                    "s": {
                                                                      "docs": {},
                                                                      "e": {
                                                                        "docs": {},
                                                                        "t": {
                                                                          "docs": {},
                                                                          "r": {
                                                                            "docs": {},
                                                                            "u": {
                                                                              "docs": {},
                                                                              "l": {
                                                                                "docs": {},
                                                                                "e": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {},
                                                                                    "f": {
                                                                                      "docs": {},
                                                                                      "r": {
                                                                                        "docs": {},
                                                                                        "o": {
                                                                                          "docs": {},
                                                                                          "m": {
                                                                                            "docs": {},
                                                                                            "m": {
                                                                                              "docs": {},
                                                                                              "o": {
                                                                                                "docs": {},
                                                                                                "n": {
                                                                                                  "docs": {},
                                                                                                  "g": {
                                                                                                    "docs": {},
                                                                                                    "o": {
                                                                                                      "docs": {
                                                                                                        "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                                                                                                          "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                                                                                                          "tf": 1100
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "module-plugins.Sortable.html": {
                                                  "ref": "module-plugins.Sortable.html",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "q": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {},
                                                  "p": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "module-plugins.SqlSupport.html": {
                                                              "ref": "module-plugins.SqlSupport.html",
                                                              "tf": 1150
                                                            }
                                                          },
                                                          "#": {
                                                            "docs": {},
                                                            "g": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "u": {
                                                                      "docs": {},
                                                                      "l": {
                                                                        "docs": {},
                                                                        "e": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "f": {
                                                                              "docs": {},
                                                                              "r": {
                                                                                "docs": {},
                                                                                "o": {
                                                                                  "docs": {},
                                                                                  "m": {
                                                                                    "docs": {},
                                                                                    "s": {
                                                                                      "docs": {},
                                                                                      "q": {
                                                                                        "docs": {},
                                                                                        "l": {
                                                                                          "docs": {
                                                                                            "module-plugins.SqlSupport.html#getRulesFromSQL": {
                                                                                              "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                                                                                              "tf": 1100
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  },
                                                                  "s": {
                                                                    "docs": {},
                                                                    "q": {
                                                                      "docs": {},
                                                                      "l": {
                                                                        "docs": {
                                                                          "module-plugins.SqlSupport.html#getSQL": {
                                                                            "ref": "module-plugins.SqlSupport.html#getSQL",
                                                                            "tf": 1100
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            },
                                                            "s": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "u": {
                                                                      "docs": {},
                                                                      "l": {
                                                                        "docs": {},
                                                                        "e": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "f": {
                                                                              "docs": {},
                                                                              "r": {
                                                                                "docs": {},
                                                                                "o": {
                                                                                  "docs": {},
                                                                                  "m": {
                                                                                    "docs": {},
                                                                                    "s": {
                                                                                      "docs": {},
                                                                                      "q": {
                                                                                        "docs": {},
                                                                                        "l": {
                                                                                          "docs": {
                                                                                            "module-plugins.SqlSupport.html#setRulesFromSQL": {
                                                                                              "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                                                                                              "tf": 1100
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          },
                                                          ".": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {},
                                                              "q": {
                                                                "docs": {},
                                                                "l": {
                                                                  "docs": {},
                                                                  "q": {
                                                                    "docs": {},
                                                                    "u": {
                                                                      "docs": {},
                                                                      "e": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {
                                                                              "module-plugins.SqlSupport.html#getSQL": {
                                                                                "ref": "module-plugins.SqlSupport.html#getSQL",
                                                                                "tf": 20
                                                                              },
                                                                              "module-plugins.SqlSupport.html#.SqlQuery": {
                                                                                "ref": "module-plugins.SqlSupport.html#.SqlQuery",
                                                                                "tf": 1100
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "u": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "q": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "f": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "module-plugins.UniqueFilter.html": {
                                                              "ref": "module-plugins.UniqueFilter.html",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "l": {
                  "docs": {
                    "Group.html#model": {
                      "ref": "Group.html#model",
                      "tf": 716.6666666666666
                    },
                    "Model.html": {
                      "ref": "Model.html",
                      "tf": 1912.5
                    },
                    "Model.html#off": {
                      "ref": "Model.html#off",
                      "tf": 45.83333333333333
                    },
                    "Model.html#on": {
                      "ref": "Model.html#on",
                      "tf": 45.83333333333333
                    },
                    "Model.html#once": {
                      "ref": "Model.html#once",
                      "tf": 33.33333333333333
                    },
                    "Model.html#trigger": {
                      "ref": "Model.html#trigger",
                      "tf": 16.666666666666664
                    },
                    "Node.html#model": {
                      "ref": "Node.html#model",
                      "tf": 716.6666666666666
                    },
                    "QueryBuilder.html#model": {
                      "ref": "QueryBuilder.html#model",
                      "tf": 741.6666666666666
                    },
                    "QueryBuilder.html#getModel": {
                      "ref": "QueryBuilder.html#getModel",
                      "tf": 14.285714285714285
                    },
                    "Rule.html#model": {
                      "ref": "Rule.html#model",
                      "tf": 716.6666666666666
                    },
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 2.380952380952381
                    }
                  },
                  "#": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "Model.html#root": {
                                "ref": "Model.html#root",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "f": {
                          "docs": {
                            "Model.html#off": {
                              "ref": "Model.html#off",
                              "tf": 1300
                            }
                          }
                        }
                      },
                      "n": {
                        "docs": {
                          "Model.html#on": {
                            "ref": "Model.html#on",
                            "tf": 1300
                          }
                        },
                        "c": {
                          "docs": {
                            "Model.html#once": {
                              "ref": "Model.html#once",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "t": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "g": {
                              "docs": {
                                "Model.html#trigger": {
                                  "ref": "Model.html#trigger",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {
                                              "Model.html#GroupIteratee": {
                                                "ref": "Model.html#GroupIteratee",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "i": {
                "docs": {},
                "f": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "QueryBuilder.html#change": {
                        "ref": "QueryBuilder.html#change",
                        "tf": 7.142857142857142
                      },
                      "QueryBuilder.html#setOptions": {
                        "ref": "QueryBuilder.html#setOptions",
                        "tf": 14.285714285714285
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {
                  "Group.html#move": {
                    "ref": "Group.html#move",
                    "tf": 693.3333333333334
                  },
                  "Group.html#moveAfter": {
                    "ref": "Group.html#moveAfter",
                    "tf": 12.5
                  },
                  "Group.html#moveAtBegin": {
                    "ref": "Group.html#moveAtBegin",
                    "tf": 8.333333333333332
                  },
                  "Group.html#moveAtEnd": {
                    "ref": "Group.html#moveAtEnd",
                    "tf": 8.333333333333332
                  },
                  "Node.html#move": {
                    "ref": "Node.html#move",
                    "tf": 693.3333333333334
                  },
                  "Node.html#moveAfter": {
                    "ref": "Node.html#moveAfter",
                    "tf": 12.5
                  },
                  "Node.html#moveAtBegin": {
                    "ref": "Node.html#moveAtBegin",
                    "tf": 8.333333333333332
                  },
                  "Node.html#moveAtEnd": {
                    "ref": "Node.html#moveAtEnd",
                    "tf": 8.333333333333332
                  },
                  "Rule.html#move": {
                    "ref": "Rule.html#move",
                    "tf": 693.3333333333334
                  },
                  "Rule.html#moveAfter": {
                    "ref": "Rule.html#moveAfter",
                    "tf": 12.5
                  },
                  "Rule.html#moveAtBegin": {
                    "ref": "Rule.html#moveAtBegin",
                    "tf": 8.333333333333332
                  },
                  "Rule.html#moveAtEnd": {
                    "ref": "Rule.html#moveAtEnd",
                    "tf": 8.333333333333332
                  }
                },
                "a": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Group.html#moveAfter": {
                          "ref": "Group.html#moveAfter",
                          "tf": 700
                        },
                        "Node.html#moveAfter": {
                          "ref": "Node.html#moveAfter",
                          "tf": 700
                        },
                        "Rule.html#moveAfter": {
                          "ref": "Rule.html#moveAfter",
                          "tf": 700
                        }
                      }
                    }
                  },
                  "t": {
                    "docs": {},
                    "b": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "g": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "n": {
                              "docs": {
                                "Group.html#moveAtBegin": {
                                  "ref": "Group.html#moveAtBegin",
                                  "tf": 700
                                },
                                "Node.html#moveAtBegin": {
                                  "ref": "Node.html#moveAtBegin",
                                  "tf": 700
                                },
                                "Rule.html#moveAtBegin": {
                                  "ref": "Rule.html#moveAtBegin",
                                  "tf": 700
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Group.html#moveAtEnd": {
                              "ref": "Group.html#moveAtEnd",
                              "tf": 700
                            },
                            "Node.html#moveAtEnd": {
                              "ref": "Node.html#moveAtEnd",
                              "tf": 700
                            },
                            "Rule.html#moveAtEnd": {
                              "ref": "Rule.html#moveAtEnd",
                              "tf": 700
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "g": {
                "docs": {},
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "b": {
                      "docs": {
                        "module-plugins.MongoDbSupport.html": {
                          "ref": "module-plugins.MongoDbSupport.html",
                          "tf": 9.090909090909092
                        },
                        "module-plugins.MongoDbSupport.html#getMongo": {
                          "ref": "module-plugins.MongoDbSupport.html#getMongo",
                          "tf": 12.5
                        },
                        "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                          "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                          "tf": 12.5
                        },
                        "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                          "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                          "tf": 12.5
                        }
                      },
                      "s": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "p": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "module-plugins.MongoDbSupport.html": {
                                        "ref": "module-plugins.MongoDbSupport.html",
                                        "tf": 650
                                      }
                                    },
                                    "#": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "g": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {
                                                        "module-plugins.MongoDbSupport.html#getMongo": {
                                                          "ref": "module-plugins.MongoDbSupport.html#getMongo",
                                                          "tf": 100
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "r": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "f": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "n": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {
                                                                          "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                                                                            "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                                                                            "tf": 100
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "f": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "n": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {
                                                                          "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                                                                            "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                                                                            "tf": 100
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "i": {
              "docs": {},
              "n": {
                "docs": {
                  "Model.html": {
                    "ref": "Model.html",
                    "tf": 6.25
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "k": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "QueryBuilder.html#clearErrors": {
                        "ref": "QueryBuilder.html#clearErrors",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "s": {
              "docs": {},
              "q": {
                "docs": {},
                "l": {
                  "docs": {},
                  "_": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "_": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "_": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {
                                                    "Utils.html#.escapeString": {
                                                      "ref": "Utils.html#.escapeString",
                                                      "tf": 12.5
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "n": {
          "docs": {},
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "Utils.html#.error": {
                    "ref": "Utils.html#.error",
                    "tf": 7.142857142857142
                  }
                },
                "s": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "c": {
                        "docs": {
                          "list_namespace.html": {
                            "ref": "list_namespace.html",
                            "tf": 635
                          },
                          "external-_jQuery.fn_.html": {
                            "ref": "external-_jQuery.fn_.html",
                            "tf": 16.666666666666664
                          },
                          "Utils.html": {
                            "ref": "Utils.html",
                            "tf": 110
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "w": {
              "docs": {
                "Group.html#addGroup": {
                  "ref": "Group.html#addGroup",
                  "tf": 10
                },
                "Group.html#addRule": {
                  "ref": "Group.html#addRule",
                  "tf": 10
                },
                "module-plugins.ChangeFilters.html#addFilter": {
                  "ref": "module-plugins.ChangeFilters.html#addFilter",
                  "tf": 12.5
                },
                "QueryBuilder.html#addGroup": {
                  "ref": "QueryBuilder.html#addGroup",
                  "tf": 16.666666666666664
                },
                "QueryBuilder.html#addRule": {
                  "ref": "QueryBuilder.html#addRule",
                  "tf": 16.666666666666664
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "module-plugins.ChangeFilters.html#addFilter": {
                          "ref": "module-plugins.ChangeFilters.html#addFilter",
                          "tf": 33.33333333333333
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "Group.html#contains": {
                    "ref": "Group.html#contains",
                    "tf": 35
                  },
                  "Group.html#each": {
                    "ref": "Group.html#each",
                    "tf": 16.666666666666664
                  },
                  "Group.html#getNodePos": {
                    "ref": "Group.html#getNodePos",
                    "tf": 45.83333333333333
                  },
                  "Group.html#getPos": {
                    "ref": "Group.html#getPos",
                    "tf": 10
                  },
                  "Group.html#insertNode": {
                    "ref": "Group.html#insertNode",
                    "tf": 52.5
                  },
                  "Group.html#isRoot": {
                    "ref": "Group.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "Group.html#moveAfter": {
                    "ref": "Group.html#moveAfter",
                    "tf": 12.5
                  },
                  "Group.html#removeNode": {
                    "ref": "Group.html#removeNode",
                    "tf": 66.66666666666666
                  },
                  "Model.html#GroupIteratee": {
                    "ref": "Model.html#GroupIteratee",
                    "tf": 33.33333333333333
                  },
                  "module-plugins.Invert.html#invert": {
                    "ref": "module-plugins.Invert.html#invert",
                    "tf": 33.33333333333333
                  },
                  "Node.html": {
                    "ref": "Node.html",
                    "tf": 1900
                  },
                  "Node.html#getPos": {
                    "ref": "Node.html#getPos",
                    "tf": 10
                  },
                  "Node.html#isRoot": {
                    "ref": "Node.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "Node.html#moveAfter": {
                    "ref": "Node.html#moveAfter",
                    "tf": 12.5
                  },
                  "QueryBuilder.html#clearErrors": {
                    "ref": "QueryBuilder.html#clearErrors",
                    "tf": 50
                  },
                  "QueryBuilder.html#getModel": {
                    "ref": "QueryBuilder.html#getModel",
                    "tf": 33.33333333333333
                  },
                  "Rule.html#getPos": {
                    "ref": "Rule.html#getPos",
                    "tf": 10
                  },
                  "Rule.html#isRoot": {
                    "ref": "Rule.html#isRoot",
                    "tf": 16.666666666666664
                  },
                  "Rule.html#moveAfter": {
                    "ref": "Rule.html#moveAfter",
                    "tf": 12.5
                  },
                  "Utils.html#.defineModelProperties": {
                    "ref": "Utils.html#.defineModelProperties",
                    "tf": 2.380952380952381
                  }
                },
                "#": {
                  "docs": {},
                  "$": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {
                          "Node.html#$el": {
                            "ref": "Node.html#$el",
                            "tf": 1150
                          }
                        }
                      }
                    }
                  },
                  "d": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "a": {
                          "docs": {
                            "Node.html#data": {
                              "ref": "Node.html#data",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "Node.html#drop": {
                              "ref": "Node.html#drop",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "r": {
                            "docs": {
                              "Node.html#error": {
                                "ref": "Node.html#error",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "f": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "g": {
                          "docs": {
                            "Node.html#flags": {
                              "ref": "Node.html#flags",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    }
                  },
                  "i": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Node.html#id": {
                          "ref": "Node.html#id",
                          "tf": 1150
                        }
                      }
                    },
                    "s": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Node.html#isRoot": {
                                  "ref": "Node.html#isRoot",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "v": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "Node.html#level": {
                                "ref": "Node.html#level",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "l": {
                            "docs": {
                              "Node.html#model": {
                                "ref": "Node.html#model",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "v": {
                        "docs": {
                          "Node.html#move": {
                            "ref": "Node.html#move",
                            "tf": 1150
                          }
                        },
                        "e": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "f": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "Node.html#moveAfter": {
                                    "ref": "Node.html#moveAfter",
                                    "tf": 1150
                                  }
                                }
                              }
                            },
                            "t": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "g": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "n": {
                                        "docs": {
                                          "Node.html#moveAtBegin": {
                                            "ref": "Node.html#moveAtBegin",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "d": {
                                    "docs": {
                                      "Node.html#moveAtEnd": {
                                        "ref": "Node.html#moveAtEnd",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "p": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "Node.html#parent": {
                            "ref": "Node.html#parent",
                            "tf": 1150
                          }
                        }
                      }
                    }
                  },
                  "g": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "o": {
                            "docs": {
                              "Node.html#getPos": {
                                "ref": "Node.html#getPos",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "g": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "module-plugins.NotGroup.html": {
                            "ref": "module-plugins.NotGroup.html",
                            "tf": 650
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "_": {
              "docs": {},
              "d": {
                "docs": {},
                "e": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "QueryBuilder.html#deleteGroup": {
                            "ref": "QueryBuilder.html#deleteGroup",
                            "tf": 5.555555555555555
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {
                "Utils.html#.defineModelProperties": {
                  "ref": "Utils.html#.defineModelProperties",
                  "tf": 2.380952380952381
                }
              }
            }
          },
          "u": {
            "docs": {},
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Group.html#length": {
                        "ref": "Group.html#length",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {
              "module-plugins.SqlSupport.html#getSQL": {
                "ref": "module-plugins.SqlSupport.html#getSQL",
                "tf": 20
              }
            }
          }
        },
        "g": {
          "docs": {},
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "u": {
                "docs": {},
                "p": {
                  "docs": {
                    "Group.html": {
                      "ref": "Group.html",
                      "tf": 1925
                    },
                    "Group.html#parent": {
                      "ref": "Group.html#parent",
                      "tf": 33.33333333333333
                    },
                    "Group.html#addGroup": {
                      "ref": "Group.html#addGroup",
                      "tf": 35
                    },
                    "Group.html#contains": {
                      "ref": "Group.html#contains",
                      "tf": 10
                    },
                    "Group.html#move": {
                      "ref": "Group.html#move",
                      "tf": 10
                    },
                    "Group.html#moveAtBegin": {
                      "ref": "Group.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Group.html#moveAtEnd": {
                      "ref": "Group.html#moveAtEnd",
                      "tf": 8.333333333333332
                    },
                    "Model.html#root": {
                      "ref": "Model.html#root",
                      "tf": 33.33333333333333
                    },
                    "module-plugins.Invert.html": {
                      "ref": "module-plugins.Invert.html",
                      "tf": 6.25
                    },
                    "module-plugins.Invert.html#invert": {
                      "ref": "module-plugins.Invert.html#invert",
                      "tf": 10
                    },
                    "module-plugins.NotGroup.html": {
                      "ref": "module-plugins.NotGroup.html",
                      "tf": 8.333333333333332
                    },
                    "module-plugins.UniqueFilter.html": {
                      "ref": "module-plugins.UniqueFilter.html",
                      "tf": 4.545454545454546
                    },
                    "Node.html#parent": {
                      "ref": "Node.html#parent",
                      "tf": 33.33333333333333
                    },
                    "Node.html#move": {
                      "ref": "Node.html#move",
                      "tf": 10
                    },
                    "Node.html#moveAtBegin": {
                      "ref": "Node.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Node.html#moveAtEnd": {
                      "ref": "Node.html#moveAtEnd",
                      "tf": 8.333333333333332
                    },
                    "QueryBuilder.html#.Group": {
                      "ref": "QueryBuilder.html#.Group",
                      "tf": 683.3333333333334
                    },
                    "QueryBuilder.html#addGroup": {
                      "ref": "QueryBuilder.html#addGroup",
                      "tf": 33.33333333333333
                    },
                    "QueryBuilder.html#clear": {
                      "ref": "QueryBuilder.html#clear",
                      "tf": 10
                    },
                    "QueryBuilder.html#deleteGroup": {
                      "ref": "QueryBuilder.html#deleteGroup",
                      "tf": 44.44444444444444
                    },
                    "QueryBuilder.html#reset": {
                      "ref": "QueryBuilder.html#reset",
                      "tf": 10
                    },
                    "QueryBuilder.html#setRoot": {
                      "ref": "QueryBuilder.html#setRoot",
                      "tf": 36.666666666666664
                    },
                    "Rule.html#parent": {
                      "ref": "Rule.html#parent",
                      "tf": 33.33333333333333
                    },
                    "Rule.html#move": {
                      "ref": "Rule.html#move",
                      "tf": 10
                    },
                    "Rule.html#moveAtBegin": {
                      "ref": "Rule.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Rule.html#moveAtEnd": {
                      "ref": "Rule.html#moveAtEnd",
                      "tf": 8.333333333333332
                    },
                    "Utils.html#.groupSort": {
                      "ref": "Utils.html#.groupSort",
                      "tf": 6.25
                    }
                  },
                  "#": {
                    "docs": {},
                    "$": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "l": {
                          "docs": {
                            "Group.html#$el": {
                              "ref": "Group.html#$el",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "c": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "d": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "Group.html#condition": {
                                    "ref": "Group.html#condition",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          },
                          "t": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "Group.html#contains": {
                                      "ref": "Group.html#contains",
                                      "tf": 1150
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "d": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "a": {
                            "docs": {
                              "Group.html#data": {
                                "ref": "Group.html#data",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "p": {
                            "docs": {
                              "Group.html#drop": {
                                "ref": "Group.html#drop",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    },
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "Group.html#error": {
                                  "ref": "Group.html#error",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      },
                      "a": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "h": {
                            "docs": {
                              "Group.html#each": {
                                "ref": "Group.html#each",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "m": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "i": {
                              "docs": {
                                "Group.html#empty": {
                                  "ref": "Group.html#empty",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "f": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "g": {
                            "docs": {
                              "Group.html#flags": {
                                "ref": "Group.html#flags",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    },
                    "i": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "Group.html#id": {
                            "ref": "Group.html#id",
                            "tf": 1150
                          }
                        }
                      },
                      "n": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "Group.html#insertNode": {
                                          "ref": "Group.html#insertNode",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "s": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "Group.html#isRoot": {
                                    "ref": "Group.html#isRoot",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Group.html#level": {
                                  "ref": "Group.html#level",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        },
                        "n": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "h": {
                                "docs": {
                                  "Group.html#length": {
                                    "ref": "Group.html#length",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "m": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Group.html#model": {
                                  "ref": "Group.html#model",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        },
                        "v": {
                          "docs": {
                            "Group.html#move": {
                              "ref": "Group.html#move",
                              "tf": 1150
                            }
                          },
                          "e": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "f": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "Group.html#moveAfter": {
                                      "ref": "Group.html#moveAfter",
                                      "tf": 1150
                                    }
                                  }
                                }
                              },
                              "t": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "Group.html#moveAtBegin": {
                                              "ref": "Group.html#moveAtBegin",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "e": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "Group.html#moveAtEnd": {
                                          "ref": "Group.html#moveAtEnd",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "n": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Group.html#not": {
                              "ref": "Group.html#not",
                              "tf": 1300
                            }
                          }
                        }
                      }
                    },
                    "p": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "r": {
                          "docs": {
                            "Group.html#parent": {
                              "ref": "Group.html#parent",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "l": {
                          "docs": {
                            "Group.html#rules": {
                              "ref": "Group.html#rules",
                              "tf": 1150
                            }
                          }
                        }
                      },
                      "e": {
                        "docs": {},
                        "m": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "v": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "Group.html#removeNode": {
                                          "ref": "Group.html#removeNode",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "a": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "p": {
                                    "docs": {
                                      "Group.html#addGroup": {
                                        "ref": "Group.html#addGroup",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "r": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "l": {
                                "docs": {
                                  "Group.html#addRule": {
                                    "ref": "Group.html#addRule",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "d": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "o": {
                                      "docs": {
                                        "Group.html#getNodePos": {
                                          "ref": "Group.html#getNodePos",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "p": {
                            "docs": {},
                            "o": {
                              "docs": {
                                "Group.html#getPos": {
                                  "ref": "Group.html#getPos",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "'": {
                    "docs": {
                      "Group.html#empty": {
                        "ref": "Group.html#empty",
                        "tf": 16.666666666666664
                      }
                    }
                  },
                  "i": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {
                                  "Model.html#GroupIteratee": {
                                    "ref": "Model.html#GroupIteratee",
                                    "tf": 683.3333333333334
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "s": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Utils.html#.groupSort": {
                              "ref": "Utils.html#.groupSort",
                              "tf": 670
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "QueryBuilder.html#getRules": {
                  "ref": "QueryBuilder.html#getRules",
                  "tf": 10
                }
              },
              "n": {
                "docs": {},
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "o": {
                          "docs": {
                            "Group.html#getNodePos": {
                              "ref": "Group.html#getNodePos",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "o": {
                  "docs": {
                    "Group.html#getPos": {
                      "ref": "Group.html#getPos",
                      "tf": 700
                    },
                    "Node.html#getPos": {
                      "ref": "Node.html#getPos",
                      "tf": 700
                    },
                    "Rule.html#getPos": {
                      "ref": "Rule.html#getPos",
                      "tf": 700
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "g": {
                      "docs": {},
                      "o": {
                        "docs": {
                          "module-plugins.MongoDbSupport.html#getMongo": {
                            "ref": "module-plugins.MongoDbSupport.html#getMongo",
                            "tf": 633.3333333333334
                          }
                        }
                      }
                    }
                  },
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {
                          "QueryBuilder.html#getModel": {
                            "ref": "QueryBuilder.html#getModel",
                            "tf": 683.3333333333334
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "QueryBuilder.html#getRules": {
                        "ref": "QueryBuilder.html#getRules",
                        "tf": 683.3333333333334
                      }
                    },
                    "e": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "o": {
                                          "docs": {
                                            "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                                              "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                                              "tf": 633.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "s": {
                                  "docs": {},
                                  "q": {
                                    "docs": {},
                                    "l": {
                                      "docs": {
                                        "module-plugins.SqlSupport.html#getRulesFromSQL": {
                                          "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                                          "tf": 625
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "q": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "module-plugins.SqlSupport.html#getSQL": {
                        "ref": "module-plugins.SqlSupport.html#getSQL",
                        "tf": 620
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Utils.html#.defineModelProperties": {
                        "ref": "Utils.html#.defineModelProperties",
                        "tf": 2.380952380952381
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "module-plugins.UniqueFilter.html": {
                        "ref": "module-plugins.UniqueFilter.html",
                        "tf": 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "o": {
          "docs": {},
          "b": {
            "docs": {},
            "j": {
              "docs": {
                "Utils.html#.defineModelProperties": {
                  "ref": "Utils.html#.defineModelProperties",
                  "tf": 25
                }
              },
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Group.html": {
                        "ref": "Group.html",
                        "tf": 25
                      },
                      "Group.html#data": {
                        "ref": "Group.html#data",
                        "tf": 50
                      },
                      "Group.html#flags": {
                        "ref": "Group.html#flags",
                        "tf": 33.33333333333333
                      },
                      "Model.html": {
                        "ref": "Model.html",
                        "tf": 6.25
                      },
                      "module-plugins.MongoDbSupport.html": {
                        "ref": "module-plugins.MongoDbSupport.html",
                        "tf": 9.090909090909092
                      },
                      "module-plugins.MongoDbSupport.html#getMongo": {
                        "ref": "module-plugins.MongoDbSupport.html#getMongo",
                        "tf": 33.33333333333333
                      },
                      "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
                        "ref": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
                        "tf": 33.33333333333333
                      },
                      "module-plugins.SqlSupport.html#getRulesFromSQL": {
                        "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                        "tf": 25
                      },
                      "Node.html": {
                        "ref": "Node.html",
                        "tf": 16.666666666666664
                      },
                      "Node.html#data": {
                        "ref": "Node.html#data",
                        "tf": 50
                      },
                      "Node.html#flags": {
                        "ref": "Node.html#flags",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#.DEFAULTS": {
                        "ref": "QueryBuilder.html#.DEFAULTS",
                        "tf": 25
                      },
                      "QueryBuilder.html#.utils": {
                        "ref": "QueryBuilder.html#.utils",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#lang": {
                        "ref": "QueryBuilder.html#lang",
                        "tf": 58.33333333333333
                      },
                      "QueryBuilder.html#settings": {
                        "ref": "QueryBuilder.html#settings",
                        "tf": 58.33333333333333
                      },
                      "QueryBuilder.html#getModel": {
                        "ref": "QueryBuilder.html#getModel",
                        "tf": 7.142857142857142
                      },
                      "QueryBuilder.html#getRules": {
                        "ref": "QueryBuilder.html#getRules",
                        "tf": 43.33333333333333
                      },
                      "QueryBuilder.html#setRules": {
                        "ref": "QueryBuilder.html#setRules",
                        "tf": 16.666666666666664
                      },
                      "QueryBuilder.html#translate": {
                        "ref": "QueryBuilder.html#translate",
                        "tf": 9.090909090909092
                      },
                      "Rule.html": {
                        "ref": "Rule.html",
                        "tf": 25
                      },
                      "Rule.html#data": {
                        "ref": "Rule.html#data",
                        "tf": 50
                      },
                      "Rule.html#flags": {
                        "ref": "Rule.html#flags",
                        "tf": 33.33333333333333
                      },
                      "Utils.html#.defineModelProperties": {
                        "ref": "Utils.html#.defineModelProperties",
                        "tf": 4.761904761904762
                      },
                      "Utils.html#.error": {
                        "ref": "Utils.html#.error",
                        "tf": 7.142857142857142
                      },
                      "Utils.html#.groupSort": {
                        "ref": "Utils.html#.groupSort",
                        "tf": 6.25
                      }
                    },
                    "&": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "QueryBuilder.html#.OPERATORS": {
                              "ref": "QueryBuilder.html#.OPERATORS",
                              "tf": 20
                            },
                            "QueryBuilder.html#.regional": {
                              "ref": "QueryBuilder.html#.regional",
                              "tf": 20
                            },
                            "QueryBuilder.html#plugins": {
                              "ref": "QueryBuilder.html#plugins",
                              "tf": 25
                            }
                          }
                        }
                      }
                    },
                    ".": {
                      "docs": {},
                      "&": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            ";": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "QueryBuilder.html#.OPERATORS": {
                                        "ref": "QueryBuilder.html#.OPERATORS",
                                        "tf": 20
                                      },
                                      "QueryBuilder.html#.regional": {
                                        "ref": "QueryBuilder.html#.regional",
                                        "tf": 20
                                      },
                                      "QueryBuilder.html#.selectors": {
                                        "ref": "QueryBuilder.html#.selectors",
                                        "tf": 20
                                      },
                                      "QueryBuilder.html#.templates": {
                                        "ref": "QueryBuilder.html#.templates",
                                        "tf": 20
                                      },
                                      "QueryBuilder.html#icons": {
                                        "ref": "QueryBuilder.html#icons",
                                        "tf": 25
                                      },
                                      "QueryBuilder.html#plugins": {
                                        "ref": "QueryBuilder.html#plugins",
                                        "tf": 25
                                      },
                                      "QueryBuilder.html#templates": {
                                        "ref": "QueryBuilder.html#templates",
                                        "tf": 25
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "Group.html#each": {
                    "ref": "Group.html#each",
                    "tf": 16.666666666666664
                  },
                  "Utils.html#.iterateOptions": {
                    "ref": "Utils.html#.iterateOptions",
                    "tf": 7.142857142857142
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "module-plugins.UniqueFilter.html": {
                "ref": "module-plugins.UniqueFilter.html",
                "tf": 4.545454545454546
              },
              "QueryBuilder.html#deleteGroup": {
                "ref": "QueryBuilder.html#deleteGroup",
                "tf": 5.555555555555555
              }
            },
            "c": {
              "docs": {
                "Model.html#once": {
                  "ref": "Model.html#once",
                  "tf": 683.3333333333334
                },
                "QueryBuilder.html#once": {
                  "ref": "QueryBuilder.html#once",
                  "tf": 682.1428571428571
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "module-plugins.Invert.html": {
                    "ref": "module-plugins.Invert.html",
                    "tf": 6.25
                  },
                  "QueryBuilder.html#.OPERATORS": {
                    "ref": "QueryBuilder.html#.OPERATORS",
                    "tf": 695
                  },
                  "QueryBuilder.html#operators": {
                    "ref": "QueryBuilder.html#operators",
                    "tf": 708.3333333333334
                  },
                  "QueryBuilder.html#checkOperators": {
                    "ref": "QueryBuilder.html#checkOperators",
                    "tf": 45.83333333333333
                  },
                  "QueryBuilder.html#.Operator": {
                    "ref": "QueryBuilder.html#.Operator",
                    "tf": 750
                  },
                  "Rule.html#operator": {
                    "ref": "Rule.html#operator",
                    "tf": 700
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "module-plugins.Invert.html#invert": {
                        "ref": "module-plugins.Invert.html#invert",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#getRules": {
                        "ref": "QueryBuilder.html#getRules",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#setOptions": {
                        "ref": "QueryBuilder.html#setOptions",
                        "tf": 57.14285714285714
                      },
                      "QueryBuilder.html#setRules": {
                        "ref": "QueryBuilder.html#setRules",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#validate": {
                        "ref": "QueryBuilder.html#validate",
                        "tf": 33.33333333333333
                      },
                      "Utils.html#.iterateOptions": {
                        "ref": "Utils.html#.iterateOptions",
                        "tf": 32.14285714285714
                      }
                    },
                    "s": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "e": {
                                    "docs": {
                                      "Utils.html#OptionsIteratee": {
                                        "ref": "Utils.html#OptionsIteratee",
                                        "tf": 675
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "g": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "Utils.html#OptionsIteratee": {
                            "ref": "Utils.html#OptionsIteratee",
                            "tf": 25
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Utils.html#.groupSort": {
                      "ref": "Utils.html#.groupSort",
                      "tf": 6.25
                    }
                  }
                }
              }
            }
          }
        },
        "s": {
          "docs": {},
          "t": {
            "docs": {},
            "r": {
              "docs": {
                "Utils.html#.escapeElementId": {
                  "ref": "Utils.html#.escapeElementId",
                  "tf": 25
                },
                "Utils.html#.escapeRegExp": {
                  "ref": "Utils.html#.escapeRegExp",
                  "tf": 25
                },
                "Utils.html#.fmt": {
                  "ref": "Utils.html#.fmt",
                  "tf": 20
                }
              },
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "Group.html#condition": {
                        "ref": "Group.html#condition",
                        "tf": 50
                      },
                      "Group.html#error": {
                        "ref": "Group.html#error",
                        "tf": 50
                      },
                      "Group.html#id": {
                        "ref": "Group.html#id",
                        "tf": 33.33333333333333
                      },
                      "Node.html#error": {
                        "ref": "Node.html#error",
                        "tf": 50
                      },
                      "Node.html#id": {
                        "ref": "Node.html#id",
                        "tf": 33.33333333333333
                      },
                      "QueryBuilder.html#.regional": {
                        "ref": "QueryBuilder.html#.regional",
                        "tf": 12.5
                      },
                      "QueryBuilder.html#.templates": {
                        "ref": "QueryBuilder.html#.templates",
                        "tf": 12.5
                      },
                      "QueryBuilder.html#translate": {
                        "ref": "QueryBuilder.html#translate",
                        "tf": 25
                      },
                      "Rule.html#error": {
                        "ref": "Rule.html#error",
                        "tf": 50
                      },
                      "Rule.html#id": {
                        "ref": "Rule.html#id",
                        "tf": 33.33333333333333
                      },
                      "Utils.html#.escapeElementId": {
                        "ref": "Utils.html#.escapeElementId",
                        "tf": 33.33333333333333
                      },
                      "Utils.html#.escapeRegExp": {
                        "ref": "Utils.html#.escapeRegExp",
                        "tf": 37.5
                      },
                      "Utils.html#.escapeString": {
                        "ref": "Utils.html#.escapeString",
                        "tf": 37.5
                      },
                      "Utils.html#.fmt": {
                        "ref": "Utils.html#.fmt",
                        "tf": 32.5
                      }
                    },
                    "&": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "QueryBuilder.html#.selectors": {
                              "ref": "QueryBuilder.html#.selectors",
                              "tf": 20
                            },
                            "QueryBuilder.html#.templates": {
                              "ref": "QueryBuilder.html#.templates",
                              "tf": 20
                            },
                            "QueryBuilder.html#icons": {
                              "ref": "QueryBuilder.html#icons",
                              "tf": 25
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {
                    "Model.html": {
                      "ref": "Model.html",
                      "tf": 6.25
                    },
                    "Utils.html#.defineModelProperties": {
                      "ref": "Utils.html#.defineModelProperties",
                      "tf": 2.380952380952381
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "module-plugins.SqlSupport.html": {
                              "ref": "module-plugins.SqlSupport.html",
                              "tf": 5
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "t": {
                "docs": {
                  "module-plugins.SqlSupport.html#getRulesFromSQL": {
                    "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                    "tf": 25
                  },
                  "module-plugins.SqlSupport.html#getSQL": {
                    "ref": "module-plugins.SqlSupport.html#getSQL",
                    "tf": 20
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "i": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "Group.html#move": {
                        "ref": "Group.html#move",
                        "tf": 10
                      },
                      "Group.html#removeNode": {
                        "ref": "Group.html#removeNode",
                        "tf": 16.666666666666664
                      },
                      "Node.html#move": {
                        "ref": "Node.html#move",
                        "tf": 10
                      },
                      "Rule.html#move": {
                        "ref": "Rule.html#move",
                        "tf": 10
                      }
                    },
                    "i": {
                      "docs": {
                        "Group.html#addGroup": {
                          "ref": "Group.html#addGroup",
                          "tf": 10
                        },
                        "Group.html#addRule": {
                          "ref": "Group.html#addRule",
                          "tf": 10
                        },
                        "Group.html#insertNode": {
                          "ref": "Group.html#insertNode",
                          "tf": 12.5
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "f": {
                "docs": {
                  "Group.html#drop": {
                    "ref": "Group.html#drop",
                    "tf": 25
                  },
                  "Node.html#drop": {
                    "ref": "Node.html#drop",
                    "tf": 25
                  },
                  "Rule.html#drop": {
                    "ref": "Rule.html#drop",
                    "tf": 25
                  }
                }
              },
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "QueryBuilder.html#.selectors": {
                            "ref": "QueryBuilder.html#.selectors",
                            "tf": 682.5
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {
                "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                  "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                  "tf": 12.5
                },
                "module-plugins.SqlSupport.html#setRulesFromSQL": {
                  "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                  "tf": 10
                },
                "QueryBuilder.html#settings": {
                  "ref": "QueryBuilder.html#settings",
                  "tf": 683.3333333333334
                },
                "QueryBuilder.html#setRules": {
                  "ref": "QueryBuilder.html#setRules",
                  "tf": 16.666666666666664
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "module-plugins.ChangeFilters.html#setFilters": {
                          "ref": "module-plugins.ChangeFilters.html#setFilters",
                          "tf": 633.3333333333334
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "QueryBuilder.html#setRules": {
                        "ref": "QueryBuilder.html#setRules",
                        "tf": 683.3333333333334
                      }
                    },
                    "e": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "o": {
                                          "docs": {
                                            "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
                                              "ref": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
                                              "tf": 700
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "s": {
                                  "docs": {},
                                  "q": {
                                    "docs": {},
                                    "l": {
                                      "docs": {
                                        "module-plugins.SqlSupport.html#setRulesFromSQL": {
                                          "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                                          "tf": 700
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "QueryBuilder.html#setRoot": {
                          "ref": "QueryBuilder.html#setRoot",
                          "tf": 670
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "p": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "QueryBuilder.html#setOptions": {
                        "ref": "QueryBuilder.html#setOptions",
                        "tf": 700
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Utils.html#.defineModelProperties": {
                        "ref": "Utils.html#.defineModelProperties",
                        "tf": 4.761904761904762
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {
                "QueryBuilder.html#.regional": {
                  "ref": "QueryBuilder.html#.regional",
                  "tf": 12.5
                },
                "QueryBuilder.html#.templates": {
                  "ref": "QueryBuilder.html#.templates",
                  "tf": 12.5
                },
                "QueryBuilder.html#.Filter": {
                  "ref": "QueryBuilder.html#.Filter",
                  "tf": 25
                },
                "QueryBuilder.html#.Operator": {
                  "ref": "QueryBuilder.html#.Operator",
                  "tf": 25
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "t": {
                "docs": {
                  "module-plugins.Sortable.html": {
                    "ref": "module-plugins.Sortable.html",
                    "tf": 8.333333333333332
                  },
                  "Utils.html#.groupSort": {
                    "ref": "Utils.html#.groupSort",
                    "tf": 6.25
                  }
                },
                "a": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "module-plugins.Sortable.html": {
                          "ref": "module-plugins.Sortable.html",
                          "tf": 650
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "q": {
            "docs": {},
            "l": {
              "docs": {
                "module-plugins.SqlSupport.html": {
                  "ref": "module-plugins.SqlSupport.html",
                  "tf": 10
                },
                "module-plugins.SqlSupport.html#getRulesFromSQL": {
                  "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                  "tf": 12.5
                },
                "module-plugins.SqlSupport.html#getSQL": {
                  "ref": "module-plugins.SqlSupport.html#getSQL",
                  "tf": 12.5
                },
                "module-plugins.SqlSupport.html#setRulesFromSQL": {
                  "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                  "tf": 10
                }
              },
              "s": {
                "docs": {},
                "u": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "module-plugins.SqlSupport.html": {
                                "ref": "module-plugins.SqlSupport.html",
                                "tf": 650
                              }
                            },
                            "#": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "f": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "q": {
                                                          "docs": {},
                                                          "l": {
                                                            "docs": {
                                                              "module-plugins.SqlSupport.html#getRulesFromSQL": {
                                                                "ref": "module-plugins.SqlSupport.html#getRulesFromSQL",
                                                                "tf": 100
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "s": {
                                      "docs": {},
                                      "q": {
                                        "docs": {},
                                        "l": {
                                          "docs": {
                                            "module-plugins.SqlSupport.html#getSQL": {
                                              "ref": "module-plugins.SqlSupport.html#getSQL",
                                              "tf": 100
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "s": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "f": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "q": {
                                                          "docs": {},
                                                          "l": {
                                                            "docs": {
                                                              "module-plugins.SqlSupport.html#setRulesFromSQL": {
                                                                "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                                                                "tf": 100
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            ".": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "q": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "q": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "i": {
                                              "docs": {
                                                "module-plugins.SqlSupport.html#.SqlQuery": {
                                                  "ref": "module-plugins.SqlSupport.html#.SqlQuery",
                                                  "tf": 100
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "q": {
                "docs": {},
                "u": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "module-plugins.SqlSupport.html#.SqlQuery": {
                            "ref": "module-plugins.SqlSupport.html#.SqlQuery",
                            "tf": 700
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "module-plugins.UniqueFilter.html": {
                    "ref": "module-plugins.UniqueFilter.html",
                    "tf": 4.545454545454546
                  }
                }
              }
            }
          }
        },
        "b": {
          "docs": {},
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {
                  "Utils.html#.changeType": {
                    "ref": "Utils.html#.changeType",
                    "tf": 8.333333333333332
                  }
                },
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Group.html#not": {
                          "ref": "Group.html#not",
                          "tf": 100
                        },
                        "Group.html#contains": {
                          "ref": "Group.html#contains",
                          "tf": 25
                        },
                        "Group.html#each": {
                          "ref": "Group.html#each",
                          "tf": 16.666666666666664
                        },
                        "Group.html#isRoot": {
                          "ref": "Group.html#isRoot",
                          "tf": 50
                        },
                        "Model.html#GroupIteratee": {
                          "ref": "Model.html#GroupIteratee",
                          "tf": 33.33333333333333
                        },
                        "Node.html#isRoot": {
                          "ref": "Node.html#isRoot",
                          "tf": 50
                        },
                        "QueryBuilder.html#deleteGroup": {
                          "ref": "QueryBuilder.html#deleteGroup",
                          "tf": 33.33333333333333
                        },
                        "QueryBuilder.html#deleteRule": {
                          "ref": "QueryBuilder.html#deleteRule",
                          "tf": 33.33333333333333
                        },
                        "QueryBuilder.html#validate": {
                          "ref": "QueryBuilder.html#validate",
                          "tf": 33.33333333333333
                        },
                        "Rule.html#isRoot": {
                          "ref": "Rule.html#isRoot",
                          "tf": 50
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "module-plugins.BtCheckbox.html": {
                              "ref": "module-plugins.BtCheckbox.html",
                              "tf": 7.142857142857142
                            },
                            "module-plugins.BtTooltipErrors.html": {
                              "ref": "module-plugins.BtTooltipErrors.html",
                              "tf": 8.333333333333332
                            }
                          }
                        }
                      }
                    }
                  },
                  "r": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "module-plugins.FilterDescription.html": {
                            "ref": "module-plugins.FilterDescription.html",
                            "tf": 5
                          }
                        }
                      }
                    }
                  }
                },
                "b": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "x": {
                      "docs": {
                        "module-plugins.FilterDescription.html": {
                          "ref": "module-plugins.FilterDescription.html",
                          "tf": 5
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "g": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "Group.html#moveAtBegin": {
                      "ref": "Group.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Node.html#moveAtBegin": {
                      "ref": "Node.html#moveAtBegin",
                      "tf": 8.333333333333332
                    },
                    "Rule.html#moveAtBegin": {
                      "ref": "Rule.html#moveAtBegin",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "k": {
                      "docs": {},
                      "b": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "x": {
                            "docs": {
                              "module-plugins.BtCheckbox.html": {
                                "ref": "module-plugins.BtCheckbox.html",
                                "tf": 650
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "k": {
                                "docs": {
                                  "module-plugins.BtSelectpicker.html": {
                                    "ref": "module-plugins.BtSelectpicker.html",
                                    "tf": 650
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "o": {
                "docs": {},
                "o": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "module-plugins.BtTooltipErrors.html": {
                                        "ref": "module-plugins.BtTooltipErrors.html",
                                        "tf": 650
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "d": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "module-plugins.ChangeFilters.html#addFilter": {
                          "ref": "module-plugins.ChangeFilters.html#addFilter",
                          "tf": 12.5
                        },
                        "module-plugins.ChangeFilters.html#removeFilter": {
                          "ref": "module-plugins.ChangeFilters.html#removeFilter",
                          "tf": 16.666666666666664
                        },
                        "module-plugins.ChangeFilters.html#setFilters": {
                          "ref": "module-plugins.ChangeFilters.html#setFilters",
                          "tf": 16.666666666666664
                        },
                        "module-plugins.Invert.html": {
                          "ref": "module-plugins.Invert.html",
                          "tf": 6.25
                        },
                        "module-plugins.Invert.html#invert": {
                          "ref": "module-plugins.Invert.html#invert",
                          "tf": 10
                        },
                        "module-plugins.MongoDbSupport.html": {
                          "ref": "module-plugins.MongoDbSupport.html",
                          "tf": 4.545454545454546
                        },
                        "module-plugins.SqlSupport.html": {
                          "ref": "module-plugins.SqlSupport.html",
                          "tf": 5
                        },
                        "QueryBuilder.html#change": {
                          "ref": "QueryBuilder.html#change",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#destroy": {
                          "ref": "QueryBuilder.html#destroy",
                          "tf": 25
                        },
                        "QueryBuilder.html#off": {
                          "ref": "QueryBuilder.html#off",
                          "tf": 10
                        },
                        "QueryBuilder.html#on": {
                          "ref": "QueryBuilder.html#on",
                          "tf": 10
                        },
                        "QueryBuilder.html#once": {
                          "ref": "QueryBuilder.html#once",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#setOptions": {
                          "ref": "QueryBuilder.html#setOptions",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#trigger": {
                          "ref": "QueryBuilder.html#trigger",
                          "tf": 12.5
                        },
                        "QueryBuilder.html#validate": {
                          "ref": "QueryBuilder.html#validate",
                          "tf": 16.666666666666664
                        }
                      },
                      "'": {
                        "docs": {
                          "module-plugins.SqlSupport.html#setRulesFromSQL": {
                            "ref": "module-plugins.SqlSupport.html#setRulesFromSQL",
                            "tf": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "t": {
          "docs": {},
          "r": {
            "docs": {},
            "i": {
              "docs": {
                "QueryBuilder.html#deleteGroup": {
                  "ref": "QueryBuilder.html#deleteGroup",
                  "tf": 5.555555555555555
                },
                "QueryBuilder.html#deleteRule": {
                  "ref": "QueryBuilder.html#deleteRule",
                  "tf": 16.666666666666664
                }
              },
              "g": {
                "docs": {},
                "g": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Group.html#insertNode": {
                          "ref": "Group.html#insertNode",
                          "tf": 20
                        },
                        "Model.html#trigger": {
                          "ref": "Model.html#trigger",
                          "tf": 700
                        },
                        "QueryBuilder.html#change": {
                          "ref": "QueryBuilder.html#change",
                          "tf": 7.142857142857142
                        },
                        "QueryBuilder.html#trigger": {
                          "ref": "QueryBuilder.html#trigger",
                          "tf": 695.8333333333334
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "n": {
                "docs": {},
                "s": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "QueryBuilder.html#lang": {
                            "ref": "QueryBuilder.html#lang",
                            "tf": 25
                          },
                          "QueryBuilder.html#translate": {
                            "ref": "QueryBuilder.html#translate",
                            "tf": 679.5454545454545
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "g": {
                "docs": {},
                "e": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Group.html#move": {
                        "ref": "Group.html#move",
                        "tf": 33.33333333333333
                      },
                      "Group.html#moveAfter": {
                        "ref": "Group.html#moveAfter",
                        "tf": 50
                      },
                      "Group.html#moveAtBegin": {
                        "ref": "Group.html#moveAtBegin",
                        "tf": 50
                      },
                      "Group.html#moveAtEnd": {
                        "ref": "Group.html#moveAtEnd",
                        "tf": 50
                      },
                      "Node.html#move": {
                        "ref": "Node.html#move",
                        "tf": 33.33333333333333
                      },
                      "Node.html#moveAfter": {
                        "ref": "Node.html#moveAfter",
                        "tf": 50
                      },
                      "Node.html#moveAtBegin": {
                        "ref": "Node.html#moveAtBegin",
                        "tf": 50
                      },
                      "Node.html#moveAtEnd": {
                        "ref": "Node.html#moveAtEnd",
                        "tf": 50
                      },
                      "QueryBuilder.html#getModel": {
                        "ref": "QueryBuilder.html#getModel",
                        "tf": 33.33333333333333
                      },
                      "Rule.html#move": {
                        "ref": "Rule.html#move",
                        "tf": 33.33333333333333
                      },
                      "Rule.html#moveAfter": {
                        "ref": "Rule.html#moveAfter",
                        "tf": 50
                      },
                      "Rule.html#moveAtBegin": {
                        "ref": "Rule.html#moveAtBegin",
                        "tf": 50
                      },
                      "Rule.html#moveAtEnd": {
                        "ref": "Rule.html#moveAtEnd",
                        "tf": 50
                      }
                    }
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "p": {
              "docs": {},
              "e": {
                "docs": {
                  "Model.html#off": {
                    "ref": "Model.html#off",
                    "tf": 33.33333333333333
                  },
                  "Model.html#on": {
                    "ref": "Model.html#on",
                    "tf": 33.33333333333333
                  },
                  "Model.html#once": {
                    "ref": "Model.html#once",
                    "tf": 25
                  },
                  "Model.html#trigger": {
                    "ref": "Model.html#trigger",
                    "tf": 33.33333333333333
                  },
                  "QueryBuilder.html#change": {
                    "ref": "QueryBuilder.html#change",
                    "tf": 33.33333333333333
                  },
                  "QueryBuilder.html#off": {
                    "ref": "QueryBuilder.html#off",
                    "tf": 33.33333333333333
                  },
                  "QueryBuilder.html#on": {
                    "ref": "QueryBuilder.html#on",
                    "tf": 33.33333333333333
                  },
                  "QueryBuilder.html#once": {
                    "ref": "QueryBuilder.html#once",
                    "tf": 25
                  },
                  "QueryBuilder.html#trigger": {
                    "ref": "QueryBuilder.html#trigger",
                    "tf": 33.33333333333333
                  },
                  "Utils.html#.changeType": {
                    "ref": "Utils.html#.changeType",
                    "tf": 33.33333333333333
                  },
                  "Utils.html#.error": {
                    "ref": "Utils.html#.error",
                    "tf": 16.666666666666664
                  }
                },
                "d": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "f": {
                      "docs": {
                        "Model.html#GroupIteratee": {
                          "ref": "Model.html#GroupIteratee",
                          "tf": 110
                        },
                        "module-plugins.SqlSupport.html#.SqlQuery": {
                          "ref": "module-plugins.SqlSupport.html#.SqlQuery",
                          "tf": 110
                        },
                        "QueryBuilder.html#.Filter": {
                          "ref": "QueryBuilder.html#.Filter",
                          "tf": 110
                        },
                        "QueryBuilder.html#.Operator": {
                          "ref": "QueryBuilder.html#.Operator",
                          "tf": 110
                        },
                        "Utils.html#OptionsIteratee": {
                          "ref": "Utils.html#OptionsIteratee",
                          "tf": 110
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "p": {
                      "docs": {
                        "module-plugins.BtTooltipErrors.html": {
                          "ref": "module-plugins.BtTooltipErrors.html",
                          "tf": 8.333333333333332
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "e": {
                  "docs": {
                    "module-plugins.FilterDescription.html": {
                      "ref": "module-plugins.FilterDescription.html",
                      "tf": 5
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "u": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "h": {
                      "docs": {
                        "Utils.html#.defineModelProperties": {
                          "ref": "Utils.html#.defineModelProperties",
                          "tf": 2.380952380952381
                        }
                      }
                    }
                  }
                },
                "w": {
                  "docs": {
                    "Utils.html#.error": {
                      "ref": "Utils.html#.error",
                      "tf": 7.142857142857142
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "m": {
              "docs": {},
              "p": {
                "docs": {},
                "l": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "QueryBuilder.html#.templates": {
                          "ref": "QueryBuilder.html#.templates",
                          "tf": 682.5
                        },
                        "QueryBuilder.html#templates": {
                          "ref": "QueryBuilder.html#templates",
                          "tf": 700
                        }
                      },
                      "e": {
                        "docs": {},
                        ".": {
                          "docs": {},
                          "j": {
                            "docs": {
                              "QueryBuilder.html#.templates": {
                                "ref": "QueryBuilder.html#.templates",
                                "tf": 12.5
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "l": {
              "docs": {
                "Utils.html#.iterateOptions": {
                  "ref": "Utils.html#.iterateOptions",
                  "tf": 25
                }
              }
            }
          }
        },
        "v": {
          "docs": {},
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "i": {
                "docs": {},
                "d": {
                  "docs": {
                    "module-plugins.BtTooltipErrors.html": {
                      "ref": "module-plugins.BtTooltipErrors.html",
                      "tf": 8.333333333333332
                    },
                    "QueryBuilder.html#validate": {
                      "ref": "QueryBuilder.html#validate",
                      "tf": 700
                    },
                    "QueryBuilder.html#validateValue": {
                      "ref": "QueryBuilder.html#validateValue",
                      "tf": 16.666666666666664
                    }
                  },
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "u": {
                                "docs": {
                                  "QueryBuilder.html#validateValue": {
                                    "ref": "QueryBuilder.html#validateValue",
                                    "tf": 675
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "u": {
                "docs": {
                  "QueryBuilder.html#change": {
                    "ref": "QueryBuilder.html#change",
                    "tf": 40.47619047619047
                  },
                  "QueryBuilder.html#validateValue": {
                    "ref": "QueryBuilder.html#validateValue",
                    "tf": 41.666666666666664
                  },
                  "Rule.html#value": {
                    "ref": "Rule.html#value",
                    "tf": 750
                  },
                  "Utils.html#.changeType": {
                    "ref": "Utils.html#.changeType",
                    "tf": 33.33333333333333
                  },
                  "Utils.html#.defineModelProperties": {
                    "ref": "Utils.html#.defineModelProperties",
                    "tf": 2.380952380952381
                  },
                  "Utils.html#.escapeString": {
                    "ref": "Utils.html#.escapeString",
                    "tf": 25
                  },
                  "Utils.html#OptionsIteratee": {
                    "ref": "Utils.html#OptionsIteratee",
                    "tf": 25
                  }
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "a": {
            "docs": {},
            "y": {
              "docs": {
                "module-plugins.FilterDescription.html": {
                  "ref": "module-plugins.FilterDescription.html",
                  "tf": 5
                }
              }
            }
          },
          "h": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {
                    "module-plugins.Invert.html#invert": {
                      "ref": "module-plugins.Invert.html#invert",
                      "tf": 10
                    },
                    "QueryBuilder.html#validate": {
                      "ref": "QueryBuilder.html#validate",
                      "tf": 16.666666666666664
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "module-plugins.MongoDbSupport.html": {
                    "ref": "module-plugins.MongoDbSupport.html",
                    "tf": 4.545454545454546
                  },
                  "module-plugins.SqlSupport.html": {
                    "ref": "module-plugins.SqlSupport.html",
                    "tf": 5
                  }
                }
              }
            }
          }
        },
        "k": {
          "docs": {},
          "e": {
            "docs": {},
            "y": {
              "docs": {
                "QueryBuilder.html#translate": {
                  "ref": "QueryBuilder.html#translate",
                  "tf": 29.545454545454547
                },
                "Utils.html#.groupSort": {
                  "ref": "Utils.html#.groupSort",
                  "tf": 26.25
                },
                "Utils.html#OptionsIteratee": {
                  "ref": "Utils.html#OptionsIteratee",
                  "tf": 25
                }
              }
            }
          }
        },
        "h": {
          "docs": {},
          "t": {
            "docs": {},
            "t": {
              "docs": {},
              "p": {
                "docs": {},
                ":": {
                  "docs": {},
                  "/": {
                    "docs": {},
                    "/": {
                      "docs": {},
                      "q": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "y": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              ".": {
                                                "docs": {},
                                                "j": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    ".": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "/": {
                                                              "docs": {},
                                                              "i": {
                                                                "docs": {},
                                                                "n": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "x": {
                                                                        "docs": {},
                                                                        ".": {
                                                                          "docs": {},
                                                                          "h": {
                                                                            "docs": {},
                                                                            "t": {
                                                                              "docs": {},
                                                                              "m": {
                                                                                "docs": {},
                                                                                "l": {
                                                                                  "docs": {},
                                                                                  "#": {
                                                                                    "docs": {},
                                                                                    "f": {
                                                                                      "docs": {},
                                                                                      "i": {
                                                                                        "docs": {},
                                                                                        "l": {
                                                                                          "docs": {},
                                                                                          "t": {
                                                                                            "docs": {
                                                                                              "QueryBuilder.html#.Filter": {
                                                                                                "ref": "QueryBuilder.html#.Filter",
                                                                                                "tf": 25
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    },
                                                                                    "o": {
                                                                                      "docs": {},
                                                                                      "p": {
                                                                                        "docs": {},
                                                                                        "e": {
                                                                                          "docs": {},
                                                                                          "r": {
                                                                                            "docs": {
                                                                                              "QueryBuilder.html#.Operator": {
                                                                                                "ref": "QueryBuilder.html#.Operator",
                                                                                                "tf": 25
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "l": {
                "docs": {
                  "Utils.html#.escapeElementId": {
                    "ref": "Utils.html#.escapeElementId",
                    "tf": 8.333333333333332
                  }
                }
              }
            }
          }
        },
        "_": {
          "docs": {},
          "_": {
            "docs": {
              "Utils.html#.defineModelProperties": {
                "ref": "Utils.html#.defineModelProperties",
                "tf": 2.380952380952381
              }
            }
          }
        }
      },
      "length": 1161
    },
    "corpusTokens": [
      "0",
      "1",
      "__",
      "abstract",
      "accept",
      "add",
      "addfilt",
      "addgroup",
      "addrul",
      "allow",
      "amp",
      "anoth",
      "api",
      "appli",
      "arg",
      "array.&lt;object&gt",
      "array.&lt;querybuilder.filter&gt",
      "array.&lt;querybuilder.operator&gt",
      "array|boolean",
      "associ",
      "attach",
      "avail",
      "awesom",
      "begin",
      "bool",
      "boolean",
      "bootbox",
      "bootsrap",
      "bootstrap",
      "btcheckbox",
      "btselectpick",
      "bttooltiperror",
      "builder",
      "builder'",
      "call",
      "categori",
      "cb",
      "cbgroup",
      "cbrule",
      "chang",
      "changefilt",
      "changefilters#addfilt",
      "changefilters#removefilt",
      "changefilters#setfilt",
      "changetyp",
      "check",
      "checkbox",
      "checkfilt",
      "checkoper",
      "child",
      "children",
      "chosenselectpick",
      "class",
      "clear",
      "clearerror",
      "code",
      "common",
      "compon",
      "condit",
      "configur",
      "contain",
      "content",
      "context",
      "convert",
      "creat",
      "creator",
      "css",
      "current",
      "custom",
      "data",
      "default",
      "defin",
      "definemodelproperti",
      "delet",
      "deletegroup",
      "deleteorphan",
      "deleterul",
      "descript",
      "destroy",
      "display",
      "document",
      "dom",
      "dothrow",
      "drag",
      "drop",
      "each",
      "el",
      "element",
      "emit",
      "empti",
      "enabl",
      "end",
      "entir",
      "enumer",
      "error",
      "escap",
      "escapeelementid",
      "escaperegexp",
      "escapestr",
      "event",
      "export",
      "extern",
      "external:\"jquery.fn",
      "field",
      "filter",
      "filterdescript",
      "filterid",
      "find",
      "flag",
      "float",
      "fmt",
      "fn",
      "format",
      "four",
      "friendli",
      "front",
      "function",
      "function()&gt",
      "get",
      "getmodel",
      "getmongo",
      "getnodepo",
      "getpo",
      "getrul",
      "getrulesfrommongo",
      "getrulesfromsql",
      "getsql",
      "getter",
      "global",
      "group",
      "group#$el",
      "group#addgroup",
      "group#addrul",
      "group#condit",
      "group#contain",
      "group#data",
      "group#drop",
      "group#each",
      "group#empti",
      "group#error",
      "group#flag",
      "group#getnodepo",
      "group#getpo",
      "group#id",
      "group#insertnod",
      "group#isroot",
      "group#length",
      "group#level",
      "group#model",
      "group#mov",
      "group#moveaft",
      "group#moveatbegin",
      "group#moveatend",
      "group#not",
      "group#par",
      "group#removenod",
      "group#rul",
      "group'",
      "groupiterate",
      "groupsort",
      "html",
      "http://querybuilder.js.org/index.html#filt",
      "http://querybuilder.js.org/index.html#oper",
      "i18n",
      "icon",
      "id",
      "ie",
      "index",
      "initi",
      "inlin",
      "input",
      "insertnod",
      "insid",
      "int",
      "intern",
      "invert",
      "invert#invert",
      "isroot",
      "it'",
      "item",
      "iter",
      "iterateopt",
      "itself",
      "jqueri",
      "jquery.fn",
      "key",
      "label",
      "lang",
      "languag",
      "length",
      "level",
      "list",
      "list:class",
      "list:ev",
      "list:extern",
      "list:modul",
      "list:namespac",
      "listen",
      "local",
      "log",
      "look",
      "lt;readonly&gt",
      "lt;static",
      "lt;static&gt",
      "main",
      "marker",
      "member",
      "messag",
      "model",
      "model#groupiterate",
      "model#off",
      "model#on",
      "model#onc",
      "model#root",
      "model#trigg",
      "modifi",
      "modul",
      "module:plugin",
      "module:plugins.btcheckbox",
      "module:plugins.btselectpick",
      "module:plugins.bttooltiperror",
      "module:plugins.changefilt",
      "module:plugins.changefilters#addfilt",
      "module:plugins.changefilters#removefilt",
      "module:plugins.changefilters#setfilt",
      "module:plugins.chosenselectpick",
      "module:plugins.filterdescript",
      "module:plugins.invert",
      "module:plugins.invert#invert",
      "module:plugins.mongodbsupport",
      "module:plugins.mongodbsupport#getmongo",
      "module:plugins.mongodbsupport#getrulesfrommongo",
      "module:plugins.mongodbsupport#setrulesfrommongo",
      "module:plugins.notgroup",
      "module:plugins.sort",
      "module:plugins.sqlsupport",
      "module:plugins.sqlsupport#getrulesfromsql",
      "module:plugins.sqlsupport#getsql",
      "module:plugins.sqlsupport#setrulesfromsql",
      "module:plugins.sqlsupport.sqlqueri",
      "module:plugins.uniquefilt",
      "mongodb",
      "mongodbsupport",
      "mongodbsupport#getmongo",
      "mongodbsupport#getrulesfrommongo",
      "mongodbsupport#setrulesfrommongo",
      "move",
      "moveaft",
      "moveatbegin",
      "moveatend",
      "mysql_real_escape_str",
      "name",
      "namespac",
      "new",
      "newfilt",
      "nl",
      "no_delet",
      "node",
      "node#$el",
      "node#data",
      "node#drop",
      "node#error",
      "node#flag",
      "node#getpo",
      "node#id",
      "node#isroot",
      "node#level",
      "node#model",
      "node#mov",
      "node#moveaft",
      "node#moveatbegin",
      "node#moveatend",
      "node#par",
      "non",
      "notgroup",
      "number",
      "obj",
      "object",
      "object&gt",
      "object.&lt;str",
      "on",
      "onc",
      "oper",
      "optgroup",
      "option",
      "optionsiterate",
      "order",
      "over",
      "parent",
      "particular",
      "perform",
      "php'",
      "plugin",
      "plugins.btcheckbox",
      "plugins.btselectpick",
      "plugins.bttooltiperror",
      "plugins.changefilt",
      "plugins.chosenselectpick",
      "plugins.filterdescript",
      "plugins.invert",
      "plugins.mongodbsupport",
      "plugins.notgroup",
      "plugins.sort",
      "plugins.sqlsupport",
      "plugins.uniquefilt",
      "popov",
      "popul",
      "posit",
      "possibl",
      "preserv",
      "properti",
      "prototyp",
      "provid",
      "queri",
      "query/filt",
      "querybuild",
      "querybuilder#$el",
      "querybuilder#addgroup",
      "querybuilder#addrul",
      "querybuilder#chang",
      "querybuilder#checkfilt",
      "querybuilder#checkoper",
      "querybuilder#clear",
      "querybuilder#clearerror",
      "querybuilder#deletegroup",
      "querybuilder#deleterul",
      "querybuilder#destroy",
      "querybuilder#filt",
      "querybuilder#getmodel",
      "querybuilder#getrul",
      "querybuilder#icon",
      "querybuilder#lang",
      "querybuilder#model",
      "querybuilder#off",
      "querybuilder#on",
      "querybuilder#onc",
      "querybuilder#oper",
      "querybuilder#plugin",
      "querybuilder#reset",
      "querybuilder#set",
      "querybuilder#setopt",
      "querybuilder#setroot",
      "querybuilder#setrul",
      "querybuilder#templ",
      "querybuilder#transl",
      "querybuilder#trigg",
      "querybuilder#valid",
      "querybuilder#validatevalu",
      "querybuilder.default",
      "querybuilder.filt",
      "querybuilder.group",
      "querybuilder.modifiable_opt",
      "querybuilder.oper",
      "querybuilder.region",
      "querybuilder.rul",
      "querybuilder.selector",
      "querybuilder.templ",
      "querybuilder.util",
      "quot;jquery.fn&quot",
      "quot;not&quot",
      "quot;unique&quot",
      "radio",
      "radio/checkbox/select",
      "readm",
      "readonly&gt",
      "recurs",
      "regex",
      "region",
      "remov",
      "removefilt",
      "removenod",
      "replac",
      "repres",
      "reset",
      "return",
      "revers",
      "root",
      "rule",
      "rule#$el",
      "rule#data",
      "rule#drop",
      "rule#error",
      "rule#filt",
      "rule#flag",
      "rule#getpo",
      "rule#id",
      "rule#isroot",
      "rule#level",
      "rule#model",
      "rule#mov",
      "rule#moveaft",
      "rule#moveatbegin",
      "rule#moveatend",
      "rule#oper",
      "rule#par",
      "rule#valu",
      "same",
      "see",
      "selector",
      "self",
      "set",
      "setfilt",
      "setopt",
      "setroot",
      "setrul",
      "setrulesfrommongo",
      "setrulesfromsql",
      "setter",
      "sort",
      "sortabl",
      "specif",
      "specifi",
      "sql",
      "sqlqueri",
      "sqlsupport",
      "sqlsupport#getrulesfromsql",
      "sqlsupport#getsql",
      "sqlsupport#setrulesfromsql",
      "sqlsupport.sqlqueri",
      "statement",
      "stmt",
      "store",
      "str",
      "string",
      "string&gt",
      "target",
      "templat",
      "template.j",
      "three",
      "through",
      "throw",
      "tooltip",
      "tpl",
      "translat",
      "tri",
      "trigger",
      "type",
      "typedef",
      "uniquefilt",
      "updat",
      "us",
      "user",
      "util",
      "utils#optionsiterate",
      "utils.changetyp",
      "utils.definemodelproperti",
      "utils.error",
      "utils.escapeelementid",
      "utils.escaperegexp",
      "utils.escapestr",
      "utils.fmt",
      "utils.groupsort",
      "utils.iterateopt",
      "valid",
      "validatevalu",
      "valu",
      "way",
      "well",
      "whole"
    ],
    "pipeline": [
      "trimmer",
      "stopWordFilter",
      "stemmer"
    ]
  },
  "store": {
    "index.html": {
      "id": "index.html",
      "kind": "readme",
      "title": "jQuery QueryBuilder API",
      "longname": "index",
      "name": "jQuery QueryBuilder API",
      "tags": "index",
      "summary": "jQuery plugin for user friendly query/filter creator",
      "description": "",
      "body": ""
    },
    "list_class.html": {
      "id": "list_class.html",
      "kind": "list",
      "title": "Classes",
      "longname": "list:class",
      "name": "Classes",
      "tags": "list:class",
      "summary": "All documented classes.",
      "description": "",
      "body": ""
    },
    "list_event.html": {
      "id": "list_event.html",
      "kind": "list",
      "title": "Events",
      "longname": "list:event",
      "name": "Events",
      "tags": "list:event",
      "summary": "All documented events.",
      "description": "",
      "body": ""
    },
    "list_external.html": {
      "id": "list_external.html",
      "kind": "list",
      "title": "Externals",
      "longname": "list:external",
      "name": "Externals",
      "tags": "list:external",
      "summary": "All documented external members.",
      "description": "",
      "body": ""
    },
    "list_module.html": {
      "id": "list_module.html",
      "kind": "list",
      "title": "Modules",
      "longname": "list:module",
      "name": "Modules",
      "tags": "list:module",
      "summary": "All documented modules.",
      "description": "",
      "body": ""
    },
    "list_namespace.html": {
      "id": "list_namespace.html",
      "kind": "list",
      "title": "Namespaces",
      "longname": "list:namespace",
      "name": "Namespaces",
      "tags": "list:namespace",
      "summary": "All documented namespaces.",
      "description": "",
      "body": ""
    },
    "Group.html": {
      "id": "Group.html",
      "kind": "class",
      "title": "Group",
      "longname": "Group",
      "name": "Group",
      "tags": "Group",
      "summary": "",
      "description": "Group object",
      "body": ""
    },
    "Group.html#$el": {
      "id": "Group.html#$el",
      "kind": "member",
      "title": "&lt;readonly&gt; $el :jQuery",
      "longname": "Group#$el",
      "name": "$el",
      "tags": "Group#$el $el",
      "summary": "",
      "description": ""
    },
    "Group.html#condition": {
      "id": "Group.html#condition",
      "kind": "member",
      "title": "condition :string",
      "longname": "Group#condition",
      "name": "condition",
      "tags": "Group#condition condition",
      "summary": "",
      "description": ""
    },
    "Group.html#data": {
      "id": "Group.html#data",
      "kind": "member",
      "title": "data :object",
      "longname": "Group#data",
      "name": "data",
      "tags": "Group#data data",
      "summary": "",
      "description": ""
    },
    "Group.html#error": {
      "id": "Group.html#error",
      "kind": "member",
      "title": "error :string",
      "longname": "Group#error",
      "name": "error",
      "tags": "Group#error error",
      "summary": "",
      "description": ""
    },
    "Group.html#flags": {
      "id": "Group.html#flags",
      "kind": "member",
      "title": "&lt;readonly&gt; flags :object",
      "longname": "Group#flags",
      "name": "flags",
      "tags": "Group#flags flags",
      "summary": "",
      "description": ""
    },
    "Group.html#id": {
      "id": "Group.html#id",
      "kind": "member",
      "title": "&lt;readonly&gt; id :string",
      "longname": "Group#id",
      "name": "id",
      "tags": "Group#id id",
      "summary": "",
      "description": ""
    },
    "Group.html#level": {
      "id": "Group.html#level",
      "kind": "member",
      "title": "&lt;readonly&gt; level :int",
      "longname": "Group#level",
      "name": "level",
      "tags": "Group#level level",
      "summary": "",
      "description": ""
    },
    "Group.html#model": {
      "id": "Group.html#model",
      "kind": "member",
      "title": "&lt;readonly&gt; model :Model",
      "longname": "Group#model",
      "name": "model",
      "tags": "Group#model model",
      "summary": "",
      "description": ""
    },
    "Group.html#not": {
      "id": "Group.html#not",
      "kind": "member",
      "title": "not :boolean",
      "longname": "Group#not",
      "name": "not",
      "tags": "Group#not not",
      "summary": "",
      "description": "From module:plugins.NotGroup"
    },
    "Group.html#parent": {
      "id": "Group.html#parent",
      "kind": "member",
      "title": "&lt;readonly&gt; parent :Group",
      "longname": "Group#parent",
      "name": "parent",
      "tags": "Group#parent parent",
      "summary": "",
      "description": ""
    },
    "Group.html#rules": {
      "id": "Group.html#rules",
      "kind": "member",
      "title": "&lt;readonly&gt; rules :Array.&lt;object&gt;",
      "longname": "Group#rules",
      "name": "rules",
      "tags": "Group#rules rules",
      "summary": "",
      "description": ""
    },
    "Group.html#addGroup": {
      "id": "Group.html#addGroup",
      "kind": "function",
      "title": "addGroup( $el [, index ] ) → {Group}",
      "longname": "Group#addGroup",
      "name": "addGroup",
      "tags": "Group#addGroup addGroup",
      "summary": "",
      "description": "Adds a new Group at specified index"
    },
    "Group.html#addRule": {
      "id": "Group.html#addRule",
      "kind": "function",
      "title": "addRule( $el [, index ] ) → {Rule}",
      "longname": "Group#addRule",
      "name": "addRule",
      "tags": "Group#addRule addRule",
      "summary": "",
      "description": "Adds a new Rule at specified index"
    },
    "Group.html#contains": {
      "id": "Group.html#contains",
      "kind": "function",
      "title": "contains( node [, recursive ] ) → {boolean}",
      "longname": "Group#contains",
      "name": "contains",
      "tags": "Group#contains contains",
      "summary": "",
      "description": "Checks if the group contains a particular Node"
    },
    "Group.html#drop": {
      "id": "Group.html#drop",
      "kind": "function",
      "title": "drop()",
      "longname": "Group#drop",
      "name": "drop",
      "tags": "Group#drop drop",
      "summary": "",
      "description": "Deletes self"
    },
    "Group.html#each": {
      "id": "Group.html#each",
      "kind": "function",
      "title": "each( [ reverse ], cbRule [, cbGroup [, context ] ] ) → {boolean}",
      "longname": "Group#each",
      "name": "each",
      "tags": "Group#each each",
      "summary": "",
      "description": "Iterate over all Nodes"
    },
    "Group.html#empty": {
      "id": "Group.html#empty",
      "kind": "function",
      "title": "empty()",
      "longname": "Group#empty",
      "name": "empty",
      "tags": "Group#empty empty",
      "summary": "",
      "description": "Removes group's content"
    },
    "Group.html#getNodePos": {
      "id": "Group.html#getNodePos",
      "kind": "function",
      "title": "getNodePos( node ) → {int}",
      "longname": "Group#getNodePos",
      "name": "getNodePos",
      "tags": "Group#getNodePos getNodePos",
      "summary": "",
      "description": "Returns the position of a child Node"
    },
    "Group.html#getPos": {
      "id": "Group.html#getPos",
      "kind": "function",
      "title": "getPos() → {int}",
      "longname": "Group#getPos",
      "name": "getPos",
      "tags": "Group#getPos getPos",
      "summary": "",
      "description": "Returns the node position inside its parent"
    },
    "Group.html#insertNode": {
      "id": "Group.html#insertNode",
      "kind": "function",
      "title": "insertNode( node [, index [, trigger ] ] ) → {Node}",
      "longname": "Group#insertNode",
      "name": "insertNode",
      "tags": "Group#insertNode insertNode",
      "summary": "",
      "description": "Adds a Node at specified index"
    },
    "Group.html#isRoot": {
      "id": "Group.html#isRoot",
      "kind": "function",
      "title": "isRoot() → {boolean}",
      "longname": "Group#isRoot",
      "name": "isRoot",
      "tags": "Group#isRoot isRoot",
      "summary": "",
      "description": "Checks if this Node is the root"
    },
    "Group.html#length": {
      "id": "Group.html#length",
      "kind": "function",
      "title": "length() → {int}",
      "longname": "Group#length",
      "name": "length",
      "tags": "Group#length length",
      "summary": "",
      "description": "Returns the number of children"
    },
    "Group.html#move": {
      "id": "Group.html#move",
      "kind": "function",
      "title": "move( target, index )",
      "longname": "Group#move",
      "name": "move",
      "tags": "Group#move move",
      "summary": "",
      "description": "Moves itself at specific position of Group"
    },
    "Group.html#moveAfter": {
      "id": "Group.html#moveAfter",
      "kind": "function",
      "title": "moveAfter( target )",
      "longname": "Group#moveAfter",
      "name": "moveAfter",
      "tags": "Group#moveAfter moveAfter",
      "summary": "",
      "description": "Moves itself after another Node"
    },
    "Group.html#moveAtBegin": {
      "id": "Group.html#moveAtBegin",
      "kind": "function",
      "title": "moveAtBegin( [ target ] )",
      "longname": "Group#moveAtBegin",
      "name": "moveAtBegin",
      "tags": "Group#moveAtBegin moveAtBegin",
      "summary": "",
      "description": "Moves itself at the beginning of parent or another Group"
    },
    "Group.html#moveAtEnd": {
      "id": "Group.html#moveAtEnd",
      "kind": "function",
      "title": "moveAtEnd( [ target ] )",
      "longname": "Group#moveAtEnd",
      "name": "moveAtEnd",
      "tags": "Group#moveAtEnd moveAtEnd",
      "summary": "",
      "description": "Moves itself at the end of parent or another Group"
    },
    "Group.html#removeNode": {
      "id": "Group.html#removeNode",
      "kind": "function",
      "title": "removeNode( node )",
      "longname": "Group#removeNode",
      "name": "removeNode",
      "tags": "Group#removeNode removeNode",
      "summary": "",
      "description": "Deletes a specific Node"
    },
    "Model.html": {
      "id": "Model.html",
      "kind": "class",
      "title": "Model",
      "longname": "Model",
      "name": "Model",
      "tags": "Model",
      "summary": "",
      "description": "Main object storing data model and emitting model events",
      "body": ""
    },
    "Model.html#root": {
      "id": "Model.html#root",
      "kind": "member",
      "title": "&lt;readonly&gt; root :Group",
      "longname": "Model#root",
      "name": "root",
      "tags": "Model#root root",
      "summary": "",
      "description": ""
    },
    "Model.html#off": {
      "id": "Model.html#off",
      "kind": "function",
      "title": "off( type [, cb ] ) → {Model}",
      "longname": "Model#off",
      "name": "off",
      "tags": "Model#off off",
      "summary": "",
      "description": "Removes an event listener from the model"
    },
    "Model.html#on": {
      "id": "Model.html#on",
      "kind": "function",
      "title": "on( type, cb ) → {Model}",
      "longname": "Model#on",
      "name": "on",
      "tags": "Model#on on",
      "summary": "",
      "description": "Attaches an event listener on the model"
    },
    "Model.html#once": {
      "id": "Model.html#once",
      "kind": "function",
      "title": "once( type, cb ) → {Model}",
      "longname": "Model#once",
      "name": "once",
      "tags": "Model#once once",
      "summary": "",
      "description": "Attaches an event listener called once on the model"
    },
    "Model.html#trigger": {
      "id": "Model.html#trigger",
      "kind": "function",
      "title": "trigger( type ) → {$.Event}",
      "longname": "Model#trigger",
      "name": "trigger",
      "tags": "Model#trigger trigger",
      "summary": "",
      "description": "Triggers an event on the model"
    },
    "Model.html#GroupIteratee": {
      "id": "Model.html#GroupIteratee",
      "kind": "typedef",
      "title": "GroupIteratee( node ) → {boolean}",
      "longname": "Model#GroupIteratee",
      "name": "GroupIteratee",
      "tags": "Model#GroupIteratee GroupIteratee",
      "summary": "",
      "description": ""
    },
    "module-plugins.BtCheckbox.html": {
      "id": "module-plugins.BtCheckbox.html",
      "kind": "class",
      "title": "plugins.BtCheckbox",
      "longname": "module:plugins.BtCheckbox",
      "name": "BtCheckbox",
      "tags": "module:plugins.BtCheckbox BtCheckbox",
      "summary": "",
      "description": "Applies Awesome Bootstrap Checkbox for checkbox and radio inputs.",
      "body": ""
    },
    "module-plugins.BtSelectpicker.html": {
      "id": "module-plugins.BtSelectpicker.html",
      "kind": "class",
      "title": "plugins.BtSelectpicker",
      "longname": "module:plugins.BtSelectpicker",
      "name": "BtSelectpicker",
      "tags": "module:plugins.BtSelectpicker BtSelectpicker",
      "summary": "",
      "description": "",
      "body": ""
    },
    "module-plugins.BtTooltipErrors.html": {
      "id": "module-plugins.BtTooltipErrors.html",
      "kind": "class",
      "title": "plugins.BtTooltipErrors",
      "longname": "module:plugins.BtTooltipErrors",
      "name": "BtTooltipErrors",
      "tags": "module:plugins.BtTooltipErrors BtTooltipErrors",
      "summary": "",
      "description": "Applies Bootstrap Tooltips on validation error messages.",
      "body": ""
    },
    "module-plugins.ChangeFilters.html": {
      "id": "module-plugins.ChangeFilters.html",
      "kind": "class",
      "title": "plugins.ChangeFilters",
      "longname": "module:plugins.ChangeFilters",
      "name": "ChangeFilters",
      "tags": "module:plugins.ChangeFilters ChangeFilters",
      "summary": "",
      "description": "Allows to change available filters after plugin initialization.",
      "body": ""
    },
    "module-plugins.ChangeFilters.html#addFilter": {
      "id": "module-plugins.ChangeFilters.html#addFilter",
      "kind": "function",
      "title": "addFilter( newFilters [, position ] )",
      "longname": "module:plugins.ChangeFilters#addFilter",
      "name": "addFilter",
      "tags": "module:plugins.ChangeFilters#addFilter ChangeFilters#addFilter addFilter",
      "summary": "",
      "description": "Adds a new filter to the builder"
    },
    "module-plugins.ChangeFilters.html#removeFilter": {
      "id": "module-plugins.ChangeFilters.html#removeFilter",
      "kind": "function",
      "title": "removeFilter( filterIds [, deleteOrphans ] )",
      "longname": "module:plugins.ChangeFilters#removeFilter",
      "name": "removeFilter",
      "tags": "module:plugins.ChangeFilters#removeFilter ChangeFilters#removeFilter removeFilter",
      "summary": "",
      "description": "Removes a filter from the builder"
    },
    "module-plugins.ChangeFilters.html#setFilters": {
      "id": "module-plugins.ChangeFilters.html#setFilters",
      "kind": "function",
      "title": "setFilters( [ deleteOrphans ], filters )",
      "longname": "module:plugins.ChangeFilters#setFilters",
      "name": "setFilters",
      "tags": "module:plugins.ChangeFilters#setFilters ChangeFilters#setFilters setFilters",
      "summary": "",
      "description": "Change the filters of the builder"
    },
    "module-plugins.ChosenSelectpicker.html": {
      "id": "module-plugins.ChosenSelectpicker.html",
      "kind": "class",
      "title": "plugins.ChosenSelectpicker",
      "longname": "module:plugins.ChosenSelectpicker",
      "name": "ChosenSelectpicker",
      "tags": "module:plugins.ChosenSelectpicker ChosenSelectpicker",
      "summary": "",
      "description": "",
      "body": ""
    },
    "module-plugins.FilterDescription.html": {
      "id": "module-plugins.FilterDescription.html",
      "kind": "class",
      "title": "plugins.FilterDescription",
      "longname": "module:plugins.FilterDescription",
      "name": "FilterDescription",
      "tags": "module:plugins.FilterDescription FilterDescription",
      "summary": "",
      "description": "Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.",
      "body": ""
    },
    "module-plugins.Invert.html": {
      "id": "module-plugins.Invert.html",
      "kind": "class",
      "title": "plugins.Invert",
      "longname": "module:plugins.Invert",
      "name": "Invert",
      "tags": "module:plugins.Invert Invert",
      "summary": "",
      "description": "Allows to invert a rule operator, a group condition or the entire builder.",
      "body": ""
    },
    "module-plugins.Invert.html#invert": {
      "id": "module-plugins.Invert.html#invert",
      "kind": "function",
      "title": "invert( [ node [, options ] ] )",
      "longname": "module:plugins.Invert#invert",
      "name": "invert",
      "tags": "module:plugins.Invert#invert Invert#invert invert",
      "summary": "",
      "description": "Invert a Group, a Rule or the whole builder"
    },
    "module-plugins.MongoDbSupport.html": {
      "id": "module-plugins.MongoDbSupport.html",
      "kind": "class",
      "title": "plugins.MongoDbSupport",
      "longname": "module:plugins.MongoDbSupport",
      "name": "MongoDbSupport",
      "tags": "module:plugins.MongoDbSupport MongoDbSupport",
      "summary": "",
      "description": "Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.",
      "body": ""
    },
    "module-plugins.MongoDbSupport.html#getMongo": {
      "id": "module-plugins.MongoDbSupport.html#getMongo",
      "kind": "function",
      "title": "getMongo( [ data ] ) → {object}",
      "longname": "module:plugins.MongoDbSupport#getMongo",
      "name": "getMongo",
      "tags": "module:plugins.MongoDbSupport#getMongo MongoDbSupport#getMongo getMongo",
      "summary": "",
      "description": "Returns rules as a MongoDB query"
    },
    "module-plugins.MongoDbSupport.html#getRulesFromMongo": {
      "id": "module-plugins.MongoDbSupport.html#getRulesFromMongo",
      "kind": "function",
      "title": "getRulesFromMongo( query ) → {object}",
      "longname": "module:plugins.MongoDbSupport#getRulesFromMongo",
      "name": "getRulesFromMongo",
      "tags": "module:plugins.MongoDbSupport#getRulesFromMongo MongoDbSupport#getRulesFromMongo getRulesFromMongo",
      "summary": "",
      "description": "Converts a MongoDB query to rules"
    },
    "module-plugins.MongoDbSupport.html#setRulesFromMongo": {
      "id": "module-plugins.MongoDbSupport.html#setRulesFromMongo",
      "kind": "function",
      "title": "setRulesFromMongo()",
      "longname": "module:plugins.MongoDbSupport#setRulesFromMongo",
      "name": "setRulesFromMongo",
      "tags": "module:plugins.MongoDbSupport#setRulesFromMongo MongoDbSupport#setRulesFromMongo setRulesFromMongo",
      "summary": "",
      "description": "Sets rules a from MongoDB query"
    },
    "module-plugins.NotGroup.html": {
      "id": "module-plugins.NotGroup.html",
      "kind": "class",
      "title": "plugins.NotGroup",
      "longname": "module:plugins.NotGroup",
      "name": "NotGroup",
      "tags": "module:plugins.NotGroup NotGroup",
      "summary": "",
      "description": "Adds a &quot;Not&quot; checkbox in front of group conditions.",
      "body": ""
    },
    "module-plugins.Sortable.html": {
      "id": "module-plugins.Sortable.html",
      "kind": "class",
      "title": "plugins.Sortable",
      "longname": "module:plugins.Sortable",
      "name": "Sortable",
      "tags": "module:plugins.Sortable Sortable",
      "summary": "",
      "description": "Enables drag &amp; drop sort of rules.",
      "body": ""
    },
    "module-plugins.SqlSupport.html": {
      "id": "module-plugins.SqlSupport.html",
      "kind": "class",
      "title": "plugins.SqlSupport",
      "longname": "module:plugins.SqlSupport",
      "name": "SqlSupport",
      "tags": "module:plugins.SqlSupport SqlSupport",
      "summary": "",
      "description": "Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.",
      "body": ""
    },
    "module-plugins.SqlSupport.html#getRulesFromSQL": {
      "id": "module-plugins.SqlSupport.html#getRulesFromSQL",
      "kind": "function",
      "title": "getRulesFromSQL( query, stmt ) → {object}",
      "longname": "module:plugins.SqlSupport#getRulesFromSQL",
      "name": "getRulesFromSQL",
      "tags": "module:plugins.SqlSupport#getRulesFromSQL SqlSupport#getRulesFromSQL getRulesFromSQL",
      "summary": "",
      "description": "Convert a SQL query to rules"
    },
    "module-plugins.SqlSupport.html#getSQL": {
      "id": "module-plugins.SqlSupport.html#getSQL",
      "kind": "function",
      "title": "getSQL( [ stmt [, nl [, data ] ] ] ) → {module:plugins.SqlSupport.SqlQuery}",
      "longname": "module:plugins.SqlSupport#getSQL",
      "name": "getSQL",
      "tags": "module:plugins.SqlSupport#getSQL SqlSupport#getSQL getSQL",
      "summary": "",
      "description": "Returns rules as a SQL query"
    },
    "module-plugins.SqlSupport.html#setRulesFromSQL": {
      "id": "module-plugins.SqlSupport.html#setRulesFromSQL",
      "kind": "function",
      "title": "setRulesFromSQL()",
      "longname": "module:plugins.SqlSupport#setRulesFromSQL",
      "name": "setRulesFromSQL",
      "tags": "module:plugins.SqlSupport#setRulesFromSQL SqlSupport#setRulesFromSQL setRulesFromSQL",
      "summary": "",
      "description": "Sets the builder's rules from a SQL query"
    },
    "module-plugins.SqlSupport.html#.SqlQuery": {
      "id": "module-plugins.SqlSupport.html#.SqlQuery",
      "kind": "typedef",
      "title": "SqlQuery",
      "longname": "module:plugins.SqlSupport.SqlQuery",
      "name": "SqlQuery",
      "tags": "module:plugins.SqlSupport.SqlQuery SqlSupport.SqlQuery SqlQuery",
      "summary": "",
      "description": ""
    },
    "module-plugins.UniqueFilter.html": {
      "id": "module-plugins.UniqueFilter.html",
      "kind": "class",
      "title": "plugins.UniqueFilter",
      "longname": "module:plugins.UniqueFilter",
      "name": "UniqueFilter",
      "tags": "module:plugins.UniqueFilter UniqueFilter",
      "summary": "",
      "description": "Allows to define some filters as &quot;unique&quot;: ie which can be used for only one rule, globally or in the same group.",
      "body": ""
    },
    "Node.html": {
      "id": "Node.html",
      "kind": "class",
      "title": "Node",
      "longname": "Node",
      "name": "Node",
      "tags": "Node",
      "summary": "",
      "description": "Root abstract object",
      "body": ""
    },
    "Node.html#$el": {
      "id": "Node.html#$el",
      "kind": "member",
      "title": "&lt;readonly&gt; $el :jQuery",
      "longname": "Node#$el",
      "name": "$el",
      "tags": "Node#$el $el",
      "summary": "",
      "description": ""
    },
    "Node.html#data": {
      "id": "Node.html#data",
      "kind": "member",
      "title": "data :object",
      "longname": "Node#data",
      "name": "data",
      "tags": "Node#data data",
      "summary": "",
      "description": ""
    },
    "Node.html#error": {
      "id": "Node.html#error",
      "kind": "member",
      "title": "error :string",
      "longname": "Node#error",
      "name": "error",
      "tags": "Node#error error",
      "summary": "",
      "description": ""
    },
    "Node.html#flags": {
      "id": "Node.html#flags",
      "kind": "member",
      "title": "&lt;readonly&gt; flags :object",
      "longname": "Node#flags",
      "name": "flags",
      "tags": "Node#flags flags",
      "summary": "",
      "description": ""
    },
    "Node.html#id": {
      "id": "Node.html#id",
      "kind": "member",
      "title": "&lt;readonly&gt; id :string",
      "longname": "Node#id",
      "name": "id",
      "tags": "Node#id id",
      "summary": "",
      "description": ""
    },
    "Node.html#level": {
      "id": "Node.html#level",
      "kind": "member",
      "title": "&lt;readonly&gt; level :int",
      "longname": "Node#level",
      "name": "level",
      "tags": "Node#level level",
      "summary": "",
      "description": ""
    },
    "Node.html#model": {
      "id": "Node.html#model",
      "kind": "member",
      "title": "&lt;readonly&gt; model :Model",
      "longname": "Node#model",
      "name": "model",
      "tags": "Node#model model",
      "summary": "",
      "description": ""
    },
    "Node.html#parent": {
      "id": "Node.html#parent",
      "kind": "member",
      "title": "&lt;readonly&gt; parent :Group",
      "longname": "Node#parent",
      "name": "parent",
      "tags": "Node#parent parent",
      "summary": "",
      "description": ""
    },
    "Node.html#drop": {
      "id": "Node.html#drop",
      "kind": "function",
      "title": "drop()",
      "longname": "Node#drop",
      "name": "drop",
      "tags": "Node#drop drop",
      "summary": "",
      "description": "Deletes self"
    },
    "Node.html#getPos": {
      "id": "Node.html#getPos",
      "kind": "function",
      "title": "getPos() → {int}",
      "longname": "Node#getPos",
      "name": "getPos",
      "tags": "Node#getPos getPos",
      "summary": "",
      "description": "Returns the node position inside its parent"
    },
    "Node.html#isRoot": {
      "id": "Node.html#isRoot",
      "kind": "function",
      "title": "isRoot() → {boolean}",
      "longname": "Node#isRoot",
      "name": "isRoot",
      "tags": "Node#isRoot isRoot",
      "summary": "",
      "description": "Checks if this Node is the root"
    },
    "Node.html#move": {
      "id": "Node.html#move",
      "kind": "function",
      "title": "move( target, index )",
      "longname": "Node#move",
      "name": "move",
      "tags": "Node#move move",
      "summary": "",
      "description": "Moves itself at specific position of Group"
    },
    "Node.html#moveAfter": {
      "id": "Node.html#moveAfter",
      "kind": "function",
      "title": "moveAfter( target )",
      "longname": "Node#moveAfter",
      "name": "moveAfter",
      "tags": "Node#moveAfter moveAfter",
      "summary": "",
      "description": "Moves itself after another Node"
    },
    "Node.html#moveAtBegin": {
      "id": "Node.html#moveAtBegin",
      "kind": "function",
      "title": "moveAtBegin( [ target ] )",
      "longname": "Node#moveAtBegin",
      "name": "moveAtBegin",
      "tags": "Node#moveAtBegin moveAtBegin",
      "summary": "",
      "description": "Moves itself at the beginning of parent or another Group"
    },
    "Node.html#moveAtEnd": {
      "id": "Node.html#moveAtEnd",
      "kind": "function",
      "title": "moveAtEnd( [ target ] )",
      "longname": "Node#moveAtEnd",
      "name": "moveAtEnd",
      "tags": "Node#moveAtEnd moveAtEnd",
      "summary": "",
      "description": "Moves itself at the end of parent or another Group"
    },
    "QueryBuilder.html": {
      "id": "QueryBuilder.html",
      "kind": "class",
      "title": "QueryBuilder",
      "longname": "QueryBuilder",
      "name": "QueryBuilder",
      "tags": "QueryBuilder",
      "summary": "",
      "description": "",
      "body": ""
    },
    "QueryBuilder.html#.DEFAULTS": {
      "id": "QueryBuilder.html#.DEFAULTS",
      "kind": "member",
      "title": "&lt;static, readonly&gt; DEFAULTS :object",
      "longname": "QueryBuilder.DEFAULTS",
      "name": "DEFAULTS",
      "tags": "QueryBuilder.DEFAULTS DEFAULTS",
      "summary": "",
      "description": "Default configuration"
    },
    "QueryBuilder.html#.Group": {
      "id": "QueryBuilder.html#.Group",
      "kind": "member",
      "title": "&lt;static&gt; Group :function",
      "longname": "QueryBuilder.Group",
      "name": "Group",
      "tags": "QueryBuilder.Group Group",
      "summary": "",
      "description": ""
    },
    "QueryBuilder.html#.OPERATORS": {
      "id": "QueryBuilder.html#.OPERATORS",
      "kind": "member",
      "title": "&lt;static, readonly&gt; OPERATORS :object.&lt;string, object&gt;",
      "longname": "QueryBuilder.OPERATORS",
      "name": "OPERATORS",
      "tags": "QueryBuilder.OPERATORS OPERATORS",
      "summary": "",
      "description": "Default operators"
    },
    "QueryBuilder.html#.regional": {
      "id": "QueryBuilder.html#.regional",
      "kind": "member",
      "title": "&lt;static, readonly&gt; regional :object.&lt;string, object&gt;",
      "longname": "QueryBuilder.regional",
      "name": "regional",
      "tags": "QueryBuilder.regional regional",
      "summary": "",
      "description": "Localized strings (see i18n/)"
    },
    "QueryBuilder.html#.Rule": {
      "id": "QueryBuilder.html#.Rule",
      "kind": "member",
      "title": "&lt;static&gt; Rule :function",
      "longname": "QueryBuilder.Rule",
      "name": "Rule",
      "tags": "QueryBuilder.Rule Rule",
      "summary": "",
      "description": ""
    },
    "QueryBuilder.html#.selectors": {
      "id": "QueryBuilder.html#.selectors",
      "kind": "member",
      "title": "&lt;static, readonly&gt; selectors :object.&lt;string, string&gt;",
      "longname": "QueryBuilder.selectors",
      "name": "selectors",
      "tags": "QueryBuilder.selectors selectors",
      "summary": "",
      "description": "CSS selectors for common components"
    },
    "QueryBuilder.html#.templates": {
      "id": "QueryBuilder.html#.templates",
      "kind": "member",
      "title": "&lt;static, readonly&gt; templates :object.&lt;string, string&gt;",
      "longname": "QueryBuilder.templates",
      "name": "templates",
      "tags": "QueryBuilder.templates templates",
      "summary": "",
      "description": "Template strings (see template.js)"
    },
    "QueryBuilder.html#.utils": {
      "id": "QueryBuilder.html#.utils",
      "kind": "member",
      "title": "&lt;static&gt; utils :object",
      "longname": "QueryBuilder.utils",
      "name": "utils",
      "tags": "QueryBuilder.utils utils",
      "summary": "",
      "description": ""
    },
    "QueryBuilder.html#$el": {
      "id": "QueryBuilder.html#$el",
      "kind": "member",
      "title": "&lt;readonly&gt; $el :jQuery",
      "longname": "QueryBuilder#$el",
      "name": "$el",
      "tags": "QueryBuilder#$el $el",
      "summary": "",
      "description": "Element container"
    },
    "QueryBuilder.html#filters": {
      "id": "QueryBuilder.html#filters",
      "kind": "member",
      "title": "&lt;readonly&gt; filters :Array.&lt;QueryBuilder.Filter&gt;",
      "longname": "QueryBuilder#filters",
      "name": "filters",
      "tags": "QueryBuilder#filters filters",
      "summary": "",
      "description": "List of filters"
    },
    "QueryBuilder.html#icons": {
      "id": "QueryBuilder.html#icons",
      "kind": "member",
      "title": "&lt;readonly&gt; icons :object.&lt;string, string&gt;",
      "longname": "QueryBuilder#icons",
      "name": "icons",
      "tags": "QueryBuilder#icons icons",
      "summary": "",
      "description": "List of icons"
    },
    "QueryBuilder.html#lang": {
      "id": "QueryBuilder.html#lang",
      "kind": "member",
      "title": "&lt;readonly&gt; lang :object",
      "longname": "QueryBuilder#lang",
      "name": "lang",
      "tags": "QueryBuilder#lang lang",
      "summary": "",
      "description": "Translations object"
    },
    "QueryBuilder.html#model": {
      "id": "QueryBuilder.html#model",
      "kind": "member",
      "title": "&lt;readonly&gt; model :Model",
      "longname": "QueryBuilder#model",
      "name": "model",
      "tags": "QueryBuilder#model model",
      "summary": "",
      "description": "Internal model"
    },
    "QueryBuilder.html#operators": {
      "id": "QueryBuilder.html#operators",
      "kind": "member",
      "title": "&lt;readonly&gt; operators :Array.&lt;QueryBuilder.Operator&gt;",
      "longname": "QueryBuilder#operators",
      "name": "operators",
      "tags": "QueryBuilder#operators operators",
      "summary": "",
      "description": "List of operators"
    },
    "QueryBuilder.html#plugins": {
      "id": "QueryBuilder.html#plugins",
      "kind": "member",
      "title": "&lt;readonly&gt; plugins :object.&lt;string, object&gt;",
      "longname": "QueryBuilder#plugins",
      "name": "plugins",
      "tags": "QueryBuilder#plugins plugins",
      "summary": "",
      "description": "Plugins configuration"
    },
    "QueryBuilder.html#settings": {
      "id": "QueryBuilder.html#settings",
      "kind": "member",
      "title": "&lt;readonly&gt; settings :object",
      "longname": "QueryBuilder#settings",
      "name": "settings",
      "tags": "QueryBuilder#settings settings",
      "summary": "",
      "description": "Configuration object"
    },
    "QueryBuilder.html#templates": {
      "id": "QueryBuilder.html#templates",
      "kind": "member",
      "title": "&lt;readonly&gt; templates :object.&lt;string, function()&gt;",
      "longname": "QueryBuilder#templates",
      "name": "templates",
      "tags": "QueryBuilder#templates templates",
      "summary": "",
      "description": "List of templates"
    },
    "QueryBuilder.html#addGroup": {
      "id": "QueryBuilder.html#addGroup",
      "kind": "function",
      "title": "addGroup( parent [, addRule [, data [, flags ] ] ] ) → {Group}",
      "longname": "QueryBuilder#addGroup",
      "name": "addGroup",
      "tags": "QueryBuilder#addGroup addGroup",
      "summary": "",
      "description": "Adds a new group"
    },
    "QueryBuilder.html#addRule": {
      "id": "QueryBuilder.html#addRule",
      "kind": "function",
      "title": "addRule( parent [, data [, flags ] ] ) → {Rule}",
      "longname": "QueryBuilder#addRule",
      "name": "addRule",
      "tags": "QueryBuilder#addRule addRule",
      "summary": "",
      "description": "Adds a new rule"
    },
    "QueryBuilder.html#change": {
      "id": "QueryBuilder.html#change",
      "kind": "function",
      "title": "change( type, value ) → {*}",
      "longname": "QueryBuilder#change",
      "name": "change",
      "tags": "QueryBuilder#change change",
      "summary": "",
      "description": "Triggers an event on the builder container and returns the modified value"
    },
    "QueryBuilder.html#checkFilters": {
      "id": "QueryBuilder.html#checkFilters",
      "kind": "function",
      "title": "checkFilters( filters ) → {Array.&lt;QueryBuilder.Filter&gt;}",
      "longname": "QueryBuilder#checkFilters",
      "name": "checkFilters",
      "tags": "QueryBuilder#checkFilters checkFilters",
      "summary": "",
      "description": "Checks the configuration of each filter"
    },
    "QueryBuilder.html#checkOperators": {
      "id": "QueryBuilder.html#checkOperators",
      "kind": "function",
      "title": "checkOperators( operators ) → {Array.&lt;QueryBuilder.Operator&gt;}",
      "longname": "QueryBuilder#checkOperators",
      "name": "checkOperators",
      "tags": "QueryBuilder#checkOperators checkOperators",
      "summary": "",
      "description": "Checks the configuration of each operator"
    },
    "QueryBuilder.html#clear": {
      "id": "QueryBuilder.html#clear",
      "kind": "function",
      "title": "clear()",
      "longname": "QueryBuilder#clear",
      "name": "clear",
      "tags": "QueryBuilder#clear clear",
      "summary": "",
      "description": "Clears all rules and removes the root group"
    },
    "QueryBuilder.html#clearErrors": {
      "id": "QueryBuilder.html#clearErrors",
      "kind": "function",
      "title": "clearErrors( [ node ] )",
      "longname": "QueryBuilder#clearErrors",
      "name": "clearErrors",
      "tags": "QueryBuilder#clearErrors clearErrors",
      "summary": "",
      "description": "Clears all errors markers"
    },
    "QueryBuilder.html#deleteGroup": {
      "id": "QueryBuilder.html#deleteGroup",
      "kind": "function",
      "title": "deleteGroup( group ) → {boolean}",
      "longname": "QueryBuilder#deleteGroup",
      "name": "deleteGroup",
      "tags": "QueryBuilder#deleteGroup deleteGroup",
      "summary": "",
      "description": "Tries to delete a group. The group is not deleted if at least one rule is flagged no_delete."
    },
    "QueryBuilder.html#deleteRule": {
      "id": "QueryBuilder.html#deleteRule",
      "kind": "function",
      "title": "deleteRule( rule ) → {boolean}",
      "longname": "QueryBuilder#deleteRule",
      "name": "deleteRule",
      "tags": "QueryBuilder#deleteRule deleteRule",
      "summary": "",
      "description": "Tries to delete a rule"
    },
    "QueryBuilder.html#destroy": {
      "id": "QueryBuilder.html#destroy",
      "kind": "function",
      "title": "destroy()",
      "longname": "QueryBuilder#destroy",
      "name": "destroy",
      "tags": "QueryBuilder#destroy destroy",
      "summary": "",
      "description": "Destroys the builder"
    },
    "QueryBuilder.html#getModel": {
      "id": "QueryBuilder.html#getModel",
      "kind": "function",
      "title": "getModel( [ target ] ) → {Node}",
      "longname": "QueryBuilder#getModel",
      "name": "getModel",
      "tags": "QueryBuilder#getModel getModel",
      "summary": "",
      "description": "Returns the model associated to a DOM object, or the root model"
    },
    "QueryBuilder.html#getRules": {
      "id": "QueryBuilder.html#getRules",
      "kind": "function",
      "title": "getRules( [ options ] ) → {object}",
      "longname": "QueryBuilder#getRules",
      "name": "getRules",
      "tags": "QueryBuilder#getRules getRules",
      "summary": "",
      "description": "Gets an object representing current rules"
    },
    "QueryBuilder.html#off": {
      "id": "QueryBuilder.html#off",
      "kind": "function",
      "title": "off( type [, cb ] ) → {QueryBuilder}",
      "longname": "QueryBuilder#off",
      "name": "off",
      "tags": "QueryBuilder#off off",
      "summary": "",
      "description": "Removes an event listener from the builder container"
    },
    "QueryBuilder.html#on": {
      "id": "QueryBuilder.html#on",
      "kind": "function",
      "title": "on( type, cb ) → {QueryBuilder}",
      "longname": "QueryBuilder#on",
      "name": "on",
      "tags": "QueryBuilder#on on",
      "summary": "",
      "description": "Attaches an event listener on the builder container"
    },
    "QueryBuilder.html#once": {
      "id": "QueryBuilder.html#once",
      "kind": "function",
      "title": "once( type, cb ) → {QueryBuilder}",
      "longname": "QueryBuilder#once",
      "name": "once",
      "tags": "QueryBuilder#once once",
      "summary": "",
      "description": "Attaches an event listener called once on the builder container"
    },
    "QueryBuilder.html#reset": {
      "id": "QueryBuilder.html#reset",
      "kind": "function",
      "title": "reset()",
      "longname": "QueryBuilder#reset",
      "name": "reset",
      "tags": "QueryBuilder#reset reset",
      "summary": "",
      "description": "Clear all rules and resets the root group"
    },
    "QueryBuilder.html#setOptions": {
      "id": "QueryBuilder.html#setOptions",
      "kind": "function",
      "title": "setOptions( options )",
      "longname": "QueryBuilder#setOptions",
      "name": "setOptions",
      "tags": "QueryBuilder#setOptions setOptions",
      "summary": "",
      "description": "Modifies the builder configuration. Only options defined in QueryBuilder.modifiable_options are modifiable"
    },
    "QueryBuilder.html#setRoot": {
      "id": "QueryBuilder.html#setRoot",
      "kind": "function",
      "title": "setRoot( [ addRule [, data [, flags ] ] ] ) → {Group}",
      "longname": "QueryBuilder#setRoot",
      "name": "setRoot",
      "tags": "QueryBuilder#setRoot setRoot",
      "summary": "",
      "description": "Creates the root group"
    },
    "QueryBuilder.html#setRules": {
      "id": "QueryBuilder.html#setRules",
      "kind": "function",
      "title": "setRules( data [, options ] )",
      "longname": "QueryBuilder#setRules",
      "name": "setRules",
      "tags": "QueryBuilder#setRules setRules",
      "summary": "",
      "description": "Sets rules from object"
    },
    "QueryBuilder.html#translate": {
      "id": "QueryBuilder.html#translate",
      "kind": "function",
      "title": "translate( [ category ], key ) → {string}",
      "longname": "QueryBuilder#translate",
      "name": "translate",
      "tags": "QueryBuilder#translate translate",
      "summary": "",
      "description": "Translate a label either by looking in the lang object or in itself if it's an object where keys are language codes"
    },
    "QueryBuilder.html#trigger": {
      "id": "QueryBuilder.html#trigger",
      "kind": "function",
      "title": "trigger( type ) → {$.Event}",
      "longname": "QueryBuilder#trigger",
      "name": "trigger",
      "tags": "QueryBuilder#trigger trigger",
      "summary": "",
      "description": "Triggers an event on the builder container"
    },
    "QueryBuilder.html#validate": {
      "id": "QueryBuilder.html#validate",
      "kind": "function",
      "title": "validate( [ options ] ) → {boolean}",
      "longname": "QueryBuilder#validate",
      "name": "validate",
      "tags": "QueryBuilder#validate validate",
      "summary": "",
      "description": "Validates the whole builder"
    },
    "QueryBuilder.html#validateValue": {
      "id": "QueryBuilder.html#validateValue",
      "kind": "function",
      "title": "validateValue( rule, value ) → {array|boolean}",
      "longname": "QueryBuilder#validateValue",
      "name": "validateValue",
      "tags": "QueryBuilder#validateValue validateValue",
      "summary": "",
      "description": "Performs value validation"
    },
    "QueryBuilder.html#.Filter": {
      "id": "QueryBuilder.html#.Filter",
      "kind": "typedef",
      "title": "Filter",
      "longname": "QueryBuilder.Filter",
      "name": "Filter",
      "tags": "QueryBuilder.Filter Filter",
      "summary": "",
      "description": "See http://querybuilder.js.org/index.html#filters"
    },
    "QueryBuilder.html#.Operator": {
      "id": "QueryBuilder.html#.Operator",
      "kind": "typedef",
      "title": "Operator",
      "longname": "QueryBuilder.Operator",
      "name": "Operator",
      "tags": "QueryBuilder.Operator Operator",
      "summary": "",
      "description": "See http://querybuilder.js.org/index.html#operators"
    },
    "Rule.html": {
      "id": "Rule.html",
      "kind": "class",
      "title": "Rule",
      "longname": "Rule",
      "name": "Rule",
      "tags": "Rule",
      "summary": "",
      "description": "Rule object",
      "body": ""
    },
    "Rule.html#$el": {
      "id": "Rule.html#$el",
      "kind": "member",
      "title": "&lt;readonly&gt; $el :jQuery",
      "longname": "Rule#$el",
      "name": "$el",
      "tags": "Rule#$el $el",
      "summary": "",
      "description": ""
    },
    "Rule.html#data": {
      "id": "Rule.html#data",
      "kind": "member",
      "title": "data :object",
      "longname": "Rule#data",
      "name": "data",
      "tags": "Rule#data data",
      "summary": "",
      "description": ""
    },
    "Rule.html#error": {
      "id": "Rule.html#error",
      "kind": "member",
      "title": "error :string",
      "longname": "Rule#error",
      "name": "error",
      "tags": "Rule#error error",
      "summary": "",
      "description": ""
    },
    "Rule.html#filter": {
      "id": "Rule.html#filter",
      "kind": "member",
      "title": "filter :QueryBuilder.Filter",
      "longname": "Rule#filter",
      "name": "filter",
      "tags": "Rule#filter filter",
      "summary": "",
      "description": ""
    },
    "Rule.html#flags": {
      "id": "Rule.html#flags",
      "kind": "member",
      "title": "&lt;readonly&gt; flags :object",
      "longname": "Rule#flags",
      "name": "flags",
      "tags": "Rule#flags flags",
      "summary": "",
      "description": ""
    },
    "Rule.html#id": {
      "id": "Rule.html#id",
      "kind": "member",
      "title": "&lt;readonly&gt; id :string",
      "longname": "Rule#id",
      "name": "id",
      "tags": "Rule#id id",
      "summary": "",
      "description": ""
    },
    "Rule.html#level": {
      "id": "Rule.html#level",
      "kind": "member",
      "title": "&lt;readonly&gt; level :int",
      "longname": "Rule#level",
      "name": "level",
      "tags": "Rule#level level",
      "summary": "",
      "description": ""
    },
    "Rule.html#model": {
      "id": "Rule.html#model",
      "kind": "member",
      "title": "&lt;readonly&gt; model :Model",
      "longname": "Rule#model",
      "name": "model",
      "tags": "Rule#model model",
      "summary": "",
      "description": ""
    },
    "Rule.html#operator": {
      "id": "Rule.html#operator",
      "kind": "member",
      "title": "operator :QueryBuilder.Operator",
      "longname": "Rule#operator",
      "name": "operator",
      "tags": "Rule#operator operator",
      "summary": "",
      "description": ""
    },
    "Rule.html#parent": {
      "id": "Rule.html#parent",
      "kind": "member",
      "title": "&lt;readonly&gt; parent :Group",
      "longname": "Rule#parent",
      "name": "parent",
      "tags": "Rule#parent parent",
      "summary": "",
      "description": ""
    },
    "Rule.html#value": {
      "id": "Rule.html#value",
      "kind": "member",
      "title": "value :*",
      "longname": "Rule#value",
      "name": "value",
      "tags": "Rule#value value",
      "summary": "",
      "description": ""
    },
    "Rule.html#drop": {
      "id": "Rule.html#drop",
      "kind": "function",
      "title": "drop()",
      "longname": "Rule#drop",
      "name": "drop",
      "tags": "Rule#drop drop",
      "summary": "",
      "description": "Deletes self"
    },
    "Rule.html#getPos": {
      "id": "Rule.html#getPos",
      "kind": "function",
      "title": "getPos() → {int}",
      "longname": "Rule#getPos",
      "name": "getPos",
      "tags": "Rule#getPos getPos",
      "summary": "",
      "description": "Returns the node position inside its parent"
    },
    "Rule.html#isRoot": {
      "id": "Rule.html#isRoot",
      "kind": "function",
      "title": "isRoot() → {boolean}",
      "longname": "Rule#isRoot",
      "name": "isRoot",
      "tags": "Rule#isRoot isRoot",
      "summary": "",
      "description": "Checks if this Node is the root"
    },
    "Rule.html#move": {
      "id": "Rule.html#move",
      "kind": "function",
      "title": "move( target, index )",
      "longname": "Rule#move",
      "name": "move",
      "tags": "Rule#move move",
      "summary": "",
      "description": "Moves itself at specific position of Group"
    },
    "Rule.html#moveAfter": {
      "id": "Rule.html#moveAfter",
      "kind": "function",
      "title": "moveAfter( target )",
      "longname": "Rule#moveAfter",
      "name": "moveAfter",
      "tags": "Rule#moveAfter moveAfter",
      "summary": "",
      "description": "Moves itself after another Node"
    },
    "Rule.html#moveAtBegin": {
      "id": "Rule.html#moveAtBegin",
      "kind": "function",
      "title": "moveAtBegin( [ target ] )",
      "longname": "Rule#moveAtBegin",
      "name": "moveAtBegin",
      "tags": "Rule#moveAtBegin moveAtBegin",
      "summary": "",
      "description": "Moves itself at the beginning of parent or another Group"
    },
    "Rule.html#moveAtEnd": {
      "id": "Rule.html#moveAtEnd",
      "kind": "function",
      "title": "moveAtEnd( [ target ] )",
      "longname": "Rule#moveAtEnd",
      "name": "moveAtEnd",
      "tags": "Rule#moveAtEnd moveAtEnd",
      "summary": "",
      "description": "Moves itself at the end of parent or another Group"
    },
    "external-_jQuery.fn_.html": {
      "id": "external-_jQuery.fn_.html",
      "kind": "external",
      "title": "&quot;jQuery.fn&quot;",
      "longname": "external:\"jQuery.fn\"",
      "name": "\"jQuery.fn\"",
      "tags": "external:\"jQuery.fn\" fn\"",
      "summary": "",
      "description": "The jQuery Plugins namespace",
      "body": ""
    },
    "module-plugins.html": {
      "id": "module-plugins.html",
      "kind": "module",
      "title": "plugins",
      "longname": "module:plugins",
      "name": "plugins",
      "tags": "module:plugins",
      "summary": "",
      "description": "",
      "body": ""
    },
    "Utils.html": {
      "id": "Utils.html",
      "kind": "namespace",
      "title": "Utils",
      "longname": "Utils",
      "name": "Utils",
      "tags": "Utils",
      "summary": "",
      "description": "",
      "body": ""
    },
    "Utils.html#.changeType": {
      "id": "Utils.html#.changeType",
      "kind": "function",
      "title": "&lt;static&gt; changeType( value, type ) → {*}",
      "longname": "Utils.changeType",
      "name": "changeType",
      "tags": "Utils.changeType changeType",
      "summary": "",
      "description": "Changes the type of a value to int, float or bool"
    },
    "Utils.html#.defineModelProperties": {
      "id": "Utils.html#.defineModelProperties",
      "kind": "function",
      "title": "&lt;static&gt; defineModelProperties( obj, fields )",
      "longname": "Utils.defineModelProperties",
      "name": "defineModelProperties",
      "tags": "Utils.defineModelProperties defineModelProperties",
      "summary": "",
      "description": "Defines properties on an Node prototype with getter and setter. Update events are emitted in the setter through root Model (if any). The object must have a __ object, non enumerable property to store values."
    },
    "Utils.html#.error": {
      "id": "Utils.html#.error",
      "kind": "function",
      "title": "&lt;static&gt; error( [ doThrow ], type, message, ...args )",
      "longname": "Utils.error",
      "name": "error",
      "tags": "Utils.error error",
      "summary": "",
      "description": "Throws an Error object with custom name or logs an error"
    },
    "Utils.html#.escapeElementId": {
      "id": "Utils.html#.escapeElementId",
      "kind": "function",
      "title": "&lt;static&gt; escapeElementId( str ) → {string}",
      "longname": "Utils.escapeElementId",
      "name": "escapeElementId",
      "tags": "Utils.escapeElementId escapeElementId",
      "summary": "",
      "description": "Escapes a string for use in HTML element id"
    },
    "Utils.html#.escapeRegExp": {
      "id": "Utils.html#.escapeRegExp",
      "kind": "function",
      "title": "&lt;static&gt; escapeRegExp( str ) → {string}",
      "longname": "Utils.escapeRegExp",
      "name": "escapeRegExp",
      "tags": "Utils.escapeRegExp escapeRegExp",
      "summary": "",
      "description": "Escapes a string for use in regex"
    },
    "Utils.html#.escapeString": {
      "id": "Utils.html#.escapeString",
      "kind": "function",
      "title": "&lt;static&gt; escapeString( value ) → {string}",
      "longname": "Utils.escapeString",
      "name": "escapeString",
      "tags": "Utils.escapeString escapeString",
      "summary": "",
      "description": "Escapes a string like PHP's mysql_real_escape_string does"
    },
    "Utils.html#.fmt": {
      "id": "Utils.html#.fmt",
      "kind": "function",
      "title": "&lt;static&gt; fmt( str, ...args ) → {string}",
      "longname": "Utils.fmt",
      "name": "fmt",
      "tags": "Utils.fmt fmt",
      "summary": "",
      "description": "Replaces {0}, {1}, ... in a string"
    },
    "Utils.html#.groupSort": {
      "id": "Utils.html#.groupSort",
      "kind": "function",
      "title": "&lt;static&gt; groupSort( items, key ) → {Array.&lt;object&gt;}",
      "longname": "Utils.groupSort",
      "name": "groupSort",
      "tags": "Utils.groupSort groupSort",
      "summary": "",
      "description": "Sorts objects by grouping them by key, preserving initial order when possible"
    },
    "Utils.html#.iterateOptions": {
      "id": "Utils.html#.iterateOptions",
      "kind": "function",
      "title": "&lt;static&gt; iterateOptions( options, tpl )",
      "longname": "Utils.iterateOptions",
      "name": "iterateOptions",
      "tags": "Utils.iterateOptions iterateOptions",
      "summary": "",
      "description": "Iterates over radio/checkbox/selection options, it accept four formats"
    },
    "Utils.html#OptionsIteratee": {
      "id": "Utils.html#OptionsIteratee",
      "kind": "typedef",
      "title": "OptionsIteratee( key, value [, optgroup ] )",
      "longname": "Utils#OptionsIteratee",
      "name": "OptionsIteratee",
      "tags": "Utils#OptionsIteratee OptionsIteratee",
      "summary": "",
      "description": ""
    }
  }
};