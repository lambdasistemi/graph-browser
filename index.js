(()=>{var hh=Object.create;var Us=Object.defineProperty;var ch=Object.getOwnPropertyDescriptor;var dh=Object.getOwnPropertyNames;var gh=Object.getPrototypeOf,ph=Object.prototype.hasOwnProperty;var hi=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var yh=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of dh(e))!ph.call(t,n)&&n!==r&&Us(t,n,{get:()=>e[n],enumerable:!(a=ch(e,n))||a.enumerable});return t};var mh=(t,e,r)=>(r=t!=null?hh(gh(t)):{},yh(e||!t||!t.__esModule?Us(r,"default",{value:t,enumerable:!0}):r,t));var Fs=hi((tn,Bs)=>{(function(e,r){typeof tn=="object"&&typeof Bs=="object"?Bs.exports=r():typeof define=="function"&&define.amd?define([],r):typeof tn=="object"?tn.layoutBase=r():e.layoutBase=r()})(tn,function(){return(function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.i=function(a){return a},r.d=function(a,n,i){r.o(a,n)||Object.defineProperty(a,n,{configurable:!1,enumerable:!0,get:i})},r.n=function(a){var n=a&&a.__esModule?function(){return a.default}:function(){return a};return r.d(n,"a",n),n},r.o=function(a,n){return Object.prototype.hasOwnProperty.call(a,n)},r.p="",r(r.s=28)})([(function(t,e,r){"use strict";function a(){}a.QUALITY=1,a.DEFAULT_CREATE_BENDS_AS_NEEDED=!1,a.DEFAULT_INCREMENTAL=!1,a.DEFAULT_ANIMATION_ON_LAYOUT=!0,a.DEFAULT_ANIMATION_DURING_LAYOUT=!1,a.DEFAULT_ANIMATION_PERIOD=50,a.DEFAULT_UNIFORM_LEAF_NODE_SIZES=!1,a.DEFAULT_GRAPH_MARGIN=15,a.NODE_DIMENSIONS_INCLUDE_LABELS=!1,a.SIMPLE_NODE_SIZE=40,a.SIMPLE_NODE_HALF_SIZE=a.SIMPLE_NODE_SIZE/2,a.EMPTY_COMPOUND_NODE_SIZE=40,a.MIN_EDGE_LENGTH=1,a.WORLD_BOUNDARY=1e6,a.INITIAL_WORLD_BOUNDARY=a.WORLD_BOUNDARY/1e3,a.WORLD_CENTER_X=1200,a.WORLD_CENTER_Y=900,t.exports=a}),(function(t,e,r){"use strict";var a=r(2),n=r(8),i=r(9);function o(l,u,f){a.call(this,f),this.isOverlapingSourceAndTarget=!1,this.vGraphObject=f,this.bendpoints=[],this.source=l,this.target=u}o.prototype=Object.create(a.prototype);for(var s in a)o[s]=a[s];o.prototype.getSource=function(){return this.source},o.prototype.getTarget=function(){return this.target},o.prototype.isInterGraph=function(){return this.isInterGraph},o.prototype.getLength=function(){return this.length},o.prototype.isOverlapingSourceAndTarget=function(){return this.isOverlapingSourceAndTarget},o.prototype.getBendpoints=function(){return this.bendpoints},o.prototype.getLca=function(){return this.lca},o.prototype.getSourceInLca=function(){return this.sourceInLca},o.prototype.getTargetInLca=function(){return this.targetInLca},o.prototype.getOtherEnd=function(l){if(this.source===l)return this.target;if(this.target===l)return this.source;throw"Node is not incident with this edge"},o.prototype.getOtherEndInGraph=function(l,u){for(var f=this.getOtherEnd(l),v=u.getGraphManager().getRoot();;){if(f.getOwner()==u)return f;if(f.getOwner()==v)break;f=f.getOwner().getParent()}return null},o.prototype.updateLength=function(){var l=new Array(4);this.isOverlapingSourceAndTarget=n.getIntersection(this.target.getRect(),this.source.getRect(),l),this.isOverlapingSourceAndTarget||(this.lengthX=l[0]-l[2],this.lengthY=l[1]-l[3],Math.abs(this.lengthX)<1&&(this.lengthX=i.sign(this.lengthX)),Math.abs(this.lengthY)<1&&(this.lengthY=i.sign(this.lengthY)),this.length=Math.sqrt(this.lengthX*this.lengthX+this.lengthY*this.lengthY))},o.prototype.updateLengthSimple=function(){this.lengthX=this.target.getCenterX()-this.source.getCenterX(),this.lengthY=this.target.getCenterY()-this.source.getCenterY(),Math.abs(this.lengthX)<1&&(this.lengthX=i.sign(this.lengthX)),Math.abs(this.lengthY)<1&&(this.lengthY=i.sign(this.lengthY)),this.length=Math.sqrt(this.lengthX*this.lengthX+this.lengthY*this.lengthY)},t.exports=o}),(function(t,e,r){"use strict";function a(n){this.vGraphObject=n}t.exports=a}),(function(t,e,r){"use strict";var a=r(2),n=r(10),i=r(13),o=r(0),s=r(16),l=r(5);function u(v,h,c,d){c==null&&d==null&&(d=h),a.call(this,d),v.graphManager!=null&&(v=v.graphManager),this.estimatedSize=n.MIN_VALUE,this.inclusionTreeDepth=n.MAX_VALUE,this.vGraphObject=d,this.edges=[],this.graphManager=v,c!=null&&h!=null?this.rect=new i(h.x,h.y,c.width,c.height):this.rect=new i}u.prototype=Object.create(a.prototype);for(var f in a)u[f]=a[f];u.prototype.getEdges=function(){return this.edges},u.prototype.getChild=function(){return this.child},u.prototype.getOwner=function(){return this.owner},u.prototype.getWidth=function(){return this.rect.width},u.prototype.setWidth=function(v){this.rect.width=v},u.prototype.getHeight=function(){return this.rect.height},u.prototype.setHeight=function(v){this.rect.height=v},u.prototype.getCenterX=function(){return this.rect.x+this.rect.width/2},u.prototype.getCenterY=function(){return this.rect.y+this.rect.height/2},u.prototype.getCenter=function(){return new l(this.rect.x+this.rect.width/2,this.rect.y+this.rect.height/2)},u.prototype.getLocation=function(){return new l(this.rect.x,this.rect.y)},u.prototype.getRect=function(){return this.rect},u.prototype.getDiagonal=function(){return Math.sqrt(this.rect.width*this.rect.width+this.rect.height*this.rect.height)},u.prototype.getHalfTheDiagonal=function(){return Math.sqrt(this.rect.height*this.rect.height+this.rect.width*this.rect.width)/2},u.prototype.setRect=function(v,h){this.rect.x=v.x,this.rect.y=v.y,this.rect.width=h.width,this.rect.height=h.height},u.prototype.setCenter=function(v,h){this.rect.x=v-this.rect.width/2,this.rect.y=h-this.rect.height/2},u.prototype.setLocation=function(v,h){this.rect.x=v,this.rect.y=h},u.prototype.moveBy=function(v,h){this.rect.x+=v,this.rect.y+=h},u.prototype.getEdgeListToNode=function(v){var h=[],c,d=this;return d.edges.forEach(function(g){if(g.target==v){if(g.source!=d)throw"Incorrect edge source!";h.push(g)}}),h},u.prototype.getEdgesBetween=function(v){var h=[],c,d=this;return d.edges.forEach(function(g){if(!(g.source==d||g.target==d))throw"Incorrect edge source and/or target";(g.target==v||g.source==v)&&h.push(g)}),h},u.prototype.getNeighborsList=function(){var v=new Set,h=this;return h.edges.forEach(function(c){if(c.source==h)v.add(c.target);else{if(c.target!=h)throw"Incorrect incidency!";v.add(c.source)}}),v},u.prototype.withChildren=function(){var v=new Set,h,c;if(v.add(this),this.child!=null)for(var d=this.child.getNodes(),g=0;g<d.length;g++)h=d[g],c=h.withChildren(),c.forEach(function(y){v.add(y)});return v},u.prototype.getNoOfChildren=function(){var v=0,h;if(this.child==null)v=1;else for(var c=this.child.getNodes(),d=0;d<c.length;d++)h=c[d],v+=h.getNoOfChildren();return v==0&&(v=1),v},u.prototype.getEstimatedSize=function(){if(this.estimatedSize==n.MIN_VALUE)throw"assert failed";return this.estimatedSize},u.prototype.calcEstimatedSize=function(){return this.child==null?this.estimatedSize=(this.rect.width+this.rect.height)/2:(this.estimatedSize=this.child.calcEstimatedSize(),this.rect.width=this.estimatedSize,this.rect.height=this.estimatedSize,this.estimatedSize)},u.prototype.scatter=function(){var v,h,c=-o.INITIAL_WORLD_BOUNDARY,d=o.INITIAL_WORLD_BOUNDARY;v=o.WORLD_CENTER_X+s.nextDouble()*(d-c)+c;var g=-o.INITIAL_WORLD_BOUNDARY,y=o.INITIAL_WORLD_BOUNDARY;h=o.WORLD_CENTER_Y+s.nextDouble()*(y-g)+g,this.rect.x=v,this.rect.y=h},u.prototype.updateBounds=function(){if(this.getChild()==null)throw"assert failed";if(this.getChild().getNodes().length!=0){var v=this.getChild();if(v.updateBounds(!0),this.rect.x=v.getLeft(),this.rect.y=v.getTop(),this.setWidth(v.getRight()-v.getLeft()),this.setHeight(v.getBottom()-v.getTop()),o.NODE_DIMENSIONS_INCLUDE_LABELS){var h=v.getRight()-v.getLeft(),c=v.getBottom()-v.getTop();this.labelWidth&&(this.labelPosHorizontal=="left"?(this.rect.x-=this.labelWidth,this.setWidth(h+this.labelWidth)):this.labelPosHorizontal=="center"&&this.labelWidth>h?(this.rect.x-=(this.labelWidth-h)/2,this.setWidth(this.labelWidth)):this.labelPosHorizontal=="right"&&this.setWidth(h+this.labelWidth)),this.labelHeight&&(this.labelPosVertical=="top"?(this.rect.y-=this.labelHeight,this.setHeight(c+this.labelHeight)):this.labelPosVertical=="center"&&this.labelHeight>c?(this.rect.y-=(this.labelHeight-c)/2,this.setHeight(this.labelHeight)):this.labelPosVertical=="bottom"&&this.setHeight(c+this.labelHeight))}}},u.prototype.getInclusionTreeDepth=function(){if(this.inclusionTreeDepth==n.MAX_VALUE)throw"assert failed";return this.inclusionTreeDepth},u.prototype.transform=function(v){var h=this.rect.x;h>o.WORLD_BOUNDARY?h=o.WORLD_BOUNDARY:h<-o.WORLD_BOUNDARY&&(h=-o.WORLD_BOUNDARY);var c=this.rect.y;c>o.WORLD_BOUNDARY?c=o.WORLD_BOUNDARY:c<-o.WORLD_BOUNDARY&&(c=-o.WORLD_BOUNDARY);var d=new l(h,c),g=v.inverseTransformPoint(d);this.setLocation(g.x,g.y)},u.prototype.getLeft=function(){return this.rect.x},u.prototype.getRight=function(){return this.rect.x+this.rect.width},u.prototype.getTop=function(){return this.rect.y},u.prototype.getBottom=function(){return this.rect.y+this.rect.height},u.prototype.getParent=function(){return this.owner==null?null:this.owner.getParent()},t.exports=u}),(function(t,e,r){"use strict";var a=r(0);function n(){}for(var i in a)n[i]=a[i];n.MAX_ITERATIONS=2500,n.DEFAULT_EDGE_LENGTH=50,n.DEFAULT_SPRING_STRENGTH=.45,n.DEFAULT_REPULSION_STRENGTH=4500,n.DEFAULT_GRAVITY_STRENGTH=.4,n.DEFAULT_COMPOUND_GRAVITY_STRENGTH=1,n.DEFAULT_GRAVITY_RANGE_FACTOR=3.8,n.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR=1.5,n.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION=!0,n.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION=!0,n.DEFAULT_COOLING_FACTOR_INCREMENTAL=.3,n.COOLING_ADAPTATION_FACTOR=.33,n.ADAPTATION_LOWER_NODE_LIMIT=1e3,n.ADAPTATION_UPPER_NODE_LIMIT=5e3,n.MAX_NODE_DISPLACEMENT_INCREMENTAL=100,n.MAX_NODE_DISPLACEMENT=n.MAX_NODE_DISPLACEMENT_INCREMENTAL*3,n.MIN_REPULSION_DIST=n.DEFAULT_EDGE_LENGTH/10,n.CONVERGENCE_CHECK_PERIOD=100,n.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR=.1,n.MIN_EDGE_LENGTH=1,n.GRID_CALCULATION_CHECK_PERIOD=10,t.exports=n}),(function(t,e,r){"use strict";function a(n,i){n==null&&i==null?(this.x=0,this.y=0):(this.x=n,this.y=i)}a.prototype.getX=function(){return this.x},a.prototype.getY=function(){return this.y},a.prototype.setX=function(n){this.x=n},a.prototype.setY=function(n){this.y=n},a.prototype.getDifference=function(n){return new DimensionD(this.x-n.x,this.y-n.y)},a.prototype.getCopy=function(){return new a(this.x,this.y)},a.prototype.translate=function(n){return this.x+=n.width,this.y+=n.height,this},t.exports=a}),(function(t,e,r){"use strict";var a=r(2),n=r(10),i=r(0),o=r(7),s=r(3),l=r(1),u=r(13),f=r(12),v=r(11);function h(d,g,y){a.call(this,y),this.estimatedSize=n.MIN_VALUE,this.margin=i.DEFAULT_GRAPH_MARGIN,this.edges=[],this.nodes=[],this.isConnected=!1,this.parent=d,g!=null&&g instanceof o?this.graphManager=g:g!=null&&g instanceof Layout&&(this.graphManager=g.graphManager)}h.prototype=Object.create(a.prototype);for(var c in a)h[c]=a[c];h.prototype.getNodes=function(){return this.nodes},h.prototype.getEdges=function(){return this.edges},h.prototype.getGraphManager=function(){return this.graphManager},h.prototype.getParent=function(){return this.parent},h.prototype.getLeft=function(){return this.left},h.prototype.getRight=function(){return this.right},h.prototype.getTop=function(){return this.top},h.prototype.getBottom=function(){return this.bottom},h.prototype.isConnected=function(){return this.isConnected},h.prototype.add=function(d,g,y){if(g==null&&y==null){var p=d;if(this.graphManager==null)throw"Graph has no graph mgr!";if(this.getNodes().indexOf(p)>-1)throw"Node already in graph!";return p.owner=this,this.getNodes().push(p),p}else{var m=d;if(!(this.getNodes().indexOf(g)>-1&&this.getNodes().indexOf(y)>-1))throw"Source or target not in graph!";if(!(g.owner==y.owner&&g.owner==this))throw"Both owners must be this graph!";return g.owner!=y.owner?null:(m.source=g,m.target=y,m.isInterGraph=!1,this.getEdges().push(m),g.edges.push(m),y!=g&&y.edges.push(m),m)}},h.prototype.remove=function(d){var g=d;if(d instanceof s){if(g==null)throw"Node is null!";if(!(g.owner!=null&&g.owner==this))throw"Owner graph is invalid!";if(this.graphManager==null)throw"Owner graph manager is invalid!";for(var y=g.edges.slice(),p,m=y.length,b=0;b<m;b++)p=y[b],p.isInterGraph?this.graphManager.remove(p):p.source.owner.remove(p);var E=this.nodes.indexOf(g);if(E==-1)throw"Node not in owner node list!";this.nodes.splice(E,1)}else if(d instanceof l){var p=d;if(p==null)throw"Edge is null!";if(!(p.source!=null&&p.target!=null))throw"Source and/or target is null!";if(!(p.source.owner!=null&&p.target.owner!=null&&p.source.owner==this&&p.target.owner==this))throw"Source and/or target owner is invalid!";var C=p.source.edges.indexOf(p),L=p.target.edges.indexOf(p);if(!(C>-1&&L>-1))throw"Source and/or target doesn't know this edge!";p.source.edges.splice(C,1),p.target!=p.source&&p.target.edges.splice(L,1);var E=p.source.owner.getEdges().indexOf(p);if(E==-1)throw"Not in owner's edge list!";p.source.owner.getEdges().splice(E,1)}},h.prototype.updateLeftTop=function(){for(var d=n.MAX_VALUE,g=n.MAX_VALUE,y,p,m,b=this.getNodes(),E=b.length,C=0;C<E;C++){var L=b[C];y=L.getTop(),p=L.getLeft(),d>y&&(d=y),g>p&&(g=p)}return d==n.MAX_VALUE?null:(b[0].getParent().paddingLeft!=null?m=b[0].getParent().paddingLeft:m=this.margin,this.left=g-m,this.top=d-m,new f(this.left,this.top))},h.prototype.updateBounds=function(d){for(var g=n.MAX_VALUE,y=-n.MAX_VALUE,p=n.MAX_VALUE,m=-n.MAX_VALUE,b,E,C,L,D,R=this.nodes,O=R.length,M=0;M<O;M++){var P=R[M];d&&P.child!=null&&P.updateBounds(),b=P.getLeft(),E=P.getRight(),C=P.getTop(),L=P.getBottom(),g>b&&(g=b),y<E&&(y=E),p>C&&(p=C),m<L&&(m=L)}var w=new u(g,p,y-g,m-p);g==n.MAX_VALUE&&(this.left=this.parent.getLeft(),this.right=this.parent.getRight(),this.top=this.parent.getTop(),this.bottom=this.parent.getBottom()),R[0].getParent().paddingLeft!=null?D=R[0].getParent().paddingLeft:D=this.margin,this.left=w.x-D,this.right=w.x+w.width+D,this.top=w.y-D,this.bottom=w.y+w.height+D},h.calculateBounds=function(d){for(var g=n.MAX_VALUE,y=-n.MAX_VALUE,p=n.MAX_VALUE,m=-n.MAX_VALUE,b,E,C,L,D=d.length,R=0;R<D;R++){var O=d[R];b=O.getLeft(),E=O.getRight(),C=O.getTop(),L=O.getBottom(),g>b&&(g=b),y<E&&(y=E),p>C&&(p=C),m<L&&(m=L)}var M=new u(g,p,y-g,m-p);return M},h.prototype.getInclusionTreeDepth=function(){return this==this.graphManager.getRoot()?1:this.parent.getInclusionTreeDepth()},h.prototype.getEstimatedSize=function(){if(this.estimatedSize==n.MIN_VALUE)throw"assert failed";return this.estimatedSize},h.prototype.calcEstimatedSize=function(){for(var d=0,g=this.nodes,y=g.length,p=0;p<y;p++){var m=g[p];d+=m.calcEstimatedSize()}return d==0?this.estimatedSize=i.EMPTY_COMPOUND_NODE_SIZE:this.estimatedSize=d/Math.sqrt(this.nodes.length),this.estimatedSize},h.prototype.updateConnected=function(){var d=this;if(this.nodes.length==0){this.isConnected=!0;return}var g=new v,y=new Set,p=this.nodes[0],m,b,E=p.withChildren();for(E.forEach(function(M){g.push(M),y.add(M)});g.length!==0;){p=g.shift(),m=p.getEdges();for(var C=m.length,L=0;L<C;L++){var D=m[L];if(b=D.getOtherEndInGraph(p,this),b!=null&&!y.has(b)){var R=b.withChildren();R.forEach(function(M){g.push(M),y.add(M)})}}}if(this.isConnected=!1,y.size>=this.nodes.length){var O=0;y.forEach(function(M){M.owner==d&&O++}),O==this.nodes.length&&(this.isConnected=!0)}},t.exports=h}),(function(t,e,r){"use strict";var a,n=r(1);function i(o){a=r(6),this.layout=o,this.graphs=[],this.edges=[]}i.prototype.addRoot=function(){var o=this.layout.newGraph(),s=this.layout.newNode(null),l=this.add(o,s);return this.setRootGraph(l),this.rootGraph},i.prototype.add=function(o,s,l,u,f){if(l==null&&u==null&&f==null){if(o==null)throw"Graph is null!";if(s==null)throw"Parent node is null!";if(this.graphs.indexOf(o)>-1)throw"Graph already in this graph mgr!";if(this.graphs.push(o),o.parent!=null)throw"Already has a parent!";if(s.child!=null)throw"Already has a child!";return o.parent=s,s.child=o,o}else{f=l,u=s,l=o;var v=u.getOwner(),h=f.getOwner();if(!(v!=null&&v.getGraphManager()==this))throw"Source not in this graph mgr!";if(!(h!=null&&h.getGraphManager()==this))throw"Target not in this graph mgr!";if(v==h)return l.isInterGraph=!1,v.add(l,u,f);if(l.isInterGraph=!0,l.source=u,l.target=f,this.edges.indexOf(l)>-1)throw"Edge already in inter-graph edge list!";if(this.edges.push(l),!(l.source!=null&&l.target!=null))throw"Edge source and/or target is null!";if(!(l.source.edges.indexOf(l)==-1&&l.target.edges.indexOf(l)==-1))throw"Edge already in source and/or target incidency list!";return l.source.edges.push(l),l.target.edges.push(l),l}},i.prototype.remove=function(o){if(o instanceof a){var s=o;if(s.getGraphManager()!=this)throw"Graph not in this graph mgr";if(!(s==this.rootGraph||s.parent!=null&&s.parent.graphManager==this))throw"Invalid parent node!";var l=[];l=l.concat(s.getEdges());for(var u,f=l.length,v=0;v<f;v++)u=l[v],s.remove(u);var h=[];h=h.concat(s.getNodes());var c;f=h.length;for(var v=0;v<f;v++)c=h[v],s.remove(c);s==this.rootGraph&&this.setRootGraph(null);var d=this.graphs.indexOf(s);this.graphs.splice(d,1),s.parent=null}else if(o instanceof n){if(u=o,u==null)throw"Edge is null!";if(!u.isInterGraph)throw"Not an inter-graph edge!";if(!(u.source!=null&&u.target!=null))throw"Source and/or target is null!";if(!(u.source.edges.indexOf(u)!=-1&&u.target.edges.indexOf(u)!=-1))throw"Source and/or target doesn't know this edge!";var d=u.source.edges.indexOf(u);if(u.source.edges.splice(d,1),d=u.target.edges.indexOf(u),u.target.edges.splice(d,1),!(u.source.owner!=null&&u.source.owner.getGraphManager()!=null))throw"Edge owner graph or owner graph manager is null!";if(u.source.owner.getGraphManager().edges.indexOf(u)==-1)throw"Not in owner graph manager's edge list!";var d=u.source.owner.getGraphManager().edges.indexOf(u);u.source.owner.getGraphManager().edges.splice(d,1)}},i.prototype.updateBounds=function(){this.rootGraph.updateBounds(!0)},i.prototype.getGraphs=function(){return this.graphs},i.prototype.getAllNodes=function(){if(this.allNodes==null){for(var o=[],s=this.getGraphs(),l=s.length,u=0;u<l;u++)o=o.concat(s[u].getNodes());this.allNodes=o}return this.allNodes},i.prototype.resetAllNodes=function(){this.allNodes=null},i.prototype.resetAllEdges=function(){this.allEdges=null},i.prototype.resetAllNodesToApplyGravitation=function(){this.allNodesToApplyGravitation=null},i.prototype.getAllEdges=function(){if(this.allEdges==null){for(var o=[],s=this.getGraphs(),l=s.length,u=0;u<s.length;u++)o=o.concat(s[u].getEdges());o=o.concat(this.edges),this.allEdges=o}return this.allEdges},i.prototype.getAllNodesToApplyGravitation=function(){return this.allNodesToApplyGravitation},i.prototype.setAllNodesToApplyGravitation=function(o){if(this.allNodesToApplyGravitation!=null)throw"assert failed";this.allNodesToApplyGravitation=o},i.prototype.getRoot=function(){return this.rootGraph},i.prototype.setRootGraph=function(o){if(o.getGraphManager()!=this)throw"Root not in this graph mgr!";this.rootGraph=o,o.parent==null&&(o.parent=this.layout.newNode("Root node"))},i.prototype.getLayout=function(){return this.layout},i.prototype.isOneAncestorOfOther=function(o,s){if(!(o!=null&&s!=null))throw"assert failed";if(o==s)return!0;var l=o.getOwner(),u;do{if(u=l.getParent(),u==null)break;if(u==s)return!0;if(l=u.getOwner(),l==null)break}while(!0);l=s.getOwner();do{if(u=l.getParent(),u==null)break;if(u==o)return!0;if(l=u.getOwner(),l==null)break}while(!0);return!1},i.prototype.calcLowestCommonAncestors=function(){for(var o,s,l,u,f,v=this.getAllEdges(),h=v.length,c=0;c<h;c++){if(o=v[c],s=o.source,l=o.target,o.lca=null,o.sourceInLca=s,o.targetInLca=l,s==l){o.lca=s.getOwner();continue}for(u=s.getOwner();o.lca==null;){for(o.targetInLca=l,f=l.getOwner();o.lca==null;){if(f==u){o.lca=f;break}if(f==this.rootGraph)break;if(o.lca!=null)throw"assert failed";o.targetInLca=f.getParent(),f=o.targetInLca.getOwner()}if(u==this.rootGraph)break;o.lca==null&&(o.sourceInLca=u.getParent(),u=o.sourceInLca.getOwner())}if(o.lca==null)throw"assert failed"}},i.prototype.calcLowestCommonAncestor=function(o,s){if(o==s)return o.getOwner();var l=o.getOwner();do{if(l==null)break;var u=s.getOwner();do{if(u==null)break;if(u==l)return u;u=u.getParent().getOwner()}while(!0);l=l.getParent().getOwner()}while(!0);return l},i.prototype.calcInclusionTreeDepths=function(o,s){o==null&&s==null&&(o=this.rootGraph,s=1);for(var l,u=o.getNodes(),f=u.length,v=0;v<f;v++)l=u[v],l.inclusionTreeDepth=s,l.child!=null&&this.calcInclusionTreeDepths(l.child,s+1)},i.prototype.includesInvalidEdge=function(){for(var o,s=[],l=this.edges.length,u=0;u<l;u++)o=this.edges[u],this.isOneAncestorOfOther(o.source,o.target)&&s.push(o);for(var u=0;u<s.length;u++)this.remove(s[u]);return!1},t.exports=i}),(function(t,e,r){"use strict";var a=r(12);function n(){}n.calcSeparationAmount=function(i,o,s,l){if(!i.intersects(o))throw"assert failed";var u=new Array(2);this.decideDirectionsForOverlappingNodes(i,o,u),s[0]=Math.min(i.getRight(),o.getRight())-Math.max(i.x,o.x),s[1]=Math.min(i.getBottom(),o.getBottom())-Math.max(i.y,o.y),i.getX()<=o.getX()&&i.getRight()>=o.getRight()?s[0]+=Math.min(o.getX()-i.getX(),i.getRight()-o.getRight()):o.getX()<=i.getX()&&o.getRight()>=i.getRight()&&(s[0]+=Math.min(i.getX()-o.getX(),o.getRight()-i.getRight())),i.getY()<=o.getY()&&i.getBottom()>=o.getBottom()?s[1]+=Math.min(o.getY()-i.getY(),i.getBottom()-o.getBottom()):o.getY()<=i.getY()&&o.getBottom()>=i.getBottom()&&(s[1]+=Math.min(i.getY()-o.getY(),o.getBottom()-i.getBottom()));var f=Math.abs((o.getCenterY()-i.getCenterY())/(o.getCenterX()-i.getCenterX()));o.getCenterY()===i.getCenterY()&&o.getCenterX()===i.getCenterX()&&(f=1);var v=f*s[0],h=s[1]/f;s[0]<h?h=s[0]:v=s[1],s[0]=-1*u[0]*(h/2+l),s[1]=-1*u[1]*(v/2+l)},n.decideDirectionsForOverlappingNodes=function(i,o,s){i.getCenterX()<o.getCenterX()?s[0]=-1:s[0]=1,i.getCenterY()<o.getCenterY()?s[1]=-1:s[1]=1},n.getIntersection2=function(i,o,s){var l=i.getCenterX(),u=i.getCenterY(),f=o.getCenterX(),v=o.getCenterY();if(i.intersects(o))return s[0]=l,s[1]=u,s[2]=f,s[3]=v,!0;var h=i.getX(),c=i.getY(),d=i.getRight(),g=i.getX(),y=i.getBottom(),p=i.getRight(),m=i.getWidthHalf(),b=i.getHeightHalf(),E=o.getX(),C=o.getY(),L=o.getRight(),D=o.getX(),R=o.getBottom(),O=o.getRight(),M=o.getWidthHalf(),P=o.getHeightHalf(),w=!1,x=!1;if(l===f){if(u>v)return s[0]=l,s[1]=c,s[2]=f,s[3]=R,!1;if(u<v)return s[0]=l,s[1]=y,s[2]=f,s[3]=C,!1}else if(u===v){if(l>f)return s[0]=h,s[1]=u,s[2]=L,s[3]=v,!1;if(l<f)return s[0]=d,s[1]=u,s[2]=E,s[3]=v,!1}else{var T=i.height/i.width,A=o.height/o.width,S=(v-u)/(f-l),I=void 0,B=void 0,k=void 0,z=void 0,F=void 0,V=void 0;if(-T===S?l>f?(s[0]=g,s[1]=y,w=!0):(s[0]=d,s[1]=c,w=!0):T===S&&(l>f?(s[0]=h,s[1]=c,w=!0):(s[0]=p,s[1]=y,w=!0)),-A===S?f>l?(s[2]=D,s[3]=R,x=!0):(s[2]=L,s[3]=C,x=!0):A===S&&(f>l?(s[2]=E,s[3]=C,x=!0):(s[2]=O,s[3]=R,x=!0)),w&&x)return!1;if(l>f?u>v?(I=this.getCardinalDirection(T,S,4),B=this.getCardinalDirection(A,S,2)):(I=this.getCardinalDirection(-T,S,3),B=this.getCardinalDirection(-A,S,1)):u>v?(I=this.getCardinalDirection(-T,S,1),B=this.getCardinalDirection(-A,S,3)):(I=this.getCardinalDirection(T,S,2),B=this.getCardinalDirection(A,S,4)),!w)switch(I){case 1:z=c,k=l+-b/S,s[0]=k,s[1]=z;break;case 2:k=p,z=u+m*S,s[0]=k,s[1]=z;break;case 3:z=y,k=l+b/S,s[0]=k,s[1]=z;break;case 4:k=g,z=u+-m*S,s[0]=k,s[1]=z;break}if(!x)switch(B){case 1:V=C,F=f+-P/S,s[2]=F,s[3]=V;break;case 2:F=O,V=v+M*S,s[2]=F,s[3]=V;break;case 3:V=R,F=f+P/S,s[2]=F,s[3]=V;break;case 4:F=D,V=v+-M*S,s[2]=F,s[3]=V;break}}return!1},n.getCardinalDirection=function(i,o,s){return i>o?s:1+s%4},n.getIntersection=function(i,o,s,l){if(l==null)return this.getIntersection2(i,o,s);var u=i.x,f=i.y,v=o.x,h=o.y,c=s.x,d=s.y,g=l.x,y=l.y,p=void 0,m=void 0,b=void 0,E=void 0,C=void 0,L=void 0,D=void 0,R=void 0,O=void 0;return b=h-f,C=u-v,D=v*f-u*h,E=y-d,L=c-g,R=g*d-c*y,O=b*L-E*C,O===0?null:(p=(C*R-L*D)/O,m=(E*D-b*R)/O,new a(p,m))},n.angleOfVector=function(i,o,s,l){var u=void 0;return i!==s?(u=Math.atan((l-o)/(s-i)),s<i?u+=Math.PI:l<o&&(u+=this.TWO_PI)):l<o?u=this.ONE_AND_HALF_PI:u=this.HALF_PI,u},n.doIntersect=function(i,o,s,l){var u=i.x,f=i.y,v=o.x,h=o.y,c=s.x,d=s.y,g=l.x,y=l.y,p=(v-u)*(y-d)-(g-c)*(h-f);if(p===0)return!1;var m=((y-d)*(g-u)+(c-g)*(y-f))/p,b=((f-h)*(g-u)+(v-u)*(y-f))/p;return 0<m&&m<1&&0<b&&b<1},n.findCircleLineIntersections=function(i,o,s,l,u,f,v){var h=(s-i)*(s-i)+(l-o)*(l-o),c=2*((i-u)*(s-i)+(o-f)*(l-o)),d=(i-u)*(i-u)+(o-f)*(o-f)-v*v,g=c*c-4*h*d;if(g>=0){var y=(-c+Math.sqrt(c*c-4*h*d))/(2*h),p=(-c-Math.sqrt(c*c-4*h*d))/(2*h),m=null;return y>=0&&y<=1?[y]:p>=0&&p<=1?[p]:m}else return null},n.HALF_PI=.5*Math.PI,n.ONE_AND_HALF_PI=1.5*Math.PI,n.TWO_PI=2*Math.PI,n.THREE_PI=3*Math.PI,t.exports=n}),(function(t,e,r){"use strict";function a(){}a.sign=function(n){return n>0?1:n<0?-1:0},a.floor=function(n){return n<0?Math.ceil(n):Math.floor(n)},a.ceil=function(n){return n<0?Math.floor(n):Math.ceil(n)},t.exports=a}),(function(t,e,r){"use strict";function a(){}a.MAX_VALUE=2147483647,a.MIN_VALUE=-2147483648,t.exports=a}),(function(t,e,r){"use strict";var a=(function(){function u(f,v){for(var h=0;h<v.length;h++){var c=v[h];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(f,c.key,c)}}return function(f,v,h){return v&&u(f.prototype,v),h&&u(f,h),f}})();function n(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}var i=function(f){return{value:f,next:null,prev:null}},o=function(f,v,h,c){return f!==null?f.next=v:c.head=v,h!==null?h.prev=v:c.tail=v,v.prev=f,v.next=h,c.length++,v},s=function(f,v){var h=f.prev,c=f.next;return h!==null?h.next=c:v.head=c,c!==null?c.prev=h:v.tail=h,f.prev=f.next=null,v.length--,f},l=(function(){function u(f){var v=this;n(this,u),this.length=0,this.head=null,this.tail=null,f?.forEach(function(h){return v.push(h)})}return a(u,[{key:"size",value:function(){return this.length}},{key:"insertBefore",value:function(v,h){return o(h.prev,i(v),h,this)}},{key:"insertAfter",value:function(v,h){return o(h,i(v),h.next,this)}},{key:"insertNodeBefore",value:function(v,h){return o(h.prev,v,h,this)}},{key:"insertNodeAfter",value:function(v,h){return o(h,v,h.next,this)}},{key:"push",value:function(v){return o(this.tail,i(v),null,this)}},{key:"unshift",value:function(v){return o(null,i(v),this.head,this)}},{key:"remove",value:function(v){return s(v,this)}},{key:"pop",value:function(){return s(this.tail,this).value}},{key:"popNode",value:function(){return s(this.tail,this)}},{key:"shift",value:function(){return s(this.head,this).value}},{key:"shiftNode",value:function(){return s(this.head,this)}},{key:"get_object_at",value:function(v){if(v<=this.length()){for(var h=1,c=this.head;h<v;)c=c.next,h++;return c.value}}},{key:"set_object_at",value:function(v,h){if(v<=this.length()){for(var c=1,d=this.head;c<v;)d=d.next,c++;d.value=h}}}]),u})();t.exports=l}),(function(t,e,r){"use strict";function a(n,i,o){this.x=null,this.y=null,n==null&&i==null&&o==null?(this.x=0,this.y=0):typeof n=="number"&&typeof i=="number"&&o==null?(this.x=n,this.y=i):n.constructor.name=="Point"&&i==null&&o==null&&(o=n,this.x=o.x,this.y=o.y)}a.prototype.getX=function(){return this.x},a.prototype.getY=function(){return this.y},a.prototype.getLocation=function(){return new a(this.x,this.y)},a.prototype.setLocation=function(n,i,o){n.constructor.name=="Point"&&i==null&&o==null?(o=n,this.setLocation(o.x,o.y)):typeof n=="number"&&typeof i=="number"&&o==null&&(parseInt(n)==n&&parseInt(i)==i?this.move(n,i):(this.x=Math.floor(n+.5),this.y=Math.floor(i+.5)))},a.prototype.move=function(n,i){this.x=n,this.y=i},a.prototype.translate=function(n,i){this.x+=n,this.y+=i},a.prototype.equals=function(n){if(n.constructor.name=="Point"){var i=n;return this.x==i.x&&this.y==i.y}return this==n},a.prototype.toString=function(){return new a().constructor.name+"[x="+this.x+",y="+this.y+"]"},t.exports=a}),(function(t,e,r){"use strict";function a(n,i,o,s){this.x=0,this.y=0,this.width=0,this.height=0,n!=null&&i!=null&&o!=null&&s!=null&&(this.x=n,this.y=i,this.width=o,this.height=s)}a.prototype.getX=function(){return this.x},a.prototype.setX=function(n){this.x=n},a.prototype.getY=function(){return this.y},a.prototype.setY=function(n){this.y=n},a.prototype.getWidth=function(){return this.width},a.prototype.setWidth=function(n){this.width=n},a.prototype.getHeight=function(){return this.height},a.prototype.setHeight=function(n){this.height=n},a.prototype.getRight=function(){return this.x+this.width},a.prototype.getBottom=function(){return this.y+this.height},a.prototype.intersects=function(n){return!(this.getRight()<n.x||this.getBottom()<n.y||n.getRight()<this.x||n.getBottom()<this.y)},a.prototype.getCenterX=function(){return this.x+this.width/2},a.prototype.getMinX=function(){return this.getX()},a.prototype.getMaxX=function(){return this.getX()+this.width},a.prototype.getCenterY=function(){return this.y+this.height/2},a.prototype.getMinY=function(){return this.getY()},a.prototype.getMaxY=function(){return this.getY()+this.height},a.prototype.getWidthHalf=function(){return this.width/2},a.prototype.getHeightHalf=function(){return this.height/2},t.exports=a}),(function(t,e,r){"use strict";var a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i};function n(){}n.lastID=0,n.createID=function(i){return n.isPrimitive(i)?i:(i.uniqueID!=null||(i.uniqueID=n.getString(),n.lastID++),i.uniqueID)},n.getString=function(i){return i==null&&(i=n.lastID),"Object#"+i},n.isPrimitive=function(i){var o=typeof i>"u"?"undefined":a(i);return i==null||o!="object"&&o!="function"},t.exports=n}),(function(t,e,r){"use strict";function a(c){if(Array.isArray(c)){for(var d=0,g=Array(c.length);d<c.length;d++)g[d]=c[d];return g}else return Array.from(c)}var n=r(0),i=r(7),o=r(3),s=r(1),l=r(6),u=r(5),f=r(17),v=r(29);function h(c){v.call(this),this.layoutQuality=n.QUALITY,this.createBendsAsNeeded=n.DEFAULT_CREATE_BENDS_AS_NEEDED,this.incremental=n.DEFAULT_INCREMENTAL,this.animationOnLayout=n.DEFAULT_ANIMATION_ON_LAYOUT,this.animationDuringLayout=n.DEFAULT_ANIMATION_DURING_LAYOUT,this.animationPeriod=n.DEFAULT_ANIMATION_PERIOD,this.uniformLeafNodeSizes=n.DEFAULT_UNIFORM_LEAF_NODE_SIZES,this.edgeToDummyNodes=new Map,this.graphManager=new i(this),this.isLayoutFinished=!1,this.isSubLayout=!1,this.isRemoteUse=!1,c!=null&&(this.isRemoteUse=c)}h.RANDOM_SEED=1,h.prototype=Object.create(v.prototype),h.prototype.getGraphManager=function(){return this.graphManager},h.prototype.getAllNodes=function(){return this.graphManager.getAllNodes()},h.prototype.getAllEdges=function(){return this.graphManager.getAllEdges()},h.prototype.getAllNodesToApplyGravitation=function(){return this.graphManager.getAllNodesToApplyGravitation()},h.prototype.newGraphManager=function(){var c=new i(this);return this.graphManager=c,c},h.prototype.newGraph=function(c){return new l(null,this.graphManager,c)},h.prototype.newNode=function(c){return new o(this.graphManager,c)},h.prototype.newEdge=function(c){return new s(null,null,c)},h.prototype.checkLayoutSuccess=function(){return this.graphManager.getRoot()==null||this.graphManager.getRoot().getNodes().length==0||this.graphManager.includesInvalidEdge()},h.prototype.runLayout=function(){this.isLayoutFinished=!1,this.tilingPreLayout&&this.tilingPreLayout(),this.initParameters();var c;return this.checkLayoutSuccess()?c=!1:c=this.layout(),n.ANIMATE==="during"?!1:(c&&(this.isSubLayout||this.doPostLayout()),this.tilingPostLayout&&this.tilingPostLayout(),this.isLayoutFinished=!0,c)},h.prototype.doPostLayout=function(){this.incremental||this.transform(),this.update()},h.prototype.update2=function(){if(this.createBendsAsNeeded&&(this.createBendpointsFromDummyNodes(),this.graphManager.resetAllEdges()),!this.isRemoteUse){for(var c,d=this.graphManager.getAllEdges(),g=0;g<d.length;g++)c=d[g];for(var y,p=this.graphManager.getRoot().getNodes(),g=0;g<p.length;g++)y=p[g];this.update(this.graphManager.getRoot())}},h.prototype.update=function(c){if(c==null)this.update2();else if(c instanceof o){var d=c;if(d.getChild()!=null)for(var g=d.getChild().getNodes(),y=0;y<g.length;y++)update(g[y]);if(d.vGraphObject!=null){var p=d.vGraphObject;p.update(d)}}else if(c instanceof s){var m=c;if(m.vGraphObject!=null){var b=m.vGraphObject;b.update(m)}}else if(c instanceof l){var E=c;if(E.vGraphObject!=null){var C=E.vGraphObject;C.update(E)}}},h.prototype.initParameters=function(){this.isSubLayout||(this.layoutQuality=n.QUALITY,this.animationDuringLayout=n.DEFAULT_ANIMATION_DURING_LAYOUT,this.animationPeriod=n.DEFAULT_ANIMATION_PERIOD,this.animationOnLayout=n.DEFAULT_ANIMATION_ON_LAYOUT,this.incremental=n.DEFAULT_INCREMENTAL,this.createBendsAsNeeded=n.DEFAULT_CREATE_BENDS_AS_NEEDED,this.uniformLeafNodeSizes=n.DEFAULT_UNIFORM_LEAF_NODE_SIZES),this.animationDuringLayout&&(this.animationOnLayout=!1)},h.prototype.transform=function(c){if(c==null)this.transform(new u(0,0));else{var d=new f,g=this.graphManager.getRoot().updateLeftTop();if(g!=null){d.setWorldOrgX(c.x),d.setWorldOrgY(c.y),d.setDeviceOrgX(g.x),d.setDeviceOrgY(g.y);for(var y=this.getAllNodes(),p,m=0;m<y.length;m++)p=y[m],p.transform(d)}}},h.prototype.positionNodesRandomly=function(c){if(c==null)this.positionNodesRandomly(this.getGraphManager().getRoot()),this.getGraphManager().getRoot().updateBounds(!0);else for(var d,g,y=c.getNodes(),p=0;p<y.length;p++)d=y[p],g=d.getChild(),g==null||g.getNodes().length==0?d.scatter():(this.positionNodesRandomly(g),d.updateBounds())},h.prototype.getFlatForest=function(){for(var c=[],d=!0,g=this.graphManager.getRoot().getNodes(),y=!0,p=0;p<g.length;p++)g[p].getChild()!=null&&(y=!1);if(!y)return c;var m=new Set,b=[],E=new Map,C=[];for(C=C.concat(g);C.length>0&&d;){for(b.push(C[0]);b.length>0&&d;){var L=b[0];b.splice(0,1),m.add(L);for(var D=L.getEdges(),p=0;p<D.length;p++){var R=D[p].getOtherEnd(L);if(E.get(L)!=R)if(!m.has(R))b.push(R),E.set(R,L);else{d=!1;break}}}if(!d)c=[];else{var O=[].concat(a(m));c.push(O);for(var p=0;p<O.length;p++){var M=O[p],P=C.indexOf(M);P>-1&&C.splice(P,1)}m=new Set,E=new Map}}return c},h.prototype.createDummyNodesForBendpoints=function(c){for(var d=[],g=c.source,y=this.graphManager.calcLowestCommonAncestor(c.source,c.target),p=0;p<c.bendpoints.length;p++){var m=this.newNode(null);m.setRect(new Point(0,0),new Dimension(1,1)),y.add(m);var b=this.newEdge(null);this.graphManager.add(b,g,m),d.add(m),g=m}var b=this.newEdge(null);return this.graphManager.add(b,g,c.target),this.edgeToDummyNodes.set(c,d),c.isInterGraph()?this.graphManager.remove(c):y.remove(c),d},h.prototype.createBendpointsFromDummyNodes=function(){var c=[];c=c.concat(this.graphManager.getAllEdges()),c=[].concat(a(this.edgeToDummyNodes.keys())).concat(c);for(var d=0;d<c.length;d++){var g=c[d];if(g.bendpoints.length>0){for(var y=this.edgeToDummyNodes.get(g),p=0;p<y.length;p++){var m=y[p],b=new u(m.getCenterX(),m.getCenterY()),E=g.bendpoints.get(p);E.x=b.x,E.y=b.y,m.getOwner().remove(m)}this.graphManager.add(g,g.source,g.target)}}},h.transform=function(c,d,g,y){if(g!=null&&y!=null){var p=d;if(c<=50){var m=d/g;p-=(d-m)/50*(50-c)}else{var b=d*y;p+=(b-d)/50*(c-50)}return p}else{var E,C;return c<=50?(E=9*d/500,C=d/10):(E=9*d/50,C=-8*d),E*c+C}},h.findCenterOfTree=function(c){var d=[];d=d.concat(c);var g=[],y=new Map,p=!1,m=null;(d.length==1||d.length==2)&&(p=!0,m=d[0]);for(var b=0;b<d.length;b++){var E=d[b],C=E.getNeighborsList().size;y.set(E,E.getNeighborsList().size),C==1&&g.push(E)}var L=[];for(L=L.concat(g);!p;){var D=[];D=D.concat(L),L=[];for(var b=0;b<d.length;b++){var E=d[b],R=d.indexOf(E);R>=0&&d.splice(R,1);var O=E.getNeighborsList();O.forEach(function(w){if(g.indexOf(w)<0){var x=y.get(w),T=x-1;T==1&&L.push(w),y.set(w,T)}})}g=g.concat(L),(d.length==1||d.length==2)&&(p=!0,m=d[0])}return m},h.prototype.setGraphManager=function(c){this.graphManager=c},t.exports=h}),(function(t,e,r){"use strict";function a(){}a.seed=1,a.x=0,a.nextDouble=function(){return a.x=Math.sin(a.seed++)*1e4,a.x-Math.floor(a.x)},t.exports=a}),(function(t,e,r){"use strict";var a=r(5);function n(i,o){this.lworldOrgX=0,this.lworldOrgY=0,this.ldeviceOrgX=0,this.ldeviceOrgY=0,this.lworldExtX=1,this.lworldExtY=1,this.ldeviceExtX=1,this.ldeviceExtY=1}n.prototype.getWorldOrgX=function(){return this.lworldOrgX},n.prototype.setWorldOrgX=function(i){this.lworldOrgX=i},n.prototype.getWorldOrgY=function(){return this.lworldOrgY},n.prototype.setWorldOrgY=function(i){this.lworldOrgY=i},n.prototype.getWorldExtX=function(){return this.lworldExtX},n.prototype.setWorldExtX=function(i){this.lworldExtX=i},n.prototype.getWorldExtY=function(){return this.lworldExtY},n.prototype.setWorldExtY=function(i){this.lworldExtY=i},n.prototype.getDeviceOrgX=function(){return this.ldeviceOrgX},n.prototype.setDeviceOrgX=function(i){this.ldeviceOrgX=i},n.prototype.getDeviceOrgY=function(){return this.ldeviceOrgY},n.prototype.setDeviceOrgY=function(i){this.ldeviceOrgY=i},n.prototype.getDeviceExtX=function(){return this.ldeviceExtX},n.prototype.setDeviceExtX=function(i){this.ldeviceExtX=i},n.prototype.getDeviceExtY=function(){return this.ldeviceExtY},n.prototype.setDeviceExtY=function(i){this.ldeviceExtY=i},n.prototype.transformX=function(i){var o=0,s=this.lworldExtX;return s!=0&&(o=this.ldeviceOrgX+(i-this.lworldOrgX)*this.ldeviceExtX/s),o},n.prototype.transformY=function(i){var o=0,s=this.lworldExtY;return s!=0&&(o=this.ldeviceOrgY+(i-this.lworldOrgY)*this.ldeviceExtY/s),o},n.prototype.inverseTransformX=function(i){var o=0,s=this.ldeviceExtX;return s!=0&&(o=this.lworldOrgX+(i-this.ldeviceOrgX)*this.lworldExtX/s),o},n.prototype.inverseTransformY=function(i){var o=0,s=this.ldeviceExtY;return s!=0&&(o=this.lworldOrgY+(i-this.ldeviceOrgY)*this.lworldExtY/s),o},n.prototype.inverseTransformPoint=function(i){var o=new a(this.inverseTransformX(i.x),this.inverseTransformY(i.y));return o},t.exports=n}),(function(t,e,r){"use strict";function a(v){if(Array.isArray(v)){for(var h=0,c=Array(v.length);h<v.length;h++)c[h]=v[h];return c}else return Array.from(v)}var n=r(15),i=r(4),o=r(0),s=r(8),l=r(9);function u(){n.call(this),this.useSmartIdealEdgeLengthCalculation=i.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION,this.gravityConstant=i.DEFAULT_GRAVITY_STRENGTH,this.compoundGravityConstant=i.DEFAULT_COMPOUND_GRAVITY_STRENGTH,this.gravityRangeFactor=i.DEFAULT_GRAVITY_RANGE_FACTOR,this.compoundGravityRangeFactor=i.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR,this.displacementThresholdPerNode=3*i.DEFAULT_EDGE_LENGTH/100,this.coolingFactor=i.DEFAULT_COOLING_FACTOR_INCREMENTAL,this.initialCoolingFactor=i.DEFAULT_COOLING_FACTOR_INCREMENTAL,this.totalDisplacement=0,this.oldTotalDisplacement=0,this.maxIterations=i.MAX_ITERATIONS}u.prototype=Object.create(n.prototype);for(var f in n)u[f]=n[f];u.prototype.initParameters=function(){n.prototype.initParameters.call(this,arguments),this.totalIterations=0,this.notAnimatedIterations=0,this.useFRGridVariant=i.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION,this.grid=[]},u.prototype.calcIdealEdgeLengths=function(){for(var v,h,c,d,g,y,p,m=this.getGraphManager().getAllEdges(),b=0;b<m.length;b++)v=m[b],h=v.idealLength,v.isInterGraph&&(d=v.getSource(),g=v.getTarget(),y=v.getSourceInLca().getEstimatedSize(),p=v.getTargetInLca().getEstimatedSize(),this.useSmartIdealEdgeLengthCalculation&&(v.idealLength+=y+p-2*o.SIMPLE_NODE_SIZE),c=v.getLca().getInclusionTreeDepth(),v.idealLength+=h*i.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR*(d.getInclusionTreeDepth()+g.getInclusionTreeDepth()-2*c))},u.prototype.initSpringEmbedder=function(){var v=this.getAllNodes().length;this.incremental?(v>i.ADAPTATION_LOWER_NODE_LIMIT&&(this.coolingFactor=Math.max(this.coolingFactor*i.COOLING_ADAPTATION_FACTOR,this.coolingFactor-(v-i.ADAPTATION_LOWER_NODE_LIMIT)/(i.ADAPTATION_UPPER_NODE_LIMIT-i.ADAPTATION_LOWER_NODE_LIMIT)*this.coolingFactor*(1-i.COOLING_ADAPTATION_FACTOR))),this.maxNodeDisplacement=i.MAX_NODE_DISPLACEMENT_INCREMENTAL):(v>i.ADAPTATION_LOWER_NODE_LIMIT?this.coolingFactor=Math.max(i.COOLING_ADAPTATION_FACTOR,1-(v-i.ADAPTATION_LOWER_NODE_LIMIT)/(i.ADAPTATION_UPPER_NODE_LIMIT-i.ADAPTATION_LOWER_NODE_LIMIT)*(1-i.COOLING_ADAPTATION_FACTOR)):this.coolingFactor=1,this.initialCoolingFactor=this.coolingFactor,this.maxNodeDisplacement=i.MAX_NODE_DISPLACEMENT),this.maxIterations=Math.max(this.getAllNodes().length*5,this.maxIterations),this.displacementThresholdPerNode=3*i.DEFAULT_EDGE_LENGTH/100,this.totalDisplacementThreshold=this.displacementThresholdPerNode*this.getAllNodes().length,this.repulsionRange=this.calcRepulsionRange()},u.prototype.calcSpringForces=function(){for(var v=this.getAllEdges(),h,c=0;c<v.length;c++)h=v[c],this.calcSpringForce(h,h.idealLength)},u.prototype.calcRepulsionForces=function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,c,d,g,y,p=this.getAllNodes(),m;if(this.useFRGridVariant)for(this.totalIterations%i.GRID_CALCULATION_CHECK_PERIOD==1&&v&&this.updateGrid(),m=new Set,c=0;c<p.length;c++)g=p[c],this.calculateRepulsionForceOfANode(g,m,v,h),m.add(g);else for(c=0;c<p.length;c++)for(g=p[c],d=c+1;d<p.length;d++)y=p[d],g.getOwner()==y.getOwner()&&this.calcRepulsionForce(g,y)},u.prototype.calcGravitationalForces=function(){for(var v,h=this.getAllNodesToApplyGravitation(),c=0;c<h.length;c++)v=h[c],this.calcGravitationalForce(v)},u.prototype.moveNodes=function(){for(var v=this.getAllNodes(),h,c=0;c<v.length;c++)h=v[c],h.move()},u.prototype.calcSpringForce=function(v,h){var c=v.getSource(),d=v.getTarget(),g,y,p,m;if(this.uniformLeafNodeSizes&&c.getChild()==null&&d.getChild()==null)v.updateLengthSimple();else if(v.updateLength(),v.isOverlapingSourceAndTarget)return;g=v.getLength(),g!=0&&(y=v.edgeElasticity*(g-h),p=y*(v.lengthX/g),m=y*(v.lengthY/g),c.springForceX+=p,c.springForceY+=m,d.springForceX-=p,d.springForceY-=m)},u.prototype.calcRepulsionForce=function(v,h){var c=v.getRect(),d=h.getRect(),g=new Array(2),y=new Array(4),p,m,b,E,C,L,D;if(c.intersects(d)){s.calcSeparationAmount(c,d,g,i.DEFAULT_EDGE_LENGTH/2),L=2*g[0],D=2*g[1];var R=v.noOfChildren*h.noOfChildren/(v.noOfChildren+h.noOfChildren);v.repulsionForceX-=R*L,v.repulsionForceY-=R*D,h.repulsionForceX+=R*L,h.repulsionForceY+=R*D}else this.uniformLeafNodeSizes&&v.getChild()==null&&h.getChild()==null?(p=d.getCenterX()-c.getCenterX(),m=d.getCenterY()-c.getCenterY()):(s.getIntersection(c,d,y),p=y[2]-y[0],m=y[3]-y[1]),Math.abs(p)<i.MIN_REPULSION_DIST&&(p=l.sign(p)*i.MIN_REPULSION_DIST),Math.abs(m)<i.MIN_REPULSION_DIST&&(m=l.sign(m)*i.MIN_REPULSION_DIST),b=p*p+m*m,E=Math.sqrt(b),C=(v.nodeRepulsion/2+h.nodeRepulsion/2)*v.noOfChildren*h.noOfChildren/b,L=C*p/E,D=C*m/E,v.repulsionForceX-=L,v.repulsionForceY-=D,h.repulsionForceX+=L,h.repulsionForceY+=D},u.prototype.calcGravitationalForce=function(v){var h,c,d,g,y,p,m,b;h=v.getOwner(),c=(h.getRight()+h.getLeft())/2,d=(h.getTop()+h.getBottom())/2,g=v.getCenterX()-c,y=v.getCenterY()-d,p=Math.abs(g)+v.getWidth()/2,m=Math.abs(y)+v.getHeight()/2,v.getOwner()==this.graphManager.getRoot()?(b=h.getEstimatedSize()*this.gravityRangeFactor,(p>b||m>b)&&(v.gravitationForceX=-this.gravityConstant*g,v.gravitationForceY=-this.gravityConstant*y)):(b=h.getEstimatedSize()*this.compoundGravityRangeFactor,(p>b||m>b)&&(v.gravitationForceX=-this.gravityConstant*g*this.compoundGravityConstant,v.gravitationForceY=-this.gravityConstant*y*this.compoundGravityConstant))},u.prototype.isConverged=function(){var v,h=!1;return this.totalIterations>this.maxIterations/3&&(h=Math.abs(this.totalDisplacement-this.oldTotalDisplacement)<2),v=this.totalDisplacement<this.totalDisplacementThreshold,this.oldTotalDisplacement=this.totalDisplacement,v||h},u.prototype.animate=function(){this.animationDuringLayout&&!this.isSubLayout&&(this.notAnimatedIterations==this.animationPeriod?(this.update(),this.notAnimatedIterations=0):this.notAnimatedIterations++)},u.prototype.calcNoOfChildrenForAllNodes=function(){for(var v,h=this.graphManager.getAllNodes(),c=0;c<h.length;c++)v=h[c],v.noOfChildren=v.getNoOfChildren()},u.prototype.calcGrid=function(v){var h=0,c=0;h=parseInt(Math.ceil((v.getRight()-v.getLeft())/this.repulsionRange)),c=parseInt(Math.ceil((v.getBottom()-v.getTop())/this.repulsionRange));for(var d=new Array(h),g=0;g<h;g++)d[g]=new Array(c);for(var g=0;g<h;g++)for(var y=0;y<c;y++)d[g][y]=new Array;return d},u.prototype.addNodeToGrid=function(v,h,c){var d=0,g=0,y=0,p=0;d=parseInt(Math.floor((v.getRect().x-h)/this.repulsionRange)),g=parseInt(Math.floor((v.getRect().width+v.getRect().x-h)/this.repulsionRange)),y=parseInt(Math.floor((v.getRect().y-c)/this.repulsionRange)),p=parseInt(Math.floor((v.getRect().height+v.getRect().y-c)/this.repulsionRange));for(var m=d;m<=g;m++)for(var b=y;b<=p;b++)this.grid[m][b].push(v),v.setGridCoordinates(d,g,y,p)},u.prototype.updateGrid=function(){var v,h,c=this.getAllNodes();for(this.grid=this.calcGrid(this.graphManager.getRoot()),v=0;v<c.length;v++)h=c[v],this.addNodeToGrid(h,this.graphManager.getRoot().getLeft(),this.graphManager.getRoot().getTop())},u.prototype.calculateRepulsionForceOfANode=function(v,h,c,d){if(this.totalIterations%i.GRID_CALCULATION_CHECK_PERIOD==1&&c||d){var g=new Set;v.surrounding=new Array;for(var y,p=this.grid,m=v.startX-1;m<v.finishX+2;m++)for(var b=v.startY-1;b<v.finishY+2;b++)if(!(m<0||b<0||m>=p.length||b>=p[0].length)){for(var E=0;E<p[m][b].length;E++)if(y=p[m][b][E],!(v.getOwner()!=y.getOwner()||v==y)&&!h.has(y)&&!g.has(y)){var C=Math.abs(v.getCenterX()-y.getCenterX())-(v.getWidth()/2+y.getWidth()/2),L=Math.abs(v.getCenterY()-y.getCenterY())-(v.getHeight()/2+y.getHeight()/2);C<=this.repulsionRange&&L<=this.repulsionRange&&g.add(y)}}v.surrounding=[].concat(a(g))}for(m=0;m<v.surrounding.length;m++)this.calcRepulsionForce(v,v.surrounding[m])},u.prototype.calcRepulsionRange=function(){return 0},t.exports=u}),(function(t,e,r){"use strict";var a=r(1),n=r(4);function i(s,l,u){a.call(this,s,l,u),this.idealLength=n.DEFAULT_EDGE_LENGTH,this.edgeElasticity=n.DEFAULT_SPRING_STRENGTH}i.prototype=Object.create(a.prototype);for(var o in a)i[o]=a[o];t.exports=i}),(function(t,e,r){"use strict";var a=r(3),n=r(4);function i(s,l,u,f){a.call(this,s,l,u,f),this.nodeRepulsion=n.DEFAULT_REPULSION_STRENGTH,this.springForceX=0,this.springForceY=0,this.repulsionForceX=0,this.repulsionForceY=0,this.gravitationForceX=0,this.gravitationForceY=0,this.displacementX=0,this.displacementY=0,this.startX=0,this.finishX=0,this.startY=0,this.finishY=0,this.surrounding=[]}i.prototype=Object.create(a.prototype);for(var o in a)i[o]=a[o];i.prototype.setGridCoordinates=function(s,l,u,f){this.startX=s,this.finishX=l,this.startY=u,this.finishY=f},t.exports=i}),(function(t,e,r){"use strict";function a(n,i){this.width=0,this.height=0,n!==null&&i!==null&&(this.height=i,this.width=n)}a.prototype.getWidth=function(){return this.width},a.prototype.setWidth=function(n){this.width=n},a.prototype.getHeight=function(){return this.height},a.prototype.setHeight=function(n){this.height=n},t.exports=a}),(function(t,e,r){"use strict";var a=r(14);function n(){this.map={},this.keys=[]}n.prototype.put=function(i,o){var s=a.createID(i);this.contains(s)||(this.map[s]=o,this.keys.push(i))},n.prototype.contains=function(i){var o=a.createID(i);return this.map[i]!=null},n.prototype.get=function(i){var o=a.createID(i);return this.map[o]},n.prototype.keySet=function(){return this.keys},t.exports=n}),(function(t,e,r){"use strict";var a=r(14);function n(){this.set={}}n.prototype.add=function(i){var o=a.createID(i);this.contains(o)||(this.set[o]=i)},n.prototype.remove=function(i){delete this.set[a.createID(i)]},n.prototype.clear=function(){this.set={}},n.prototype.contains=function(i){return this.set[a.createID(i)]==i},n.prototype.isEmpty=function(){return this.size()===0},n.prototype.size=function(){return Object.keys(this.set).length},n.prototype.addAllTo=function(i){for(var o=Object.keys(this.set),s=o.length,l=0;l<s;l++)i.push(this.set[o[l]])},n.prototype.size=function(){return Object.keys(this.set).length},n.prototype.addAll=function(i){for(var o=i.length,s=0;s<o;s++){var l=i[s];this.add(l)}},t.exports=n}),(function(t,e,r){"use strict";function a(){}a.multMat=function(n,i){for(var o=[],s=0;s<n.length;s++){o[s]=[];for(var l=0;l<i[0].length;l++){o[s][l]=0;for(var u=0;u<n[0].length;u++)o[s][l]+=n[s][u]*i[u][l]}}return o},a.transpose=function(n){for(var i=[],o=0;o<n[0].length;o++){i[o]=[];for(var s=0;s<n.length;s++)i[o][s]=n[s][o]}return i},a.multCons=function(n,i){for(var o=[],s=0;s<n.length;s++)o[s]=n[s]*i;return o},a.minusOp=function(n,i){for(var o=[],s=0;s<n.length;s++)o[s]=n[s]-i[s];return o},a.dotProduct=function(n,i){for(var o=0,s=0;s<n.length;s++)o+=n[s]*i[s];return o},a.mag=function(n){return Math.sqrt(this.dotProduct(n,n))},a.normalize=function(n){for(var i=[],o=this.mag(n),s=0;s<n.length;s++)i[s]=n[s]/o;return i},a.multGamma=function(n){for(var i=[],o=0,s=0;s<n.length;s++)o+=n[s];o*=-1/n.length;for(var l=0;l<n.length;l++)i[l]=o+n[l];return i},a.multL=function(n,i,o){for(var s=[],l=[],u=[],f=0;f<i[0].length;f++){for(var v=0,h=0;h<i.length;h++)v+=-.5*i[h][f]*n[h];l[f]=v}for(var c=0;c<o.length;c++){for(var d=0,g=0;g<o.length;g++)d+=o[c][g]*l[g];u[c]=d}for(var y=0;y<i.length;y++){for(var p=0,m=0;m<i[0].length;m++)p+=i[y][m]*u[m];s[y]=p}return s},t.exports=a}),(function(t,e,r){"use strict";var a=(function(){function s(l,u){for(var f=0;f<u.length;f++){var v=u[f];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(l,v.key,v)}}return function(l,u,f){return u&&s(l.prototype,u),f&&s(l,f),l}})();function n(s,l){if(!(s instanceof l))throw new TypeError("Cannot call a class as a function")}var i=r(11),o=(function(){function s(l,u){n(this,s),(u!==null||u!==void 0)&&(this.compareFunction=this._defaultCompareFunction);var f=void 0;l instanceof i?f=l.size():f=l.length,this._quicksort(l,0,f-1)}return a(s,[{key:"_quicksort",value:function(u,f,v){if(f<v){var h=this._partition(u,f,v);this._quicksort(u,f,h),this._quicksort(u,h+1,v)}}},{key:"_partition",value:function(u,f,v){for(var h=this._get(u,f),c=f,d=v;;){for(;this.compareFunction(h,this._get(u,d));)d--;for(;this.compareFunction(this._get(u,c),h);)c++;if(c<d)this._swap(u,c,d),c++,d--;else return d}}},{key:"_get",value:function(u,f){return u instanceof i?u.get_object_at(f):u[f]}},{key:"_set",value:function(u,f,v){u instanceof i?u.set_object_at(f,v):u[f]=v}},{key:"_swap",value:function(u,f,v){var h=this._get(u,f);this._set(u,f,this._get(u,v)),this._set(u,v,h)}},{key:"_defaultCompareFunction",value:function(u,f){return f>u}}]),s})();t.exports=o}),(function(t,e,r){"use strict";function a(){}a.svd=function(n){this.U=null,this.V=null,this.s=null,this.m=0,this.n=0,this.m=n.length,this.n=n[0].length;var i=Math.min(this.m,this.n);this.s=(function(Fe){for(var Re=[];Fe-- >0;)Re.push(0);return Re})(Math.min(this.m+1,this.n)),this.U=(function(Fe){var Re=function Ze(We){if(We.length==0)return 0;for(var Ue=[],nt=0;nt<We[0];nt++)Ue.push(Ze(We.slice(1)));return Ue};return Re(Fe)})([this.m,i]),this.V=(function(Fe){var Re=function Ze(We){if(We.length==0)return 0;for(var Ue=[],nt=0;nt<We[0];nt++)Ue.push(Ze(We.slice(1)));return Ue};return Re(Fe)})([this.n,this.n]);for(var o=(function(Fe){for(var Re=[];Fe-- >0;)Re.push(0);return Re})(this.n),s=(function(Fe){for(var Re=[];Fe-- >0;)Re.push(0);return Re})(this.m),l=!0,u=!0,f=Math.min(this.m-1,this.n),v=Math.max(0,Math.min(this.n-2,this.m)),h=0;h<Math.max(f,v);h++){if(h<f){this.s[h]=0;for(var c=h;c<this.m;c++)this.s[h]=a.hypot(this.s[h],n[c][h]);if(this.s[h]!==0){n[h][h]<0&&(this.s[h]=-this.s[h]);for(var d=h;d<this.m;d++)n[d][h]/=this.s[h];n[h][h]+=1}this.s[h]=-this.s[h]}for(var g=h+1;g<this.n;g++){if((function(Fe,Re){return Fe&&Re})(h<f,this.s[h]!==0)){for(var y=0,p=h;p<this.m;p++)y+=n[p][h]*n[p][g];y=-y/n[h][h];for(var m=h;m<this.m;m++)n[m][g]+=y*n[m][h]}o[g]=n[h][g]}if((function(Fe,Re){return Fe&&Re})(l,h<f))for(var b=h;b<this.m;b++)this.U[b][h]=n[b][h];if(h<v){o[h]=0;for(var E=h+1;E<this.n;E++)o[h]=a.hypot(o[h],o[E]);if(o[h]!==0){o[h+1]<0&&(o[h]=-o[h]);for(var C=h+1;C<this.n;C++)o[C]/=o[h];o[h+1]+=1}if(o[h]=-o[h],(function(Fe,Re){return Fe&&Re})(h+1<this.m,o[h]!==0)){for(var L=h+1;L<this.m;L++)s[L]=0;for(var D=h+1;D<this.n;D++)for(var R=h+1;R<this.m;R++)s[R]+=o[D]*n[R][D];for(var O=h+1;O<this.n;O++)for(var M=-o[O]/o[h+1],P=h+1;P<this.m;P++)n[P][O]+=M*s[P]}if(u)for(var w=h+1;w<this.n;w++)this.V[w][h]=o[w]}}var x=Math.min(this.n,this.m+1);if(f<this.n&&(this.s[f]=n[f][f]),this.m<x&&(this.s[x-1]=0),v+1<x&&(o[v]=n[v][x-1]),o[x-1]=0,l){for(var T=f;T<i;T++){for(var A=0;A<this.m;A++)this.U[A][T]=0;this.U[T][T]=1}for(var S=f-1;S>=0;S--)if(this.s[S]!==0){for(var I=S+1;I<i;I++){for(var B=0,k=S;k<this.m;k++)B+=this.U[k][S]*this.U[k][I];B=-B/this.U[S][S];for(var z=S;z<this.m;z++)this.U[z][I]+=B*this.U[z][S]}for(var F=S;F<this.m;F++)this.U[F][S]=-this.U[F][S];this.U[S][S]=1+this.U[S][S];for(var V=0;V<S-1;V++)this.U[V][S]=0}else{for(var Z=0;Z<this.m;Z++)this.U[Z][S]=0;this.U[S][S]=1}}if(u)for(var q=this.n-1;q>=0;q--){if((function(Fe,Re){return Fe&&Re})(q<v,o[q]!==0))for(var _=q+1;_<i;_++){for(var K=0,U=q+1;U<this.n;U++)K+=this.V[U][q]*this.V[U][_];K=-K/this.V[q+1][q];for(var J=q+1;J<this.n;J++)this.V[J][_]+=K*this.V[J][q]}for(var $=0;$<this.n;$++)this.V[$][q]=0;this.V[q][q]=1}for(var H=x-1,Y=0,Q=Math.pow(2,-52),oe=Math.pow(2,-966);x>0;){var te=void 0,Te=void 0;for(te=x-2;te>=-1&&te!==-1;te--)if(Math.abs(o[te])<=oe+Q*(Math.abs(this.s[te])+Math.abs(this.s[te+1]))){o[te]=0;break}if(te===x-2)Te=4;else{var Le=void 0;for(Le=x-1;Le>=te&&Le!==te;Le--){var he=(Le!==x?Math.abs(o[Le]):0)+(Le!==te+1?Math.abs(o[Le-1]):0);if(Math.abs(this.s[Le])<=oe+Q*he){this.s[Le]=0;break}}Le===te?Te=3:Le===x-1?Te=1:(Te=2,te=Le)}switch(te++,Te){case 1:{var le=o[x-2];o[x-2]=0;for(var ce=x-2;ce>=te;ce--){var fe=a.hypot(this.s[ce],le),ye=this.s[ce]/fe,me=le/fe;if(this.s[ce]=fe,ce!==te&&(le=-me*o[ce-1],o[ce-1]=ye*o[ce-1]),u)for(var Ee=0;Ee<this.n;Ee++)fe=ye*this.V[Ee][ce]+me*this.V[Ee][x-1],this.V[Ee][x-1]=-me*this.V[Ee][ce]+ye*this.V[Ee][x-1],this.V[Ee][ce]=fe}}break;case 2:{var be=o[te-1];o[te-1]=0;for(var Ae=te;Ae<x;Ae++){var Ie=a.hypot(this.s[Ae],be),Oe=this.s[Ae]/Ie,Be=be/Ie;if(this.s[Ae]=Ie,be=-Be*o[Ae],o[Ae]=Oe*o[Ae],l)for(var Pe=0;Pe<this.m;Pe++)Ie=Oe*this.U[Pe][Ae]+Be*this.U[Pe][te-1],this.U[Pe][te-1]=-Be*this.U[Pe][Ae]+Oe*this.U[Pe][te-1],this.U[Pe][Ae]=Ie}}break;case 3:{var ne=Math.max(Math.max(Math.max(Math.max(Math.abs(this.s[x-1]),Math.abs(this.s[x-2])),Math.abs(o[x-2])),Math.abs(this.s[te])),Math.abs(o[te])),ae=this.s[x-1]/ne,W=this.s[x-2]/ne,N=o[x-2]/ne,G=this.s[te]/ne,X=o[te]/ne,j=((W+ae)*(W-ae)+N*N)/2,ee=ae*N*(ae*N),ie=0;(function(Fe,Re){return Fe||Re})(j!==0,ee!==0)&&(ie=Math.sqrt(j*j+ee),j<0&&(ie=-ie),ie=ee/(j+ie));for(var re=(G+ae)*(G-ae)+ie,ve=G*X,se=te;se<x-1;se++){var de=a.hypot(re,ve),Se=re/de,ge=ve/de;if(se!==te&&(o[se-1]=de),re=Se*this.s[se]+ge*o[se],o[se]=Se*o[se]-ge*this.s[se],ve=ge*this.s[se+1],this.s[se+1]=Se*this.s[se+1],u)for(var ue=0;ue<this.n;ue++)de=Se*this.V[ue][se]+ge*this.V[ue][se+1],this.V[ue][se+1]=-ge*this.V[ue][se]+Se*this.V[ue][se+1],this.V[ue][se]=de;if(de=a.hypot(re,ve),Se=re/de,ge=ve/de,this.s[se]=de,re=Se*o[se]+ge*this.s[se+1],this.s[se+1]=-ge*o[se]+Se*this.s[se+1],ve=ge*o[se+1],o[se+1]=Se*o[se+1],l&&se<this.m-1)for(var we=0;we<this.m;we++)de=Se*this.U[we][se]+ge*this.U[we][se+1],this.U[we][se+1]=-ge*this.U[we][se]+Se*this.U[we][se+1],this.U[we][se]=de}o[x-2]=re,Y=Y+1}break;case 4:{if(this.s[te]<=0&&(this.s[te]=this.s[te]<0?-this.s[te]:0,u))for(var pe=0;pe<=H;pe++)this.V[pe][te]=-this.V[pe][te];for(;te<H&&!(this.s[te]>=this.s[te+1]);){var Ce=this.s[te];if(this.s[te]=this.s[te+1],this.s[te+1]=Ce,u&&te<this.n-1)for(var ze=0;ze<this.n;ze++)Ce=this.V[ze][te+1],this.V[ze][te+1]=this.V[ze][te],this.V[ze][te]=Ce;if(l&&te<this.m-1)for(var Ve=0;Ve<this.m;Ve++)Ce=this.U[Ve][te+1],this.U[Ve][te+1]=this.U[Ve][te],this.U[Ve][te]=Ce;te++}Y=0,x--}break}}var He={U:this.U,V:this.V,S:this.s};return He},a.hypot=function(n,i){var o=void 0;return Math.abs(n)>Math.abs(i)?(o=i/n,o=Math.abs(n)*Math.sqrt(1+o*o)):i!=0?(o=n/i,o=Math.abs(i)*Math.sqrt(1+o*o)):o=0,o},t.exports=a}),(function(t,e,r){"use strict";var a=(function(){function o(s,l){for(var u=0;u<l.length;u++){var f=l[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(s,f.key,f)}}return function(s,l,u){return l&&o(s.prototype,l),u&&o(s,u),s}})();function n(o,s){if(!(o instanceof s))throw new TypeError("Cannot call a class as a function")}var i=(function(){function o(s,l){var u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,f=arguments.length>3&&arguments[3]!==void 0?arguments[3]:-1,v=arguments.length>4&&arguments[4]!==void 0?arguments[4]:-1;n(this,o),this.sequence1=s,this.sequence2=l,this.match_score=u,this.mismatch_penalty=f,this.gap_penalty=v,this.iMax=s.length+1,this.jMax=l.length+1,this.grid=new Array(this.iMax);for(var h=0;h<this.iMax;h++){this.grid[h]=new Array(this.jMax);for(var c=0;c<this.jMax;c++)this.grid[h][c]=0}this.tracebackGrid=new Array(this.iMax);for(var d=0;d<this.iMax;d++){this.tracebackGrid[d]=new Array(this.jMax);for(var g=0;g<this.jMax;g++)this.tracebackGrid[d][g]=[null,null,null]}this.alignments=[],this.score=-1,this.computeGrids()}return a(o,[{key:"getScore",value:function(){return this.score}},{key:"getAlignments",value:function(){return this.alignments}},{key:"computeGrids",value:function(){for(var l=1;l<this.jMax;l++)this.grid[0][l]=this.grid[0][l-1]+this.gap_penalty,this.tracebackGrid[0][l]=[!1,!1,!0];for(var u=1;u<this.iMax;u++)this.grid[u][0]=this.grid[u-1][0]+this.gap_penalty,this.tracebackGrid[u][0]=[!1,!0,!1];for(var f=1;f<this.iMax;f++)for(var v=1;v<this.jMax;v++){var h=void 0;this.sequence1[f-1]===this.sequence2[v-1]?h=this.grid[f-1][v-1]+this.match_score:h=this.grid[f-1][v-1]+this.mismatch_penalty;var c=this.grid[f-1][v]+this.gap_penalty,d=this.grid[f][v-1]+this.gap_penalty,g=[h,c,d],y=this.arrayAllMaxIndexes(g);this.grid[f][v]=g[y[0]],this.tracebackGrid[f][v]=[y.includes(0),y.includes(1),y.includes(2)]}this.score=this.grid[this.iMax-1][this.jMax-1]}},{key:"alignmentTraceback",value:function(){var l=[];for(l.push({pos:[this.sequence1.length,this.sequence2.length],seq1:"",seq2:""});l[0];){var u=l[0],f=this.tracebackGrid[u.pos[0]][u.pos[1]];f[0]&&l.push({pos:[u.pos[0]-1,u.pos[1]-1],seq1:this.sequence1[u.pos[0]-1]+u.seq1,seq2:this.sequence2[u.pos[1]-1]+u.seq2}),f[1]&&l.push({pos:[u.pos[0]-1,u.pos[1]],seq1:this.sequence1[u.pos[0]-1]+u.seq1,seq2:"-"+u.seq2}),f[2]&&l.push({pos:[u.pos[0],u.pos[1]-1],seq1:"-"+u.seq1,seq2:this.sequence2[u.pos[1]-1]+u.seq2}),u.pos[0]===0&&u.pos[1]===0&&this.alignments.push({sequence1:u.seq1,sequence2:u.seq2}),l.shift()}return this.alignments}},{key:"getAllIndexes",value:function(l,u){for(var f=[],v=-1;(v=l.indexOf(u,v+1))!==-1;)f.push(v);return f}},{key:"arrayAllMaxIndexes",value:function(l){return this.getAllIndexes(l,Math.max.apply(null,l))}}]),o})();t.exports=i}),(function(t,e,r){"use strict";var a=function(){};a.FDLayout=r(18),a.FDLayoutConstants=r(4),a.FDLayoutEdge=r(19),a.FDLayoutNode=r(20),a.DimensionD=r(21),a.HashMap=r(22),a.HashSet=r(23),a.IGeometry=r(8),a.IMath=r(9),a.Integer=r(10),a.Point=r(12),a.PointD=r(5),a.RandomSeed=r(16),a.RectangleD=r(13),a.Transform=r(17),a.UniqueIDGeneretor=r(14),a.Quicksort=r(25),a.LinkedList=r(11),a.LGraphObject=r(2),a.LGraph=r(6),a.LEdge=r(1),a.LGraphManager=r(7),a.LNode=r(3),a.Layout=r(15),a.LayoutConstants=r(0),a.NeedlemanWunsch=r(27),a.Matrix=r(24),a.SVD=r(26),t.exports=a}),(function(t,e,r){"use strict";function a(){this.listeners=[]}var n=a.prototype;n.addListener=function(i,o){this.listeners.push({event:i,callback:o})},n.removeListener=function(i,o){for(var s=this.listeners.length;s>=0;s--){var l=this.listeners[s];l.event===i&&l.callback===o&&this.listeners.splice(s,1)}},n.emit=function(i,o){for(var s=0;s<this.listeners.length;s++){var l=this.listeners[s];i===l.event&&l.callback(o)}},t.exports=a})])})});var zs=hi((rn,ks)=>{(function(e,r){typeof rn=="object"&&typeof ks=="object"?ks.exports=r(Fs()):typeof define=="function"&&define.amd?define(["layout-base"],r):typeof rn=="object"?rn.coseBase=r(Fs()):e.coseBase=r(e.layoutBase)})(rn,function(t){return(()=>{"use strict";var e={45:((i,o,s)=>{var l={};l.layoutBase=s(551),l.CoSEConstants=s(806),l.CoSEEdge=s(767),l.CoSEGraph=s(880),l.CoSEGraphManager=s(578),l.CoSELayout=s(765),l.CoSENode=s(991),l.ConstraintHandler=s(902),i.exports=l}),806:((i,o,s)=>{var l=s(551).FDLayoutConstants;function u(){}for(var f in l)u[f]=l[f];u.DEFAULT_USE_MULTI_LEVEL_SCALING=!1,u.DEFAULT_RADIAL_SEPARATION=l.DEFAULT_EDGE_LENGTH,u.DEFAULT_COMPONENT_SEPERATION=60,u.TILE=!0,u.TILING_PADDING_VERTICAL=10,u.TILING_PADDING_HORIZONTAL=10,u.TRANSFORM_ON_CONSTRAINT_HANDLING=!0,u.ENFORCE_CONSTRAINTS=!0,u.APPLY_LAYOUT=!0,u.RELAX_MOVEMENT_ON_CONSTRAINTS=!0,u.TREE_REDUCTION_ON_INCREMENTAL=!0,u.PURE_INCREMENTAL=u.DEFAULT_INCREMENTAL,i.exports=u}),767:((i,o,s)=>{var l=s(551).FDLayoutEdge;function u(v,h,c){l.call(this,v,h,c)}u.prototype=Object.create(l.prototype);for(var f in l)u[f]=l[f];i.exports=u}),880:((i,o,s)=>{var l=s(551).LGraph;function u(v,h,c){l.call(this,v,h,c)}u.prototype=Object.create(l.prototype);for(var f in l)u[f]=l[f];i.exports=u}),578:((i,o,s)=>{var l=s(551).LGraphManager;function u(v){l.call(this,v)}u.prototype=Object.create(l.prototype);for(var f in l)u[f]=l[f];i.exports=u}),765:((i,o,s)=>{var l=s(551).FDLayout,u=s(578),f=s(880),v=s(991),h=s(767),c=s(806),d=s(902),g=s(551).FDLayoutConstants,y=s(551).LayoutConstants,p=s(551).Point,m=s(551).PointD,b=s(551).DimensionD,E=s(551).Layout,C=s(551).Integer,L=s(551).IGeometry,D=s(551).LGraph,R=s(551).Transform,O=s(551).LinkedList;function M(){l.call(this),this.toBeTiled={},this.constraints={}}M.prototype=Object.create(l.prototype);for(var P in l)M[P]=l[P];M.prototype.newGraphManager=function(){var w=new u(this);return this.graphManager=w,w},M.prototype.newGraph=function(w){return new f(null,this.graphManager,w)},M.prototype.newNode=function(w){return new v(this.graphManager,w)},M.prototype.newEdge=function(w){return new h(null,null,w)},M.prototype.initParameters=function(){l.prototype.initParameters.call(this,arguments),this.isSubLayout||(c.DEFAULT_EDGE_LENGTH<10?this.idealEdgeLength=10:this.idealEdgeLength=c.DEFAULT_EDGE_LENGTH,this.useSmartIdealEdgeLengthCalculation=c.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION,this.gravityConstant=g.DEFAULT_GRAVITY_STRENGTH,this.compoundGravityConstant=g.DEFAULT_COMPOUND_GRAVITY_STRENGTH,this.gravityRangeFactor=g.DEFAULT_GRAVITY_RANGE_FACTOR,this.compoundGravityRangeFactor=g.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR,this.prunedNodesAll=[],this.growTreeIterations=0,this.afterGrowthIterations=0,this.isTreeGrowing=!1,this.isGrowthFinished=!1)},M.prototype.initSpringEmbedder=function(){l.prototype.initSpringEmbedder.call(this),this.coolingCycle=0,this.maxCoolingCycle=this.maxIterations/g.CONVERGENCE_CHECK_PERIOD,this.finalTemperature=.04,this.coolingAdjuster=1},M.prototype.layout=function(){var w=y.DEFAULT_CREATE_BENDS_AS_NEEDED;return w&&(this.createBendpoints(),this.graphManager.resetAllEdges()),this.level=0,this.classicLayout()},M.prototype.classicLayout=function(){if(this.nodesWithGravity=this.calculateNodesToApplyGravitationTo(),this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity),this.calcNoOfChildrenForAllNodes(),this.graphManager.calcLowestCommonAncestors(),this.graphManager.calcInclusionTreeDepths(),this.graphManager.getRoot().calcEstimatedSize(),this.calcIdealEdgeLengths(),this.incremental){if(c.TREE_REDUCTION_ON_INCREMENTAL){this.reduceTrees(),this.graphManager.resetAllNodesToApplyGravitation();var x=new Set(this.getAllNodes()),T=this.nodesWithGravity.filter(function(I){return x.has(I)});this.graphManager.setAllNodesToApplyGravitation(T)}}else{var w=this.getFlatForest();if(w.length>0)this.positionNodesRadially(w);else{this.reduceTrees(),this.graphManager.resetAllNodesToApplyGravitation();var x=new Set(this.getAllNodes()),T=this.nodesWithGravity.filter(function(A){return x.has(A)});this.graphManager.setAllNodesToApplyGravitation(T),this.positionNodesRandomly()}}return Object.keys(this.constraints).length>0&&(d.handleConstraints(this),this.initConstraintVariables()),this.initSpringEmbedder(),c.APPLY_LAYOUT&&this.runSpringEmbedder(),!0},M.prototype.tick=function(){if(this.totalIterations++,this.totalIterations===this.maxIterations&&!this.isTreeGrowing&&!this.isGrowthFinished)if(this.prunedNodesAll.length>0)this.isTreeGrowing=!0;else return!0;if(this.totalIterations%g.CONVERGENCE_CHECK_PERIOD==0&&!this.isTreeGrowing&&!this.isGrowthFinished){if(this.isConverged())if(this.prunedNodesAll.length>0)this.isTreeGrowing=!0;else return!0;this.coolingCycle++,this.layoutQuality==0?this.coolingAdjuster=this.coolingCycle:this.layoutQuality==1&&(this.coolingAdjuster=this.coolingCycle/3),this.coolingFactor=Math.max(this.initialCoolingFactor-Math.pow(this.coolingCycle,Math.log(100*(this.initialCoolingFactor-this.finalTemperature))/Math.log(this.maxCoolingCycle))/100*this.coolingAdjuster,this.finalTemperature),this.animationPeriod=Math.ceil(this.initialAnimationPeriod*Math.sqrt(this.coolingFactor))}if(this.isTreeGrowing){if(this.growTreeIterations%10==0)if(this.prunedNodesAll.length>0){this.graphManager.updateBounds(),this.updateGrid(),this.growTree(this.prunedNodesAll),this.graphManager.resetAllNodesToApplyGravitation();var w=new Set(this.getAllNodes()),x=this.nodesWithGravity.filter(function(S){return w.has(S)});this.graphManager.setAllNodesToApplyGravitation(x),this.graphManager.updateBounds(),this.updateGrid(),c.PURE_INCREMENTAL?this.coolingFactor=g.DEFAULT_COOLING_FACTOR_INCREMENTAL/2:this.coolingFactor=g.DEFAULT_COOLING_FACTOR_INCREMENTAL}else this.isTreeGrowing=!1,this.isGrowthFinished=!0;this.growTreeIterations++}if(this.isGrowthFinished){if(this.isConverged())return!0;this.afterGrowthIterations%10==0&&(this.graphManager.updateBounds(),this.updateGrid()),c.PURE_INCREMENTAL?this.coolingFactor=g.DEFAULT_COOLING_FACTOR_INCREMENTAL/2*((100-this.afterGrowthIterations)/100):this.coolingFactor=g.DEFAULT_COOLING_FACTOR_INCREMENTAL*((100-this.afterGrowthIterations)/100),this.afterGrowthIterations++}var T=!this.isTreeGrowing&&!this.isGrowthFinished,A=this.growTreeIterations%10==1&&this.isTreeGrowing||this.afterGrowthIterations%10==1&&this.isGrowthFinished;return this.totalDisplacement=0,this.graphManager.updateBounds(),this.calcSpringForces(),this.calcRepulsionForces(T,A),this.calcGravitationalForces(),this.moveNodes(),this.animate(),!1},M.prototype.getPositionsData=function(){for(var w=this.graphManager.getAllNodes(),x={},T=0;T<w.length;T++){var A=w[T].rect,S=w[T].id;x[S]={id:S,x:A.getCenterX(),y:A.getCenterY(),w:A.width,h:A.height}}return x},M.prototype.runSpringEmbedder=function(){this.initialAnimationPeriod=25,this.animationPeriod=this.initialAnimationPeriod;var w=!1;if(g.ANIMATE==="during")this.emit("layoutstarted");else{for(;!w;)w=this.tick();this.graphManager.updateBounds()}},M.prototype.moveNodes=function(){for(var w=this.getAllNodes(),x,T=0;T<w.length;T++)x=w[T],x.calculateDisplacement();Object.keys(this.constraints).length>0&&this.updateDisplacements();for(var T=0;T<w.length;T++)x=w[T],x.move()},M.prototype.initConstraintVariables=function(){var w=this;this.idToNodeMap=new Map,this.fixedNodeSet=new Set;for(var x=this.graphManager.getAllNodes(),T=0;T<x.length;T++){var A=x[T];this.idToNodeMap.set(A.id,A)}var S=function U(J){for(var $=J.getChild().getNodes(),H,Y=0,Q=0;Q<$.length;Q++)H=$[Q],H.getChild()==null?w.fixedNodeSet.has(H.id)&&(Y+=100):Y+=U(H);return Y};if(this.constraints.fixedNodeConstraint){this.constraints.fixedNodeConstraint.forEach(function($){w.fixedNodeSet.add($.nodeId)});for(var x=this.graphManager.getAllNodes(),A,T=0;T<x.length;T++)if(A=x[T],A.getChild()!=null){var I=S(A);I>0&&(A.fixedNodeWeight=I)}}if(this.constraints.relativePlacementConstraint){var B=new Map,k=new Map;if(this.dummyToNodeForVerticalAlignment=new Map,this.dummyToNodeForHorizontalAlignment=new Map,this.fixedNodesOnHorizontal=new Set,this.fixedNodesOnVertical=new Set,this.fixedNodeSet.forEach(function(U){w.fixedNodesOnHorizontal.add(U),w.fixedNodesOnVertical.add(U)}),this.constraints.alignmentConstraint){if(this.constraints.alignmentConstraint.vertical)for(var z=this.constraints.alignmentConstraint.vertical,T=0;T<z.length;T++)this.dummyToNodeForVerticalAlignment.set("dummy"+T,[]),z[T].forEach(function(J){B.set(J,"dummy"+T),w.dummyToNodeForVerticalAlignment.get("dummy"+T).push(J),w.fixedNodeSet.has(J)&&w.fixedNodesOnHorizontal.add("dummy"+T)});if(this.constraints.alignmentConstraint.horizontal)for(var F=this.constraints.alignmentConstraint.horizontal,T=0;T<F.length;T++)this.dummyToNodeForHorizontalAlignment.set("dummy"+T,[]),F[T].forEach(function(J){k.set(J,"dummy"+T),w.dummyToNodeForHorizontalAlignment.get("dummy"+T).push(J),w.fixedNodeSet.has(J)&&w.fixedNodesOnVertical.add("dummy"+T)})}if(c.RELAX_MOVEMENT_ON_CONSTRAINTS)this.shuffle=function(U){var J,$,H;for(H=U.length-1;H>=2*U.length/3;H--)J=Math.floor(Math.random()*(H+1)),$=U[H],U[H]=U[J],U[J]=$;return U},this.nodesInRelativeHorizontal=[],this.nodesInRelativeVertical=[],this.nodeToRelativeConstraintMapHorizontal=new Map,this.nodeToRelativeConstraintMapVertical=new Map,this.nodeToTempPositionMapHorizontal=new Map,this.nodeToTempPositionMapVertical=new Map,this.constraints.relativePlacementConstraint.forEach(function(U){if(U.left){var J=B.has(U.left)?B.get(U.left):U.left,$=B.has(U.right)?B.get(U.right):U.right;w.nodesInRelativeHorizontal.includes(J)||(w.nodesInRelativeHorizontal.push(J),w.nodeToRelativeConstraintMapHorizontal.set(J,[]),w.dummyToNodeForVerticalAlignment.has(J)?w.nodeToTempPositionMapHorizontal.set(J,w.idToNodeMap.get(w.dummyToNodeForVerticalAlignment.get(J)[0]).getCenterX()):w.nodeToTempPositionMapHorizontal.set(J,w.idToNodeMap.get(J).getCenterX())),w.nodesInRelativeHorizontal.includes($)||(w.nodesInRelativeHorizontal.push($),w.nodeToRelativeConstraintMapHorizontal.set($,[]),w.dummyToNodeForVerticalAlignment.has($)?w.nodeToTempPositionMapHorizontal.set($,w.idToNodeMap.get(w.dummyToNodeForVerticalAlignment.get($)[0]).getCenterX()):w.nodeToTempPositionMapHorizontal.set($,w.idToNodeMap.get($).getCenterX())),w.nodeToRelativeConstraintMapHorizontal.get(J).push({right:$,gap:U.gap}),w.nodeToRelativeConstraintMapHorizontal.get($).push({left:J,gap:U.gap})}else{var H=k.has(U.top)?k.get(U.top):U.top,Y=k.has(U.bottom)?k.get(U.bottom):U.bottom;w.nodesInRelativeVertical.includes(H)||(w.nodesInRelativeVertical.push(H),w.nodeToRelativeConstraintMapVertical.set(H,[]),w.dummyToNodeForHorizontalAlignment.has(H)?w.nodeToTempPositionMapVertical.set(H,w.idToNodeMap.get(w.dummyToNodeForHorizontalAlignment.get(H)[0]).getCenterY()):w.nodeToTempPositionMapVertical.set(H,w.idToNodeMap.get(H).getCenterY())),w.nodesInRelativeVertical.includes(Y)||(w.nodesInRelativeVertical.push(Y),w.nodeToRelativeConstraintMapVertical.set(Y,[]),w.dummyToNodeForHorizontalAlignment.has(Y)?w.nodeToTempPositionMapVertical.set(Y,w.idToNodeMap.get(w.dummyToNodeForHorizontalAlignment.get(Y)[0]).getCenterY()):w.nodeToTempPositionMapVertical.set(Y,w.idToNodeMap.get(Y).getCenterY())),w.nodeToRelativeConstraintMapVertical.get(H).push({bottom:Y,gap:U.gap}),w.nodeToRelativeConstraintMapVertical.get(Y).push({top:H,gap:U.gap})}});else{var V=new Map,Z=new Map;this.constraints.relativePlacementConstraint.forEach(function(U){if(U.left){var J=B.has(U.left)?B.get(U.left):U.left,$=B.has(U.right)?B.get(U.right):U.right;V.has(J)?V.get(J).push($):V.set(J,[$]),V.has($)?V.get($).push(J):V.set($,[J])}else{var H=k.has(U.top)?k.get(U.top):U.top,Y=k.has(U.bottom)?k.get(U.bottom):U.bottom;Z.has(H)?Z.get(H).push(Y):Z.set(H,[Y]),Z.has(Y)?Z.get(Y).push(H):Z.set(Y,[H])}});var q=function(J,$){var H=[],Y=[],Q=new O,oe=new Set,te=0;return J.forEach(function(Te,Le){if(!oe.has(Le)){H[te]=[],Y[te]=!1;var he=Le;for(Q.push(he),oe.add(he),H[te].push(he);Q.length!=0;){he=Q.shift(),$.has(he)&&(Y[te]=!0);var le=J.get(he);le.forEach(function(ce){oe.has(ce)||(Q.push(ce),oe.add(ce),H[te].push(ce))})}te++}}),{components:H,isFixed:Y}},_=q(V,w.fixedNodesOnHorizontal);this.componentsOnHorizontal=_.components,this.fixedComponentsOnHorizontal=_.isFixed;var K=q(Z,w.fixedNodesOnVertical);this.componentsOnVertical=K.components,this.fixedComponentsOnVertical=K.isFixed}}},M.prototype.updateDisplacements=function(){var w=this;if(this.constraints.fixedNodeConstraint&&this.constraints.fixedNodeConstraint.forEach(function(K){var U=w.idToNodeMap.get(K.nodeId);U.displacementX=0,U.displacementY=0}),this.constraints.alignmentConstraint){if(this.constraints.alignmentConstraint.vertical)for(var x=this.constraints.alignmentConstraint.vertical,T=0;T<x.length;T++){for(var A=0,S=0;S<x[T].length;S++){if(this.fixedNodeSet.has(x[T][S])){A=0;break}A+=this.idToNodeMap.get(x[T][S]).displacementX}for(var I=A/x[T].length,S=0;S<x[T].length;S++)this.idToNodeMap.get(x[T][S]).displacementX=I}if(this.constraints.alignmentConstraint.horizontal)for(var B=this.constraints.alignmentConstraint.horizontal,T=0;T<B.length;T++){for(var k=0,S=0;S<B[T].length;S++){if(this.fixedNodeSet.has(B[T][S])){k=0;break}k+=this.idToNodeMap.get(B[T][S]).displacementY}for(var z=k/B[T].length,S=0;S<B[T].length;S++)this.idToNodeMap.get(B[T][S]).displacementY=z}}if(this.constraints.relativePlacementConstraint)if(c.RELAX_MOVEMENT_ON_CONSTRAINTS)this.totalIterations%10==0&&(this.shuffle(this.nodesInRelativeHorizontal),this.shuffle(this.nodesInRelativeVertical)),this.nodesInRelativeHorizontal.forEach(function(K){if(!w.fixedNodesOnHorizontal.has(K)){var U=0;w.dummyToNodeForVerticalAlignment.has(K)?U=w.idToNodeMap.get(w.dummyToNodeForVerticalAlignment.get(K)[0]).displacementX:U=w.idToNodeMap.get(K).displacementX,w.nodeToRelativeConstraintMapHorizontal.get(K).forEach(function(J){if(J.right){var $=w.nodeToTempPositionMapHorizontal.get(J.right)-w.nodeToTempPositionMapHorizontal.get(K)-U;$<J.gap&&(U-=J.gap-$)}else{var $=w.nodeToTempPositionMapHorizontal.get(K)-w.nodeToTempPositionMapHorizontal.get(J.left)+U;$<J.gap&&(U+=J.gap-$)}}),w.nodeToTempPositionMapHorizontal.set(K,w.nodeToTempPositionMapHorizontal.get(K)+U),w.dummyToNodeForVerticalAlignment.has(K)?w.dummyToNodeForVerticalAlignment.get(K).forEach(function(J){w.idToNodeMap.get(J).displacementX=U}):w.idToNodeMap.get(K).displacementX=U}}),this.nodesInRelativeVertical.forEach(function(K){if(!w.fixedNodesOnHorizontal.has(K)){var U=0;w.dummyToNodeForHorizontalAlignment.has(K)?U=w.idToNodeMap.get(w.dummyToNodeForHorizontalAlignment.get(K)[0]).displacementY:U=w.idToNodeMap.get(K).displacementY,w.nodeToRelativeConstraintMapVertical.get(K).forEach(function(J){if(J.bottom){var $=w.nodeToTempPositionMapVertical.get(J.bottom)-w.nodeToTempPositionMapVertical.get(K)-U;$<J.gap&&(U-=J.gap-$)}else{var $=w.nodeToTempPositionMapVertical.get(K)-w.nodeToTempPositionMapVertical.get(J.top)+U;$<J.gap&&(U+=J.gap-$)}}),w.nodeToTempPositionMapVertical.set(K,w.nodeToTempPositionMapVertical.get(K)+U),w.dummyToNodeForHorizontalAlignment.has(K)?w.dummyToNodeForHorizontalAlignment.get(K).forEach(function(J){w.idToNodeMap.get(J).displacementY=U}):w.idToNodeMap.get(K).displacementY=U}});else{for(var T=0;T<this.componentsOnHorizontal.length;T++){var F=this.componentsOnHorizontal[T];if(this.fixedComponentsOnHorizontal[T])for(var S=0;S<F.length;S++)this.dummyToNodeForVerticalAlignment.has(F[S])?this.dummyToNodeForVerticalAlignment.get(F[S]).forEach(function(J){w.idToNodeMap.get(J).displacementX=0}):this.idToNodeMap.get(F[S]).displacementX=0;else{for(var V=0,Z=0,S=0;S<F.length;S++)if(this.dummyToNodeForVerticalAlignment.has(F[S])){var q=this.dummyToNodeForVerticalAlignment.get(F[S]);V+=q.length*this.idToNodeMap.get(q[0]).displacementX,Z+=q.length}else V+=this.idToNodeMap.get(F[S]).displacementX,Z++;for(var _=V/Z,S=0;S<F.length;S++)this.dummyToNodeForVerticalAlignment.has(F[S])?this.dummyToNodeForVerticalAlignment.get(F[S]).forEach(function(J){w.idToNodeMap.get(J).displacementX=_}):this.idToNodeMap.get(F[S]).displacementX=_}}for(var T=0;T<this.componentsOnVertical.length;T++){var F=this.componentsOnVertical[T];if(this.fixedComponentsOnVertical[T])for(var S=0;S<F.length;S++)this.dummyToNodeForHorizontalAlignment.has(F[S])?this.dummyToNodeForHorizontalAlignment.get(F[S]).forEach(function($){w.idToNodeMap.get($).displacementY=0}):this.idToNodeMap.get(F[S]).displacementY=0;else{for(var V=0,Z=0,S=0;S<F.length;S++)if(this.dummyToNodeForHorizontalAlignment.has(F[S])){var q=this.dummyToNodeForHorizontalAlignment.get(F[S]);V+=q.length*this.idToNodeMap.get(q[0]).displacementY,Z+=q.length}else V+=this.idToNodeMap.get(F[S]).displacementY,Z++;for(var _=V/Z,S=0;S<F.length;S++)this.dummyToNodeForHorizontalAlignment.has(F[S])?this.dummyToNodeForHorizontalAlignment.get(F[S]).forEach(function(Q){w.idToNodeMap.get(Q).displacementY=_}):this.idToNodeMap.get(F[S]).displacementY=_}}}},M.prototype.calculateNodesToApplyGravitationTo=function(){var w=[],x,T=this.graphManager.getGraphs(),A=T.length,S;for(S=0;S<A;S++)x=T[S],x.updateConnected(),x.isConnected||(w=w.concat(x.getNodes()));return w},M.prototype.createBendpoints=function(){var w=[];w=w.concat(this.graphManager.getAllEdges());var x=new Set,T;for(T=0;T<w.length;T++){var A=w[T];if(!x.has(A)){var S=A.getSource(),I=A.getTarget();if(S==I)A.getBendpoints().push(new m),A.getBendpoints().push(new m),this.createDummyNodesForBendpoints(A),x.add(A);else{var B=[];if(B=B.concat(S.getEdgeListToNode(I)),B=B.concat(I.getEdgeListToNode(S)),!x.has(B[0])){if(B.length>1){var k;for(k=0;k<B.length;k++){var z=B[k];z.getBendpoints().push(new m),this.createDummyNodesForBendpoints(z)}}B.forEach(function(F){x.add(F)})}}}if(x.size==w.length)break}},M.prototype.positionNodesRadially=function(w){for(var x=new p(0,0),T=Math.ceil(Math.sqrt(w.length)),A=0,S=0,I=0,B=new m(0,0),k=0;k<w.length;k++){k%T==0&&(I=0,S=A,k!=0&&(S+=c.DEFAULT_COMPONENT_SEPERATION),A=0);var z=w[k],F=E.findCenterOfTree(z);x.x=I,x.y=S,B=M.radialLayout(z,F,x),B.y>A&&(A=Math.floor(B.y)),I=Math.floor(B.x+c.DEFAULT_COMPONENT_SEPERATION)}this.transform(new m(y.WORLD_CENTER_X-B.x/2,y.WORLD_CENTER_Y-B.y/2))},M.radialLayout=function(w,x,T){var A=Math.max(this.maxDiagonalInTree(w),c.DEFAULT_RADIAL_SEPARATION);M.branchRadialLayout(x,null,0,359,0,A);var S=D.calculateBounds(w),I=new R;I.setDeviceOrgX(S.getMinX()),I.setDeviceOrgY(S.getMinY()),I.setWorldOrgX(T.x),I.setWorldOrgY(T.y);for(var B=0;B<w.length;B++){var k=w[B];k.transform(I)}var z=new m(S.getMaxX(),S.getMaxY());return I.inverseTransformPoint(z)},M.branchRadialLayout=function(w,x,T,A,S,I){var B=(A-T+1)/2;B<0&&(B+=180);var k=(B+T)%360,z=k*L.TWO_PI/360,F=Math.cos(z),V=S*Math.cos(z),Z=S*Math.sin(z);w.setCenter(V,Z);var q=[];q=q.concat(w.getEdges());var _=q.length;x!=null&&_--;for(var K=0,U=q.length,J,$=w.getEdgesBetween(x);$.length>1;){var H=$[0];$.splice(0,1);var Y=q.indexOf(H);Y>=0&&q.splice(Y,1),U--,_--}x!=null?J=(q.indexOf($[0])+1)%U:J=0;for(var Q=Math.abs(A-T)/_,oe=J;K!=_;oe=++oe%U){var te=q[oe].getOtherEnd(w);if(te!=x){var Te=(T+K*Q)%360,Le=(Te+Q)%360;M.branchRadialLayout(te,w,Te,Le,S+I,I),K++}}},M.maxDiagonalInTree=function(w){for(var x=C.MIN_VALUE,T=0;T<w.length;T++){var A=w[T],S=A.getDiagonal();S>x&&(x=S)}return x},M.prototype.calcRepulsionRange=function(){return 2*(this.level+1)*this.idealEdgeLength},M.prototype.groupZeroDegreeMembers=function(){var w=this,x={};this.memberGroups={},this.idToDummyNode={};for(var T=[],A=this.graphManager.getAllNodes(),S=0;S<A.length;S++){var I=A[S],B=I.getParent();this.getNodeDegreeWithChildren(I)===0&&(B.id==null||!this.getToBeTiled(B))&&T.push(I)}for(var S=0;S<T.length;S++){var I=T[S],k=I.getParent().id;typeof x[k]>"u"&&(x[k]=[]),x[k]=x[k].concat(I)}Object.keys(x).forEach(function(z){if(x[z].length>1){var F="DummyCompound_"+z;w.memberGroups[F]=x[z];var V=x[z][0].getParent(),Z=new v(w.graphManager);Z.id=F,Z.paddingLeft=V.paddingLeft||0,Z.paddingRight=V.paddingRight||0,Z.paddingBottom=V.paddingBottom||0,Z.paddingTop=V.paddingTop||0,w.idToDummyNode[F]=Z;var q=w.getGraphManager().add(w.newGraph(),Z),_=V.getChild();_.add(Z);for(var K=0;K<x[z].length;K++){var U=x[z][K];_.remove(U),q.add(U)}}})},M.prototype.clearCompounds=function(){var w={},x={};this.performDFSOnCompounds();for(var T=0;T<this.compoundOrder.length;T++)x[this.compoundOrder[T].id]=this.compoundOrder[T],w[this.compoundOrder[T].id]=[].concat(this.compoundOrder[T].getChild().getNodes()),this.graphManager.remove(this.compoundOrder[T].getChild()),this.compoundOrder[T].child=null;this.graphManager.resetAllNodes(),this.tileCompoundMembers(w,x)},M.prototype.clearZeroDegreeMembers=function(){var w=this,x=this.tiledZeroDegreePack=[];Object.keys(this.memberGroups).forEach(function(T){var A=w.idToDummyNode[T];if(x[T]=w.tileNodes(w.memberGroups[T],A.paddingLeft+A.paddingRight),A.rect.width=x[T].width,A.rect.height=x[T].height,A.setCenter(x[T].centerX,x[T].centerY),A.labelMarginLeft=0,A.labelMarginTop=0,c.NODE_DIMENSIONS_INCLUDE_LABELS){var S=A.rect.width,I=A.rect.height;A.labelWidth&&(A.labelPosHorizontal=="left"?(A.rect.x-=A.labelWidth,A.setWidth(S+A.labelWidth),A.labelMarginLeft=A.labelWidth):A.labelPosHorizontal=="center"&&A.labelWidth>S?(A.rect.x-=(A.labelWidth-S)/2,A.setWidth(A.labelWidth),A.labelMarginLeft=(A.labelWidth-S)/2):A.labelPosHorizontal=="right"&&A.setWidth(S+A.labelWidth)),A.labelHeight&&(A.labelPosVertical=="top"?(A.rect.y-=A.labelHeight,A.setHeight(I+A.labelHeight),A.labelMarginTop=A.labelHeight):A.labelPosVertical=="center"&&A.labelHeight>I?(A.rect.y-=(A.labelHeight-I)/2,A.setHeight(A.labelHeight),A.labelMarginTop=(A.labelHeight-I)/2):A.labelPosVertical=="bottom"&&A.setHeight(I+A.labelHeight))}})},M.prototype.repopulateCompounds=function(){for(var w=this.compoundOrder.length-1;w>=0;w--){var x=this.compoundOrder[w],T=x.id,A=x.paddingLeft,S=x.paddingTop,I=x.labelMarginLeft,B=x.labelMarginTop;this.adjustLocations(this.tiledMemberPack[T],x.rect.x,x.rect.y,A,S,I,B)}},M.prototype.repopulateZeroDegreeMembers=function(){var w=this,x=this.tiledZeroDegreePack;Object.keys(x).forEach(function(T){var A=w.idToDummyNode[T],S=A.paddingLeft,I=A.paddingTop,B=A.labelMarginLeft,k=A.labelMarginTop;w.adjustLocations(x[T],A.rect.x,A.rect.y,S,I,B,k)})},M.prototype.getToBeTiled=function(w){var x=w.id;if(this.toBeTiled[x]!=null)return this.toBeTiled[x];var T=w.getChild();if(T==null)return this.toBeTiled[x]=!1,!1;for(var A=T.getNodes(),S=0;S<A.length;S++){var I=A[S];if(this.getNodeDegree(I)>0)return this.toBeTiled[x]=!1,!1;if(I.getChild()==null){this.toBeTiled[I.id]=!1;continue}if(!this.getToBeTiled(I))return this.toBeTiled[x]=!1,!1}return this.toBeTiled[x]=!0,!0},M.prototype.getNodeDegree=function(w){for(var x=w.id,T=w.getEdges(),A=0,S=0;S<T.length;S++){var I=T[S];I.getSource().id!==I.getTarget().id&&(A=A+1)}return A},M.prototype.getNodeDegreeWithChildren=function(w){var x=this.getNodeDegree(w);if(w.getChild()==null)return x;for(var T=w.getChild().getNodes(),A=0;A<T.length;A++){var S=T[A];x+=this.getNodeDegreeWithChildren(S)}return x},M.prototype.performDFSOnCompounds=function(){this.compoundOrder=[],this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes())},M.prototype.fillCompexOrderByDFS=function(w){for(var x=0;x<w.length;x++){var T=w[x];T.getChild()!=null&&this.fillCompexOrderByDFS(T.getChild().getNodes()),this.getToBeTiled(T)&&this.compoundOrder.push(T)}},M.prototype.adjustLocations=function(w,x,T,A,S,I,B){x+=A+I,T+=S+B;for(var k=x,z=0;z<w.rows.length;z++){var F=w.rows[z];x=k;for(var V=0,Z=0;Z<F.length;Z++){var q=F[Z];q.rect.x=x,q.rect.y=T,x+=q.rect.width+w.horizontalPadding,q.rect.height>V&&(V=q.rect.height)}T+=V+w.verticalPadding}},M.prototype.tileCompoundMembers=function(w,x){var T=this;this.tiledMemberPack=[],Object.keys(w).forEach(function(A){var S=x[A];if(T.tiledMemberPack[A]=T.tileNodes(w[A],S.paddingLeft+S.paddingRight),S.rect.width=T.tiledMemberPack[A].width,S.rect.height=T.tiledMemberPack[A].height,S.setCenter(T.tiledMemberPack[A].centerX,T.tiledMemberPack[A].centerY),S.labelMarginLeft=0,S.labelMarginTop=0,c.NODE_DIMENSIONS_INCLUDE_LABELS){var I=S.rect.width,B=S.rect.height;S.labelWidth&&(S.labelPosHorizontal=="left"?(S.rect.x-=S.labelWidth,S.setWidth(I+S.labelWidth),S.labelMarginLeft=S.labelWidth):S.labelPosHorizontal=="center"&&S.labelWidth>I?(S.rect.x-=(S.labelWidth-I)/2,S.setWidth(S.labelWidth),S.labelMarginLeft=(S.labelWidth-I)/2):S.labelPosHorizontal=="right"&&S.setWidth(I+S.labelWidth)),S.labelHeight&&(S.labelPosVertical=="top"?(S.rect.y-=S.labelHeight,S.setHeight(B+S.labelHeight),S.labelMarginTop=S.labelHeight):S.labelPosVertical=="center"&&S.labelHeight>B?(S.rect.y-=(S.labelHeight-B)/2,S.setHeight(S.labelHeight),S.labelMarginTop=(S.labelHeight-B)/2):S.labelPosVertical=="bottom"&&S.setHeight(B+S.labelHeight))}})},M.prototype.tileNodes=function(w,x){var T=this.tileNodesByFavoringDim(w,x,!0),A=this.tileNodesByFavoringDim(w,x,!1),S=this.getOrgRatio(T),I=this.getOrgRatio(A),B;return I<S?B=A:B=T,B},M.prototype.getOrgRatio=function(w){var x=w.width,T=w.height,A=x/T;return A<1&&(A=1/A),A},M.prototype.calcIdealRowWidth=function(w,x){var T=c.TILING_PADDING_VERTICAL,A=c.TILING_PADDING_HORIZONTAL,S=w.length,I=0,B=0,k=0;w.forEach(function(K){I+=K.getWidth(),B+=K.getHeight(),K.getWidth()>k&&(k=K.getWidth())});var z=I/S,F=B/S,V=Math.pow(T-A,2)+4*(z+A)*(F+T)*S,Z=(A-T+Math.sqrt(V))/(2*(z+A)),q;x?(q=Math.ceil(Z),q==Z&&q++):q=Math.floor(Z);var _=q*(z+A)-A;return k>_&&(_=k),_+=A*2,_},M.prototype.tileNodesByFavoringDim=function(w,x,T){var A=c.TILING_PADDING_VERTICAL,S=c.TILING_PADDING_HORIZONTAL,I=c.TILING_COMPARE_BY,B={rows:[],rowWidth:[],rowHeight:[],width:0,height:x,verticalPadding:A,horizontalPadding:S,centerX:0,centerY:0};I&&(B.idealRowWidth=this.calcIdealRowWidth(w,T));var k=function(U){return U.rect.width*U.rect.height},z=function(U,J){return k(J)-k(U)};w.sort(function(K,U){var J=z;return B.idealRowWidth?(J=I,J(K.id,U.id)):J(K,U)});for(var F=0,V=0,Z=0;Z<w.length;Z++){var q=w[Z];F+=q.getCenterX(),V+=q.getCenterY()}B.centerX=F/w.length,B.centerY=V/w.length;for(var Z=0;Z<w.length;Z++){var q=w[Z];if(B.rows.length==0)this.insertNodeToRow(B,q,0,x);else if(this.canAddHorizontal(B,q.rect.width,q.rect.height)){var _=B.rows.length-1;B.idealRowWidth||(_=this.getShortestRowIndex(B)),this.insertNodeToRow(B,q,_,x)}else this.insertNodeToRow(B,q,B.rows.length,x);this.shiftToLastRow(B)}return B},M.prototype.insertNodeToRow=function(w,x,T,A){var S=A;if(T==w.rows.length){var I=[];w.rows.push(I),w.rowWidth.push(S),w.rowHeight.push(0)}var B=w.rowWidth[T]+x.rect.width;w.rows[T].length>0&&(B+=w.horizontalPadding),w.rowWidth[T]=B,w.width<B&&(w.width=B);var k=x.rect.height;T>0&&(k+=w.verticalPadding);var z=0;k>w.rowHeight[T]&&(z=w.rowHeight[T],w.rowHeight[T]=k,z=w.rowHeight[T]-z),w.height+=z,w.rows[T].push(x)},M.prototype.getShortestRowIndex=function(w){for(var x=-1,T=Number.MAX_VALUE,A=0;A<w.rows.length;A++)w.rowWidth[A]<T&&(x=A,T=w.rowWidth[A]);return x},M.prototype.getLongestRowIndex=function(w){for(var x=-1,T=Number.MIN_VALUE,A=0;A<w.rows.length;A++)w.rowWidth[A]>T&&(x=A,T=w.rowWidth[A]);return x},M.prototype.canAddHorizontal=function(w,x,T){if(w.idealRowWidth){var A=w.rows.length-1,S=w.rowWidth[A];return S+x+w.horizontalPadding<=w.idealRowWidth}var I=this.getShortestRowIndex(w);if(I<0)return!0;var B=w.rowWidth[I];if(B+w.horizontalPadding+x<=w.width)return!0;var k=0;w.rowHeight[I]<T&&I>0&&(k=T+w.verticalPadding-w.rowHeight[I]);var z;w.width-B>=x+w.horizontalPadding?z=(w.height+k)/(B+x+w.horizontalPadding):z=(w.height+k)/w.width,k=T+w.verticalPadding;var F;return w.width<x?F=(w.height+k)/x:F=(w.height+k)/w.width,F<1&&(F=1/F),z<1&&(z=1/z),z<F},M.prototype.shiftToLastRow=function(w){var x=this.getLongestRowIndex(w),T=w.rowWidth.length-1,A=w.rows[x],S=A[A.length-1],I=S.width+w.horizontalPadding;if(w.width-w.rowWidth[T]>I&&x!=T){A.splice(-1,1),w.rows[T].push(S),w.rowWidth[x]=w.rowWidth[x]-I,w.rowWidth[T]=w.rowWidth[T]+I,w.width=w.rowWidth[instance.getLongestRowIndex(w)];for(var B=Number.MIN_VALUE,k=0;k<A.length;k++)A[k].height>B&&(B=A[k].height);x>0&&(B+=w.verticalPadding);var z=w.rowHeight[x]+w.rowHeight[T];w.rowHeight[x]=B,w.rowHeight[T]<S.height+w.verticalPadding&&(w.rowHeight[T]=S.height+w.verticalPadding);var F=w.rowHeight[x]+w.rowHeight[T];w.height+=F-z,this.shiftToLastRow(w)}},M.prototype.tilingPreLayout=function(){c.TILE&&(this.groupZeroDegreeMembers(),this.clearCompounds(),this.clearZeroDegreeMembers())},M.prototype.tilingPostLayout=function(){c.TILE&&(this.repopulateZeroDegreeMembers(),this.repopulateCompounds())},M.prototype.reduceTrees=function(){for(var w=[],x=!0,T;x;){var A=this.graphManager.getAllNodes(),S=[];x=!1;for(var I=0;I<A.length;I++)if(T=A[I],T.getEdges().length==1&&!T.getEdges()[0].isInterGraph&&T.getChild()==null){if(c.PURE_INCREMENTAL){var B=T.getEdges()[0].getOtherEnd(T),k=new b(T.getCenterX()-B.getCenterX(),T.getCenterY()-B.getCenterY());S.push([T,T.getEdges()[0],T.getOwner(),k])}else S.push([T,T.getEdges()[0],T.getOwner()]);x=!0}if(x==!0){for(var z=[],F=0;F<S.length;F++)S[F][0].getEdges().length==1&&(z.push(S[F]),S[F][0].getOwner().remove(S[F][0]));w.push(z),this.graphManager.resetAllNodes(),this.graphManager.resetAllEdges()}}this.prunedNodesAll=w},M.prototype.growTree=function(w){for(var x=w.length,T=w[x-1],A,S=0;S<T.length;S++)A=T[S],this.findPlaceforPrunedNode(A),A[2].add(A[0]),A[2].add(A[1],A[1].source,A[1].target);w.splice(w.length-1,1),this.graphManager.resetAllNodes(),this.graphManager.resetAllEdges()},M.prototype.findPlaceforPrunedNode=function(w){var x,T,A=w[0];if(A==w[1].source?T=w[1].target:T=w[1].source,c.PURE_INCREMENTAL)A.setCenter(T.getCenterX()+w[3].getWidth(),T.getCenterY()+w[3].getHeight());else{var S=T.startX,I=T.finishX,B=T.startY,k=T.finishY,z=0,F=0,V=0,Z=0,q=[z,V,F,Z];if(B>0)for(var _=S;_<=I;_++)q[0]+=this.grid[_][B-1].length+this.grid[_][B].length-1;if(I<this.grid.length-1)for(var _=B;_<=k;_++)q[1]+=this.grid[I+1][_].length+this.grid[I][_].length-1;if(k<this.grid[0].length-1)for(var _=S;_<=I;_++)q[2]+=this.grid[_][k+1].length+this.grid[_][k].length-1;if(S>0)for(var _=B;_<=k;_++)q[3]+=this.grid[S-1][_].length+this.grid[S][_].length-1;for(var K=C.MAX_VALUE,U,J,$=0;$<q.length;$++)q[$]<K?(K=q[$],U=1,J=$):q[$]==K&&U++;if(U==3&&K==0)q[0]==0&&q[1]==0&&q[2]==0?x=1:q[0]==0&&q[1]==0&&q[3]==0?x=0:q[0]==0&&q[2]==0&&q[3]==0?x=3:q[1]==0&&q[2]==0&&q[3]==0&&(x=2);else if(U==2&&K==0){var H=Math.floor(Math.random()*2);q[0]==0&&q[1]==0?H==0?x=0:x=1:q[0]==0&&q[2]==0?H==0?x=0:x=2:q[0]==0&&q[3]==0?H==0?x=0:x=3:q[1]==0&&q[2]==0?H==0?x=1:x=2:q[1]==0&&q[3]==0?H==0?x=1:x=3:H==0?x=2:x=3}else if(U==4&&K==0){var H=Math.floor(Math.random()*4);x=H}else x=J;x==0?A.setCenter(T.getCenterX(),T.getCenterY()-T.getHeight()/2-g.DEFAULT_EDGE_LENGTH-A.getHeight()/2):x==1?A.setCenter(T.getCenterX()+T.getWidth()/2+g.DEFAULT_EDGE_LENGTH+A.getWidth()/2,T.getCenterY()):x==2?A.setCenter(T.getCenterX(),T.getCenterY()+T.getHeight()/2+g.DEFAULT_EDGE_LENGTH+A.getHeight()/2):A.setCenter(T.getCenterX()-T.getWidth()/2-g.DEFAULT_EDGE_LENGTH-A.getWidth()/2,T.getCenterY())}},i.exports=M}),991:((i,o,s)=>{var l=s(551).FDLayoutNode,u=s(551).IMath;function f(h,c,d,g){l.call(this,h,c,d,g)}f.prototype=Object.create(l.prototype);for(var v in l)f[v]=l[v];f.prototype.calculateDisplacement=function(){var h=this.graphManager.getLayout();this.getChild()!=null&&this.fixedNodeWeight?(this.displacementX+=h.coolingFactor*(this.springForceX+this.repulsionForceX+this.gravitationForceX)/this.fixedNodeWeight,this.displacementY+=h.coolingFactor*(this.springForceY+this.repulsionForceY+this.gravitationForceY)/this.fixedNodeWeight):(this.displacementX+=h.coolingFactor*(this.springForceX+this.repulsionForceX+this.gravitationForceX)/this.noOfChildren,this.displacementY+=h.coolingFactor*(this.springForceY+this.repulsionForceY+this.gravitationForceY)/this.noOfChildren),Math.abs(this.displacementX)>h.coolingFactor*h.maxNodeDisplacement&&(this.displacementX=h.coolingFactor*h.maxNodeDisplacement*u.sign(this.displacementX)),Math.abs(this.displacementY)>h.coolingFactor*h.maxNodeDisplacement&&(this.displacementY=h.coolingFactor*h.maxNodeDisplacement*u.sign(this.displacementY)),this.child&&this.child.getNodes().length>0&&this.propogateDisplacementToChildren(this.displacementX,this.displacementY)},f.prototype.propogateDisplacementToChildren=function(h,c){for(var d=this.getChild().getNodes(),g,y=0;y<d.length;y++)g=d[y],g.getChild()==null?(g.displacementX+=h,g.displacementY+=c):g.propogateDisplacementToChildren(h,c)},f.prototype.move=function(){var h=this.graphManager.getLayout();(this.child==null||this.child.getNodes().length==0)&&(this.moveBy(this.displacementX,this.displacementY),h.totalDisplacement+=Math.abs(this.displacementX)+Math.abs(this.displacementY)),this.springForceX=0,this.springForceY=0,this.repulsionForceX=0,this.repulsionForceY=0,this.gravitationForceX=0,this.gravitationForceY=0,this.displacementX=0,this.displacementY=0},f.prototype.setPred1=function(h){this.pred1=h},f.prototype.getPred1=function(){return pred1},f.prototype.getPred2=function(){return pred2},f.prototype.setNext=function(h){this.next=h},f.prototype.getNext=function(){return next},f.prototype.setProcessed=function(h){this.processed=h},f.prototype.isProcessed=function(){return processed},i.exports=f}),902:((i,o,s)=>{function l(d){if(Array.isArray(d)){for(var g=0,y=Array(d.length);g<d.length;g++)y[g]=d[g];return y}else return Array.from(d)}var u=s(806),f=s(551).LinkedList,v=s(551).Matrix,h=s(551).SVD;function c(){}c.handleConstraints=function(d){var g={};g.fixedNodeConstraint=d.constraints.fixedNodeConstraint,g.alignmentConstraint=d.constraints.alignmentConstraint,g.relativePlacementConstraint=d.constraints.relativePlacementConstraint;for(var y=new Map,p=new Map,m=[],b=[],E=d.getAllNodes(),C=0,L=0;L<E.length;L++){var D=E[L];D.getChild()==null&&(p.set(D.id,C++),m.push(D.getCenterX()),b.push(D.getCenterY()),y.set(D.id,D))}g.relativePlacementConstraint&&g.relativePlacementConstraint.forEach(function(ne){!ne.gap&&ne.gap!=0&&(ne.left?ne.gap=u.DEFAULT_EDGE_LENGTH+y.get(ne.left).getWidth()/2+y.get(ne.right).getWidth()/2:ne.gap=u.DEFAULT_EDGE_LENGTH+y.get(ne.top).getHeight()/2+y.get(ne.bottom).getHeight()/2)});var R=function(ae,W){return{x:ae.x-W.x,y:ae.y-W.y}},O=function(ae){var W=0,N=0;return ae.forEach(function(G){W+=m[p.get(G)],N+=b[p.get(G)]}),{x:W/ae.size,y:N/ae.size}},M=function(ae,W,N,G,X){function j(ge,ue){var we=new Set(ge),pe=!0,Ce=!1,ze=void 0;try{for(var Ve=ue[Symbol.iterator](),He;!(pe=(He=Ve.next()).done);pe=!0){var Fe=He.value;we.add(Fe)}}catch(Re){Ce=!0,ze=Re}finally{try{!pe&&Ve.return&&Ve.return()}finally{if(Ce)throw ze}}return we}var ee=new Map;ae.forEach(function(ge,ue){ee.set(ue,0)}),ae.forEach(function(ge,ue){ge.forEach(function(we){ee.set(we.id,ee.get(we.id)+1)})});var ie=new Map,re=new Map,ve=new f;ee.forEach(function(ge,ue){ge==0?(ve.push(ue),N||(W=="horizontal"?ie.set(ue,p.has(ue)?m[p.get(ue)]:G.get(ue)):ie.set(ue,p.has(ue)?b[p.get(ue)]:G.get(ue)))):ie.set(ue,Number.NEGATIVE_INFINITY),N&&re.set(ue,new Set([ue]))}),N&&X.forEach(function(ge){var ue=[];if(ge.forEach(function(Ce){N.has(Ce)&&ue.push(Ce)}),ue.length>0){var we=0;ue.forEach(function(Ce){W=="horizontal"?(ie.set(Ce,p.has(Ce)?m[p.get(Ce)]:G.get(Ce)),we+=ie.get(Ce)):(ie.set(Ce,p.has(Ce)?b[p.get(Ce)]:G.get(Ce)),we+=ie.get(Ce))}),we=we/ue.length,ge.forEach(function(Ce){N.has(Ce)||ie.set(Ce,we)})}else{var pe=0;ge.forEach(function(Ce){W=="horizontal"?pe+=p.has(Ce)?m[p.get(Ce)]:G.get(Ce):pe+=p.has(Ce)?b[p.get(Ce)]:G.get(Ce)}),pe=pe/ge.length,ge.forEach(function(Ce){ie.set(Ce,pe)})}});for(var se=function(){var ue=ve.shift(),we=ae.get(ue);we.forEach(function(pe){if(ie.get(pe.id)<ie.get(ue)+pe.gap)if(N&&N.has(pe.id)){var Ce=void 0;if(W=="horizontal"?Ce=p.has(pe.id)?m[p.get(pe.id)]:G.get(pe.id):Ce=p.has(pe.id)?b[p.get(pe.id)]:G.get(pe.id),ie.set(pe.id,Ce),Ce<ie.get(ue)+pe.gap){var ze=ie.get(ue)+pe.gap-Ce;re.get(ue).forEach(function(Ve){ie.set(Ve,ie.get(Ve)-ze)})}}else ie.set(pe.id,ie.get(ue)+pe.gap);ee.set(pe.id,ee.get(pe.id)-1),ee.get(pe.id)==0&&ve.push(pe.id),N&&re.set(pe.id,j(re.get(ue),re.get(pe.id)))})};ve.length!=0;)se();if(N){var de=new Set;ae.forEach(function(ge,ue){ge.length==0&&de.add(ue)});var Se=[];re.forEach(function(ge,ue){if(de.has(ue)){var we=!1,pe=!0,Ce=!1,ze=void 0;try{for(var Ve=ge[Symbol.iterator](),He;!(pe=(He=Ve.next()).done);pe=!0){var Fe=He.value;N.has(Fe)&&(we=!0)}}catch(We){Ce=!0,ze=We}finally{try{!pe&&Ve.return&&Ve.return()}finally{if(Ce)throw ze}}if(!we){var Re=!1,Ze=void 0;Se.forEach(function(We,Ue){We.has([].concat(l(ge))[0])&&(Re=!0,Ze=Ue)}),Re?ge.forEach(function(We){Se[Ze].add(We)}):Se.push(new Set(ge))}}}),Se.forEach(function(ge,ue){var we=Number.POSITIVE_INFINITY,pe=Number.POSITIVE_INFINITY,Ce=Number.NEGATIVE_INFINITY,ze=Number.NEGATIVE_INFINITY,Ve=!0,He=!1,Fe=void 0;try{for(var Re=ge[Symbol.iterator](),Ze;!(Ve=(Ze=Re.next()).done);Ve=!0){var We=Ze.value,Ue=void 0;W=="horizontal"?Ue=p.has(We)?m[p.get(We)]:G.get(We):Ue=p.has(We)?b[p.get(We)]:G.get(We);var nt=ie.get(We);Ue<we&&(we=Ue),Ue>Ce&&(Ce=Ue),nt<pe&&(pe=nt),nt>ze&&(ze=nt)}}catch(zt){He=!0,Fe=zt}finally{try{!Ve&&Re.return&&Re.return()}finally{if(He)throw Fe}}var Ft=(we+Ce)/2-(pe+ze)/2,Rt=!0,Ht=!1,Nt=void 0;try{for(var it=ge[Symbol.iterator](),st;!(Rt=(st=it.next()).done);Rt=!0){var ut=st.value;ie.set(ut,ie.get(ut)+Ft)}}catch(zt){Ht=!0,Nt=zt}finally{try{!Rt&&it.return&&it.return()}finally{if(Ht)throw Nt}}})}return ie},P=function(ae){var W=0,N=0,G=0,X=0;if(ae.forEach(function(re){re.left?m[p.get(re.left)]-m[p.get(re.right)]>=0?W++:N++:b[p.get(re.top)]-b[p.get(re.bottom)]>=0?G++:X++}),W>N&&G>X)for(var j=0;j<p.size;j++)m[j]=-1*m[j],b[j]=-1*b[j];else if(W>N)for(var ee=0;ee<p.size;ee++)m[ee]=-1*m[ee];else if(G>X)for(var ie=0;ie<p.size;ie++)b[ie]=-1*b[ie]},w=function(ae){var W=[],N=new f,G=new Set,X=0;return ae.forEach(function(j,ee){if(!G.has(ee)){W[X]=[];var ie=ee;for(N.push(ie),G.add(ie),W[X].push(ie);N.length!=0;){ie=N.shift();var re=ae.get(ie);re.forEach(function(ve){G.has(ve.id)||(N.push(ve.id),G.add(ve.id),W[X].push(ve.id))})}X++}}),W},x=function(ae){var W=new Map;return ae.forEach(function(N,G){W.set(G,[])}),ae.forEach(function(N,G){N.forEach(function(X){W.get(G).push(X),W.get(X.id).push({id:G,gap:X.gap,direction:X.direction})})}),W},T=function(ae){var W=new Map;return ae.forEach(function(N,G){W.set(G,[])}),ae.forEach(function(N,G){N.forEach(function(X){W.get(X.id).push({id:G,gap:X.gap,direction:X.direction})})}),W},A=[],S=[],I=!1,B=!1,k=new Set,z=new Map,F=new Map,V=[];if(g.fixedNodeConstraint&&g.fixedNodeConstraint.forEach(function(ne){k.add(ne.nodeId)}),g.relativePlacementConstraint&&(g.relativePlacementConstraint.forEach(function(ne){ne.left?(z.has(ne.left)?z.get(ne.left).push({id:ne.right,gap:ne.gap,direction:"horizontal"}):z.set(ne.left,[{id:ne.right,gap:ne.gap,direction:"horizontal"}]),z.has(ne.right)||z.set(ne.right,[])):(z.has(ne.top)?z.get(ne.top).push({id:ne.bottom,gap:ne.gap,direction:"vertical"}):z.set(ne.top,[{id:ne.bottom,gap:ne.gap,direction:"vertical"}]),z.has(ne.bottom)||z.set(ne.bottom,[]))}),F=x(z),V=w(F)),u.TRANSFORM_ON_CONSTRAINT_HANDLING){if(g.fixedNodeConstraint&&g.fixedNodeConstraint.length>1)g.fixedNodeConstraint.forEach(function(ne,ae){A[ae]=[ne.position.x,ne.position.y],S[ae]=[m[p.get(ne.nodeId)],b[p.get(ne.nodeId)]]}),I=!0;else if(g.alignmentConstraint)(function(){var ne=0;if(g.alignmentConstraint.vertical){for(var ae=g.alignmentConstraint.vertical,W=function(ie){var re=new Set;ae[ie].forEach(function(de){re.add(de)});var ve=new Set([].concat(l(re)).filter(function(de){return k.has(de)})),se=void 0;ve.size>0?se=m[p.get(ve.values().next().value)]:se=O(re).x,ae[ie].forEach(function(de){A[ne]=[se,b[p.get(de)]],S[ne]=[m[p.get(de)],b[p.get(de)]],ne++})},N=0;N<ae.length;N++)W(N);I=!0}if(g.alignmentConstraint.horizontal){for(var G=g.alignmentConstraint.horizontal,X=function(ie){var re=new Set;G[ie].forEach(function(de){re.add(de)});var ve=new Set([].concat(l(re)).filter(function(de){return k.has(de)})),se=void 0;ve.size>0?se=m[p.get(ve.values().next().value)]:se=O(re).y,G[ie].forEach(function(de){A[ne]=[m[p.get(de)],se],S[ne]=[m[p.get(de)],b[p.get(de)]],ne++})},j=0;j<G.length;j++)X(j);I=!0}g.relativePlacementConstraint&&(B=!0)})();else if(g.relativePlacementConstraint){for(var Z=0,q=0,_=0;_<V.length;_++)V[_].length>Z&&(Z=V[_].length,q=_);if(Z<F.size/2)P(g.relativePlacementConstraint),I=!1,B=!1;else{var K=new Map,U=new Map,J=[];V[q].forEach(function(ne){z.get(ne).forEach(function(ae){ae.direction=="horizontal"?(K.has(ne)?K.get(ne).push(ae):K.set(ne,[ae]),K.has(ae.id)||K.set(ae.id,[]),J.push({left:ne,right:ae.id})):(U.has(ne)?U.get(ne).push(ae):U.set(ne,[ae]),U.has(ae.id)||U.set(ae.id,[]),J.push({top:ne,bottom:ae.id}))})}),P(J),B=!1;var $=M(K,"horizontal"),H=M(U,"vertical");V[q].forEach(function(ne,ae){S[ae]=[m[p.get(ne)],b[p.get(ne)]],A[ae]=[],$.has(ne)?A[ae][0]=$.get(ne):A[ae][0]=m[p.get(ne)],H.has(ne)?A[ae][1]=H.get(ne):A[ae][1]=b[p.get(ne)]}),I=!0}}if(I){for(var Y=void 0,Q=v.transpose(A),oe=v.transpose(S),te=0;te<Q.length;te++)Q[te]=v.multGamma(Q[te]),oe[te]=v.multGamma(oe[te]);var Te=v.multMat(Q,v.transpose(oe)),Le=h.svd(Te);Y=v.multMat(Le.V,v.transpose(Le.U));for(var he=0;he<p.size;he++){var le=[m[he],b[he]],ce=[Y[0][0],Y[1][0]],fe=[Y[0][1],Y[1][1]];m[he]=v.dotProduct(le,ce),b[he]=v.dotProduct(le,fe)}B&&P(g.relativePlacementConstraint)}}if(u.ENFORCE_CONSTRAINTS){if(g.fixedNodeConstraint&&g.fixedNodeConstraint.length>0){var ye={x:0,y:0};g.fixedNodeConstraint.forEach(function(ne,ae){var W={x:m[p.get(ne.nodeId)],y:b[p.get(ne.nodeId)]},N=ne.position,G=R(N,W);ye.x+=G.x,ye.y+=G.y}),ye.x/=g.fixedNodeConstraint.length,ye.y/=g.fixedNodeConstraint.length,m.forEach(function(ne,ae){m[ae]+=ye.x}),b.forEach(function(ne,ae){b[ae]+=ye.y}),g.fixedNodeConstraint.forEach(function(ne){m[p.get(ne.nodeId)]=ne.position.x,b[p.get(ne.nodeId)]=ne.position.y})}if(g.alignmentConstraint){if(g.alignmentConstraint.vertical)for(var me=g.alignmentConstraint.vertical,Ee=function(ae){var W=new Set;me[ae].forEach(function(X){W.add(X)});var N=new Set([].concat(l(W)).filter(function(X){return k.has(X)})),G=void 0;N.size>0?G=m[p.get(N.values().next().value)]:G=O(W).x,W.forEach(function(X){k.has(X)||(m[p.get(X)]=G)})},be=0;be<me.length;be++)Ee(be);if(g.alignmentConstraint.horizontal)for(var Ae=g.alignmentConstraint.horizontal,Ie=function(ae){var W=new Set;Ae[ae].forEach(function(X){W.add(X)});var N=new Set([].concat(l(W)).filter(function(X){return k.has(X)})),G=void 0;N.size>0?G=b[p.get(N.values().next().value)]:G=O(W).y,W.forEach(function(X){k.has(X)||(b[p.get(X)]=G)})},Oe=0;Oe<Ae.length;Oe++)Ie(Oe)}g.relativePlacementConstraint&&(function(){var ne=new Map,ae=new Map,W=new Map,N=new Map,G=new Map,X=new Map,j=new Set,ee=new Set;if(k.forEach(function(lt){j.add(lt),ee.add(lt)}),g.alignmentConstraint){if(g.alignmentConstraint.vertical)for(var ie=g.alignmentConstraint.vertical,re=function(ke){W.set("dummy"+ke,[]),ie[ke].forEach(function(Xe){ne.set(Xe,"dummy"+ke),W.get("dummy"+ke).push(Xe),k.has(Xe)&&j.add("dummy"+ke)}),G.set("dummy"+ke,m[p.get(ie[ke][0])])},ve=0;ve<ie.length;ve++)re(ve);if(g.alignmentConstraint.horizontal)for(var se=g.alignmentConstraint.horizontal,de=function(ke){N.set("dummy"+ke,[]),se[ke].forEach(function(Xe){ae.set(Xe,"dummy"+ke),N.get("dummy"+ke).push(Xe),k.has(Xe)&&ee.add("dummy"+ke)}),X.set("dummy"+ke,b[p.get(se[ke][0])])},Se=0;Se<se.length;Se++)de(Se)}var ge=new Map,ue=new Map,we=function(ke){z.get(ke).forEach(function(Xe){var qt=void 0,Pt=void 0;Xe.direction=="horizontal"?(qt=ne.get(ke)?ne.get(ke):ke,ne.get(Xe.id)?Pt={id:ne.get(Xe.id),gap:Xe.gap,direction:Xe.direction}:Pt=Xe,ge.has(qt)?ge.get(qt).push(Pt):ge.set(qt,[Pt]),ge.has(Pt.id)||ge.set(Pt.id,[])):(qt=ae.get(ke)?ae.get(ke):ke,ae.get(Xe.id)?Pt={id:ae.get(Xe.id),gap:Xe.gap,direction:Xe.direction}:Pt=Xe,ue.has(qt)?ue.get(qt).push(Pt):ue.set(qt,[Pt]),ue.has(Pt.id)||ue.set(Pt.id,[]))})},pe=!0,Ce=!1,ze=void 0;try{for(var Ve=z.keys()[Symbol.iterator](),He;!(pe=(He=Ve.next()).done);pe=!0){var Fe=He.value;we(Fe)}}catch(lt){Ce=!0,ze=lt}finally{try{!pe&&Ve.return&&Ve.return()}finally{if(Ce)throw ze}}var Re=x(ge),Ze=x(ue),We=w(Re),Ue=w(Ze),nt=T(ge),Ft=T(ue),Rt=[],Ht=[];We.forEach(function(lt,ke){Rt[ke]=[],lt.forEach(function(Xe){nt.get(Xe).length==0&&Rt[ke].push(Xe)})}),Ue.forEach(function(lt,ke){Ht[ke]=[],lt.forEach(function(Xe){Ft.get(Xe).length==0&&Ht[ke].push(Xe)})});var Nt=M(ge,"horizontal",j,G,Rt),it=M(ue,"vertical",ee,X,Ht),st=function(ke){W.get(ke)?W.get(ke).forEach(function(Xe){m[p.get(Xe)]=Nt.get(ke)}):m[p.get(ke)]=Nt.get(ke)},ut=!0,zt=!1,Dt=void 0;try{for(var Wr=Nt.keys()[Symbol.iterator](),nn;!(ut=(nn=Wr.next()).done);ut=!0){var pa=nn.value;st(pa)}}catch(lt){zt=!0,Dt=lt}finally{try{!ut&&Wr.return&&Wr.return()}finally{if(zt)throw Dt}}var fi=function(ke){N.get(ke)?N.get(ke).forEach(function(Xe){b[p.get(Xe)]=it.get(ke)}):b[p.get(ke)]=it.get(ke)},ya=!0,on=!1,sn=void 0;try{for(var ma=it.keys()[Symbol.iterator](),fr;!(ya=(fr=ma.next()).done);ya=!0){var pa=fr.value;fi(pa)}}catch(lt){on=!0,sn=lt}finally{try{!ya&&ma.return&&ma.return()}finally{if(on)throw sn}}})()}for(var Be=0;Be<E.length;Be++){var Pe=E[Be];Pe.getChild()==null&&Pe.setCenter(m[p.get(Pe.id)],b[p.get(Pe.id)])}},i.exports=c}),551:(i=>{i.exports=t})},r={};function a(i){var o=r[i];if(o!==void 0)return o.exports;var s=r[i]={exports:{}};return e[i](s,s.exports,a),s.exports}var n=a(45);return n})()})});var uh=hi((an,Vs)=>{(function(e,r){typeof an=="object"&&typeof Vs=="object"?Vs.exports=r(zs()):typeof define=="function"&&define.amd?define(["cose-base"],r):typeof an=="object"?an.cytoscapeFcose=r(zs()):e.cytoscapeFcose=r(e.coseBase)})(an,function(t){return(()=>{"use strict";var e={658:(i=>{i.exports=Object.assign!=null?Object.assign.bind(Object):function(o){for(var s=arguments.length,l=Array(s>1?s-1:0),u=1;u<s;u++)l[u-1]=arguments[u];return l.forEach(function(f){Object.keys(f).forEach(function(v){return o[v]=f[v]})}),o}}),548:((i,o,s)=>{var l=(function(){function v(h,c){var d=[],g=!0,y=!1,p=void 0;try{for(var m=h[Symbol.iterator](),b;!(g=(b=m.next()).done)&&(d.push(b.value),!(c&&d.length===c));g=!0);}catch(E){y=!0,p=E}finally{try{!g&&m.return&&m.return()}finally{if(y)throw p}}return d}return function(h,c){if(Array.isArray(h))return h;if(Symbol.iterator in Object(h))return v(h,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}})(),u=s(140).layoutBase.LinkedList,f={};f.getTopMostNodes=function(v){for(var h={},c=0;c<v.length;c++)h[v[c].id()]=!0;var d=v.filter(function(g,y){typeof g=="number"&&(g=y);for(var p=g.parent()[0];p!=null;){if(h[p.id()])return!1;p=p.parent()[0]}return!0});return d},f.connectComponents=function(v,h,c,d){var g=new u,y=new Set,p=[],m=void 0,b=void 0,E=void 0,C=!1,L=1,D=[],R=[],O=function(){var P=v.collection();R.push(P);var w=c[0],x=v.collection();x.merge(w).merge(w.descendants().intersection(h)),p.push(w),x.forEach(function(S){g.push(S),y.add(S),P.merge(S)});for(var T=function(){w=g.shift();var I=v.collection();w.neighborhood().nodes().forEach(function(F){h.intersection(w.edgesWith(F)).length>0&&I.merge(F)});for(var B=0;B<I.length;B++){var k=I[B];if(m=c.intersection(k.union(k.ancestors())),m!=null&&!y.has(m[0])){var z=m.union(m.descendants());z.forEach(function(F){g.push(F),y.add(F),P.merge(F),c.has(F)&&p.push(F)})}}};g.length!=0;)T();if(P.forEach(function(S){h.intersection(S.connectedEdges()).forEach(function(I){P.has(I.source())&&P.has(I.target())&&P.merge(I)})}),p.length==c.length&&(C=!0),!C||C&&L>1){b=p[0],E=b.connectedEdges().length,p.forEach(function(S){S.connectedEdges().length<E&&(E=S.connectedEdges().length,b=S)}),D.push(b.id());var A=v.collection();A.merge(p[0]),p.forEach(function(S){A.merge(S)}),p=[],c=c.difference(A),L++}};do O();while(!C);return d&&D.length>0&&d.set("dummy"+(d.size+1),D),R},f.relocateComponent=function(v,h,c){if(!c.fixedNodeConstraint){var d=Number.POSITIVE_INFINITY,g=Number.NEGATIVE_INFINITY,y=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY;if(c.quality=="draft"){var m=!0,b=!1,E=void 0;try{for(var C=h.nodeIndexes[Symbol.iterator](),L;!(m=(L=C.next()).done);m=!0){var D=L.value,R=l(D,2),O=R[0],M=R[1],P=c.cy.getElementById(O);if(P){var w=P.boundingBox(),x=h.xCoords[M]-w.w/2,T=h.xCoords[M]+w.w/2,A=h.yCoords[M]-w.h/2,S=h.yCoords[M]+w.h/2;x<d&&(d=x),T>g&&(g=T),A<y&&(y=A),S>p&&(p=S)}}}catch(F){b=!0,E=F}finally{try{!m&&C.return&&C.return()}finally{if(b)throw E}}var I=v.x-(g+d)/2,B=v.y-(p+y)/2;h.xCoords=h.xCoords.map(function(F){return F+I}),h.yCoords=h.yCoords.map(function(F){return F+B})}else{Object.keys(h).forEach(function(F){var V=h[F],Z=V.getRect().x,q=V.getRect().x+V.getRect().width,_=V.getRect().y,K=V.getRect().y+V.getRect().height;Z<d&&(d=Z),q>g&&(g=q),_<y&&(y=_),K>p&&(p=K)});var k=v.x-(g+d)/2,z=v.y-(p+y)/2;Object.keys(h).forEach(function(F){var V=h[F];V.setCenter(V.getCenterX()+k,V.getCenterY()+z)})}}},f.calcBoundingBox=function(v,h,c,d){for(var g=Number.MAX_SAFE_INTEGER,y=Number.MIN_SAFE_INTEGER,p=Number.MAX_SAFE_INTEGER,m=Number.MIN_SAFE_INTEGER,b=void 0,E=void 0,C=void 0,L=void 0,D=v.descendants().not(":parent"),R=D.length,O=0;O<R;O++){var M=D[O];b=h[d.get(M.id())]-M.width()/2,E=h[d.get(M.id())]+M.width()/2,C=c[d.get(M.id())]-M.height()/2,L=c[d.get(M.id())]+M.height()/2,g>b&&(g=b),y<E&&(y=E),p>C&&(p=C),m<L&&(m=L)}var P={};return P.topLeftX=g,P.topLeftY=p,P.width=y-g,P.height=m-p,P},f.calcParentsWithoutChildren=function(v,h){var c=v.collection();return h.nodes(":parent").forEach(function(d){var g=!1;d.children().forEach(function(y){y.css("display")!="none"&&(g=!0)}),g||c.merge(d)}),c},i.exports=f}),816:((i,o,s)=>{var l=s(548),u=s(140).CoSELayout,f=s(140).CoSENode,v=s(140).layoutBase.PointD,h=s(140).layoutBase.DimensionD,c=s(140).layoutBase.LayoutConstants,d=s(140).layoutBase.FDLayoutConstants,g=s(140).CoSEConstants,y=function(m,b){var E=m.cy,C=m.eles,L=C.nodes(),D=C.edges(),R=void 0,O=void 0,M=void 0,P={};m.randomize&&(R=b.nodeIndexes,O=b.xCoords,M=b.yCoords);var w=function(F){return typeof F=="function"},x=function(F,V){return w(F)?F(V):F},T=l.calcParentsWithoutChildren(E,C),A=function z(F,V,Z,q){for(var _=V.length,K=0;K<_;K++){var U=V[K],J=null;U.intersection(T).length==0&&(J=U.children());var $=void 0,H=U.layoutDimensions({nodeDimensionsIncludeLabels:q.nodeDimensionsIncludeLabels});if(U.outerWidth()!=null&&U.outerHeight()!=null)if(q.randomize)if(!U.isParent())$=F.add(new f(Z.graphManager,new v(O[R.get(U.id())]-H.w/2,M[R.get(U.id())]-H.h/2),new h(parseFloat(H.w),parseFloat(H.h))));else{var Y=l.calcBoundingBox(U,O,M,R);U.intersection(T).length==0?$=F.add(new f(Z.graphManager,new v(Y.topLeftX,Y.topLeftY),new h(Y.width,Y.height))):$=F.add(new f(Z.graphManager,new v(Y.topLeftX,Y.topLeftY),new h(parseFloat(H.w),parseFloat(H.h))))}else $=F.add(new f(Z.graphManager,new v(U.position("x")-H.w/2,U.position("y")-H.h/2),new h(parseFloat(H.w),parseFloat(H.h))));else $=F.add(new f(this.graphManager));if($.id=U.data("id"),$.nodeRepulsion=x(q.nodeRepulsion,U),$.paddingLeft=parseInt(U.css("padding")),$.paddingTop=parseInt(U.css("padding")),$.paddingRight=parseInt(U.css("padding")),$.paddingBottom=parseInt(U.css("padding")),q.nodeDimensionsIncludeLabels&&($.labelWidth=U.boundingBox({includeLabels:!0,includeNodes:!1,includeOverlays:!1}).w,$.labelHeight=U.boundingBox({includeLabels:!0,includeNodes:!1,includeOverlays:!1}).h,$.labelPosVertical=U.css("text-valign"),$.labelPosHorizontal=U.css("text-halign")),P[U.data("id")]=$,isNaN($.rect.x)&&($.rect.x=0),isNaN($.rect.y)&&($.rect.y=0),J!=null&&J.length>0){var Q=void 0;Q=Z.getGraphManager().add(Z.newGraph(),$),z(Q,J,Z,q)}}},S=function(F,V,Z){for(var q=0,_=0,K=0;K<Z.length;K++){var U=Z[K],J=P[U.data("source")],$=P[U.data("target")];if(J&&$&&J!==$&&J.getEdgesBetween($).length==0){var H=V.add(F.newEdge(),J,$);H.id=U.id(),H.idealLength=x(m.idealEdgeLength,U),H.edgeElasticity=x(m.edgeElasticity,U),q+=H.idealLength,_++}}m.idealEdgeLength!=null&&(_>0?g.DEFAULT_EDGE_LENGTH=d.DEFAULT_EDGE_LENGTH=q/_:w(m.idealEdgeLength)?g.DEFAULT_EDGE_LENGTH=d.DEFAULT_EDGE_LENGTH=50:g.DEFAULT_EDGE_LENGTH=d.DEFAULT_EDGE_LENGTH=m.idealEdgeLength,g.MIN_REPULSION_DIST=d.MIN_REPULSION_DIST=d.DEFAULT_EDGE_LENGTH/10,g.DEFAULT_RADIAL_SEPARATION=d.DEFAULT_EDGE_LENGTH)},I=function(F,V){V.fixedNodeConstraint&&(F.constraints.fixedNodeConstraint=V.fixedNodeConstraint),V.alignmentConstraint&&(F.constraints.alignmentConstraint=V.alignmentConstraint),V.relativePlacementConstraint&&(F.constraints.relativePlacementConstraint=V.relativePlacementConstraint)};m.nestingFactor!=null&&(g.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR=d.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR=m.nestingFactor),m.gravity!=null&&(g.DEFAULT_GRAVITY_STRENGTH=d.DEFAULT_GRAVITY_STRENGTH=m.gravity),m.numIter!=null&&(g.MAX_ITERATIONS=d.MAX_ITERATIONS=m.numIter),m.gravityRange!=null&&(g.DEFAULT_GRAVITY_RANGE_FACTOR=d.DEFAULT_GRAVITY_RANGE_FACTOR=m.gravityRange),m.gravityCompound!=null&&(g.DEFAULT_COMPOUND_GRAVITY_STRENGTH=d.DEFAULT_COMPOUND_GRAVITY_STRENGTH=m.gravityCompound),m.gravityRangeCompound!=null&&(g.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR=d.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR=m.gravityRangeCompound),m.initialEnergyOnIncremental!=null&&(g.DEFAULT_COOLING_FACTOR_INCREMENTAL=d.DEFAULT_COOLING_FACTOR_INCREMENTAL=m.initialEnergyOnIncremental),m.tilingCompareBy!=null&&(g.TILING_COMPARE_BY=m.tilingCompareBy),m.quality=="proof"?c.QUALITY=2:c.QUALITY=0,g.NODE_DIMENSIONS_INCLUDE_LABELS=d.NODE_DIMENSIONS_INCLUDE_LABELS=c.NODE_DIMENSIONS_INCLUDE_LABELS=m.nodeDimensionsIncludeLabels,g.DEFAULT_INCREMENTAL=d.DEFAULT_INCREMENTAL=c.DEFAULT_INCREMENTAL=!m.randomize,g.ANIMATE=d.ANIMATE=c.ANIMATE=m.animate,g.TILE=m.tile,g.TILING_PADDING_VERTICAL=typeof m.tilingPaddingVertical=="function"?m.tilingPaddingVertical.call():m.tilingPaddingVertical,g.TILING_PADDING_HORIZONTAL=typeof m.tilingPaddingHorizontal=="function"?m.tilingPaddingHorizontal.call():m.tilingPaddingHorizontal,g.DEFAULT_INCREMENTAL=d.DEFAULT_INCREMENTAL=c.DEFAULT_INCREMENTAL=!0,g.PURE_INCREMENTAL=!m.randomize,c.DEFAULT_UNIFORM_LEAF_NODE_SIZES=m.uniformNodeDimensions,m.step=="transformed"&&(g.TRANSFORM_ON_CONSTRAINT_HANDLING=!0,g.ENFORCE_CONSTRAINTS=!1,g.APPLY_LAYOUT=!1),m.step=="enforced"&&(g.TRANSFORM_ON_CONSTRAINT_HANDLING=!1,g.ENFORCE_CONSTRAINTS=!0,g.APPLY_LAYOUT=!1),m.step=="cose"&&(g.TRANSFORM_ON_CONSTRAINT_HANDLING=!1,g.ENFORCE_CONSTRAINTS=!1,g.APPLY_LAYOUT=!0),m.step=="all"&&(m.randomize?g.TRANSFORM_ON_CONSTRAINT_HANDLING=!0:g.TRANSFORM_ON_CONSTRAINT_HANDLING=!1,g.ENFORCE_CONSTRAINTS=!0,g.APPLY_LAYOUT=!0),m.fixedNodeConstraint||m.alignmentConstraint||m.relativePlacementConstraint?g.TREE_REDUCTION_ON_INCREMENTAL=!1:g.TREE_REDUCTION_ON_INCREMENTAL=!0;var B=new u,k=B.newGraphManager();return A(k.addRoot(),l.getTopMostNodes(L),B,m),S(B,k,D),I(B,m),B.runLayout(),P};i.exports={coseLayout:y}}),212:((i,o,s)=>{var l=(function(){function m(b,E){for(var C=0;C<E.length;C++){var L=E[C];L.enumerable=L.enumerable||!1,L.configurable=!0,"value"in L&&(L.writable=!0),Object.defineProperty(b,L.key,L)}}return function(b,E,C){return E&&m(b.prototype,E),C&&m(b,C),b}})();function u(m,b){if(!(m instanceof b))throw new TypeError("Cannot call a class as a function")}var f=s(658),v=s(548),h=s(657),c=h.spectralLayout,d=s(816),g=d.coseLayout,y=Object.freeze({quality:"default",randomize:!0,animate:!0,animationDuration:1e3,animationEasing:void 0,fit:!0,padding:30,nodeDimensionsIncludeLabels:!1,uniformNodeDimensions:!1,packComponents:!0,step:"all",samplingType:!0,sampleSize:25,nodeSeparation:75,piTol:1e-7,nodeRepulsion:function(b){return 4500},idealEdgeLength:function(b){return 50},edgeElasticity:function(b){return .45},nestingFactor:.1,gravity:.25,numIter:2500,tile:!0,tilingCompareBy:void 0,tilingPaddingVertical:10,tilingPaddingHorizontal:10,gravityRangeCompound:1.5,gravityCompound:1,gravityRange:3.8,initialEnergyOnIncremental:.3,fixedNodeConstraint:void 0,alignmentConstraint:void 0,relativePlacementConstraint:void 0,ready:function(){},stop:function(){}}),p=(function(){function m(b){u(this,m),this.options=f({},y,b)}return l(m,[{key:"run",value:function(){var E=this,C=this.options,L=C.cy,D=C.eles,R=[],O=void 0,M=void 0,P=[],w=void 0,x=[];C.fixedNodeConstraint&&(!Array.isArray(C.fixedNodeConstraint)||C.fixedNodeConstraint.length==0)&&(C.fixedNodeConstraint=void 0),C.alignmentConstraint&&(C.alignmentConstraint.vertical&&(!Array.isArray(C.alignmentConstraint.vertical)||C.alignmentConstraint.vertical.length==0)&&(C.alignmentConstraint.vertical=void 0),C.alignmentConstraint.horizontal&&(!Array.isArray(C.alignmentConstraint.horizontal)||C.alignmentConstraint.horizontal.length==0)&&(C.alignmentConstraint.horizontal=void 0)),C.relativePlacementConstraint&&(!Array.isArray(C.relativePlacementConstraint)||C.relativePlacementConstraint.length==0)&&(C.relativePlacementConstraint=void 0);var T=C.fixedNodeConstraint||C.alignmentConstraint||C.relativePlacementConstraint;T&&(C.tile=!1,C.packComponents=!1);var A=void 0,S=!1;if(L.layoutUtilities&&C.packComponents&&(A=L.layoutUtilities("get"),A||(A=L.layoutUtilities()),S=!0),D.nodes().length>0)if(S){var k=v.getTopMostNodes(C.eles.nodes());if(w=v.connectComponents(L,C.eles,k),w.forEach(function(he){var le=he.boundingBox();x.push({x:le.x1+le.w/2,y:le.y1+le.h/2})}),C.randomize&&w.forEach(function(he){C.eles=he,R.push(c(C))}),C.quality=="default"||C.quality=="proof"){var z=L.collection();if(C.tile){var F=new Map,V=[],Z=[],q=0,_={nodeIndexes:F,xCoords:V,yCoords:Z},K=[];if(w.forEach(function(he,le){he.edges().length==0&&(he.nodes().forEach(function(ce,fe){z.merge(he.nodes()[fe]),ce.isParent()||(_.nodeIndexes.set(he.nodes()[fe].id(),q++),_.xCoords.push(he.nodes()[0].position().x),_.yCoords.push(he.nodes()[0].position().y))}),K.push(le))}),z.length>1){var U=z.boundingBox();x.push({x:U.x1+U.w/2,y:U.y1+U.h/2}),w.push(z),R.push(_);for(var J=K.length-1;J>=0;J--)w.splice(K[J],1),R.splice(K[J],1),x.splice(K[J],1)}}w.forEach(function(he,le){C.eles=he,P.push(g(C,R[le])),v.relocateComponent(x[le],P[le],C)})}else w.forEach(function(he,le){v.relocateComponent(x[le],R[le],C)});var $=new Set;if(w.length>1){var H=[],Y=D.filter(function(he){return he.css("display")=="none"});w.forEach(function(he,le){var ce=void 0;if(C.quality=="draft"&&(ce=R[le].nodeIndexes),he.nodes().not(Y).length>0){var fe={};fe.edges=[],fe.nodes=[];var ye=void 0;he.nodes().not(Y).forEach(function(me){if(C.quality=="draft")if(!me.isParent())ye=ce.get(me.id()),fe.nodes.push({x:R[le].xCoords[ye]-me.boundingbox().w/2,y:R[le].yCoords[ye]-me.boundingbox().h/2,width:me.boundingbox().w,height:me.boundingbox().h});else{var Ee=v.calcBoundingBox(me,R[le].xCoords,R[le].yCoords,ce);fe.nodes.push({x:Ee.topLeftX,y:Ee.topLeftY,width:Ee.width,height:Ee.height})}else P[le][me.id()]&&fe.nodes.push({x:P[le][me.id()].getLeft(),y:P[le][me.id()].getTop(),width:P[le][me.id()].getWidth(),height:P[le][me.id()].getHeight()})}),he.edges().forEach(function(me){var Ee=me.source(),be=me.target();if(Ee.css("display")!="none"&&be.css("display")!="none")if(C.quality=="draft"){var Ae=ce.get(Ee.id()),Ie=ce.get(be.id()),Oe=[],Be=[];if(Ee.isParent()){var Pe=v.calcBoundingBox(Ee,R[le].xCoords,R[le].yCoords,ce);Oe.push(Pe.topLeftX+Pe.width/2),Oe.push(Pe.topLeftY+Pe.height/2)}else Oe.push(R[le].xCoords[Ae]),Oe.push(R[le].yCoords[Ae]);if(be.isParent()){var ne=v.calcBoundingBox(be,R[le].xCoords,R[le].yCoords,ce);Be.push(ne.topLeftX+ne.width/2),Be.push(ne.topLeftY+ne.height/2)}else Be.push(R[le].xCoords[Ie]),Be.push(R[le].yCoords[Ie]);fe.edges.push({startX:Oe[0],startY:Oe[1],endX:Be[0],endY:Be[1]})}else P[le][Ee.id()]&&P[le][be.id()]&&fe.edges.push({startX:P[le][Ee.id()].getCenterX(),startY:P[le][Ee.id()].getCenterY(),endX:P[le][be.id()].getCenterX(),endY:P[le][be.id()].getCenterY()})}),fe.nodes.length>0&&(H.push(fe),$.add(le))}});var Q=A.packComponents(H,C.randomize).shifts;if(C.quality=="draft")R.forEach(function(he,le){var ce=he.xCoords.map(function(ye){return ye+Q[le].dx}),fe=he.yCoords.map(function(ye){return ye+Q[le].dy});he.xCoords=ce,he.yCoords=fe});else{var oe=0;$.forEach(function(he){Object.keys(P[he]).forEach(function(le){var ce=P[he][le];ce.setCenter(ce.getCenterX()+Q[oe].dx,ce.getCenterY()+Q[oe].dy)}),oe++})}}}else{var I=C.eles.boundingBox();if(x.push({x:I.x1+I.w/2,y:I.y1+I.h/2}),C.randomize){var B=c(C);R.push(B)}C.quality=="default"||C.quality=="proof"?(P.push(g(C,R[0])),v.relocateComponent(x[0],P[0],C)):v.relocateComponent(x[0],R[0],C)}var te=function(le,ce){if(C.quality=="default"||C.quality=="proof"){typeof le=="number"&&(le=ce);var fe=void 0,ye=void 0,me=le.data("id");return P.forEach(function(be){me in be&&(fe={x:be[me].getRect().getCenterX(),y:be[me].getRect().getCenterY()},ye=be[me])}),C.nodeDimensionsIncludeLabels&&(ye.labelWidth&&(ye.labelPosHorizontal=="left"?fe.x+=ye.labelWidth/2:ye.labelPosHorizontal=="right"&&(fe.x-=ye.labelWidth/2)),ye.labelHeight&&(ye.labelPosVertical=="top"?fe.y+=ye.labelHeight/2:ye.labelPosVertical=="bottom"&&(fe.y-=ye.labelHeight/2))),fe==null&&(fe={x:le.position("x"),y:le.position("y")}),{x:fe.x,y:fe.y}}else{var Ee=void 0;return R.forEach(function(be){var Ae=be.nodeIndexes.get(le.id());Ae!=null&&(Ee={x:be.xCoords[Ae],y:be.yCoords[Ae]})}),Ee==null&&(Ee={x:le.position("x"),y:le.position("y")}),{x:Ee.x,y:Ee.y}}};if(C.quality=="default"||C.quality=="proof"||C.randomize){var Te=v.calcParentsWithoutChildren(L,D),Le=D.filter(function(he){return he.css("display")=="none"});C.eles=D.not(Le),D.nodes().not(":parent").not(Le).layoutPositions(E,C,te),Te.length>0&&Te.forEach(function(he){he.position(te(he))})}else console.log("If randomize option is set to false, then quality option must be 'default' or 'proof'.")}}]),m})();i.exports=p}),657:((i,o,s)=>{var l=s(548),u=s(140).layoutBase.Matrix,f=s(140).layoutBase.SVD,v=function(c){var d=c.cy,g=c.eles,y=g.nodes(),p=g.nodes(":parent"),m=new Map,b=new Map,E=new Map,C=[],L=[],D=[],R=[],O=[],M=[],P=[],w=[],x=void 0,T=void 0,A=1e8,S=1e-9,I=c.piTol,B=c.samplingType,k=c.nodeSeparation,z=void 0,F=function(){for(var W=0,N=0,G=!1;N<z;){W=Math.floor(Math.random()*T),G=!1;for(var X=0;X<N;X++)if(R[X]==W){G=!0;break}if(!G)R[N]=W,N++;else continue}},V=function(W,N,G){for(var X=[],j=0,ee=0,ie=0,re=void 0,ve=[],se=0,de=1,Se=0;Se<T;Se++)ve[Se]=A;for(X[ee]=W,ve[W]=0;ee>=j;){ie=X[j++];for(var ge=C[ie],ue=0;ue<ge.length;ue++)re=b.get(ge[ue]),ve[re]==A&&(ve[re]=ve[ie]+1,X[++ee]=re);M[ie][N]=ve[ie]*k}if(G){for(var we=0;we<T;we++)M[we][N]<O[we]&&(O[we]=M[we][N]);for(var pe=0;pe<T;pe++)O[pe]>se&&(se=O[pe],de=pe)}return de},Z=function(W){var N=void 0;if(W){N=Math.floor(Math.random()*T),x=N;for(var X=0;X<T;X++)O[X]=A;for(var j=0;j<z;j++)R[j]=N,N=V(N,j,W)}else{F();for(var G=0;G<z;G++)V(R[G],G,W,!1)}for(var ee=0;ee<T;ee++)for(var ie=0;ie<z;ie++)M[ee][ie]*=M[ee][ie];for(var re=0;re<z;re++)P[re]=[];for(var ve=0;ve<z;ve++)for(var se=0;se<z;se++)P[ve][se]=M[R[se]][ve]},q=function(){for(var W=f.svd(P),N=W.S,G=W.U,X=W.V,j=N[0]*N[0]*N[0],ee=[],ie=0;ie<z;ie++){ee[ie]=[];for(var re=0;re<z;re++)ee[ie][re]=0,ie==re&&(ee[ie][re]=N[ie]/(N[ie]*N[ie]+j/(N[ie]*N[ie])))}w=u.multMat(u.multMat(X,ee),u.transpose(G))},_=function(){for(var W=void 0,N=void 0,G=[],X=[],j=[],ee=[],ie=0;ie<T;ie++)G[ie]=Math.random(),X[ie]=Math.random();G=u.normalize(G),X=u.normalize(X);for(var re=0,ve=S,se=S,de=void 0;;){re++;for(var Se=0;Se<T;Se++)j[Se]=G[Se];if(G=u.multGamma(u.multL(u.multGamma(j),M,w)),W=u.dotProduct(j,G),G=u.normalize(G),ve=u.dotProduct(j,G),de=Math.abs(ve/se),de<=1+I&&de>=1)break;se=ve}for(var ge=0;ge<T;ge++)j[ge]=G[ge];for(re=0,se=S;;){re++;for(var ue=0;ue<T;ue++)ee[ue]=X[ue];if(ee=u.minusOp(ee,u.multCons(j,u.dotProduct(j,ee))),X=u.multGamma(u.multL(u.multGamma(ee),M,w)),N=u.dotProduct(ee,X),X=u.normalize(X),ve=u.dotProduct(ee,X),de=Math.abs(ve/se),de<=1+I&&de>=1)break;se=ve}for(var we=0;we<T;we++)ee[we]=X[we];L=u.multCons(j,Math.sqrt(Math.abs(W))),D=u.multCons(ee,Math.sqrt(Math.abs(N)))};l.connectComponents(d,g,l.getTopMostNodes(y),m),p.forEach(function(ae){l.connectComponents(d,g,l.getTopMostNodes(ae.descendants().intersection(g)),m)});for(var K=0,U=0;U<y.length;U++)y[U].isParent()||b.set(y[U].id(),K++);var J=!0,$=!1,H=void 0;try{for(var Y=m.keys()[Symbol.iterator](),Q;!(J=(Q=Y.next()).done);J=!0){var oe=Q.value;b.set(oe,K++)}}catch(ae){$=!0,H=ae}finally{try{!J&&Y.return&&Y.return()}finally{if($)throw H}}for(var te=0;te<b.size;te++)C[te]=[];p.forEach(function(ae){for(var W=ae.children().intersection(g);W.nodes(":childless").length==0;)W=W.nodes()[0].children().intersection(g);var N=0,G=W.nodes(":childless")[0].connectedEdges().length;W.nodes(":childless").forEach(function(X,j){X.connectedEdges().length<G&&(G=X.connectedEdges().length,N=j)}),E.set(ae.id(),W.nodes(":childless")[N].id())}),y.forEach(function(ae){var W=void 0;ae.isParent()?W=b.get(E.get(ae.id())):W=b.get(ae.id()),ae.neighborhood().nodes().forEach(function(N){g.intersection(ae.edgesWith(N)).length>0&&(N.isParent()?C[W].push(E.get(N.id())):C[W].push(N.id()))})});var Te=function(W){var N=b.get(W),G=void 0;m.get(W).forEach(function(X){d.getElementById(X).isParent()?G=E.get(X):G=X,C[N].push(G),C[b.get(G)].push(W)})},Le=!0,he=!1,le=void 0;try{for(var ce=m.keys()[Symbol.iterator](),fe;!(Le=(fe=ce.next()).done);Le=!0){var ye=fe.value;Te(ye)}}catch(ae){he=!0,le=ae}finally{try{!Le&&ce.return&&ce.return()}finally{if(he)throw le}}T=b.size;var me=void 0;if(T>2){z=T<c.sampleSize?T:c.sampleSize;for(var Ee=0;Ee<T;Ee++)M[Ee]=[];for(var be=0;be<z;be++)w[be]=[];return c.quality=="draft"||c.step=="all"?(Z(B),q(),_(),me={nodeIndexes:b,xCoords:L,yCoords:D}):(b.forEach(function(ae,W){L.push(d.getElementById(W).position("x")),D.push(d.getElementById(W).position("y"))}),me={nodeIndexes:b,xCoords:L,yCoords:D}),me}else{var Ae=b.keys(),Ie=d.getElementById(Ae.next().value),Oe=Ie.position(),Be=Ie.outerWidth();if(L.push(Oe.x),D.push(Oe.y),T==2){var Pe=d.getElementById(Ae.next().value),ne=Pe.outerWidth();L.push(Oe.x+Be/2+ne/2+c.idealEdgeLength),D.push(Oe.y)}return me={nodeIndexes:b,xCoords:L,yCoords:D},me}};i.exports={spectralLayout:v}}),579:((i,o,s)=>{var l=s(212),u=function(v){v&&v("layout","fcose",l)};typeof cytoscape<"u"&&u(cytoscape),i.exports=u}),140:(i=>{i.exports=t})},r={};function a(i){var o=r[i];if(o!==void 0)return o.exports;var s=r[i]={exports:{}};return e[i](s,s.exports,a),s.exports}var n=a(579);return n})()})});function Yo(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,a=Array(e);r<e;r++)a[r]=t[r];return a}function bh(t){if(Array.isArray(t))return t}function wh(t){if(Array.isArray(t))return Yo(t)}function Sr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Eh(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,mf(a.key),a)}}function Dr(t,e,r){return e&&Eh(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function Bt(t,e){var r=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=fs(t))||e){r&&(t=r);var a=0,n=function(){};return{s:n,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i,o=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var l=r.next();return o=l.done,l},e:function(l){s=!0,i=l},f:function(){try{o||r.return==null||r.return()}finally{if(s)throw i}}}}function yf(t,e,r){return(e=mf(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function xh(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Th(t,e){var r=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(r!=null){var a,n,i,o,s=[],l=!0,u=!1;try{if(i=(r=r.call(t)).next,e===0){if(Object(r)!==r)return;l=!1}else for(;!(l=(a=i.call(r)).done)&&(s.push(a.value),s.length!==e);l=!0);}catch(f){u=!0,n=f}finally{try{if(!l&&r.return!=null&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw n}}return s}}function Ch(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Sh(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vt(t,e){return bh(t)||Th(t,e)||fs(t,e)||Ch()}function Pn(t){return wh(t)||xh(t)||fs(t)||Sh()}function Dh(t,e){if(typeof t!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var a=r.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}function mf(t){var e=Dh(t,"string");return typeof e=="symbol"?e:e+""}function dt(t){"@babel/helpers - typeof";return dt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},dt(t)}function fs(t,e){if(t){if(typeof t=="string")return Yo(t,e);var r={}.toString.call(t).slice(8,-1);return r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set"?Array.from(t):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Yo(t,e):void 0}}var ht=typeof window>"u"?null:window,Hs=ht?ht.navigator:null;ht&&ht.document;var Ah=dt(""),bf=dt({}),Lh=dt(function(){}),Mh=typeof HTMLElement>"u"?"undefined":dt(HTMLElement),qa=function(e){return e&&e.instanceString&&at(e.instanceString)?e.instanceString():null},Me=function(e){return e!=null&&dt(e)==Ah},at=function(e){return e!=null&&dt(e)===Lh},Je=function(e){return!kt(e)&&(Array.isArray?Array.isArray(e):e!=null&&e instanceof Array)},Ye=function(e){return e!=null&&dt(e)===bf&&!Je(e)&&e.constructor===Object},Rh=function(e){return e!=null&&dt(e)===bf},xe=function(e){return e!=null&&dt(e)===dt(1)&&!isNaN(e)},Nh=function(e){return xe(e)&&Math.floor(e)===e},On=function(e){if(Mh!=="undefined")return e!=null&&e instanceof HTMLElement},kt=function(e){return Ya(e)||wf(e)},Ya=function(e){return qa(e)==="collection"&&e._private.single},wf=function(e){return qa(e)==="collection"&&!e._private.single},vs=function(e){return qa(e)==="core"},Ef=function(e){return qa(e)==="stylesheet"},Ph=function(e){return qa(e)==="event"},br=function(e){return e==null?!0:!!(e===""||e.match(/^\s+$/))},Oh=function(e){return typeof HTMLElement>"u"?!1:e instanceof HTMLElement},Ih=function(e){return Ye(e)&&xe(e.x1)&&xe(e.x2)&&xe(e.y1)&&xe(e.y2)},Bh=function(e){return Rh(e)&&at(e.then)},Fh=function(){return Hs&&Hs.userAgent.match(/msie|trident|edge/i)},sa=function(e,r){r||(r=function(){if(arguments.length===1)return arguments[0];if(arguments.length===0)return"undefined";for(var i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);return i.join("$")});var a=function(){var i=this,o=arguments,s,l=r.apply(i,o),u=a.cache;return(s=u[l])||(s=u[l]=e.apply(i,o)),s};return a.cache={},a},hs=sa(function(t){return t.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}),Xn=sa(function(t){return t.replace(/(-\w)/g,function(e){return e[1].toUpperCase()})}),xf=sa(function(t,e){return t+e[0].toUpperCase()+e.substring(1)},function(t,e){return t+"$"+e}),qs=function(e){return br(e)?e:e.charAt(0).toUpperCase()+e.substring(1)},dr=function(e,r){return e.slice(-1*r.length)===r},ct="(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))",kh="rgb[a]?\\(("+ct+"[%]?)\\s*,\\s*("+ct+"[%]?)\\s*,\\s*("+ct+"[%]?)(?:\\s*,\\s*("+ct+"))?\\)",zh="rgb[a]?\\((?:"+ct+"[%]?)\\s*,\\s*(?:"+ct+"[%]?)\\s*,\\s*(?:"+ct+"[%]?)(?:\\s*,\\s*(?:"+ct+"))?\\)",Vh="hsl[a]?\\(("+ct+")\\s*,\\s*("+ct+"[%])\\s*,\\s*("+ct+"[%])(?:\\s*,\\s*("+ct+"))?\\)",Gh="hsl[a]?\\((?:"+ct+")\\s*,\\s*(?:"+ct+"[%])\\s*,\\s*(?:"+ct+"[%])(?:\\s*,\\s*(?:"+ct+"))?\\)",Uh="\\#[0-9a-fA-F]{3}",Hh="\\#[0-9a-fA-F]{6}",Tf=function(e,r){return e<r?-1:e>r?1:0},qh=function(e,r){return-1*Tf(e,r)},Ne=Object.assign!=null?Object.assign.bind(Object):function(t){for(var e=arguments,r=1;r<e.length;r++){var a=e[r];if(a!=null)for(var n=Object.keys(a),i=0;i<n.length;i++){var o=n[i];t[o]=a[o]}}return t},Yh=function(e){if(!(!(e.length===4||e.length===7)||e[0]!=="#")){var r=e.length===4,a,n,i,o=16;return r?(a=parseInt(e[1]+e[1],o),n=parseInt(e[2]+e[2],o),i=parseInt(e[3]+e[3],o)):(a=parseInt(e[1]+e[2],o),n=parseInt(e[3]+e[4],o),i=parseInt(e[5]+e[6],o)),[a,n,i]}},Wh=function(e){var r,a,n,i,o,s,l,u;function f(d,g,y){return y<0&&(y+=1),y>1&&(y-=1),y<1/6?d+(g-d)*6*y:y<1/2?g:y<2/3?d+(g-d)*(2/3-y)*6:d}var v=new RegExp("^"+Vh+"$").exec(e);if(v){if(a=parseInt(v[1]),a<0?a=(360- -1*a%360)%360:a>360&&(a=a%360),a/=360,n=parseFloat(v[2]),n<0||n>100||(n=n/100,i=parseFloat(v[3]),i<0||i>100)||(i=i/100,o=v[4],o!==void 0&&(o=parseFloat(o),o<0||o>1)))return;if(n===0)s=l=u=Math.round(i*255);else{var h=i<.5?i*(1+n):i+n-i*n,c=2*i-h;s=Math.round(255*f(c,h,a+1/3)),l=Math.round(255*f(c,h,a)),u=Math.round(255*f(c,h,a-1/3))}r=[s,l,u,o]}return r},Xh=function(e){var r,a=new RegExp("^"+kh+"$").exec(e);if(a){r=[];for(var n=[],i=1;i<=3;i++){var o=a[i];if(o[o.length-1]==="%"&&(n[i]=!0),o=parseFloat(o),n[i]&&(o=o/100*255),o<0||o>255)return;r.push(Math.floor(o))}var s=n[1]||n[2]||n[3],l=n[1]&&n[2]&&n[3];if(s&&!l)return;var u=a[4];if(u!==void 0){if(u=parseFloat(u),u<0||u>1)return;r.push(u)}}return r},$h=function(e){return Kh[e.toLowerCase()]},Cf=function(e){return(Je(e)?e:null)||$h(e)||Yh(e)||Xh(e)||Wh(e)},Kh={transparent:[0,0,0,0],aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},Sf=function(e){for(var r=e.map,a=e.keys,n=a.length,i=0;i<n;i++){var o=a[i];if(Ye(o))throw Error("Tried to set map with object key");i<a.length-1?(r[o]==null&&(r[o]={}),r=r[o]):r[o]=e.value}},Df=function(e){for(var r=e.map,a=e.keys,n=a.length,i=0;i<n;i++){var o=a[i];if(Ye(o))throw Error("Tried to get map with object key");if(r=r[o],r==null)return r}return r},un=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wa(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ci,Ys;function Xa(){if(Ys)return ci;Ys=1;function t(e){var r=typeof e;return e!=null&&(r=="object"||r=="function")}return ci=t,ci}var di,Ws;function _h(){if(Ws)return di;Ws=1;var t=typeof un=="object"&&un&&un.Object===Object&&un;return di=t,di}var gi,Xs;function $n(){if(Xs)return gi;Xs=1;var t=_h(),e=typeof self=="object"&&self&&self.Object===Object&&self,r=t||e||Function("return this")();return gi=r,gi}var pi,$s;function Zh(){if($s)return pi;$s=1;var t=$n(),e=function(){return t.Date.now()};return pi=e,pi}var yi,Ks;function Qh(){if(Ks)return yi;Ks=1;var t=/\s/;function e(r){for(var a=r.length;a--&&t.test(r.charAt(a)););return a}return yi=e,yi}var mi,_s;function Jh(){if(_s)return mi;_s=1;var t=Qh(),e=/^\s+/;function r(a){return a&&a.slice(0,t(a)+1).replace(e,"")}return mi=r,mi}var bi,Zs;function cs(){if(Zs)return bi;Zs=1;var t=$n(),e=t.Symbol;return bi=e,bi}var wi,Qs;function jh(){if(Qs)return wi;Qs=1;var t=cs(),e=Object.prototype,r=e.hasOwnProperty,a=e.toString,n=t?t.toStringTag:void 0;function i(o){var s=r.call(o,n),l=o[n];try{o[n]=void 0;var u=!0}catch{}var f=a.call(o);return u&&(s?o[n]=l:delete o[n]),f}return wi=i,wi}var Ei,Js;function ec(){if(Js)return Ei;Js=1;var t=Object.prototype,e=t.toString;function r(a){return e.call(a)}return Ei=r,Ei}var xi,js;function Af(){if(js)return xi;js=1;var t=cs(),e=jh(),r=ec(),a="[object Null]",n="[object Undefined]",i=t?t.toStringTag:void 0;function o(s){return s==null?s===void 0?n:a:i&&i in Object(s)?e(s):r(s)}return xi=o,xi}var Ti,eu;function tc(){if(eu)return Ti;eu=1;function t(e){return e!=null&&typeof e=="object"}return Ti=t,Ti}var Ci,tu;function $a(){if(tu)return Ci;tu=1;var t=Af(),e=tc(),r="[object Symbol]";function a(n){return typeof n=="symbol"||e(n)&&t(n)==r}return Ci=a,Ci}var Si,ru;function rc(){if(ru)return Si;ru=1;var t=Jh(),e=Xa(),r=$a(),a=NaN,n=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt;function l(u){if(typeof u=="number")return u;if(r(u))return a;if(e(u)){var f=typeof u.valueOf=="function"?u.valueOf():u;u=e(f)?f+"":f}if(typeof u!="string")return u===0?u:+u;u=t(u);var v=i.test(u);return v||o.test(u)?s(u.slice(2),v?2:8):n.test(u)?a:+u}return Si=l,Si}var Di,au;function ac(){if(au)return Di;au=1;var t=Xa(),e=Zh(),r=rc(),a="Expected a function",n=Math.max,i=Math.min;function o(s,l,u){var f,v,h,c,d,g,y=0,p=!1,m=!1,b=!0;if(typeof s!="function")throw new TypeError(a);l=r(l)||0,t(u)&&(p=!!u.leading,m="maxWait"in u,h=m?n(r(u.maxWait)||0,l):h,b="trailing"in u?!!u.trailing:b);function E(x){var T=f,A=v;return f=v=void 0,y=x,c=s.apply(A,T),c}function C(x){return y=x,d=setTimeout(R,l),p?E(x):c}function L(x){var T=x-g,A=x-y,S=l-T;return m?i(S,h-A):S}function D(x){var T=x-g,A=x-y;return g===void 0||T>=l||T<0||m&&A>=h}function R(){var x=e();if(D(x))return O(x);d=setTimeout(R,L(x))}function O(x){return d=void 0,b&&f?E(x):(f=v=void 0,c)}function M(){d!==void 0&&clearTimeout(d),y=0,f=g=v=d=void 0}function P(){return d===void 0?c:O(e())}function w(){var x=e(),T=D(x);if(f=arguments,v=this,g=x,T){if(d===void 0)return C(g);if(m)return clearTimeout(d),d=setTimeout(R,l),E(g)}return d===void 0&&(d=setTimeout(R,l)),c}return w.cancel=M,w.flush=P,w}return Di=o,Di}var nc=ac(),Ka=Wa(nc),Ai=ht?ht.performance:null,Lf=Ai&&Ai.now?function(){return Ai.now()}:function(){return Date.now()},ic=(function(){if(ht){if(ht.requestAnimationFrame)return function(t){ht.requestAnimationFrame(t)};if(ht.mozRequestAnimationFrame)return function(t){ht.mozRequestAnimationFrame(t)};if(ht.webkitRequestAnimationFrame)return function(t){ht.webkitRequestAnimationFrame(t)};if(ht.msRequestAnimationFrame)return function(t){ht.msRequestAnimationFrame(t)}}return function(t){t&&setTimeout(function(){t(Lf())},1e3/60)}})(),In=function(e){return ic(e)},ir=Lf,Br=9261,Mf=65599,jr=5381,Rf=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Br,a=r,n;n=e.next(),!n.done;)a=a*Mf+n.value|0;return a},Oa=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Br;return r*Mf+e|0},Ia=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:jr;return(r<<5)+r+e|0},oc=function(e,r){return e*2097152+r},vr=function(e){return e[0]*2097152+e[1]},ln=function(e,r){return[Oa(e[0],r[0]),Ia(e[1],r[1])]},nu=function(e,r){var a={value:0,done:!1},n=0,i=e.length,o={next:function(){return n<i?a.value=e[n++]:a.done=!0,a}};return Rf(o,r)},zr=function(e,r){var a={value:0,done:!1},n=0,i=e.length,o={next:function(){return n<i?a.value=e.charCodeAt(n++):a.done=!0,a}};return Rf(o,r)},Nf=function(){return sc(arguments)},sc=function(e){for(var r,a=0;a<e.length;a++){var n=e[a];a===0?r=zr(n):r=zr(n,r)}return r};function uc(t,e,r,a,n){var i=n*Math.PI/180,o=Math.cos(i)*(t-r)-Math.sin(i)*(e-a)+r,s=Math.sin(i)*(t-r)+Math.cos(i)*(e-a)+a;return{x:o,y:s}}var lc=function(e,r,a,n,i,o){return{x:(e-a)*i+a,y:(r-n)*o+n}};function fc(t,e,r){if(r===0)return t;var a=(e.x1+e.x2)/2,n=(e.y1+e.y2)/2,i=e.w/e.h,o=1/i,s=uc(t.x,t.y,a,n,r),l=lc(s.x,s.y,a,n,i,o);return{x:l.x,y:l.y}}var iu=!0,vc=console.warn!=null,hc=console.trace!=null,ds=Number.MAX_SAFE_INTEGER||9007199254740991,Pf=function(){return!0},Bn=function(){return!1},ou=function(){return 0},gs=function(){},rt=function(e){throw new Error(e)},Of=function(e){if(e!==void 0)iu=!!e;else return iu},_e=function(e){Of()&&(vc?console.warn(e):(console.log(e),hc&&console.trace()))},cc=function(e){return Ne({},e)},Jt=function(e){return e==null?e:Je(e)?e.slice():Ye(e)?cc(e):e},dc=function(e){return e.slice()},If=function(e,r){for(r=e="";e++<36;r+=e*51&52?(e^15?8^Math.random()*(e^20?16:4):4).toString(16):"-");return r},gc={},Bf=function(){return gc},Et=function(e){var r=Object.keys(e);return function(a){for(var n={},i=0;i<r.length;i++){var o=r[i],s=a?.[o];n[o]=s===void 0?e[o]:s}return n}},wr=function(e,r,a){for(var n=e.length-1;n>=0;n--)e[n]===r&&e.splice(n,1)},ps=function(e){e.splice(0,e.length)},pc=function(e,r){for(var a=0;a<r.length;a++){var n=r[a];e.push(n)}},Ot=function(e,r,a){return a&&(r=xf(a,r)),e[r]},ar=function(e,r,a,n){a&&(r=xf(a,r)),e[r]=n},yc=(function(){function t(){Sr(this,t),this._obj={}}return Dr(t,[{key:"set",value:function(r,a){return this._obj[r]=a,this}},{key:"delete",value:function(r){return this._obj[r]=void 0,this}},{key:"clear",value:function(){this._obj={}}},{key:"has",value:function(r){return this._obj[r]!==void 0}},{key:"get",value:function(r){return this._obj[r]}}])})(),nr=typeof Map<"u"?Map:yc,mc="undefined",bc=(function(){function t(e){if(Sr(this,t),this._obj=Object.create(null),this.size=0,e!=null){var r;e.instanceString!=null&&e.instanceString()===this.instanceString()?r=e.toArray():r=e;for(var a=0;a<r.length;a++)this.add(r[a])}}return Dr(t,[{key:"instanceString",value:function(){return"set"}},{key:"add",value:function(r){var a=this._obj;a[r]!==1&&(a[r]=1,this.size++)}},{key:"delete",value:function(r){var a=this._obj;a[r]===1&&(a[r]=0,this.size--)}},{key:"clear",value:function(){this._obj=Object.create(null)}},{key:"has",value:function(r){return this._obj[r]===1}},{key:"toArray",value:function(){var r=this;return Object.keys(this._obj).filter(function(a){return r.has(a)})}},{key:"forEach",value:function(r,a){return this.toArray().forEach(r,a)}}])})(),fa=(typeof Set>"u"?"undefined":dt(Set))!==mc?Set:bc,Kn=function(e,r){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;if(e===void 0||r===void 0||!vs(e)){rt("An element must have a core reference and parameters set");return}var n=r.group;if(n==null&&(r.data&&r.data.source!=null&&r.data.target!=null?n="edges":n="nodes"),n!=="nodes"&&n!=="edges"){rt("An element must be of type `nodes` or `edges`; you specified `"+n+"`");return}this.length=1,this[0]=this;var i=this._private={cy:e,single:!0,data:r.data||{},position:r.position||{x:0,y:0},autoWidth:void 0,autoHeight:void 0,autoPadding:void 0,compoundBoundsClean:!1,listeners:[],group:n,style:{},rstyle:{},styleCxts:[],styleKeys:{},removed:!0,selected:!!r.selected,selectable:r.selectable===void 0?!0:!!r.selectable,locked:!!r.locked,grabbed:!1,grabbable:r.grabbable===void 0?!0:!!r.grabbable,pannable:r.pannable===void 0?n==="edges":!!r.pannable,active:!1,classes:new fa,animation:{current:[],queue:[]},rscratch:{},scratch:r.scratch||{},edges:[],children:[],parent:r.parent&&r.parent.isNode()?r.parent:null,traversalCache:{},backgrounding:!1,bbCache:null,bbCacheShift:{x:0,y:0},bodyBounds:null,overlayBounds:null,labelBounds:{all:null,source:null,target:null,main:null},arrowBounds:{source:null,target:null,"mid-source":null,"mid-target":null}};if(i.position.x==null&&(i.position.x=0),i.position.y==null&&(i.position.y=0),r.renderedPosition){var o=r.renderedPosition,s=e.pan(),l=e.zoom();i.position={x:(o.x-s.x)/l,y:(o.y-s.y)/l}}var u=[];Je(r.classes)?u=r.classes:Me(r.classes)&&(u=r.classes.split(/\s+/));for(var f=0,v=u.length;f<v;f++){var h=u[f];!h||h===""||i.classes.add(h)}this.createEmitter(),(a===void 0||a)&&this.restore();var c=r.style||r.css;c&&(_e("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."),this.style(c))},su=function(e){return e={bfs:e.bfs||!e.dfs,dfs:e.dfs||!e.bfs},function(a,n,i){var o;Ye(a)&&!kt(a)&&(o=a,a=o.roots||o.root,n=o.visit,i=o.directed),i=arguments.length===2&&!at(n)?n:i,n=at(n)?n:function(){};for(var s=this._private.cy,l=a=Me(a)?this.filter(a):a,u=[],f=[],v={},h={},c={},d=0,g,y=this.byGroup(),p=y.nodes,m=y.edges,b=0;b<l.length;b++){var E=l[b],C=E.id();E.isNode()&&(u.unshift(E),e.bfs&&(c[C]=!0,f.push(E)),h[C]=0)}for(var L=function(){var x=e.bfs?u.shift():u.pop(),T=x.id();if(e.dfs){if(c[T])return 0;c[T]=!0,f.push(x)}var A=h[T],S=v[T],I=S!=null?S.source():null,B=S!=null?S.target():null,k=S==null?void 0:x.same(I)?B[0]:I[0],z;if(z=n(x,S,k,d++,A),z===!0)return g=x,1;if(z===!1)return 1;for(var F=x.connectedEdges().filter(function(K){return(!i||K.source().same(x))&&m.has(K)}),V=0;V<F.length;V++){var Z=F[V],q=Z.connectedNodes().filter(function(K){return!K.same(x)&&p.has(K)}),_=q.id();q.length!==0&&!c[_]&&(q=q[0],u.push(q),e.bfs&&(c[_]=!0,f.push(q)),v[_]=Z,h[_]=h[T]+1)}},D;u.length!==0&&(D=L(),!(D!==0&&D===1)););for(var R=s.collection(),O=0;O<f.length;O++){var M=f[O],P=v[M.id()];P!=null&&R.push(P),R.push(M)}return{path:s.collection(R),found:s.collection(g)}}},Ba={breadthFirstSearch:su({bfs:!0}),depthFirstSearch:su({dfs:!0})};Ba.bfs=Ba.breadthFirstSearch;Ba.dfs=Ba.depthFirstSearch;var En={exports:{}},wc=En.exports,uu;function Ec(){return uu||(uu=1,(function(t,e){(function(){var r,a,n,i,o,s,l,u,f,v,h,c,d,g,y;n=Math.floor,v=Math.min,a=function(p,m){return p<m?-1:p>m?1:0},f=function(p,m,b,E,C){var L;if(b==null&&(b=0),C==null&&(C=a),b<0)throw new Error("lo must be non-negative");for(E==null&&(E=p.length);b<E;)L=n((b+E)/2),C(m,p[L])<0?E=L:b=L+1;return[].splice.apply(p,[b,b-b].concat(m)),m},s=function(p,m,b){return b==null&&(b=a),p.push(m),g(p,0,p.length-1,b)},o=function(p,m){var b,E;return m==null&&(m=a),b=p.pop(),p.length?(E=p[0],p[0]=b,y(p,0,m)):E=b,E},u=function(p,m,b){var E;return b==null&&(b=a),E=p[0],p[0]=m,y(p,0,b),E},l=function(p,m,b){var E;return b==null&&(b=a),p.length&&b(p[0],m)<0&&(E=[p[0],m],m=E[0],p[0]=E[1],y(p,0,b)),m},i=function(p,m){var b,E,C,L,D,R;for(m==null&&(m=a),L=(function(){R=[];for(var O=0,M=n(p.length/2);0<=M?O<M:O>M;0<=M?O++:O--)R.push(O);return R}).apply(this).reverse(),D=[],E=0,C=L.length;E<C;E++)b=L[E],D.push(y(p,b,m));return D},d=function(p,m,b){var E;if(b==null&&(b=a),E=p.indexOf(m),E!==-1)return g(p,0,E,b),y(p,E,b)},h=function(p,m,b){var E,C,L,D,R;if(b==null&&(b=a),C=p.slice(0,m),!C.length)return C;for(i(C,b),R=p.slice(m),L=0,D=R.length;L<D;L++)E=R[L],l(C,E,b);return C.sort(b).reverse()},c=function(p,m,b){var E,C,L,D,R,O,M,P,w;if(b==null&&(b=a),m*10<=p.length){if(L=p.slice(0,m).sort(b),!L.length)return L;for(C=L[L.length-1],M=p.slice(m),D=0,O=M.length;D<O;D++)E=M[D],b(E,C)<0&&(f(L,E,0,null,b),L.pop(),C=L[L.length-1]);return L}for(i(p,b),w=[],R=0,P=v(m,p.length);0<=P?R<P:R>P;0<=P?++R:--R)w.push(o(p,b));return w},g=function(p,m,b,E){var C,L,D;for(E==null&&(E=a),C=p[b];b>m;){if(D=b-1>>1,L=p[D],E(C,L)<0){p[b]=L,b=D;continue}break}return p[b]=C},y=function(p,m,b){var E,C,L,D,R;for(b==null&&(b=a),C=p.length,R=m,L=p[m],E=2*m+1;E<C;)D=E+1,D<C&&!(b(p[E],p[D])<0)&&(E=D),p[m]=p[E],m=E,E=2*m+1;return p[m]=L,g(p,R,m,b)},r=(function(){p.push=s,p.pop=o,p.replace=u,p.pushpop=l,p.heapify=i,p.updateItem=d,p.nlargest=h,p.nsmallest=c;function p(m){this.cmp=m??a,this.nodes=[]}return p.prototype.push=function(m){return s(this.nodes,m,this.cmp)},p.prototype.pop=function(){return o(this.nodes,this.cmp)},p.prototype.peek=function(){return this.nodes[0]},p.prototype.contains=function(m){return this.nodes.indexOf(m)!==-1},p.prototype.replace=function(m){return u(this.nodes,m,this.cmp)},p.prototype.pushpop=function(m){return l(this.nodes,m,this.cmp)},p.prototype.heapify=function(){return i(this.nodes,this.cmp)},p.prototype.updateItem=function(m){return d(this.nodes,m,this.cmp)},p.prototype.clear=function(){return this.nodes=[]},p.prototype.empty=function(){return this.nodes.length===0},p.prototype.size=function(){return this.nodes.length},p.prototype.clone=function(){var m;return m=new p,m.nodes=this.nodes.slice(0),m},p.prototype.toArray=function(){return this.nodes.slice(0)},p.prototype.insert=p.prototype.push,p.prototype.top=p.prototype.peek,p.prototype.front=p.prototype.peek,p.prototype.has=p.prototype.contains,p.prototype.copy=p.prototype.clone,p})(),(function(p,m){return t.exports=m()})(this,function(){return r})}).call(wc)})(En)),En.exports}var Li,lu;function xc(){return lu||(lu=1,Li=Ec()),Li}var Tc=xc(),_a=Wa(Tc),Cc=Et({root:null,weight:function(e){return 1},directed:!1}),Sc={dijkstra:function(e){if(!Ye(e)){var r=arguments;e={root:r[0],weight:r[1],directed:r[2]}}var a=Cc(e),n=a.root,i=a.weight,o=a.directed,s=this,l=i,u=Me(n)?this.filter(n)[0]:n[0],f={},v={},h={},c=this.byGroup(),d=c.nodes,g=c.edges;g.unmergeBy(function(A){return A.isLoop()});for(var y=function(S){return f[S.id()]},p=function(S,I){f[S.id()]=I,m.updateItem(S)},m=new _a(function(A,S){return y(A)-y(S)}),b=0;b<d.length;b++){var E=d[b];f[E.id()]=E.same(u)?0:1/0,m.push(E)}for(var C=function(S,I){for(var B=(o?S.edgesTo(I):S.edgesWith(I)).intersect(g),k=1/0,z,F=0;F<B.length;F++){var V=B[F],Z=l(V);(Z<k||!z)&&(k=Z,z=V)}return{edge:z,dist:k}};m.size()>0;){var L=m.pop(),D=y(L),R=L.id();if(h[R]=D,D!==1/0)for(var O=L.neighborhood().intersect(d),M=0;M<O.length;M++){var P=O[M],w=P.id(),x=C(L,P),T=D+x.dist;T<y(P)&&(p(P,T),v[w]={node:L,edge:x.edge})}}return{distanceTo:function(S){var I=Me(S)?d.filter(S)[0]:S[0];return h[I.id()]},pathTo:function(S){var I=Me(S)?d.filter(S)[0]:S[0],B=[],k=I,z=k.id();if(I.length>0)for(B.unshift(I);v[z];){var F=v[z];B.unshift(F.edge),B.unshift(F.node),k=F.node,z=k.id()}return s.spawn(B)}}}},Dc={kruskal:function(e){e=e||function(b){return 1};for(var r=this.byGroup(),a=r.nodes,n=r.edges,i=a.length,o=new Array(i),s=a,l=function(E){for(var C=0;C<o.length;C++){var L=o[C];if(L.has(E))return C}},u=0;u<i;u++)o[u]=this.spawn(a[u]);for(var f=n.sort(function(b,E){return e(b)-e(E)}),v=0;v<f.length;v++){var h=f[v],c=h.source()[0],d=h.target()[0],g=l(c),y=l(d),p=o[g],m=o[y];g!==y&&(s.merge(h),p.merge(m),o.splice(y,1))}return s}},Ac=Et({root:null,goal:null,weight:function(e){return 1},heuristic:function(e){return 0},directed:!1}),Lc={aStar:function(e){var r=this.cy(),a=Ac(e),n=a.root,i=a.goal,o=a.heuristic,s=a.directed,l=a.weight;n=r.collection(n)[0],i=r.collection(i)[0];var u=n.id(),f=i.id(),v={},h={},c={},d=new _a(function(z,F){return h[z.id()]-h[F.id()]}),g=new fa,y={},p={},m=function(F,V){d.push(F),g.add(V)},b,E,C=function(){b=d.pop(),E=b.id(),g.delete(E)},L=function(F){return g.has(F)};m(n,u),v[u]=0,h[u]=o(n);for(var D=0;d.size()>0;){if(C(),D++,E===f){for(var R=[],O=i,M=f,P=p[M];R.unshift(O),P!=null&&R.unshift(P),O=y[M],O!=null;)M=O.id(),P=p[M];return{found:!0,distance:v[E],path:this.spawn(R),steps:D}}c[E]=!0;for(var w=b._private.edges,x=0;x<w.length;x++){var T=w[x];if(this.hasElementWithId(T.id())&&!(s&&T.data("source")!==E)){var A=T.source(),S=T.target(),I=A.id()!==E?A:S,B=I.id();if(this.hasElementWithId(B)&&!c[B]){var k=v[E]+l(T);if(!L(B)){v[B]=k,h[B]=k+o(I),m(I,B),y[B]=b,p[B]=T;continue}k<v[B]&&(v[B]=k,h[B]=k+o(I),y[B]=b,p[B]=T)}}}}return{found:!1,distance:void 0,path:void 0,steps:D}}},Mc=Et({weight:function(e){return 1},directed:!1}),Rc={floydWarshall:function(e){for(var r=this.cy(),a=Mc(e),n=a.weight,i=a.directed,o=n,s=this.byGroup(),l=s.nodes,u=s.edges,f=l.length,v=f*f,h=function(Z){return l.indexOf(Z)},c=function(Z){return l[Z]},d=new Array(v),g=0;g<v;g++){var y=g%f,p=(g-y)/f;p===y?d[g]=0:d[g]=1/0}for(var m=new Array(v),b=new Array(v),E=0;E<u.length;E++){var C=u[E],L=C.source()[0],D=C.target()[0];if(L!==D){var R=h(L),O=h(D),M=R*f+O,P=o(C);if(d[M]>P&&(d[M]=P,m[M]=O,b[M]=C),!i){var w=O*f+R;!i&&d[w]>P&&(d[w]=P,m[w]=R,b[w]=C)}}}for(var x=0;x<f;x++)for(var T=0;T<f;T++)for(var A=T*f+x,S=0;S<f;S++){var I=T*f+S,B=x*f+S;d[A]+d[B]<d[I]&&(d[I]=d[A]+d[B],m[I]=m[A])}var k=function(Z){return(Me(Z)?r.filter(Z):Z)[0]},z=function(Z){return h(k(Z))},F={distance:function(Z,q){var _=z(Z),K=z(q);return d[_*f+K]},path:function(Z,q){var _=z(Z),K=z(q),U=c(_);if(_===K)return U.collection();if(m[_*f+K]==null)return r.collection();var J=r.collection(),$=_,H;for(J.merge(U);_!==K;)$=_,_=m[_*f+K],H=b[$*f+_],J.merge(H),J.merge(c(_));return J}};return F}},Nc=Et({weight:function(e){return 1},directed:!1,root:null}),Pc={bellmanFord:function(e){var r=this,a=Nc(e),n=a.weight,i=a.directed,o=a.root,s=n,l=this,u=this.cy(),f=this.byGroup(),v=f.edges,h=f.nodes,c=h.length,d=new nr,g=!1,y=[];o=u.collection(o)[0],v.unmergeBy(function(he){return he.isLoop()});for(var p=v.length,m=function(le){var ce=d.get(le.id());return ce||(ce={},d.set(le.id(),ce)),ce},b=function(le){return(Me(le)?u.$(le):le)[0]},E=function(le){return m(b(le)).dist},C=function(le){for(var ce=arguments.length>1&&arguments[1]!==void 0?arguments[1]:o,fe=b(le),ye=[],me=fe;;){if(me==null)return r.spawn();var Ee=m(me),be=Ee.edge,Ae=Ee.pred;if(ye.unshift(me[0]),me.same(ce)&&ye.length>0)break;be!=null&&ye.unshift(be),me=Ae}return l.spawn(ye)},L=0;L<c;L++){var D=h[L],R=m(D);D.same(o)?R.dist=0:R.dist=1/0,R.pred=null,R.edge=null}for(var O=!1,M=function(le,ce,fe,ye,me,Ee){var be=ye.dist+Ee;be<me.dist&&!fe.same(ye.edge)&&(me.dist=be,me.pred=le,me.edge=fe,O=!0)},P=1;P<c;P++){O=!1;for(var w=0;w<p;w++){var x=v[w],T=x.source(),A=x.target(),S=s(x),I=m(T),B=m(A);M(T,A,x,I,B,S),i||M(A,T,x,B,I,S)}if(!O)break}if(O)for(var k=[],z=0;z<p;z++){var F=v[z],V=F.source(),Z=F.target(),q=s(F),_=m(V).dist,K=m(Z).dist;if(_+q<K||!i&&K+q<_)if(g||(_e("Graph contains a negative weight cycle for Bellman-Ford"),g=!0),e.findNegativeWeightCycles!==!1){var U=[];_+q<K&&U.push(V),!i&&K+q<_&&U.push(Z);for(var J=U.length,$=0;$<J;$++){var H=U[$],Y=[H];Y.push(m(H).edge);for(var Q=m(H).pred;Y.indexOf(Q)===-1;)Y.push(Q),Y.push(m(Q).edge),Q=m(Q).pred;Y=Y.slice(Y.indexOf(Q));for(var oe=Y[0].id(),te=0,Te=2;Te<Y.length;Te+=2)Y[Te].id()<oe&&(oe=Y[Te].id(),te=Te);Y=Y.slice(te).concat(Y.slice(0,te)),Y.push(Y[0]);var Le=Y.map(function(he){return he.id()}).join(",");k.indexOf(Le)===-1&&(y.push(l.spawn(Y)),k.push(Le))}}else break}return{distanceTo:E,pathTo:C,hasNegativeWeightCycle:g,negativeWeightCycles:y}}},Oc=Math.sqrt(2),Ic=function(e,r,a){a.length===0&&rt("Karger-Stein must be run on a connected (sub)graph");for(var n=a[e],i=n[1],o=n[2],s=r[i],l=r[o],u=a,f=u.length-1;f>=0;f--){var v=u[f],h=v[1],c=v[2];(r[h]===s&&r[c]===l||r[h]===l&&r[c]===s)&&u.splice(f,1)}for(var d=0;d<u.length;d++){var g=u[d];g[1]===l?(u[d]=g.slice(),u[d][1]=s):g[2]===l&&(u[d]=g.slice(),u[d][2]=s)}for(var y=0;y<r.length;y++)r[y]===l&&(r[y]=s);return u},Mi=function(e,r,a,n){for(;a>n;){var i=Math.floor(Math.random()*r.length);r=Ic(i,e,r),a--}return r},Bc={kargerStein:function(){var e=this,r=this.byGroup(),a=r.nodes,n=r.edges;n.unmergeBy(function(B){return B.isLoop()});var i=a.length,o=n.length,s=Math.ceil(Math.pow(Math.log(i)/Math.LN2,2)),l=Math.floor(i/Oc);if(i<2){rt("At least 2 nodes are required for Karger-Stein algorithm");return}for(var u=[],f=0;f<o;f++){var v=n[f];u.push([f,a.indexOf(v.source()),a.indexOf(v.target())])}for(var h=1/0,c=[],d=new Array(i),g=new Array(i),y=new Array(i),p=function(k,z){for(var F=0;F<i;F++)z[F]=k[F]},m=0;m<=s;m++){for(var b=0;b<i;b++)g[b]=b;var E=Mi(g,u.slice(),i,l),C=E.slice();p(g,y);var L=Mi(g,E,l,2),D=Mi(y,C,l,2);L.length<=D.length&&L.length<h?(h=L.length,c=L,p(g,d)):D.length<=L.length&&D.length<h&&(h=D.length,c=D,p(y,d))}for(var R=this.spawn(c.map(function(B){return n[B[0]]})),O=this.spawn(),M=this.spawn(),P=d[0],w=0;w<d.length;w++){var x=d[w],T=a[w];x===P?O.merge(T):M.merge(T)}var A=function(k){var z=e.spawn();return k.forEach(function(F){z.merge(F),F.connectedEdges().forEach(function(V){e.contains(V)&&!R.contains(V)&&z.merge(V)})}),z},S=[A(O),A(M)],I={cut:R,components:S,partition1:O,partition2:M};return I}},Ri,Fc=function(e){return{x:e.x,y:e.y}},_n=function(e,r,a){return{x:e.x*r+a.x,y:e.y*r+a.y}},Ff=function(e,r,a){return{x:(e.x-a.x)/r,y:(e.y-a.y)/r}},ea=function(e){return{x:e[0],y:e[1]}},kc=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=1/0,i=r;i<a;i++){var o=e[i];isFinite(o)&&(n=Math.min(o,n))}return n},zc=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=-1/0,i=r;i<a;i++){var o=e[i];isFinite(o)&&(n=Math.max(o,n))}return n},Vc=function(e){for(var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=0,i=0,o=r;o<a;o++){var s=e[o];isFinite(s)&&(n+=s,i++)}return n/i},Gc=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:e.length,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0;n?e=e.slice(r,a):(a<e.length&&e.splice(a,e.length-a),r>0&&e.splice(0,r));for(var s=0,l=e.length-1;l>=0;l--){var u=e[l];o?isFinite(u)||(e[l]=-1/0,s++):e.splice(l,1)}i&&e.sort(function(h,c){return h-c});var f=e.length,v=Math.floor(f/2);return f%2!==0?e[v+1+s]:(e[v-1+s]+e[v+s])/2},Uc=function(e){return Math.PI*e/180},fn=function(e,r){return Math.atan2(r,e)-Math.PI/2},ys=Math.log2||function(t){return Math.log(t)/Math.log(2)},ms=function(e){return e>0?1:e<0?-1:0},Vr=function(e,r){return Math.sqrt(Or(e,r))},Or=function(e,r){var a=r.x-e.x,n=r.y-e.y;return a*a+n*n},Hc=function(e){for(var r=e.length,a=0,n=0;n<r;n++)a+=e[n];for(var i=0;i<r;i++)e[i]=e[i]/a;return e},pt=function(e,r,a,n){return(1-n)*(1-n)*e+2*(1-n)*n*r+n*n*a},aa=function(e,r,a,n){return{x:pt(e.x,r.x,a.x,n),y:pt(e.y,r.y,a.y,n)}},qc=function(e,r,a,n){var i={x:r.x-e.x,y:r.y-e.y},o=Vr(e,r),s={x:i.x/o,y:i.y/o};return a=a??0,n=n??a*o,{x:e.x+s.x*n,y:e.y+s.y*n}},Fa=function(e,r,a){return Math.max(e,Math.min(a,r))},Lt=function(e){if(e==null)return{x1:1/0,y1:1/0,x2:-1/0,y2:-1/0,w:0,h:0};if(e.x1!=null&&e.y1!=null){if(e.x2!=null&&e.y2!=null&&e.x2>=e.x1&&e.y2>=e.y1)return{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,w:e.x2-e.x1,h:e.y2-e.y1};if(e.w!=null&&e.h!=null&&e.w>=0&&e.h>=0)return{x1:e.x1,y1:e.y1,x2:e.x1+e.w,y2:e.y1+e.h,w:e.w,h:e.h}}},Yc=function(e){return{x1:e.x1,x2:e.x2,w:e.w,y1:e.y1,y2:e.y2,h:e.h}},Wc=function(e){e.x1=1/0,e.y1=1/0,e.x2=-1/0,e.y2=-1/0,e.w=0,e.h=0},Xc=function(e,r){e.x1=Math.min(e.x1,r.x1),e.x2=Math.max(e.x2,r.x2),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,r.y1),e.y2=Math.max(e.y2,r.y2),e.h=e.y2-e.y1},kf=function(e,r,a){e.x1=Math.min(e.x1,r),e.x2=Math.max(e.x2,r),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,a),e.y2=Math.max(e.y2,a),e.h=e.y2-e.y1},xn=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return e.x1-=r,e.x2+=r,e.y1-=r,e.y2+=r,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},Tn=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[0],a,n,i,o;if(r.length===1)a=n=i=o=r[0];else if(r.length===2)a=i=r[0],o=n=r[1];else if(r.length===4){var s=vt(r,4);a=s[0],n=s[1],i=s[2],o=s[3]}return e.x1-=o,e.x2+=n,e.y1-=a,e.y2+=i,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},fu=function(e,r){e.x1=r.x1,e.y1=r.y1,e.x2=r.x2,e.y2=r.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1},bs=function(e,r){return!(e.x1>r.x2||r.x1>e.x2||e.x2<r.x1||r.x2<e.x1||e.y2<r.y1||r.y2<e.y1||e.y1>r.y2||r.y1>e.y2)},gr=function(e,r,a){return e.x1<=r&&r<=e.x2&&e.y1<=a&&a<=e.y2},vu=function(e,r){return gr(e,r.x,r.y)},zf=function(e,r){return gr(e,r.x1,r.y1)&&gr(e,r.x2,r.y2)},$c=(Ri=Math.hypot)!==null&&Ri!==void 0?Ri:function(t,e){return Math.sqrt(t*t+e*e)};function Kc(t,e){if(t.length<3)throw new Error("Need at least 3 vertices");var r=function(R,O){return{x:R.x+O.x,y:R.y+O.y}},a=function(R,O){return{x:R.x-O.x,y:R.y-O.y}},n=function(R,O){return{x:R.x*O,y:R.y*O}},i=function(R,O){return R.x*O.y-R.y*O.x},o=function(R){var O=$c(R.x,R.y);return O===0?{x:0,y:0}:{x:R.x/O,y:R.y/O}},s=function(R){for(var O=0,M=0;M<R.length;M++){var P=R[M],w=R[(M+1)%R.length];O+=P.x*w.y-w.x*P.y}return O/2},l=function(R,O,M,P){var w=a(O,R),x=a(P,M),T=i(w,x);if(Math.abs(T)<1e-9)return r(R,n(w,.5));var A=i(a(M,R),x)/T;return r(R,n(w,A))},u=t.map(function(D){return{x:D.x,y:D.y}});s(u)<0&&u.reverse();for(var f=u.length,v=[],h=0;h<f;h++){var c=u[h],d=u[(h+1)%f],g=a(d,c),y=o({x:g.y,y:-g.x});v.push(y)}for(var p=v.map(function(D,R){var O=r(u[R],n(D,e)),M=r(u[(R+1)%f],n(D,e));return{p1:O,p2:M}}),m=[],b=0;b<f;b++){var E=p[(b-1+f)%f],C=p[b],L=l(E.p1,E.p2,C.p1,C.p2);m.push(L)}return m}function _c(t,e,r,a,n,i){var o=nd(t,e,r,a,n),s=Kc(o,i),l=Lt();return s.forEach(function(u){return kf(l,u.x,u.y)}),l}var Vf=function(e,r,a,n,i,o,s){var l=arguments.length>7&&arguments[7]!==void 0?arguments[7]:"auto",u=l==="auto"?Er(i,o):l,f=i/2,v=o/2;u=Math.min(u,f,v);var h=u!==f,c=u!==v,d;if(h){var g=a-f+u-s,y=n-v-s,p=a+f-u+s,m=y;if(d=pr(e,r,a,n,g,y,p,m,!1),d.length>0)return d}if(c){var b=a+f+s,E=n-v+u-s,C=b,L=n+v-u+s;if(d=pr(e,r,a,n,b,E,C,L,!1),d.length>0)return d}if(h){var D=a-f+u-s,R=n+v+s,O=a+f-u+s,M=R;if(d=pr(e,r,a,n,D,R,O,M,!1),d.length>0)return d}if(c){var P=a-f-s,w=n-v+u-s,x=P,T=n+v-u+s;if(d=pr(e,r,a,n,P,w,x,T,!1),d.length>0)return d}var A;{var S=a-f+u,I=n-v+u;if(A=Aa(e,r,a,n,S,I,u+s),A.length>0&&A[0]<=S&&A[1]<=I)return[A[0],A[1]]}{var B=a+f-u,k=n-v+u;if(A=Aa(e,r,a,n,B,k,u+s),A.length>0&&A[0]>=B&&A[1]<=k)return[A[0],A[1]]}{var z=a+f-u,F=n+v-u;if(A=Aa(e,r,a,n,z,F,u+s),A.length>0&&A[0]>=z&&A[1]>=F)return[A[0],A[1]]}{var V=a-f+u,Z=n+v-u;if(A=Aa(e,r,a,n,V,Z,u+s),A.length>0&&A[0]<=V&&A[1]>=Z)return[A[0],A[1]]}return[]},Zc=function(e,r,a,n,i,o,s){var l=s,u=Math.min(a,i),f=Math.max(a,i),v=Math.min(n,o),h=Math.max(n,o);return u-l<=e&&e<=f+l&&v-l<=r&&r<=h+l},Qc=function(e,r,a,n,i,o,s,l,u){var f={x1:Math.min(a,s,i)-u,x2:Math.max(a,s,i)+u,y1:Math.min(n,l,o)-u,y2:Math.max(n,l,o)+u};return!(e<f.x1||e>f.x2||r<f.y1||r>f.y2)},Jc=function(e,r,a,n){a-=n;var i=r*r-4*e*a;if(i<0)return[];var o=Math.sqrt(i),s=2*e,l=(-r+o)/s,u=(-r-o)/s;return[l,u]},jc=function(e,r,a,n,i){var o=1e-5;e===0&&(e=o),r/=e,a/=e,n/=e;var s,l,u,f,v,h,c,d;if(l=(3*a-r*r)/9,u=-(27*n)+r*(9*a-2*(r*r)),u/=54,s=l*l*l+u*u,i[1]=0,c=r/3,s>0){v=u+Math.sqrt(s),v=v<0?-Math.pow(-v,1/3):Math.pow(v,1/3),h=u-Math.sqrt(s),h=h<0?-Math.pow(-h,1/3):Math.pow(h,1/3),i[0]=-c+v+h,c+=(v+h)/2,i[4]=i[2]=-c,c=Math.sqrt(3)*(-h+v)/2,i[3]=c,i[5]=-c;return}if(i[5]=i[3]=0,s===0){d=u<0?-Math.pow(-u,1/3):Math.pow(u,1/3),i[0]=-c+2*d,i[4]=i[2]=-(d+c);return}l=-l,f=l*l*l,f=Math.acos(u/Math.sqrt(f)),d=2*Math.sqrt(l),i[0]=-c+d*Math.cos(f/3),i[2]=-c+d*Math.cos((f+2*Math.PI)/3),i[4]=-c+d*Math.cos((f+4*Math.PI)/3)},ed=function(e,r,a,n,i,o,s,l){var u=1*a*a-4*a*i+2*a*s+4*i*i-4*i*s+s*s+n*n-4*n*o+2*n*l+4*o*o-4*o*l+l*l,f=9*a*i-3*a*a-3*a*s-6*i*i+3*i*s+9*n*o-3*n*n-3*n*l-6*o*o+3*o*l,v=3*a*a-6*a*i+a*s-a*e+2*i*i+2*i*e-s*e+3*n*n-6*n*o+n*l-n*r+2*o*o+2*o*r-l*r,h=1*a*i-a*a+a*e-i*e+n*o-n*n+n*r-o*r,c=[];jc(u,f,v,h,c);for(var d=1e-7,g=[],y=0;y<6;y+=2)Math.abs(c[y+1])<d&&c[y]>=0&&c[y]<=1&&g.push(c[y]);g.push(1),g.push(0);for(var p=-1,m,b,E,C=0;C<g.length;C++)m=Math.pow(1-g[C],2)*a+2*(1-g[C])*g[C]*i+g[C]*g[C]*s,b=Math.pow(1-g[C],2)*n+2*(1-g[C])*g[C]*o+g[C]*g[C]*l,E=Math.pow(m-e,2)+Math.pow(b-r,2),p>=0?E<p&&(p=E):p=E;return p},td=function(e,r,a,n,i,o){var s=[e-a,r-n],l=[i-a,o-n],u=l[0]*l[0]+l[1]*l[1],f=s[0]*s[0]+s[1]*s[1],v=s[0]*l[0]+s[1]*l[1],h=v*v/u;return v<0?f:h>u?(e-i)*(e-i)+(r-o)*(r-o):f-h},It=function(e,r,a){for(var n,i,o,s,l,u=0,f=0;f<a.length/2;f++)if(n=a[f*2],i=a[f*2+1],f+1<a.length/2?(o=a[(f+1)*2],s=a[(f+1)*2+1]):(o=a[(f+1-a.length/2)*2],s=a[(f+1-a.length/2)*2+1]),!(n==e&&o==e))if(n>=e&&e>=o||n<=e&&e<=o)l=(e-n)/(o-n)*(s-i)+i,l>r&&u++;else continue;return u%2!==0},or=function(e,r,a,n,i,o,s,l,u){var f=new Array(a.length),v;l[0]!=null?(v=Math.atan(l[1]/l[0]),l[0]<0?v=v+Math.PI/2:v=-v-Math.PI/2):v=l;for(var h=Math.cos(-v),c=Math.sin(-v),d=0;d<f.length/2;d++)f[d*2]=o/2*(a[d*2]*h-a[d*2+1]*c),f[d*2+1]=s/2*(a[d*2+1]*h+a[d*2]*c),f[d*2]+=n,f[d*2+1]+=i;var g;if(u>0){var y=kn(f,-u);g=Fn(y)}else g=f;return It(e,r,g)},rd=function(e,r,a,n,i,o,s,l){for(var u=new Array(a.length*2),f=0;f<l.length;f++){var v=l[f];u[f*4+0]=v.startX,u[f*4+1]=v.startY,u[f*4+2]=v.stopX,u[f*4+3]=v.stopY;var h=Math.pow(v.cx-e,2)+Math.pow(v.cy-r,2);if(h<=Math.pow(v.radius,2))return!0}return It(e,r,u)},Fn=function(e){for(var r=new Array(e.length/2),a,n,i,o,s,l,u,f,v=0;v<e.length/4;v++){a=e[v*4],n=e[v*4+1],i=e[v*4+2],o=e[v*4+3],v<e.length/4-1?(s=e[(v+1)*4],l=e[(v+1)*4+1],u=e[(v+1)*4+2],f=e[(v+1)*4+3]):(s=e[0],l=e[1],u=e[2],f=e[3]);var h=pr(a,n,i,o,s,l,u,f,!0);r[v*2]=h[0],r[v*2+1]=h[1]}return r},kn=function(e,r){for(var a=new Array(e.length*2),n,i,o,s,l=0;l<e.length/2;l++){n=e[l*2],i=e[l*2+1],l<e.length/2-1?(o=e[(l+1)*2],s=e[(l+1)*2+1]):(o=e[0],s=e[1]);var u=s-i,f=-(o-n),v=Math.sqrt(u*u+f*f),h=u/v,c=f/v;a[l*4]=n+h*r,a[l*4+1]=i+c*r,a[l*4+2]=o+h*r,a[l*4+3]=s+c*r}return a},ad=function(e,r,a,n,i,o){var s=a-e,l=n-r;s/=i,l/=o;var u=Math.sqrt(s*s+l*l),f=u-1;if(f<0)return[];var v=f/u;return[(a-e)*v+e,(n-r)*v+r]},kr=function(e,r,a,n,i,o,s){return e-=i,r-=o,e/=a/2+s,r/=n/2+s,e*e+r*r<=1},Aa=function(e,r,a,n,i,o,s){var l=[a-e,n-r],u=[e-i,r-o],f=l[0]*l[0]+l[1]*l[1],v=2*(u[0]*l[0]+u[1]*l[1]),h=u[0]*u[0]+u[1]*u[1]-s*s,c=v*v-4*f*h;if(c<0)return[];var d=(-v+Math.sqrt(c))/(2*f),g=(-v-Math.sqrt(c))/(2*f),y=Math.min(d,g),p=Math.max(d,g),m=[];if(y>=0&&y<=1&&m.push(y),p>=0&&p<=1&&m.push(p),m.length===0)return[];var b=m[0]*l[0]+e,E=m[0]*l[1]+r;if(m.length>1){if(m[0]==m[1])return[b,E];var C=m[1]*l[0]+e,L=m[1]*l[1]+r;return[b,E,C,L]}else return[b,E]},Ni=function(e,r,a){return r<=e&&e<=a||a<=e&&e<=r?e:e<=r&&r<=a||a<=r&&r<=e?r:a},pr=function(e,r,a,n,i,o,s,l,u){var f=e-i,v=a-e,h=s-i,c=r-o,d=n-r,g=l-o,y=h*c-g*f,p=v*c-d*f,m=g*v-h*d;if(m!==0){var b=y/m,E=p/m,C=.001,L=0-C,D=1+C;return L<=b&&b<=D&&L<=E&&E<=D?[e+b*v,r+b*d]:u?[e+b*v,r+b*d]:[]}else return y===0||p===0?Ni(e,a,s)===s?[s,l]:Ni(e,a,i)===i?[i,o]:Ni(i,s,a)===a?[a,n]:[]:[]},nd=function(e,r,a,n,i){var o=[],s=n/2,l=i/2,u=r,f=a;o.push({x:u+s*e[0],y:f+l*e[1]});for(var v=1;v<e.length/2;v++)o.push({x:u+s*e[v*2],y:f+l*e[v*2+1]});return o},ka=function(e,r,a,n,i,o,s,l){var u=[],f,v=new Array(a.length),h=!0;o==null&&(h=!1);var c;if(h){for(var d=0;d<v.length/2;d++)v[d*2]=a[d*2]*o+n,v[d*2+1]=a[d*2+1]*s+i;if(l>0){var g=kn(v,-l);c=Fn(g)}else c=v}else c=a;for(var y,p,m,b,E=0;E<c.length/2;E++)y=c[E*2],p=c[E*2+1],E<c.length/2-1?(m=c[(E+1)*2],b=c[(E+1)*2+1]):(m=c[0],b=c[1]),f=pr(e,r,n,i,y,p,m,b),f.length!==0&&u.push(f[0],f[1]);return u},id=function(e,r,a,n,i,o,s,l,u){var f=[],v,h=new Array(a.length*2);u.forEach(function(m,b){b===0?(h[h.length-2]=m.startX,h[h.length-1]=m.startY):(h[b*4-2]=m.startX,h[b*4-1]=m.startY),h[b*4]=m.stopX,h[b*4+1]=m.stopY,v=Aa(e,r,n,i,m.cx,m.cy,m.radius),v.length!==0&&f.push(v[0],v[1])});for(var c=0;c<h.length/4;c++)v=pr(e,r,n,i,h[c*4],h[c*4+1],h[c*4+2],h[c*4+3],!1),v.length!==0&&f.push(v[0],v[1]);if(f.length>2){for(var d=[f[0],f[1]],g=Math.pow(d[0]-e,2)+Math.pow(d[1]-r,2),y=1;y<f.length/2;y++){var p=Math.pow(f[y*2]-e,2)+Math.pow(f[y*2+1]-r,2);p<=g&&(d[0]=f[y*2],d[1]=f[y*2+1],g=p)}return d}return f},vn=function(e,r,a){var n=[e[0]-r[0],e[1]-r[1]],i=Math.sqrt(n[0]*n[0]+n[1]*n[1]),o=(i-a)/i;return o<0&&(o=1e-5),[r[0]+o*n[0],r[1]+o*n[1]]},At=function(e,r){var a=Wo(e,r);return a=Gf(a),a},Gf=function(e){for(var r,a,n=e.length/2,i=1/0,o=1/0,s=-1/0,l=-1/0,u=0;u<n;u++)r=e[2*u],a=e[2*u+1],i=Math.min(i,r),s=Math.max(s,r),o=Math.min(o,a),l=Math.max(l,a);for(var f=2/(s-i),v=2/(l-o),h=0;h<n;h++)r=e[2*h]=e[2*h]*f,a=e[2*h+1]=e[2*h+1]*v,i=Math.min(i,r),s=Math.max(s,r),o=Math.min(o,a),l=Math.max(l,a);if(o<-1)for(var c=0;c<n;c++)a=e[2*c+1]=e[2*c+1]+(-1-o);return e},Wo=function(e,r){var a=1/e*2*Math.PI,n=e%2===0?Math.PI/2+a/2:Math.PI/2;n+=r;for(var i=new Array(e*2),o,s=0;s<e;s++)o=s*a+n,i[2*s]=Math.cos(o),i[2*s+1]=Math.sin(-o);return i},Er=function(e,r){return Math.min(e/4,r/4,8)},Uf=function(e,r){return Math.min(e/10,r/10,8)},ws=function(){return 8},od=function(e,r,a){return[e-2*r+a,2*(r-e),e]},Xo=function(e,r){return{heightOffset:Math.min(15,.05*r),widthOffset:Math.min(100,.25*e),ctrlPtOffsetPct:.05}};function Pi(t,e){function r(v){for(var h=[],c=0;c<v.length;c++){var d=v[c],g=v[(c+1)%v.length],y={x:g.x-d.x,y:g.y-d.y},p={x:-y.y,y:y.x},m=Math.sqrt(p.x*p.x+p.y*p.y);h.push({x:p.x/m,y:p.y/m})}return h}function a(v,h){var c=1/0,d=-1/0,g=Bt(v),y;try{for(g.s();!(y=g.n()).done;){var p=y.value,m=p.x*h.x+p.y*h.y;c=Math.min(c,m),d=Math.max(d,m)}}catch(b){g.e(b)}finally{g.f()}return{min:c,max:d}}function n(v,h){return!(v.max<h.min||h.max<v.min)}var i=[].concat(Pn(r(t)),Pn(r(e))),o=Bt(i),s;try{for(o.s();!(s=o.n()).done;){var l=s.value,u=a(t,l),f=a(e,l);if(!n(u,f))return!1}}catch(v){o.e(v)}finally{o.f()}return!0}var sd=Et({dampingFactor:.8,precision:1e-6,iterations:200,weight:function(e){return 1}}),ud={pageRank:function(e){for(var r=sd(e),a=r.dampingFactor,n=r.precision,i=r.iterations,o=r.weight,s=this._private.cy,l=this.byGroup(),u=l.nodes,f=l.edges,v=u.length,h=v*v,c=f.length,d=new Array(h),g=new Array(v),y=(1-a)/v,p=0;p<v;p++){for(var m=0;m<v;m++){var b=p*v+m;d[b]=0}g[p]=0}for(var E=0;E<c;E++){var C=f[E],L=C.data("source"),D=C.data("target");if(L!==D){var R=u.indexOfId(L),O=u.indexOfId(D),M=o(C),P=O*v+R;d[P]+=M,g[R]+=M}}for(var w=1/v+y,x=0;x<v;x++)if(g[x]===0)for(var T=0;T<v;T++){var A=T*v+x;d[A]=w}else for(var S=0;S<v;S++){var I=S*v+x;d[I]=d[I]/g[x]+y}for(var B=new Array(v),k=new Array(v),z,F=0;F<v;F++)B[F]=1;for(var V=0;V<i;V++){for(var Z=0;Z<v;Z++)k[Z]=0;for(var q=0;q<v;q++)for(var _=0;_<v;_++){var K=q*v+_;k[q]+=d[K]*B[_]}Hc(k),z=B,B=k,k=z;for(var U=0,J=0;J<v;J++){var $=z[J]-B[J];U+=$*$}if(U<n)break}var H={rank:function(Q){return Q=s.collection(Q)[0],B[u.indexOf(Q)]}};return H}},hu=Et({root:null,weight:function(e){return 1},directed:!1,alpha:0}),na={degreeCentralityNormalized:function(e){e=hu(e);var r=this.cy(),a=this.nodes(),n=a.length;if(e.directed){for(var f={},v={},h=0,c=0,d=0;d<n;d++){var g=a[d],y=g.id();e.root=g;var p=this.degreeCentrality(e);h<p.indegree&&(h=p.indegree),c<p.outdegree&&(c=p.outdegree),f[y]=p.indegree,v[y]=p.outdegree}return{indegree:function(b){return h==0?0:(Me(b)&&(b=r.filter(b)),f[b.id()]/h)},outdegree:function(b){return c===0?0:(Me(b)&&(b=r.filter(b)),v[b.id()]/c)}}}else{for(var i={},o=0,s=0;s<n;s++){var l=a[s];e.root=l;var u=this.degreeCentrality(e);o<u.degree&&(o=u.degree),i[l.id()]=u.degree}return{degree:function(b){return o===0?0:(Me(b)&&(b=r.filter(b)),i[b.id()]/o)}}}},degreeCentrality:function(e){e=hu(e);var r=this.cy(),a=this,n=e,i=n.root,o=n.weight,s=n.directed,l=n.alpha;if(i=r.collection(i)[0],s){for(var c=i.connectedEdges(),d=c.filter(function(L){return L.target().same(i)&&a.has(L)}),g=c.filter(function(L){return L.source().same(i)&&a.has(L)}),y=d.length,p=g.length,m=0,b=0,E=0;E<d.length;E++)m+=o(d[E]);for(var C=0;C<g.length;C++)b+=o(g[C]);return{indegree:Math.pow(y,1-l)*Math.pow(m,l),outdegree:Math.pow(p,1-l)*Math.pow(b,l)}}else{for(var u=i.connectedEdges().intersection(a),f=u.length,v=0,h=0;h<u.length;h++)v+=o(u[h]);return{degree:Math.pow(f,1-l)*Math.pow(v,l)}}}};na.dc=na.degreeCentrality;na.dcn=na.degreeCentralityNormalised=na.degreeCentralityNormalized;var cu=Et({harmonic:!0,weight:function(){return 1},directed:!1,root:null}),ia={closenessCentralityNormalized:function(e){for(var r=cu(e),a=r.harmonic,n=r.weight,i=r.directed,o=this.cy(),s={},l=0,u=this.nodes(),f=this.floydWarshall({weight:n,directed:i}),v=0;v<u.length;v++){for(var h=0,c=u[v],d=0;d<u.length;d++)if(v!==d){var g=f.distance(c,u[d]);a?h+=1/g:h+=g}a||(h=1/h),l<h&&(l=h),s[c.id()]=h}return{closeness:function(p){return l==0?0:(Me(p)?p=o.filter(p)[0].id():p=p.id(),s[p]/l)}}},closenessCentrality:function(e){var r=cu(e),a=r.root,n=r.weight,i=r.directed,o=r.harmonic;a=this.filter(a)[0];for(var s=this.dijkstra({root:a,weight:n,directed:i}),l=0,u=this.nodes(),f=0;f<u.length;f++){var v=u[f];if(!v.same(a)){var h=s.distanceTo(v);o?l+=1/h:l+=h}}return o?l:1/l}};ia.cc=ia.closenessCentrality;ia.ccn=ia.closenessCentralityNormalised=ia.closenessCentralityNormalized;var ld=Et({weight:null,directed:!1}),$o={betweennessCentrality:function(e){for(var r=ld(e),a=r.directed,n=r.weight,i=n!=null,o=this.cy(),s=this.nodes(),l={},u={},f=0,v={set:function(b,E){u[b]=E,E>f&&(f=E)},get:function(b){return u[b]}},h=0;h<s.length;h++){var c=s[h],d=c.id();a?l[d]=c.outgoers().nodes():l[d]=c.openNeighborhood().nodes(),v.set(d,0)}for(var g=function(){for(var b=s[y].id(),E=[],C={},L={},D={},R=new _a(function(q,_){return D[q]-D[_]}),O=0;O<s.length;O++){var M=s[O].id();C[M]=[],L[M]=0,D[M]=1/0}for(L[b]=1,D[b]=0,R.push(b);!R.empty();){var P=R.pop();if(E.push(P),i)for(var w=0;w<l[P].length;w++){var x=l[P][w],T=o.getElementById(P),A=void 0;T.edgesTo(x).length>0?A=T.edgesTo(x)[0]:A=x.edgesTo(T)[0];var S=n(A);x=x.id(),D[x]>D[P]+S&&(D[x]=D[P]+S,R.nodes.indexOf(x)<0?R.push(x):R.updateItem(x),L[x]=0,C[x]=[]),D[x]==D[P]+S&&(L[x]=L[x]+L[P],C[x].push(P))}else for(var I=0;I<l[P].length;I++){var B=l[P][I].id();D[B]==1/0&&(R.push(B),D[B]=D[P]+1),D[B]==D[P]+1&&(L[B]=L[B]+L[P],C[B].push(P))}}for(var k={},z=0;z<s.length;z++)k[s[z].id()]=0;for(;E.length>0;){for(var F=E.pop(),V=0;V<C[F].length;V++){var Z=C[F][V];k[Z]=k[Z]+L[Z]/L[F]*(1+k[F])}F!=s[y].id()&&v.set(F,v.get(F)+k[F])}},y=0;y<s.length;y++)g();var p={betweenness:function(b){var E=o.collection(b).id();return v.get(E)},betweennessNormalized:function(b){if(f==0)return 0;var E=o.collection(b).id();return v.get(E)/f}};return p.betweennessNormalised=p.betweennessNormalized,p}};$o.bc=$o.betweennessCentrality;var fd=Et({expandFactor:2,inflateFactor:2,multFactor:1,maxIterations:20,attributes:[function(t){return 1}]}),vd=function(e){return fd(e)},hd=function(e,r){for(var a=0,n=0;n<r.length;n++)a+=r[n](e);return a},cd=function(e,r,a){for(var n=0;n<r;n++)e[n*r+n]=a},Hf=function(e,r){for(var a,n=0;n<r;n++){a=0;for(var i=0;i<r;i++)a+=e[i*r+n];for(var o=0;o<r;o++)e[o*r+n]=e[o*r+n]/a}},dd=function(e,r,a){for(var n=new Array(a*a),i=0;i<a;i++){for(var o=0;o<a;o++)n[i*a+o]=0;for(var s=0;s<a;s++)for(var l=0;l<a;l++)n[i*a+l]+=e[i*a+s]*r[s*a+l]}return n},gd=function(e,r,a){for(var n=e.slice(0),i=1;i<a;i++)e=dd(e,n,r);return e},pd=function(e,r,a){for(var n=new Array(r*r),i=0;i<r*r;i++)n[i]=Math.pow(e[i],a);return Hf(n,r),n},yd=function(e,r,a,n){for(var i=0;i<a;i++){var o=Math.round(e[i]*Math.pow(10,n))/Math.pow(10,n),s=Math.round(r[i]*Math.pow(10,n))/Math.pow(10,n);if(o!==s)return!1}return!0},md=function(e,r,a,n){for(var i=[],o=0;o<r;o++){for(var s=[],l=0;l<r;l++)Math.round(e[o*r+l]*1e3)/1e3>0&&s.push(a[l]);s.length!==0&&i.push(n.collection(s))}return i},bd=function(e,r){for(var a=0;a<e.length;a++)if(!r[a]||e[a].id()!==r[a].id())return!1;return!0},wd=function(e){for(var r=0;r<e.length;r++)for(var a=0;a<e.length;a++)r!=a&&bd(e[r],e[a])&&e.splice(a,1);return e},du=function(e){for(var r=this.nodes(),a=this.edges(),n=this.cy(),i=vd(e),o={},s=0;s<r.length;s++)o[r[s].id()]=s;for(var l=r.length,u=l*l,f=new Array(u),v,h=0;h<u;h++)f[h]=0;for(var c=0;c<a.length;c++){var d=a[c],g=o[d.source().id()],y=o[d.target().id()],p=hd(d,i.attributes);f[g*l+y]+=p,f[y*l+g]+=p}cd(f,l,i.multFactor),Hf(f,l);for(var m=!0,b=0;m&&b<i.maxIterations;)m=!1,v=gd(f,l,i.expandFactor),f=pd(v,l,i.inflateFactor),yd(f,v,u,4)||(m=!0),b++;var E=md(f,l,r,n);return E=wd(E),E},Ed={markovClustering:du,mcl:du},xd=function(e){return e},qf=function(e,r){return Math.abs(r-e)},gu=function(e,r,a){return e+qf(r,a)},pu=function(e,r,a){return e+Math.pow(a-r,2)},Td=function(e){return Math.sqrt(e)},Cd=function(e,r,a){return Math.max(e,qf(r,a))},wa=function(e,r,a,n,i){for(var o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:xd,s=n,l,u,f=0;f<e;f++)l=r(f),u=a(f),s=i(s,l,u);return o(s)},ua={euclidean:function(e,r,a){return e>=2?wa(e,r,a,0,pu,Td):wa(e,r,a,0,gu)},squaredEuclidean:function(e,r,a){return wa(e,r,a,0,pu)},manhattan:function(e,r,a){return wa(e,r,a,0,gu)},max:function(e,r,a){return wa(e,r,a,-1/0,Cd)}};ua["squared-euclidean"]=ua.squaredEuclidean;ua.squaredeuclidean=ua.squaredEuclidean;function Zn(t,e,r,a,n,i){var o;return at(t)?o=t:o=ua[t]||ua.euclidean,e===0&&at(t)?o(n,i):o(e,r,a,n,i)}var Sd=Et({k:2,m:2,sensitivityThreshold:1e-4,distance:"euclidean",maxIterations:10,attributes:[],testMode:!1,testCentroids:null}),Es=function(e){return Sd(e)},zn=function(e,r,a,n,i){var o=i!=="kMedoids",s=o?function(v){return a[v]}:function(v){return n[v](a)},l=function(h){return n[h](r)},u=a,f=r;return Zn(e,n.length,s,l,u,f)},Oi=function(e,r,a){for(var n=a.length,i=new Array(n),o=new Array(n),s=new Array(r),l=null,u=0;u<n;u++)i[u]=e.min(a[u]).value,o[u]=e.max(a[u]).value;for(var f=0;f<r;f++){l=[];for(var v=0;v<n;v++)l[v]=Math.random()*(o[v]-i[v])+i[v];s[f]=l}return s},Yf=function(e,r,a,n,i){for(var o=1/0,s=0,l=0;l<r.length;l++){var u=zn(a,e,r[l],n,i);u<o&&(o=u,s=l)}return s},Wf=function(e,r,a){for(var n=[],i=null,o=0;o<r.length;o++)i=r[o],a[i.id()]===e&&n.push(i);return n},Dd=function(e,r,a){return Math.abs(r-e)<=a},Ad=function(e,r,a){for(var n=0;n<e.length;n++)for(var i=0;i<e[n].length;i++){var o=Math.abs(e[n][i]-r[n][i]);if(o>a)return!1}return!0},Ld=function(e,r,a){for(var n=0;n<a;n++)if(e===r[n])return!0;return!1},yu=function(e,r){var a=new Array(r);if(e.length<50)for(var n=0;n<r;n++){for(var i=e[Math.floor(Math.random()*e.length)];Ld(i,a,n);)i=e[Math.floor(Math.random()*e.length)];a[n]=i}else for(var o=0;o<r;o++)a[o]=e[Math.floor(Math.random()*e.length)];return a},mu=function(e,r,a){for(var n=0,i=0;i<r.length;i++)n+=zn("manhattan",r[i],e,a,"kMedoids");return n},Md=function(e){var r=this.cy(),a=this.nodes(),n=null,i=Es(e),o=new Array(i.k),s={},l;i.testMode?typeof i.testCentroids=="number"?(i.testCentroids,l=Oi(a,i.k,i.attributes)):dt(i.testCentroids)==="object"?l=i.testCentroids:l=Oi(a,i.k,i.attributes):l=Oi(a,i.k,i.attributes);for(var u=!0,f=0;u&&f<i.maxIterations;){for(var v=0;v<a.length;v++)n=a[v],s[n.id()]=Yf(n,l,i.distance,i.attributes,"kMeans");u=!1;for(var h=0;h<i.k;h++){var c=Wf(h,a,s);if(c.length!==0){for(var d=i.attributes.length,g=l[h],y=new Array(d),p=new Array(d),m=0;m<d;m++){p[m]=0;for(var b=0;b<c.length;b++)n=c[b],p[m]+=i.attributes[m](n);y[m]=p[m]/c.length,Dd(y[m],g[m],i.sensitivityThreshold)||(u=!0)}l[h]=y,o[h]=r.collection(c)}}f++}return o},Rd=function(e){var r=this.cy(),a=this.nodes(),n=null,i=Es(e),o=new Array(i.k),s,l={},u,f=new Array(i.k);i.testMode?typeof i.testCentroids=="number"||(dt(i.testCentroids)==="object"?s=i.testCentroids:s=yu(a,i.k)):s=yu(a,i.k);for(var v=!0,h=0;v&&h<i.maxIterations;){for(var c=0;c<a.length;c++)n=a[c],l[n.id()]=Yf(n,s,i.distance,i.attributes,"kMedoids");v=!1;for(var d=0;d<s.length;d++){var g=Wf(d,a,l);if(g.length!==0){f[d]=mu(s[d],g,i.attributes);for(var y=0;y<g.length;y++)u=mu(g[y],g,i.attributes),u<f[d]&&(f[d]=u,s[d]=g[y],v=!0);o[d]=r.collection(g)}}h++}return o},Nd=function(e,r,a,n,i){for(var o,s,l=0;l<r.length;l++)for(var u=0;u<e.length;u++)n[l][u]=Math.pow(a[l][u],i.m);for(var f=0;f<e.length;f++)for(var v=0;v<i.attributes.length;v++){o=0,s=0;for(var h=0;h<r.length;h++)o+=n[h][f]*i.attributes[v](r[h]),s+=n[h][f];e[f][v]=o/s}},Pd=function(e,r,a,n,i){for(var o=0;o<e.length;o++)r[o]=e[o].slice();for(var s,l,u,f=2/(i.m-1),v=0;v<a.length;v++)for(var h=0;h<n.length;h++){s=0;for(var c=0;c<a.length;c++)l=zn(i.distance,n[h],a[v],i.attributes,"cmeans"),u=zn(i.distance,n[h],a[c],i.attributes,"cmeans"),s+=Math.pow(l/u,f);e[h][v]=1/s}},Od=function(e,r,a,n){for(var i=new Array(a.k),o=0;o<i.length;o++)i[o]=[];for(var s,l,u=0;u<r.length;u++){s=-1/0,l=-1;for(var f=0;f<r[0].length;f++)r[u][f]>s&&(s=r[u][f],l=f);i[l].push(e[u])}for(var v=0;v<i.length;v++)i[v]=n.collection(i[v]);return i},bu=function(e){var r=this.cy(),a=this.nodes(),n=Es(e),i,o,s,l,u;l=new Array(a.length);for(var f=0;f<a.length;f++)l[f]=new Array(n.k);s=new Array(a.length);for(var v=0;v<a.length;v++)s[v]=new Array(n.k);for(var h=0;h<a.length;h++){for(var c=0,d=0;d<n.k;d++)s[h][d]=Math.random(),c+=s[h][d];for(var g=0;g<n.k;g++)s[h][g]=s[h][g]/c}o=new Array(n.k);for(var y=0;y<n.k;y++)o[y]=new Array(n.attributes.length);u=new Array(a.length);for(var p=0;p<a.length;p++)u[p]=new Array(n.k);for(var m=!0,b=0;m&&b<n.maxIterations;)m=!1,Nd(o,a,s,u,n),Pd(s,l,o,a,n),Ad(s,l,n.sensitivityThreshold)||(m=!0),b++;return i=Od(a,s,n,r),{clusters:i,degreeOfMembership:s}},Id={kMeans:Md,kMedoids:Rd,fuzzyCMeans:bu,fcm:bu},Bd=Et({distance:"euclidean",linkage:"min",mode:"threshold",threshold:1/0,addDendrogram:!1,dendrogramDepth:0,attributes:[]}),Fd={single:"min",complete:"max"},kd=function(e){var r=Bd(e),a=Fd[r.linkage];return a!=null&&(r.linkage=a),r},wu=function(e,r,a,n,i){for(var o=0,s=1/0,l,u=i.attributes,f=function(O,M){return Zn(i.distance,u.length,function(P){return u[P](O)},function(P){return u[P](M)},O,M)},v=0;v<e.length;v++){var h=e[v].key,c=a[h][n[h]];c<s&&(o=h,s=c)}if(i.mode==="threshold"&&s>=i.threshold||i.mode==="dendrogram"&&e.length===1)return!1;var d=r[o],g=r[n[o]],y;i.mode==="dendrogram"?y={left:d,right:g,key:d.key}:y={value:d.value.concat(g.value),key:d.key},e[d.index]=y,e.splice(g.index,1),r[d.key]=y;for(var p=0;p<e.length;p++){var m=e[p];d.key===m.key?l=1/0:i.linkage==="min"?(l=a[d.key][m.key],a[d.key][m.key]>a[g.key][m.key]&&(l=a[g.key][m.key])):i.linkage==="max"?(l=a[d.key][m.key],a[d.key][m.key]<a[g.key][m.key]&&(l=a[g.key][m.key])):i.linkage==="mean"?l=(a[d.key][m.key]*d.size+a[g.key][m.key]*g.size)/(d.size+g.size):i.mode==="dendrogram"?l=f(m.value,d.value):l=f(m.value[0],d.value[0]),a[d.key][m.key]=a[m.key][d.key]=l}for(var b=0;b<e.length;b++){var E=e[b].key;if(n[E]===d.key||n[E]===g.key){for(var C=E,L=0;L<e.length;L++){var D=e[L].key;a[E][D]<a[E][C]&&(C=D)}n[E]=C}e[b].index=b}return d.key=g.key=d.index=g.index=null,!0},ta=function(e,r,a){e&&(e.value?r.push(e.value):(e.left&&ta(e.left,r),e.right&&ta(e.right,r)))},Ko=function(e,r){if(!e)return"";if(e.left&&e.right){var a=Ko(e.left,r),n=Ko(e.right,r),i=r.add({group:"nodes",data:{id:a+","+n}});return r.add({group:"edges",data:{source:a,target:i.id()}}),r.add({group:"edges",data:{source:n,target:i.id()}}),i.id()}else if(e.value)return e.value.id()},_o=function(e,r,a){if(!e)return[];var n=[],i=[],o=[];return r===0?(e.left&&ta(e.left,n),e.right&&ta(e.right,i),o=n.concat(i),[a.collection(o)]):r===1?e.value?[a.collection(e.value)]:(e.left&&ta(e.left,n),e.right&&ta(e.right,i),[a.collection(n),a.collection(i)]):e.value?[a.collection(e.value)]:(e.left&&(n=_o(e.left,r-1,a)),e.right&&(i=_o(e.right,r-1,a)),n.concat(i))},Eu=function(e){for(var r=this.cy(),a=this.nodes(),n=kd(e),i=n.attributes,o=function(b,E){return Zn(n.distance,i.length,function(C){return i[C](b)},function(C){return i[C](E)},b,E)},s=[],l=[],u=[],f=[],v=0;v<a.length;v++){var h={value:n.mode==="dendrogram"?a[v]:[a[v]],key:v,index:v};s[v]=h,f[v]=h,l[v]=[],u[v]=0}for(var c=0;c<s.length;c++)for(var d=0;d<=c;d++){var g=void 0;n.mode==="dendrogram"?g=c===d?1/0:o(s[c].value,s[d].value):g=c===d?1/0:o(s[c].value[0],s[d].value[0]),l[c][d]=g,l[d][c]=g,g<l[c][u[c]]&&(u[c]=d)}for(var y=wu(s,f,l,u,n);y;)y=wu(s,f,l,u,n);var p;return n.mode==="dendrogram"?(p=_o(s[0],n.dendrogramDepth,r),n.addDendrogram&&Ko(s[0],r)):(p=new Array(s.length),s.forEach(function(m,b){m.key=m.index=null,p[b]=r.collection(m.value)})),p},zd={hierarchicalClustering:Eu,hca:Eu},Vd=Et({distance:"euclidean",preference:"median",damping:.8,maxIterations:1e3,minIterations:100,attributes:[]}),Gd=function(e){var r=e.damping,a=e.preference;.5<=r&&r<1||rt("Damping must range on [0.5, 1).  Got: ".concat(r));var n=["median","mean","min","max"];return n.some(function(i){return i===a})||xe(a)||rt("Preference must be one of [".concat(n.map(function(i){return"'".concat(i,"'")}).join(", "),"] or a number.  Got: ").concat(a)),Vd(e)},Ud=function(e,r,a,n){var i=function(s,l){return n[l](s)};return-Zn(e,n.length,function(o){return i(r,o)},function(o){return i(a,o)},r,a)},Hd=function(e,r){var a=null;return r==="median"?a=Gc(e):r==="mean"?a=Vc(e):r==="min"?a=kc(e):r==="max"?a=zc(e):a=r,a},qd=function(e,r,a){for(var n=[],i=0;i<e;i++)r[i*e+i]+a[i*e+i]>0&&n.push(i);return n},xu=function(e,r,a){for(var n=[],i=0;i<e;i++){for(var o=-1,s=-1/0,l=0;l<a.length;l++){var u=a[l];r[i*e+u]>s&&(o=u,s=r[i*e+u])}o>0&&n.push(o)}for(var f=0;f<a.length;f++)n[a[f]]=a[f];return n},Yd=function(e,r,a){for(var n=xu(e,r,a),i=0;i<a.length;i++){for(var o=[],s=0;s<n.length;s++)n[s]===a[i]&&o.push(s);for(var l=-1,u=-1/0,f=0;f<o.length;f++){for(var v=0,h=0;h<o.length;h++)v+=r[o[h]*e+o[f]];v>u&&(l=f,u=v)}a[i]=o[l]}return n=xu(e,r,a),n},Tu=function(e){for(var r=this.cy(),a=this.nodes(),n=Gd(e),i={},o=0;o<a.length;o++)i[a[o].id()]=o;var s,l,u,f,v,h;s=a.length,l=s*s,u=new Array(l);for(var c=0;c<l;c++)u[c]=-1/0;for(var d=0;d<s;d++)for(var g=0;g<s;g++)d!==g&&(u[d*s+g]=Ud(n.distance,a[d],a[g],n.attributes));f=Hd(u,n.preference);for(var y=0;y<s;y++)u[y*s+y]=f;v=new Array(l);for(var p=0;p<l;p++)v[p]=0;h=new Array(l);for(var m=0;m<l;m++)h[m]=0;for(var b=new Array(s),E=new Array(s),C=new Array(s),L=0;L<s;L++)b[L]=0,E[L]=0,C[L]=0;for(var D=new Array(s*n.minIterations),R=0;R<D.length;R++)D[R]=0;var O;for(O=0;O<n.maxIterations;O++){for(var M=0;M<s;M++){for(var P=-1/0,w=-1/0,x=-1,T=0,A=0;A<s;A++)b[A]=v[M*s+A],T=h[M*s+A]+u[M*s+A],T>=P?(w=P,P=T,x=A):T>w&&(w=T);for(var S=0;S<s;S++)v[M*s+S]=(1-n.damping)*(u[M*s+S]-P)+n.damping*b[S];v[M*s+x]=(1-n.damping)*(u[M*s+x]-w)+n.damping*b[x]}for(var I=0;I<s;I++){for(var B=0,k=0;k<s;k++)b[k]=h[k*s+I],E[k]=Math.max(0,v[k*s+I]),B+=E[k];B-=E[I],E[I]=v[I*s+I],B+=E[I];for(var z=0;z<s;z++)h[z*s+I]=(1-n.damping)*Math.min(0,B-E[z])+n.damping*b[z];h[I*s+I]=(1-n.damping)*(B-E[I])+n.damping*b[I]}for(var F=0,V=0;V<s;V++){var Z=h[V*s+V]+v[V*s+V]>0?1:0;D[O%n.minIterations*s+V]=Z,F+=Z}if(F>0&&(O>=n.minIterations-1||O==n.maxIterations-1)){for(var q=0,_=0;_<s;_++){C[_]=0;for(var K=0;K<n.minIterations;K++)C[_]+=D[K*s+_];(C[_]===0||C[_]===n.minIterations)&&q++}if(q===s)break}}for(var U=qd(s,v,h),J=Yd(s,u,U),$={},H=0;H<U.length;H++)$[U[H]]=[];for(var Y=0;Y<a.length;Y++){var Q=i[a[Y].id()],oe=J[Q];oe!=null&&$[oe].push(a[Y])}for(var te=new Array(U.length),Te=0;Te<U.length;Te++)te[Te]=r.collection($[U[Te]]);return te},Wd={affinityPropagation:Tu,ap:Tu},Xd=Et({root:void 0,directed:!1}),$d={hierholzer:function(e){if(!Ye(e)){var r=arguments;e={root:r[0],directed:r[1]}}var a=Xd(e),n=a.root,i=a.directed,o=this,s=!1,l,u,f;n&&(f=Me(n)?this.filter(n)[0].id():n[0].id());var v={},h={};i?o.forEach(function(m){var b=m.id();if(m.isNode()){var E=m.indegree(!0),C=m.outdegree(!0),L=E-C,D=C-E;L==1?l?s=!0:l=b:D==1?u?s=!0:u=b:(D>1||L>1)&&(s=!0),v[b]=[],m.outgoers().forEach(function(R){R.isEdge()&&v[b].push(R.id())})}else h[b]=[void 0,m.target().id()]}):o.forEach(function(m){var b=m.id();if(m.isNode()){var E=m.degree(!0);E%2&&(l?u?s=!0:u=b:l=b),v[b]=[],m.connectedEdges().forEach(function(C){return v[b].push(C.id())})}else h[b]=[m.source().id(),m.target().id()]});var c={found:!1,trail:void 0};if(s)return c;if(u&&l)if(i){if(f&&u!=f)return c;f=u}else{if(f&&u!=f&&l!=f)return c;f||(f=u)}else f||(f=o[0].id());var d=function(b){for(var E=b,C=[b],L,D,R;v[E].length;)L=v[E].shift(),D=h[L][0],R=h[L][1],E!=R?(v[R]=v[R].filter(function(O){return O!=L}),E=R):!i&&E!=D&&(v[D]=v[D].filter(function(O){return O!=L}),E=D),C.unshift(L),C.unshift(E);return C},g=[],y=[];for(y=d(f);y.length!=1;)v[y[0]].length==0?(g.unshift(o.getElementById(y.shift())),g.unshift(o.getElementById(y.shift()))):y=d(y.shift()).concat(y);g.unshift(o.getElementById(y.shift()));for(var p in v)if(v[p].length)return c;return c.found=!0,c.trail=this.spawn(g,!0),c}},hn=function(){var e=this,r={},a=0,n=0,i=[],o=[],s={},l=function(h,c){for(var d=o.length-1,g=[],y=e.spawn();o[d].x!=h||o[d].y!=c;)g.push(o.pop().edge),d--;g.push(o.pop().edge),g.forEach(function(p){var m=p.connectedNodes().intersection(e);y.merge(p),m.forEach(function(b){var E=b.id(),C=b.connectedEdges().intersection(e);y.merge(b),r[E].cutVertex?y.merge(C.filter(function(L){return L.isLoop()})):y.merge(C)})}),i.push(y)},u=function(h,c,d){h===d&&(n+=1),r[c]={id:a,low:a++,cutVertex:!1};var g=e.getElementById(c).connectedEdges().intersection(e);if(g.size()===0)i.push(e.spawn(e.getElementById(c)));else{var y,p,m,b;g.forEach(function(E){y=E.source().id(),p=E.target().id(),m=y===c?p:y,m!==d&&(b=E.id(),s[b]||(s[b]=!0,o.push({x:c,y:m,edge:E})),m in r?r[c].low=Math.min(r[c].low,r[m].id):(u(h,m,c),r[c].low=Math.min(r[c].low,r[m].low),r[c].id<=r[m].low&&(r[c].cutVertex=!0,l(c,m))))})}};e.forEach(function(v){if(v.isNode()){var h=v.id();h in r||(n=0,u(h,h),r[h].cutVertex=n>1)}});var f=Object.keys(r).filter(function(v){return r[v].cutVertex}).map(function(v){return e.getElementById(v)});return{cut:e.spawn(f),components:i}},Kd={hopcroftTarjanBiconnected:hn,htbc:hn,htb:hn,hopcroftTarjanBiconnectedComponents:hn},cn=function(){var e=this,r={},a=0,n=[],i=[],o=e.spawn(e),s=function(u){i.push(u),r[u]={index:a,low:a++,explored:!1};var f=e.getElementById(u).connectedEdges().intersection(e);if(f.forEach(function(g){var y=g.target().id();y!==u&&(y in r||s(y),r[y].explored||(r[u].low=Math.min(r[u].low,r[y].low)))}),r[u].index===r[u].low){for(var v=e.spawn();;){var h=i.pop();if(v.merge(e.getElementById(h)),r[h].low=r[u].index,r[h].explored=!0,h===u)break}var c=v.edgesWith(v),d=v.merge(c);n.push(d),o=o.difference(d)}};return e.forEach(function(l){if(l.isNode()){var u=l.id();u in r||s(u)}}),{cut:o,components:n}},_d={tarjanStronglyConnected:cn,tsc:cn,tscc:cn,tarjanStronglyConnectedComponents:cn},Xf={};[Ba,Sc,Dc,Lc,Rc,Pc,Bc,ud,na,ia,$o,Ed,Id,zd,Wd,$d,Kd,_d].forEach(function(t){Ne(Xf,t)});var $f=0,Kf=1,_f=2,Kt=function(e){if(!(this instanceof Kt))return new Kt(e);this.id="Thenable/1.0.7",this.state=$f,this.fulfillValue=void 0,this.rejectReason=void 0,this.onFulfilled=[],this.onRejected=[],this.proxy={then:this.then.bind(this)},typeof e=="function"&&e.call(this,this.fulfill.bind(this),this.reject.bind(this))};Kt.prototype={fulfill:function(e){return Cu(this,Kf,"fulfillValue",e)},reject:function(e){return Cu(this,_f,"rejectReason",e)},then:function(e,r){var a=this,n=new Kt;return a.onFulfilled.push(Du(e,n,"fulfill")),a.onRejected.push(Du(r,n,"reject")),Zf(a),n.proxy}};var Cu=function(e,r,a,n){return e.state===$f&&(e.state=r,e[a]=n,Zf(e)),e},Zf=function(e){e.state===Kf?Su(e,"onFulfilled",e.fulfillValue):e.state===_f&&Su(e,"onRejected",e.rejectReason)},Su=function(e,r,a){if(e[r].length!==0){var n=e[r];e[r]=[];var i=function(){for(var s=0;s<n.length;s++)n[s](a)};typeof setImmediate=="function"?setImmediate(i):setTimeout(i,0)}},Du=function(e,r,a){return function(n){if(typeof e!="function")r[a].call(r,n);else{var i;try{i=e(n)}catch(o){r.reject(o);return}Qf(r,i)}}},Qf=function(e,r){if(e===r||e.proxy===r){e.reject(new TypeError("cannot resolve promise with itself"));return}var a;if(dt(r)==="object"&&r!==null||typeof r=="function")try{a=r.then}catch(i){e.reject(i);return}if(typeof a=="function"){var n=!1;try{a.call(r,function(i){n||(n=!0,i===r?e.reject(new TypeError("circular thenable chain")):Qf(e,i))},function(i){n||(n=!0,e.reject(i))})}catch(i){n||e.reject(i)}return}e.fulfill(r)};Kt.all=function(t){return new Kt(function(e,r){for(var a=new Array(t.length),n=0,i=function(l,u){a[l]=u,n++,n===t.length&&e(a)},o=0;o<t.length;o++)(function(s){var l=t[s],u=l!=null&&l.then!=null;if(u)l.then(function(v){i(s,v)},function(v){r(v)});else{var f=l;i(s,f)}})(o)})};Kt.resolve=function(t){return new Kt(function(e,r){e(t)})};Kt.reject=function(t){return new Kt(function(e,r){r(t)})};var va=typeof Promise<"u"?Promise:Kt,Zo=function(e,r,a){var n=vs(e),i=!n,o=this._private=Ne({duration:1e3},r,a);if(o.target=e,o.style=o.style||o.css,o.started=!1,o.playing=!1,o.hooked=!1,o.applying=!1,o.progress=0,o.completes=[],o.frames=[],o.complete&&at(o.complete)&&o.completes.push(o.complete),i){var s=e.position();o.startPosition=o.startPosition||{x:s.x,y:s.y},o.startStyle=o.startStyle||e.cy().style().getAnimationStartStyle(e,o.style)}if(n){var l=e.pan();o.startPan={x:l.x,y:l.y},o.startZoom=e.zoom()}this.length=1,this[0]=this},Gr=Zo.prototype;Ne(Gr,{instanceString:function(){return"animation"},hook:function(){var e=this._private;if(!e.hooked){var r,a=e.target._private.animation;e.queue?r=a.queue:r=a.current,r.push(this),kt(e.target)&&e.target.cy().addToAnimationPool(e.target),e.hooked=!0}return this},play:function(){var e=this._private;return e.progress===1&&(e.progress=0),e.playing=!0,e.started=!1,e.stopped=!1,this.hook(),this},playing:function(){return this._private.playing},apply:function(){var e=this._private;return e.applying=!0,e.started=!1,e.stopped=!1,this.hook(),this},applying:function(){return this._private.applying},pause:function(){var e=this._private;return e.playing=!1,e.started=!1,this},stop:function(){var e=this._private;return e.playing=!1,e.started=!1,e.stopped=!0,this},rewind:function(){return this.progress(0)},fastforward:function(){return this.progress(1)},time:function(e){var r=this._private;return e===void 0?r.progress*r.duration:this.progress(e/r.duration)},progress:function(e){var r=this._private,a=r.playing;return e===void 0?r.progress:(a&&this.pause(),r.progress=e,r.started=!1,a&&this.play(),this)},completed:function(){return this._private.progress===1},reverse:function(){var e=this._private,r=e.playing;r&&this.pause(),e.progress=1-e.progress,e.started=!1;var a=function(u,f){var v=e[u];v!=null&&(e[u]=e[f],e[f]=v)};if(a("zoom","startZoom"),a("pan","startPan"),a("position","startPosition"),e.style)for(var n=0;n<e.style.length;n++){var i=e.style[n],o=i.name,s=e.startStyle[o];e.startStyle[o]=i,e.style[n]=s}return r&&this.play(),this},promise:function(e){var r=this._private,a;switch(e){case"frame":a=r.frames;break;default:case"complete":case"completed":a=r.completes}return new va(function(n,i){a.push(function(){n()})})}});Gr.complete=Gr.completed;Gr.run=Gr.play;Gr.running=Gr.playing;var Zd={animated:function(){return function(){var r=this,a=r.length!==void 0,n=a?r:[r],i=this._private.cy||this;if(!i.styleEnabled())return!1;var o=n[0];if(o)return o._private.animation.current.length>0}},clearQueue:function(){return function(){var r=this,a=r.length!==void 0,n=a?r:[r],i=this._private.cy||this;if(!i.styleEnabled())return this;for(var o=0;o<n.length;o++){var s=n[o];s._private.animation.queue=[]}return this}},delay:function(){return function(r,a){var n=this._private.cy||this;return n.styleEnabled()?this.animate({delay:r,duration:r,complete:a}):this}},delayAnimation:function(){return function(r,a){var n=this._private.cy||this;return n.styleEnabled()?this.animation({delay:r,duration:r,complete:a}):this}},animation:function(){return function(r,a){var n=this,i=n.length!==void 0,o=i?n:[n],s=this._private.cy||this,l=!i,u=!l;if(!s.styleEnabled())return this;var f=s.style();r=Ne({},r,a);var v=Object.keys(r).length===0;if(v)return new Zo(o[0],r);switch(r.duration===void 0&&(r.duration=400),r.duration){case"slow":r.duration=600;break;case"fast":r.duration=200;break}if(u&&(r.style=f.getPropsList(r.style||r.css),r.css=void 0),u&&r.renderedPosition!=null){var h=r.renderedPosition,c=s.pan(),d=s.zoom();r.position=Ff(h,d,c)}if(l&&r.panBy!=null){var g=r.panBy,y=s.pan();r.pan={x:y.x+g.x,y:y.y+g.y}}var p=r.center||r.centre;if(l&&p!=null){var m=s.getCenterPan(p.eles,r.zoom);m!=null&&(r.pan=m)}if(l&&r.fit!=null){var b=r.fit,E=s.getFitViewport(b.eles||b.boundingBox,b.padding);E!=null&&(r.pan=E.pan,r.zoom=E.zoom)}if(l&&Ye(r.zoom)){var C=s.getZoomedViewport(r.zoom);C!=null?(C.zoomed&&(r.zoom=C.zoom),C.panned&&(r.pan=C.pan)):r.zoom=null}return new Zo(o[0],r)}},animate:function(){return function(r,a){var n=this,i=n.length!==void 0,o=i?n:[n],s=this._private.cy||this;if(!s.styleEnabled())return this;a&&(r=Ne({},r,a));for(var l=0;l<o.length;l++){var u=o[l],f=u.animated()&&(r.queue===void 0||r.queue),v=u.animation(r,f?{queue:!0}:void 0);v.play()}return this}},stop:function(){return function(r,a){var n=this,i=n.length!==void 0,o=i?n:[n],s=this._private.cy||this;if(!s.styleEnabled())return this;for(var l=0;l<o.length;l++){for(var u=o[l],f=u._private,v=f.animation.current,h=0;h<v.length;h++){var c=v[h],d=c._private;a&&(d.duration=0)}r&&(f.animation.queue=[]),a||(f.animation.current=[])}return s.notify("draw"),this}}},Ii,Au;function Qn(){if(Au)return Ii;Au=1;var t=Array.isArray;return Ii=t,Ii}var Bi,Lu;function Qd(){if(Lu)return Bi;Lu=1;var t=Qn(),e=$a(),r=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/;function n(i,o){if(t(i))return!1;var s=typeof i;return s=="number"||s=="symbol"||s=="boolean"||i==null||e(i)?!0:a.test(i)||!r.test(i)||o!=null&&i in Object(o)}return Bi=n,Bi}var Fi,Mu;function Jd(){if(Mu)return Fi;Mu=1;var t=Af(),e=Xa(),r="[object AsyncFunction]",a="[object Function]",n="[object GeneratorFunction]",i="[object Proxy]";function o(s){if(!e(s))return!1;var l=t(s);return l==a||l==n||l==r||l==i}return Fi=o,Fi}var ki,Ru;function jd(){if(Ru)return ki;Ru=1;var t=$n(),e=t["__core-js_shared__"];return ki=e,ki}var zi,Nu;function eg(){if(Nu)return zi;Nu=1;var t=jd(),e=(function(){var a=/[^.]+$/.exec(t&&t.keys&&t.keys.IE_PROTO||"");return a?"Symbol(src)_1."+a:""})();function r(a){return!!e&&e in a}return zi=r,zi}var Vi,Pu;function tg(){if(Pu)return Vi;Pu=1;var t=Function.prototype,e=t.toString;function r(a){if(a!=null){try{return e.call(a)}catch{}try{return a+""}catch{}}return""}return Vi=r,Vi}var Gi,Ou;function rg(){if(Ou)return Gi;Ou=1;var t=Jd(),e=eg(),r=Xa(),a=tg(),n=/[\\^$.*+?()[\]{}|]/g,i=/^\[object .+?Constructor\]$/,o=Function.prototype,s=Object.prototype,l=o.toString,u=s.hasOwnProperty,f=RegExp("^"+l.call(u).replace(n,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function v(h){if(!r(h)||e(h))return!1;var c=t(h)?f:i;return c.test(a(h))}return Gi=v,Gi}var Ui,Iu;function ag(){if(Iu)return Ui;Iu=1;function t(e,r){return e?.[r]}return Ui=t,Ui}var Hi,Bu;function xs(){if(Bu)return Hi;Bu=1;var t=rg(),e=ag();function r(a,n){var i=e(a,n);return t(i)?i:void 0}return Hi=r,Hi}var qi,Fu;function Jn(){if(Fu)return qi;Fu=1;var t=xs(),e=t(Object,"create");return qi=e,qi}var Yi,ku;function ng(){if(ku)return Yi;ku=1;var t=Jn();function e(){this.__data__=t?t(null):{},this.size=0}return Yi=e,Yi}var Wi,zu;function ig(){if(zu)return Wi;zu=1;function t(e){var r=this.has(e)&&delete this.__data__[e];return this.size-=r?1:0,r}return Wi=t,Wi}var Xi,Vu;function og(){if(Vu)return Xi;Vu=1;var t=Jn(),e="__lodash_hash_undefined__",r=Object.prototype,a=r.hasOwnProperty;function n(i){var o=this.__data__;if(t){var s=o[i];return s===e?void 0:s}return a.call(o,i)?o[i]:void 0}return Xi=n,Xi}var $i,Gu;function sg(){if(Gu)return $i;Gu=1;var t=Jn(),e=Object.prototype,r=e.hasOwnProperty;function a(n){var i=this.__data__;return t?i[n]!==void 0:r.call(i,n)}return $i=a,$i}var Ki,Uu;function ug(){if(Uu)return Ki;Uu=1;var t=Jn(),e="__lodash_hash_undefined__";function r(a,n){var i=this.__data__;return this.size+=this.has(a)?0:1,i[a]=t&&n===void 0?e:n,this}return Ki=r,Ki}var _i,Hu;function lg(){if(Hu)return _i;Hu=1;var t=ng(),e=ig(),r=og(),a=sg(),n=ug();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var u=o[s];this.set(u[0],u[1])}}return i.prototype.clear=t,i.prototype.delete=e,i.prototype.get=r,i.prototype.has=a,i.prototype.set=n,_i=i,_i}var Zi,qu;function fg(){if(qu)return Zi;qu=1;function t(){this.__data__=[],this.size=0}return Zi=t,Zi}var Qi,Yu;function Jf(){if(Yu)return Qi;Yu=1;function t(e,r){return e===r||e!==e&&r!==r}return Qi=t,Qi}var Ji,Wu;function jn(){if(Wu)return Ji;Wu=1;var t=Jf();function e(r,a){for(var n=r.length;n--;)if(t(r[n][0],a))return n;return-1}return Ji=e,Ji}var ji,Xu;function vg(){if(Xu)return ji;Xu=1;var t=jn(),e=Array.prototype,r=e.splice;function a(n){var i=this.__data__,o=t(i,n);if(o<0)return!1;var s=i.length-1;return o==s?i.pop():r.call(i,o,1),--this.size,!0}return ji=a,ji}var eo,$u;function hg(){if($u)return eo;$u=1;var t=jn();function e(r){var a=this.__data__,n=t(a,r);return n<0?void 0:a[n][1]}return eo=e,eo}var to,Ku;function cg(){if(Ku)return to;Ku=1;var t=jn();function e(r){return t(this.__data__,r)>-1}return to=e,to}var ro,_u;function dg(){if(_u)return ro;_u=1;var t=jn();function e(r,a){var n=this.__data__,i=t(n,r);return i<0?(++this.size,n.push([r,a])):n[i][1]=a,this}return ro=e,ro}var ao,Zu;function gg(){if(Zu)return ao;Zu=1;var t=fg(),e=vg(),r=hg(),a=cg(),n=dg();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var u=o[s];this.set(u[0],u[1])}}return i.prototype.clear=t,i.prototype.delete=e,i.prototype.get=r,i.prototype.has=a,i.prototype.set=n,ao=i,ao}var no,Qu;function pg(){if(Qu)return no;Qu=1;var t=xs(),e=$n(),r=t(e,"Map");return no=r,no}var io,Ju;function yg(){if(Ju)return io;Ju=1;var t=lg(),e=gg(),r=pg();function a(){this.size=0,this.__data__={hash:new t,map:new(r||e),string:new t}}return io=a,io}var oo,ju;function mg(){if(ju)return oo;ju=1;function t(e){var r=typeof e;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?e!=="__proto__":e===null}return oo=t,oo}var so,el;function ei(){if(el)return so;el=1;var t=mg();function e(r,a){var n=r.__data__;return t(a)?n[typeof a=="string"?"string":"hash"]:n.map}return so=e,so}var uo,tl;function bg(){if(tl)return uo;tl=1;var t=ei();function e(r){var a=t(this,r).delete(r);return this.size-=a?1:0,a}return uo=e,uo}var lo,rl;function wg(){if(rl)return lo;rl=1;var t=ei();function e(r){return t(this,r).get(r)}return lo=e,lo}var fo,al;function Eg(){if(al)return fo;al=1;var t=ei();function e(r){return t(this,r).has(r)}return fo=e,fo}var vo,nl;function xg(){if(nl)return vo;nl=1;var t=ei();function e(r,a){var n=t(this,r),i=n.size;return n.set(r,a),this.size+=n.size==i?0:1,this}return vo=e,vo}var ho,il;function Tg(){if(il)return ho;il=1;var t=yg(),e=bg(),r=wg(),a=Eg(),n=xg();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var u=o[s];this.set(u[0],u[1])}}return i.prototype.clear=t,i.prototype.delete=e,i.prototype.get=r,i.prototype.has=a,i.prototype.set=n,ho=i,ho}var co,ol;function Cg(){if(ol)return co;ol=1;var t=Tg(),e="Expected a function";function r(a,n){if(typeof a!="function"||n!=null&&typeof n!="function")throw new TypeError(e);var i=function(){var o=arguments,s=n?n.apply(this,o):o[0],l=i.cache;if(l.has(s))return l.get(s);var u=a.apply(this,o);return i.cache=l.set(s,u)||l,u};return i.cache=new(r.Cache||t),i}return r.Cache=t,co=r,co}var go,sl;function Sg(){if(sl)return go;sl=1;var t=Cg(),e=500;function r(a){var n=t(a,function(o){return i.size===e&&i.clear(),o}),i=n.cache;return n}return go=r,go}var po,ul;function jf(){if(ul)return po;ul=1;var t=Sg(),e=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,r=/\\(\\)?/g,a=t(function(n){var i=[];return n.charCodeAt(0)===46&&i.push(""),n.replace(e,function(o,s,l,u){i.push(l?u.replace(r,"$1"):s||o)}),i});return po=a,po}var yo,ll;function ev(){if(ll)return yo;ll=1;function t(e,r){for(var a=-1,n=e==null?0:e.length,i=Array(n);++a<n;)i[a]=r(e[a],a,e);return i}return yo=t,yo}var mo,fl;function Dg(){if(fl)return mo;fl=1;var t=cs(),e=ev(),r=Qn(),a=$a(),n=t?t.prototype:void 0,i=n?n.toString:void 0;function o(s){if(typeof s=="string")return s;if(r(s))return e(s,o)+"";if(a(s))return i?i.call(s):"";var l=s+"";return l=="0"&&1/s==-1/0?"-0":l}return mo=o,mo}var bo,vl;function tv(){if(vl)return bo;vl=1;var t=Dg();function e(r){return r==null?"":t(r)}return bo=e,bo}var wo,hl;function rv(){if(hl)return wo;hl=1;var t=Qn(),e=Qd(),r=jf(),a=tv();function n(i,o){return t(i)?i:e(i,o)?[i]:r(a(i))}return wo=n,wo}var Eo,cl;function Ts(){if(cl)return Eo;cl=1;var t=$a();function e(r){if(typeof r=="string"||t(r))return r;var a=r+"";return a=="0"&&1/r==-1/0?"-0":a}return Eo=e,Eo}var xo,dl;function Ag(){if(dl)return xo;dl=1;var t=rv(),e=Ts();function r(a,n){n=t(n,a);for(var i=0,o=n.length;a!=null&&i<o;)a=a[e(n[i++])];return i&&i==o?a:void 0}return xo=r,xo}var To,gl;function Lg(){if(gl)return To;gl=1;var t=Ag();function e(r,a,n){var i=r==null?void 0:t(r,a);return i===void 0?n:i}return To=e,To}var Mg=Lg(),Rg=Wa(Mg),Co,pl;function Ng(){if(pl)return Co;pl=1;var t=xs(),e=(function(){try{var r=t(Object,"defineProperty");return r({},"",{}),r}catch{}})();return Co=e,Co}var So,yl;function Pg(){if(yl)return So;yl=1;var t=Ng();function e(r,a,n){a=="__proto__"&&t?t(r,a,{configurable:!0,enumerable:!0,value:n,writable:!0}):r[a]=n}return So=e,So}var Do,ml;function Og(){if(ml)return Do;ml=1;var t=Pg(),e=Jf(),r=Object.prototype,a=r.hasOwnProperty;function n(i,o,s){var l=i[o];(!(a.call(i,o)&&e(l,s))||s===void 0&&!(o in i))&&t(i,o,s)}return Do=n,Do}var Ao,bl;function Ig(){if(bl)return Ao;bl=1;var t=9007199254740991,e=/^(?:0|[1-9]\d*)$/;function r(a,n){var i=typeof a;return n=n??t,!!n&&(i=="number"||i!="symbol"&&e.test(a))&&a>-1&&a%1==0&&a<n}return Ao=r,Ao}var Lo,wl;function Bg(){if(wl)return Lo;wl=1;var t=Og(),e=rv(),r=Ig(),a=Xa(),n=Ts();function i(o,s,l,u){if(!a(o))return o;s=e(s,o);for(var f=-1,v=s.length,h=v-1,c=o;c!=null&&++f<v;){var d=n(s[f]),g=l;if(d==="__proto__"||d==="constructor"||d==="prototype")return o;if(f!=h){var y=c[d];g=u?u(y,d,c):void 0,g===void 0&&(g=a(y)?y:r(s[f+1])?[]:{})}t(c,d,g),c=c[d]}return o}return Lo=i,Lo}var Mo,El;function Fg(){if(El)return Mo;El=1;var t=Bg();function e(r,a,n){return r==null?r:t(r,a,n)}return Mo=e,Mo}var kg=Fg(),zg=Wa(kg),Ro,xl;function Vg(){if(xl)return Ro;xl=1;function t(e,r){var a=-1,n=e.length;for(r||(r=Array(n));++a<n;)r[a]=e[a];return r}return Ro=t,Ro}var No,Tl;function Gg(){if(Tl)return No;Tl=1;var t=ev(),e=Vg(),r=Qn(),a=$a(),n=jf(),i=Ts(),o=tv();function s(l){return r(l)?t(l,i):a(l)?[l]:e(n(o(l)))}return No=s,No}var Ug=Gg(),Hg=Wa(Ug),qg={data:function(e){var r={field:"data",bindingEvent:"data",allowBinding:!1,allowSetting:!1,allowGetting:!1,settingEvent:"data",settingTriggersEvent:!1,triggerFnName:"trigger",immutableKeys:{},updateStyle:!1,beforeGet:function(n){},beforeSet:function(n,i){},onSet:function(n){},canSet:function(n){return!0}};return e=Ne({},r,e),function(n,i){var o=e,s=this,l=s.length!==void 0,u=l?s:[s],f=l?s[0]:s;if(Me(n)){var v=n.indexOf(".")!==-1,h=v&&Hg(n);if(o.allowGetting&&i===void 0){var c;return f&&(o.beforeGet(f),h&&f._private[o.field][n]===void 0?c=Rg(f._private[o.field],h):c=f._private[o.field][n]),c}else if(o.allowSetting&&i!==void 0){var d=!o.immutableKeys[n];if(d){var g=yf({},n,i);o.beforeSet(s,g);for(var y=0,p=u.length;y<p;y++){var m=u[y];o.canSet(m)&&(h&&f._private[o.field][n]===void 0?zg(m._private[o.field],h,i):m._private[o.field][n]=i)}o.updateStyle&&s.updateStyle(),o.onSet(s),o.settingTriggersEvent&&s[o.triggerFnName](o.settingEvent)}}}else if(o.allowSetting&&Ye(n)){var b=n,E,C,L=Object.keys(b);o.beforeSet(s,b);for(var D=0;D<L.length;D++){E=L[D],C=b[E];var R=!o.immutableKeys[E];if(R)for(var O=0;O<u.length;O++){var M=u[O];o.canSet(M)&&(M._private[o.field][E]=C)}}o.updateStyle&&s.updateStyle(),o.onSet(s),o.settingTriggersEvent&&s[o.triggerFnName](o.settingEvent)}else if(o.allowBinding&&at(n)){var P=n;s.on(o.bindingEvent,P)}else if(o.allowGetting&&n===void 0){var w;return f&&(o.beforeGet(f),w=f._private[o.field]),w}return s}},removeData:function(e){var r={field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!1,immutableKeys:{}};return e=Ne({},r,e),function(n){var i=e,o=this,s=o.length!==void 0,l=s?o:[o];if(Me(n)){for(var u=n.split(/\s+/),f=u.length,v=0;v<f;v++){var h=u[v];if(!br(h)){var c=!i.immutableKeys[h];if(c)for(var d=0,g=l.length;d<g;d++)l[d]._private[i.field][h]=void 0}}i.triggerEvent&&o[i.triggerFnName](i.event)}else if(n===void 0){for(var y=0,p=l.length;y<p;y++)for(var m=l[y]._private[i.field],b=Object.keys(m),E=0;E<b.length;E++){var C=b[E],L=!i.immutableKeys[C];L&&(m[C]=void 0)}i.triggerEvent&&o[i.triggerFnName](i.event)}return o}}},Yg={eventAliasesOn:function(e){var r=e;r.addListener=r.listen=r.bind=r.on,r.unlisten=r.unbind=r.off=r.removeListener,r.trigger=r.emit,r.pon=r.promiseOn=function(a,n){var i=this,o=Array.prototype.slice.call(arguments,0);return new va(function(s,l){var u=function(c){i.off.apply(i,v),s(c)},f=o.concat([u]),v=f.concat([]);i.on.apply(i,f)})}}},Ke={};[Zd,qg,Yg].forEach(function(t){Ne(Ke,t)});var Wg={animate:Ke.animate(),animation:Ke.animation(),animated:Ke.animated(),clearQueue:Ke.clearQueue(),delay:Ke.delay(),delayAnimation:Ke.delayAnimation(),stop:Ke.stop()},Cn={classes:function(e){var r=this;if(e===void 0){var a=[];return r[0]._private.classes.forEach(function(d){return a.push(d)}),a}else Je(e)||(e=(e||"").match(/\S+/g)||[]);for(var n=[],i=new fa(e),o=0;o<r.length;o++){for(var s=r[o],l=s._private,u=l.classes,f=!1,v=0;v<e.length;v++){var h=e[v],c=u.has(h);if(!c){f=!0;break}}f||(f=u.size!==e.length),f&&(l.classes=i,n.push(s))}return n.length>0&&this.spawn(n).updateStyle().emit("class"),r},addClass:function(e){return this.toggleClass(e,!0)},hasClass:function(e){var r=this[0];return r!=null&&r._private.classes.has(e)},toggleClass:function(e,r){Je(e)||(e=e.match(/\S+/g)||[]);for(var a=this,n=r===void 0,i=[],o=0,s=a.length;o<s;o++)for(var l=a[o],u=l._private.classes,f=!1,v=0;v<e.length;v++){var h=e[v],c=u.has(h),d=!1;r||n&&!c?(u.add(h),d=!0):(!r||n&&c)&&(u.delete(h),d=!0),!f&&d&&(i.push(l),f=!0)}return i.length>0&&this.spawn(i).updateStyle().emit("class"),a},removeClass:function(e){return this.toggleClass(e,!1)},flashClass:function(e,r){var a=this;if(r==null)r=250;else if(r===0)return a;return a.addClass(e),setTimeout(function(){a.removeClass(e)},r),a}};Cn.className=Cn.classNames=Cn.classes;var qe={metaChar:"[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",comparatorOp:"=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",boolOp:"\\?|\\!|\\^",string:`"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`,number:ct,meta:"degree|indegree|outdegree",separator:"\\s*,\\s*",descendant:"\\s+",child:"\\s+>\\s+",subject:"\\$",group:"node|edge|\\*",directedEdge:"\\s+->\\s+",undirectedEdge:"\\s+<->\\s+"};qe.variable="(?:[\\w-.]|(?:\\\\"+qe.metaChar+"))+";qe.className="(?:[\\w-]|(?:\\\\"+qe.metaChar+"))+";qe.value=qe.string+"|"+qe.number;qe.id=qe.variable;(function(){var t,e,r;for(t=qe.comparatorOp.split("|"),r=0;r<t.length;r++)e=t[r],qe.comparatorOp+="|@"+e;for(t=qe.comparatorOp.split("|"),r=0;r<t.length;r++)e=t[r],!(e.indexOf("!")>=0)&&e!=="="&&(qe.comparatorOp+="|\\!"+e)})();var Qe=function(){return{checks:[]}},De={GROUP:0,COLLECTION:1,FILTER:2,DATA_COMPARE:3,DATA_EXIST:4,DATA_BOOL:5,META_COMPARE:6,STATE:7,ID:8,CLASS:9,UNDIRECTED_EDGE:10,DIRECTED_EDGE:11,NODE_SOURCE:12,NODE_TARGET:13,NODE_NEIGHBOR:14,CHILD:15,DESCENDANT:16,PARENT:17,ANCESTOR:18,COMPOUND_SPLIT:19,TRUE:20},Qo=[{selector:":selected",matches:function(e){return e.selected()}},{selector:":unselected",matches:function(e){return!e.selected()}},{selector:":selectable",matches:function(e){return e.selectable()}},{selector:":unselectable",matches:function(e){return!e.selectable()}},{selector:":locked",matches:function(e){return e.locked()}},{selector:":unlocked",matches:function(e){return!e.locked()}},{selector:":visible",matches:function(e){return e.visible()}},{selector:":hidden",matches:function(e){return!e.visible()}},{selector:":transparent",matches:function(e){return e.transparent()}},{selector:":grabbed",matches:function(e){return e.grabbed()}},{selector:":free",matches:function(e){return!e.grabbed()}},{selector:":removed",matches:function(e){return e.removed()}},{selector:":inside",matches:function(e){return!e.removed()}},{selector:":grabbable",matches:function(e){return e.grabbable()}},{selector:":ungrabbable",matches:function(e){return!e.grabbable()}},{selector:":animated",matches:function(e){return e.animated()}},{selector:":unanimated",matches:function(e){return!e.animated()}},{selector:":parent",matches:function(e){return e.isParent()}},{selector:":childless",matches:function(e){return e.isChildless()}},{selector:":child",matches:function(e){return e.isChild()}},{selector:":orphan",matches:function(e){return e.isOrphan()}},{selector:":nonorphan",matches:function(e){return e.isChild()}},{selector:":compound",matches:function(e){return e.isNode()?e.isParent():e.source().isParent()||e.target().isParent()}},{selector:":loop",matches:function(e){return e.isLoop()}},{selector:":simple",matches:function(e){return e.isSimple()}},{selector:":active",matches:function(e){return e.active()}},{selector:":inactive",matches:function(e){return!e.active()}},{selector:":backgrounding",matches:function(e){return e.backgrounding()}},{selector:":nonbackgrounding",matches:function(e){return!e.backgrounding()}}].sort(function(t,e){return qh(t.selector,e.selector)}),Xg=(function(){for(var t={},e,r=0;r<Qo.length;r++)e=Qo[r],t[e.selector]=e.matches;return t})(),$g=function(e,r){return Xg[e](r)},Kg="("+Qo.map(function(t){return t.selector}).join("|")+")",Xr=function(e){return e.replace(new RegExp("\\\\("+qe.metaChar+")","g"),function(r,a){return a})},hr=function(e,r,a){e[e.length-1]=a},Jo=[{name:"group",query:!0,regex:"("+qe.group+")",populate:function(e,r,a){var n=vt(a,1),i=n[0];r.checks.push({type:De.GROUP,value:i==="*"?i:i+"s"})}},{name:"state",query:!0,regex:Kg,populate:function(e,r,a){var n=vt(a,1),i=n[0];r.checks.push({type:De.STATE,value:i})}},{name:"id",query:!0,regex:"\\#("+qe.id+")",populate:function(e,r,a){var n=vt(a,1),i=n[0];r.checks.push({type:De.ID,value:Xr(i)})}},{name:"className",query:!0,regex:"\\.("+qe.className+")",populate:function(e,r,a){var n=vt(a,1),i=n[0];r.checks.push({type:De.CLASS,value:Xr(i)})}},{name:"dataExists",query:!0,regex:"\\[\\s*("+qe.variable+")\\s*\\]",populate:function(e,r,a){var n=vt(a,1),i=n[0];r.checks.push({type:De.DATA_EXIST,field:Xr(i)})}},{name:"dataCompare",query:!0,regex:"\\[\\s*("+qe.variable+")\\s*("+qe.comparatorOp+")\\s*("+qe.value+")\\s*\\]",populate:function(e,r,a){var n=vt(a,3),i=n[0],o=n[1],s=n[2],l=new RegExp("^"+qe.string+"$").exec(s)!=null;l?s=s.substring(1,s.length-1):s=parseFloat(s),r.checks.push({type:De.DATA_COMPARE,field:Xr(i),operator:o,value:s})}},{name:"dataBool",query:!0,regex:"\\[\\s*("+qe.boolOp+")\\s*("+qe.variable+")\\s*\\]",populate:function(e,r,a){var n=vt(a,2),i=n[0],o=n[1];r.checks.push({type:De.DATA_BOOL,field:Xr(o),operator:i})}},{name:"metaCompare",query:!0,regex:"\\[\\[\\s*("+qe.meta+")\\s*("+qe.comparatorOp+")\\s*("+qe.number+")\\s*\\]\\]",populate:function(e,r,a){var n=vt(a,3),i=n[0],o=n[1],s=n[2];r.checks.push({type:De.META_COMPARE,field:Xr(i),operator:o,value:parseFloat(s)})}},{name:"nextQuery",separator:!0,regex:qe.separator,populate:function(e,r){var a=e.currentSubject,n=e.edgeCount,i=e.compoundCount,o=e[e.length-1];a!=null&&(o.subject=a,e.currentSubject=null),o.edgeCount=n,o.compoundCount=i,e.edgeCount=0,e.compoundCount=0;var s=e[e.length++]=Qe();return s}},{name:"directedEdge",separator:!0,regex:qe.directedEdge,populate:function(e,r){if(e.currentSubject==null){var a=Qe(),n=r,i=Qe();return a.checks.push({type:De.DIRECTED_EDGE,source:n,target:i}),hr(e,r,a),e.edgeCount++,i}else{var o=Qe(),s=r,l=Qe();return o.checks.push({type:De.NODE_SOURCE,source:s,target:l}),hr(e,r,o),e.edgeCount++,l}}},{name:"undirectedEdge",separator:!0,regex:qe.undirectedEdge,populate:function(e,r){if(e.currentSubject==null){var a=Qe(),n=r,i=Qe();return a.checks.push({type:De.UNDIRECTED_EDGE,nodes:[n,i]}),hr(e,r,a),e.edgeCount++,i}else{var o=Qe(),s=r,l=Qe();return o.checks.push({type:De.NODE_NEIGHBOR,node:s,neighbor:l}),hr(e,r,o),l}}},{name:"child",separator:!0,regex:qe.child,populate:function(e,r){if(e.currentSubject==null){var a=Qe(),n=Qe(),i=e[e.length-1];return a.checks.push({type:De.CHILD,parent:i,child:n}),hr(e,r,a),e.compoundCount++,n}else if(e.currentSubject===r){var o=Qe(),s=e[e.length-1],l=Qe(),u=Qe(),f=Qe(),v=Qe();return o.checks.push({type:De.COMPOUND_SPLIT,left:s,right:l,subject:u}),u.checks=r.checks,r.checks=[{type:De.TRUE}],v.checks.push({type:De.TRUE}),l.checks.push({type:De.PARENT,parent:v,child:f}),hr(e,s,o),e.currentSubject=u,e.compoundCount++,f}else{var h=Qe(),c=Qe(),d=[{type:De.PARENT,parent:h,child:c}];return h.checks=r.checks,r.checks=d,e.compoundCount++,c}}},{name:"descendant",separator:!0,regex:qe.descendant,populate:function(e,r){if(e.currentSubject==null){var a=Qe(),n=Qe(),i=e[e.length-1];return a.checks.push({type:De.DESCENDANT,ancestor:i,descendant:n}),hr(e,r,a),e.compoundCount++,n}else if(e.currentSubject===r){var o=Qe(),s=e[e.length-1],l=Qe(),u=Qe(),f=Qe(),v=Qe();return o.checks.push({type:De.COMPOUND_SPLIT,left:s,right:l,subject:u}),u.checks=r.checks,r.checks=[{type:De.TRUE}],v.checks.push({type:De.TRUE}),l.checks.push({type:De.ANCESTOR,ancestor:v,descendant:f}),hr(e,s,o),e.currentSubject=u,e.compoundCount++,f}else{var h=Qe(),c=Qe(),d=[{type:De.ANCESTOR,ancestor:h,descendant:c}];return h.checks=r.checks,r.checks=d,e.compoundCount++,c}}},{name:"subject",modifier:!0,regex:qe.subject,populate:function(e,r){if(e.currentSubject!=null&&e.currentSubject!==r)return _e("Redefinition of subject in selector `"+e.toString()+"`"),!1;e.currentSubject=r;var a=e[e.length-1],n=a.checks[0],i=n==null?null:n.type;i===De.DIRECTED_EDGE?n.type=De.NODE_TARGET:i===De.UNDIRECTED_EDGE&&(n.type=De.NODE_NEIGHBOR,n.node=n.nodes[1],n.neighbor=n.nodes[0],n.nodes=null)}}];Jo.forEach(function(t){return t.regexObj=new RegExp("^"+t.regex)});var _g=function(e){for(var r,a,n,i=0;i<Jo.length;i++){var o=Jo[i],s=o.name,l=e.match(o.regexObj);if(l!=null){a=l,r=o,n=s;var u=l[0];e=e.substring(u.length);break}}return{expr:r,match:a,name:n,remaining:e}},Zg=function(e){var r=e.match(/^\s+/);if(r){var a=r[0];e=e.substring(a.length)}return e},Qg=function(e){var r=this,a=r.inputText=e,n=r[0]=Qe();for(r.length=1,a=Zg(a);;){var i=_g(a);if(i.expr==null)return _e("The selector `"+e+"`is invalid"),!1;var o=i.match.slice(1),s=i.expr.populate(r,n,o);if(s===!1)return!1;if(s!=null&&(n=s),a=i.remaining,a.match(/^\s*$/))break}var l=r[r.length-1];r.currentSubject!=null&&(l.subject=r.currentSubject),l.edgeCount=r.edgeCount,l.compoundCount=r.compoundCount;for(var u=0;u<r.length;u++){var f=r[u];if(f.compoundCount>0&&f.edgeCount>0)return _e("The selector `"+e+"` is invalid because it uses both a compound selector and an edge selector"),!1;if(f.edgeCount>1)return _e("The selector `"+e+"` is invalid because it uses multiple edge selectors"),!1;f.edgeCount===1&&_e("The selector `"+e+"` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.")}return!0},Jg=function(){if(this.toStringCache!=null)return this.toStringCache;for(var e=function(f){return f??""},r=function(f){return Me(f)?'"'+f+'"':e(f)},a=function(f){return" "+f+" "},n=function(f,v){var h=f.type,c=f.value;switch(h){case De.GROUP:{var d=e(c);return d.substring(0,d.length-1)}case De.DATA_COMPARE:{var g=f.field,y=f.operator;return"["+g+a(e(y))+r(c)+"]"}case De.DATA_BOOL:{var p=f.operator,m=f.field;return"["+e(p)+m+"]"}case De.DATA_EXIST:{var b=f.field;return"["+b+"]"}case De.META_COMPARE:{var E=f.operator,C=f.field;return"[["+C+a(e(E))+r(c)+"]]"}case De.STATE:return c;case De.ID:return"#"+c;case De.CLASS:return"."+c;case De.PARENT:case De.CHILD:return i(f.parent,v)+a(">")+i(f.child,v);case De.ANCESTOR:case De.DESCENDANT:return i(f.ancestor,v)+" "+i(f.descendant,v);case De.COMPOUND_SPLIT:{var L=i(f.left,v),D=i(f.subject,v),R=i(f.right,v);return L+(L.length>0?" ":"")+D+R}case De.TRUE:return""}},i=function(f,v){return f.checks.reduce(function(h,c,d){return h+(v===f&&d===0?"$":"")+n(c,v)},"")},o="",s=0;s<this.length;s++){var l=this[s];o+=i(l,l.subject),this.length>1&&s<this.length-1&&(o+=", ")}return this.toStringCache=o,o},jg={parse:Qg,toString:Jg},av=function(e,r,a){var n,i=Me(e),o=xe(e),s=Me(a),l,u,f=!1,v=!1,h=!1;switch(r.indexOf("!")>=0&&(r=r.replace("!",""),v=!0),r.indexOf("@")>=0&&(r=r.replace("@",""),f=!0),(i||s||f)&&(l=!i&&!o?"":""+e,u=""+a),f&&(e=l=l.toLowerCase(),a=u=u.toLowerCase()),r){case"*=":n=l.indexOf(u)>=0;break;case"$=":n=l.indexOf(u,l.length-u.length)>=0;break;case"^=":n=l.indexOf(u)===0;break;case"=":n=e===a;break;case">":h=!0,n=e>a;break;case">=":h=!0,n=e>=a;break;case"<":h=!0,n=e<a;break;case"<=":h=!0,n=e<=a;break;default:n=!1;break}return v&&(e!=null||!h)&&(n=!n),n},ep=function(e,r){switch(r){case"?":return!!e;case"!":return!e;case"^":return e===void 0}},tp=function(e){return e!==void 0},Cs=function(e,r){return e.data(r)},rp=function(e,r){return e[r]()},ot=[],tt=function(e,r){return e.checks.every(function(a){return ot[a.type](a,r)})};ot[De.GROUP]=function(t,e){var r=t.value;return r==="*"||r===e.group()};ot[De.STATE]=function(t,e){var r=t.value;return $g(r,e)};ot[De.ID]=function(t,e){var r=t.value;return e.id()===r};ot[De.CLASS]=function(t,e){var r=t.value;return e.hasClass(r)};ot[De.META_COMPARE]=function(t,e){var r=t.field,a=t.operator,n=t.value;return av(rp(e,r),a,n)};ot[De.DATA_COMPARE]=function(t,e){var r=t.field,a=t.operator,n=t.value;return av(Cs(e,r),a,n)};ot[De.DATA_BOOL]=function(t,e){var r=t.field,a=t.operator;return ep(Cs(e,r),a)};ot[De.DATA_EXIST]=function(t,e){var r=t.field;return t.operator,tp(Cs(e,r))};ot[De.UNDIRECTED_EDGE]=function(t,e){var r=t.nodes[0],a=t.nodes[1],n=e.source(),i=e.target();return tt(r,n)&&tt(a,i)||tt(a,n)&&tt(r,i)};ot[De.NODE_NEIGHBOR]=function(t,e){return tt(t.node,e)&&e.neighborhood().some(function(r){return r.isNode()&&tt(t.neighbor,r)})};ot[De.DIRECTED_EDGE]=function(t,e){return tt(t.source,e.source())&&tt(t.target,e.target())};ot[De.NODE_SOURCE]=function(t,e){return tt(t.source,e)&&e.outgoers().some(function(r){return r.isNode()&&tt(t.target,r)})};ot[De.NODE_TARGET]=function(t,e){return tt(t.target,e)&&e.incomers().some(function(r){return r.isNode()&&tt(t.source,r)})};ot[De.CHILD]=function(t,e){return tt(t.child,e)&&tt(t.parent,e.parent())};ot[De.PARENT]=function(t,e){return tt(t.parent,e)&&e.children().some(function(r){return tt(t.child,r)})};ot[De.DESCENDANT]=function(t,e){return tt(t.descendant,e)&&e.ancestors().some(function(r){return tt(t.ancestor,r)})};ot[De.ANCESTOR]=function(t,e){return tt(t.ancestor,e)&&e.descendants().some(function(r){return tt(t.descendant,r)})};ot[De.COMPOUND_SPLIT]=function(t,e){return tt(t.subject,e)&&tt(t.left,e)&&tt(t.right,e)};ot[De.TRUE]=function(){return!0};ot[De.COLLECTION]=function(t,e){var r=t.value;return r.has(e)};ot[De.FILTER]=function(t,e){var r=t.value;return r(e)};var ap=function(e){var r=this;if(r.length===1&&r[0].checks.length===1&&r[0].checks[0].type===De.ID)return e.getElementById(r[0].checks[0].value).collection();var a=function(i){for(var o=0;o<r.length;o++){var s=r[o];if(tt(s,i))return!0}return!1};return r.text()==null&&(a=function(){return!0}),e.filter(a)},np=function(e){for(var r=this,a=0;a<r.length;a++){var n=r[a];if(tt(n,e))return!0}return!1},ip={matches:np,filter:ap},xr=function(e){this.inputText=e,this.currentSubject=null,this.compoundCount=0,this.edgeCount=0,this.length=0,e==null||Me(e)&&e.match(/^\s*$/)||(kt(e)?this.addQuery({checks:[{type:De.COLLECTION,value:e.collection()}]}):at(e)?this.addQuery({checks:[{type:De.FILTER,value:e}]}):Me(e)?this.parse(e)||(this.invalid=!0):rt("A selector must be created from a string; found "))},Tr=xr.prototype;[jg,ip].forEach(function(t){return Ne(Tr,t)});Tr.text=function(){return this.inputText};Tr.size=function(){return this.length};Tr.eq=function(t){return this[t]};Tr.sameText=function(t){return!this.invalid&&!t.invalid&&this.text()===t.text()};Tr.addQuery=function(t){this[this.length++]=t};Tr.selector=Tr.toString;var yr={allAre:function(e){var r=new xr(e);return this.every(function(a){return r.matches(a)})},is:function(e){var r=new xr(e);return this.some(function(a){return r.matches(a)})},some:function(e,r){for(var a=0;a<this.length;a++){var n=r?e.apply(r,[this[a],a,this]):e(this[a],a,this);if(n)return!0}return!1},every:function(e,r){for(var a=0;a<this.length;a++){var n=r?e.apply(r,[this[a],a,this]):e(this[a],a,this);if(!n)return!1}return!0},same:function(e){if(this===e)return!0;e=this.cy().collection(e);var r=this.length,a=e.length;return r!==a?!1:r===1?this[0]===e[0]:this.every(function(n){return e.hasElementWithId(n.id())})},anySame:function(e){return e=this.cy().collection(e),this.some(function(r){return e.hasElementWithId(r.id())})},allAreNeighbors:function(e){e=this.cy().collection(e);var r=this.neighborhood();return e.every(function(a){return r.hasElementWithId(a.id())})},contains:function(e){e=this.cy().collection(e);var r=this;return e.every(function(a){return r.hasElementWithId(a.id())})}};yr.allAreNeighbours=yr.allAreNeighbors;yr.has=yr.contains;yr.equal=yr.equals=yr.same;var Ut=function(e,r){return function(n,i,o,s){var l=n,u=this,f;if(l==null?f="":kt(l)&&l.length===1&&(f=l.id()),u.length===1&&f){var v=u[0]._private,h=v.traversalCache=v.traversalCache||{},c=h[r]=h[r]||[],d=zr(f),g=c[d];return g||(c[d]=e.call(u,n,i,o,s))}else return e.call(u,n,i,o,s)}},la={parent:function(e){var r=[];if(this.length===1){var a=this[0]._private.parent;if(a)return a}for(var n=0;n<this.length;n++){var i=this[n],o=i._private.parent;o&&r.push(o)}return this.spawn(r,!0).filter(e)},parents:function(e){for(var r=[],a=this.parent();a.nonempty();){for(var n=0;n<a.length;n++){var i=a[n];r.push(i)}a=a.parent()}return this.spawn(r,!0).filter(e)},commonAncestors:function(e){for(var r,a=0;a<this.length;a++){var n=this[a],i=n.parents();r=r||i,r=r.intersect(i)}return r.filter(e)},orphans:function(e){return this.stdFilter(function(r){return r.isOrphan()}).filter(e)},nonorphans:function(e){return this.stdFilter(function(r){return r.isChild()}).filter(e)},children:Ut(function(t){for(var e=[],r=0;r<this.length;r++)for(var a=this[r],n=a._private.children,i=0;i<n.length;i++)e.push(n[i]);return this.spawn(e,!0).filter(t)},"children"),siblings:function(e){return this.parent().children().not(this).filter(e)},isParent:function(){var e=this[0];if(e)return e.isNode()&&e._private.children.length!==0},isChildless:function(){var e=this[0];if(e)return e.isNode()&&e._private.children.length===0},isChild:function(){var e=this[0];if(e)return e.isNode()&&e._private.parent!=null},isOrphan:function(){var e=this[0];if(e)return e.isNode()&&e._private.parent==null},descendants:function(e){var r=[];function a(n){for(var i=0;i<n.length;i++){var o=n[i];r.push(o),o.children().nonempty()&&a(o.children())}}return a(this.children()),this.spawn(r,!0).filter(e)}};function Ss(t,e,r,a){for(var n=[],i=new fa,o=t.cy(),s=o.hasCompoundNodes(),l=0;l<t.length;l++){var u=t[l];r?n.push(u):s&&a(n,i,u)}for(;n.length>0;){var f=n.shift();e(f),i.add(f.id()),s&&a(n,i,f)}return t}function nv(t,e,r){if(r.isParent())for(var a=r._private.children,n=0;n<a.length;n++){var i=a[n];e.has(i.id())||t.push(i)}}la.forEachDown=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Ss(this,t,e,nv)};function iv(t,e,r){if(r.isChild()){var a=r._private.parent;e.has(a.id())||t.push(a)}}la.forEachUp=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Ss(this,t,e,iv)};function op(t,e,r){iv(t,e,r),nv(t,e,r)}la.forEachUpAndDown=function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Ss(this,t,e,op)};la.ancestors=la.parents;var za,ov;za=ov={data:Ke.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),removeData:Ke.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),scratch:Ke.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:Ke.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),rscratch:Ke.data({field:"rscratch",allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!0}),removeRscratch:Ke.removeData({field:"rscratch",triggerEvent:!1}),id:function(){var e=this[0];if(e)return e._private.data.id}};za.attr=za.data;za.removeAttr=za.removeData;var sp=ov,ti={};function Po(t){return function(e){var r=this;if(e===void 0&&(e=!0),r.length!==0)if(r.isNode()&&!r.removed()){for(var a=0,n=r[0],i=n._private.edges,o=0;o<i.length;o++){var s=i[o];!e&&s.isLoop()||(a+=t(n,s))}return a}else return}}Ne(ti,{degree:Po(function(t,e){return e.source().same(e.target())?2:1}),indegree:Po(function(t,e){return e.target().same(t)?1:0}),outdegree:Po(function(t,e){return e.source().same(t)?1:0})});function $r(t,e){return function(r){for(var a,n=this.nodes(),i=0;i<n.length;i++){var o=n[i],s=o[t](r);s!==void 0&&(a===void 0||e(s,a))&&(a=s)}return a}}Ne(ti,{minDegree:$r("degree",function(t,e){return t<e}),maxDegree:$r("degree",function(t,e){return t>e}),minIndegree:$r("indegree",function(t,e){return t<e}),maxIndegree:$r("indegree",function(t,e){return t>e}),minOutdegree:$r("outdegree",function(t,e){return t<e}),maxOutdegree:$r("outdegree",function(t,e){return t>e})});Ne(ti,{totalDegree:function(e){for(var r=0,a=this.nodes(),n=0;n<a.length;n++)r+=a[n].degree(e);return r}});var $t,sv,uv=function(e,r,a){for(var n=0;n<e.length;n++){var i=e[n];if(!i.locked()){var o=i._private.position,s={x:r.x!=null?r.x-o.x:0,y:r.y!=null?r.y-o.y:0};i.isParent()&&!(s.x===0&&s.y===0)&&i.children().shift(s,a),i.dirtyBoundingBoxCache()}}},Cl={field:"position",bindingEvent:"position",allowBinding:!0,allowSetting:!0,settingEvent:"position",settingTriggersEvent:!0,triggerFnName:"emitAndNotify",allowGetting:!0,validKeys:["x","y"],beforeGet:function(e){e.updateCompoundBounds()},beforeSet:function(e,r){uv(e,r,!1)},onSet:function(e){e.dirtyCompoundBoundsCache()},canSet:function(e){return!e.locked()}};$t=sv={position:Ke.data(Cl),silentPosition:Ke.data(Ne({},Cl,{allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!1,beforeSet:function(e,r){uv(e,r,!0)},onSet:function(e){e.dirtyCompoundBoundsCache()}})),positions:function(e,r){if(Ye(e))r?this.silentPosition(e):this.position(e);else if(at(e)){var a=e,n=this.cy();n.startBatch();for(var i=0;i<this.length;i++){var o=this[i],s=void 0;(s=a(o,i))&&(r?o.silentPosition(s):o.position(s))}n.endBatch()}return this},silentPositions:function(e){return this.positions(e,!0)},shift:function(e,r,a){var n;if(Ye(e)?(n={x:xe(e.x)?e.x:0,y:xe(e.y)?e.y:0},a=r):Me(e)&&xe(r)&&(n={x:0,y:0},n[e]=r),n!=null){var i=this.cy();i.startBatch();for(var o=0;o<this.length;o++){var s=this[o];if(!(i.hasCompoundNodes()&&s.isChild()&&s.ancestors().anySame(this))){var l=s.position(),u={x:l.x+n.x,y:l.y+n.y};a?s.silentPosition(u):s.position(u)}}i.endBatch()}return this},silentShift:function(e,r){return Ye(e)?this.shift(e,!0):Me(e)&&xe(r)&&this.shift(e,r,!0),this},renderedPosition:function(e,r){var a=this[0],n=this.cy(),i=n.zoom(),o=n.pan(),s=Ye(e)?e:void 0,l=s!==void 0||r!==void 0&&Me(e);if(a&&a.isNode())if(l)for(var u=0;u<this.length;u++){var f=this[u];r!==void 0?f.position(e,(r-o[e])/i):s!==void 0&&f.position(Ff(s,i,o))}else{var v=a.position();return s=_n(v,i,o),e===void 0?s:s[e]}else if(!l)return;return this},relativePosition:function(e,r){var a=this[0],n=this.cy(),i=Ye(e)?e:void 0,o=i!==void 0||r!==void 0&&Me(e),s=n.hasCompoundNodes();if(a&&a.isNode())if(o)for(var l=0;l<this.length;l++){var u=this[l],f=s?u.parent():null,v=f&&f.length>0,h=v;v&&(f=f[0]);var c=h?f.position():{x:0,y:0};r!==void 0?u.position(e,r+c[e]):i!==void 0&&u.position({x:i.x+c.x,y:i.y+c.y})}else{var d=a.position(),g=s?a.parent():null,y=g&&g.length>0,p=y;y&&(g=g[0]);var m=p?g.position():{x:0,y:0};return i={x:d.x-m.x,y:d.y-m.y},e===void 0?i:i[e]}else if(!o)return;return this}};$t.modelPosition=$t.point=$t.position;$t.modelPositions=$t.points=$t.positions;$t.renderedPoint=$t.renderedPosition;$t.relativePoint=$t.relativePosition;var up=sv,oa,Ar;oa=Ar={};Ar.renderedBoundingBox=function(t){var e=this.boundingBox(t),r=this.cy(),a=r.zoom(),n=r.pan(),i=e.x1*a+n.x,o=e.x2*a+n.x,s=e.y1*a+n.y,l=e.y2*a+n.y;return{x1:i,x2:o,y1:s,y2:l,w:o-i,h:l-s}};Ar.dirtyCompoundBoundsCache=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=this.cy();return!e.styleEnabled()||!e.hasCompoundNodes()?this:(this.forEachUp(function(r){if(r.isParent()){var a=r._private;a.compoundBoundsClean=!1,a.bbCache=null,t||r.emitAndNotify("bounds")}}),this)};Ar.updateCompoundBounds=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=this.cy();if(!e.styleEnabled()||!e.hasCompoundNodes())return this;if(!t&&e.batching())return this;function r(o){if(!o.isParent())return;var s=o._private,l=o.children(),u=o.pstyle("compound-sizing-wrt-labels").value==="include",f={width:{val:o.pstyle("min-width").pfValue,left:o.pstyle("min-width-bias-left"),right:o.pstyle("min-width-bias-right")},height:{val:o.pstyle("min-height").pfValue,top:o.pstyle("min-height-bias-top"),bottom:o.pstyle("min-height-bias-bottom")}},v=l.boundingBox({includeLabels:u,includeOverlays:!1,useCache:!1}),h=s.position;(v.w===0||v.h===0)&&(v={w:o.pstyle("width").pfValue,h:o.pstyle("height").pfValue},v.x1=h.x-v.w/2,v.x2=h.x+v.w/2,v.y1=h.y-v.h/2,v.y2=h.y+v.h/2);function c(O,M,P){var w=0,x=0,T=M+P;return O>0&&T>0&&(w=M/T*O,x=P/T*O),{biasDiff:w,biasComplementDiff:x}}function d(O,M,P,w){if(P.units==="%")switch(w){case"width":return O>0?P.pfValue*O:0;case"height":return M>0?P.pfValue*M:0;case"average":return O>0&&M>0?P.pfValue*(O+M)/2:0;case"min":return O>0&&M>0?O>M?P.pfValue*M:P.pfValue*O:0;case"max":return O>0&&M>0?O>M?P.pfValue*O:P.pfValue*M:0;default:return 0}else return P.units==="px"?P.pfValue:0}var g=f.width.left.value;f.width.left.units==="px"&&f.width.val>0&&(g=g*100/f.width.val);var y=f.width.right.value;f.width.right.units==="px"&&f.width.val>0&&(y=y*100/f.width.val);var p=f.height.top.value;f.height.top.units==="px"&&f.height.val>0&&(p=p*100/f.height.val);var m=f.height.bottom.value;f.height.bottom.units==="px"&&f.height.val>0&&(m=m*100/f.height.val);var b=c(f.width.val-v.w,g,y),E=b.biasDiff,C=b.biasComplementDiff,L=c(f.height.val-v.h,p,m),D=L.biasDiff,R=L.biasComplementDiff;s.autoPadding=d(v.w,v.h,o.pstyle("padding"),o.pstyle("padding-relative-to").value),s.autoWidth=Math.max(v.w,f.width.val),h.x=(-E+v.x1+v.x2+C)/2,s.autoHeight=Math.max(v.h,f.height.val),h.y=(-D+v.y1+v.y2+R)/2}for(var a=0;a<this.length;a++){var n=this[a],i=n._private;(!i.compoundBoundsClean||t)&&(r(n),e.batching()||(i.compoundBoundsClean=!0))}return this};var Gt=function(e){return e===1/0||e===-1/0?0:e},Xt=function(e,r,a,n,i){n-r===0||i-a===0||r==null||a==null||n==null||i==null||(e.x1=r<e.x1?r:e.x1,e.x2=n>e.x2?n:e.x2,e.y1=a<e.y1?a:e.y1,e.y2=i>e.y2?i:e.y2,e.w=e.x2-e.x1,e.h=e.y2-e.y1)},cr=function(e,r){return r==null?e:Xt(e,r.x1,r.y1,r.x2,r.y2)},Ea=function(e,r,a){return Ot(e,r,a)},dn=function(e,r,a){if(!r.cy().headless()){var n=r._private,i=n.rstyle,o=i.arrowWidth/2,s=r.pstyle(a+"-arrow-shape").value,l,u;if(s!=="none"){a==="source"?(l=i.srcX,u=i.srcY):a==="target"?(l=i.tgtX,u=i.tgtY):(l=i.midX,u=i.midY);var f=n.arrowBounds=n.arrowBounds||{},v=f[a]=f[a]||{};v.x1=l-o,v.y1=u-o,v.x2=l+o,v.y2=u+o,v.w=v.x2-v.x1,v.h=v.y2-v.y1,xn(v,1),Xt(e,v.x1,v.y1,v.x2,v.y2)}}},Oo=function(e,r,a){if(!r.cy().headless()){var n;a?n=a+"-":n="";var i=r._private,o=i.rstyle,s=r.pstyle(n+"label").strValue;if(s){var l=r.pstyle("text-halign"),u=r.pstyle("text-valign"),f=Ea(o,"labelWidth",a),v=Ea(o,"labelHeight",a),h=Ea(o,"labelX",a),c=Ea(o,"labelY",a),d=r.pstyle(n+"text-margin-x").pfValue,g=r.pstyle(n+"text-margin-y").pfValue,y=r.isEdge(),p=r.pstyle(n+"text-rotation"),m=r.pstyle("text-outline-width").pfValue,b=r.pstyle("text-border-width").pfValue,E=b/2,C=r.pstyle("text-background-padding").pfValue,L=2,D=v,R=f,O=R/2,M=D/2,P,w,x,T;if(y)P=h-O,w=h+O,x=c-M,T=c+M;else{switch(l.value){case"left":P=h-R,w=h;break;case"center":P=h-O,w=h+O;break;case"right":P=h,w=h+R;break}switch(u.value){case"top":x=c-D,T=c;break;case"center":x=c-M,T=c+M;break;case"bottom":x=c,T=c+D;break}}var A=d-Math.max(m,E)-C-L,S=d+Math.max(m,E)+C+L,I=g-Math.max(m,E)-C-L,B=g+Math.max(m,E)+C+L;P+=A,w+=S,x+=I,T+=B;var k=a||"main",z=i.labelBounds,F=z[k]=z[k]||{};F.x1=P,F.y1=x,F.x2=w,F.y2=T,F.w=w-P,F.h=T-x,F.leftPad=A,F.rightPad=S,F.topPad=I,F.botPad=B;var V=y&&p.strValue==="autorotate",Z=p.pfValue!=null&&p.pfValue!==0;if(V||Z){var q=V?Ea(i.rstyle,"labelAngle",a):p.pfValue,_=Math.cos(q),K=Math.sin(q),U=(P+w)/2,J=(x+T)/2;if(!y){switch(l.value){case"left":U=w;break;case"right":U=P;break}switch(u.value){case"top":J=T;break;case"bottom":J=x;break}}var $=function(he,le){return he=he-U,le=le-J,{x:he*_-le*K+U,y:he*K+le*_+J}},H=$(P,x),Y=$(P,T),Q=$(w,x),oe=$(w,T);P=Math.min(H.x,Y.x,Q.x,oe.x),w=Math.max(H.x,Y.x,Q.x,oe.x),x=Math.min(H.y,Y.y,Q.y,oe.y),T=Math.max(H.y,Y.y,Q.y,oe.y)}var te=k+"Rot",Te=z[te]=z[te]||{};Te.x1=P,Te.y1=x,Te.x2=w,Te.y2=T,Te.w=w-P,Te.h=T-x,Xt(e,P,x,w,T),Xt(i.labelBounds.all,P,x,w,T)}return e}},Sl=function(e,r){if(!r.cy().headless()){var a=r.pstyle("outline-opacity").value,n=r.pstyle("outline-width").value,i=r.pstyle("outline-offset").value,o=n+i;lv(e,r,a,o,"outside",o/2)}},lv=function(e,r,a,n,i,o){if(!(a===0||n<=0||i==="inside")){var s=r.cy(),l=r.pstyle("shape").value,u=s.renderer().nodeShapes[l],f=r.position(),v=f.x,h=f.y,c=r.width(),d=r.height();if(u.hasMiterBounds){i==="center"&&(n/=2);var g=u.miterBounds(v,h,c,d,n);cr(e,g)}else o!=null&&o>0&&Tn(e,[o,o,o,o])}},lp=function(e,r){if(!r.cy().headless()){var a=r.pstyle("border-opacity").value,n=r.pstyle("border-width").pfValue,i=r.pstyle("border-position").value;lv(e,r,a,n,i)}},fp=function(e,r){var a=e._private.cy,n=a.styleEnabled(),i=a.headless(),o=Lt(),s=e._private,l=e.isNode(),u=e.isEdge(),f,v,h,c,d,g,y=s.rstyle,p=l&&n?e.pstyle("bounds-expansion").pfValue:[0],m=function(Le){return Le.pstyle("display").value!=="none"},b=!n||m(e)&&(!u||m(e.source())&&m(e.target()));if(b){var E=0,C=0;n&&r.includeOverlays&&(E=e.pstyle("overlay-opacity").value,E!==0&&(C=e.pstyle("overlay-padding").value));var L=0,D=0;n&&r.includeUnderlays&&(L=e.pstyle("underlay-opacity").value,L!==0&&(D=e.pstyle("underlay-padding").value));var R=Math.max(C,D),O=0,M=0;if(n&&(O=e.pstyle("width").pfValue,M=O/2),l&&r.includeNodes){var P=e.position();d=P.x,g=P.y;var w=e.outerWidth(),x=w/2,T=e.outerHeight(),A=T/2;f=d-x,v=d+x,h=g-A,c=g+A,Xt(o,f,h,v,c),n&&Sl(o,e),n&&r.includeOutlines&&!i&&Sl(o,e),n&&lp(o,e)}else if(u&&r.includeEdges)if(n&&!i){var S=e.pstyle("curve-style").strValue;if(f=Math.min(y.srcX,y.midX,y.tgtX),v=Math.max(y.srcX,y.midX,y.tgtX),h=Math.min(y.srcY,y.midY,y.tgtY),c=Math.max(y.srcY,y.midY,y.tgtY),f-=M,v+=M,h-=M,c+=M,Xt(o,f,h,v,c),S==="haystack"){var I=y.haystackPts;if(I&&I.length===2){if(f=I[0].x,h=I[0].y,v=I[1].x,c=I[1].y,f>v){var B=f;f=v,v=B}if(h>c){var k=h;h=c,c=k}Xt(o,f-M,h-M,v+M,c+M)}}else if(S==="bezier"||S==="unbundled-bezier"||dr(S,"segments")||dr(S,"taxi")){var z;switch(S){case"bezier":case"unbundled-bezier":z=y.bezierPts;break;case"segments":case"taxi":case"round-segments":case"round-taxi":z=y.linePts;break}if(z!=null)for(var F=0;F<z.length;F++){var V=z[F];f=V.x-M,v=V.x+M,h=V.y-M,c=V.y+M,Xt(o,f,h,v,c)}}}else{var Z=e.source(),q=Z.position(),_=e.target(),K=_.position();if(f=q.x,v=K.x,h=q.y,c=K.y,f>v){var U=f;f=v,v=U}if(h>c){var J=h;h=c,c=J}f-=M,v+=M,h-=M,c+=M,Xt(o,f,h,v,c)}if(n&&r.includeEdges&&u&&(dn(o,e,"mid-source"),dn(o,e,"mid-target"),dn(o,e,"source"),dn(o,e,"target")),n){var $=e.pstyle("ghost").value==="yes";if($){var H=e.pstyle("ghost-offset-x").pfValue,Y=e.pstyle("ghost-offset-y").pfValue;Xt(o,o.x1+H,o.y1+Y,o.x2+H,o.y2+Y)}}var Q=s.bodyBounds=s.bodyBounds||{};fu(Q,o),Tn(Q,p),xn(Q,1),n&&(f=o.x1,v=o.x2,h=o.y1,c=o.y2,Xt(o,f-R,h-R,v+R,c+R));var oe=s.overlayBounds=s.overlayBounds||{};fu(oe,o),Tn(oe,p),xn(oe,1);var te=s.labelBounds=s.labelBounds||{};te.all!=null?Wc(te.all):te.all=Lt(),n&&r.includeLabels&&(r.includeMainLabels&&Oo(o,e,null),u&&(r.includeSourceLabels&&Oo(o,e,"source"),r.includeTargetLabels&&Oo(o,e,"target")))}return o.x1=Gt(o.x1),o.y1=Gt(o.y1),o.x2=Gt(o.x2),o.y2=Gt(o.y2),o.w=Gt(o.x2-o.x1),o.h=Gt(o.y2-o.y1),o.w>0&&o.h>0&&b&&(Tn(o,p),xn(o,1)),o},fv=function(e){var r=0,a=function(o){return(o?1:0)<<r++},n=0;return n+=a(e.incudeNodes),n+=a(e.includeEdges),n+=a(e.includeLabels),n+=a(e.includeMainLabels),n+=a(e.includeSourceLabels),n+=a(e.includeTargetLabels),n+=a(e.includeOverlays),n+=a(e.includeOutlines),n},vv=function(e){var r=function(s){return Math.round(s)};if(e.isEdge()){var a=e.source().position(),n=e.target().position();return nu([r(a.x),r(a.y),r(n.x),r(n.y)])}else{var i=e.position();return nu([r(i.x),r(i.y)])}},Dl=function(e,r){var a=e._private,n,i=e.isEdge(),o=r==null?Al:fv(r),s=o===Al;if(a.bbCache==null?(n=fp(e,Va),a.bbCache=n,a.bbCachePosKey=vv(e)):n=a.bbCache,!s){var l=e.isNode();n=Lt(),(r.includeNodes&&l||r.includeEdges&&!l)&&(r.includeOverlays?cr(n,a.overlayBounds):cr(n,a.bodyBounds)),r.includeLabels&&(r.includeMainLabels&&(!i||r.includeSourceLabels&&r.includeTargetLabels)?cr(n,a.labelBounds.all):(r.includeMainLabels&&cr(n,a.labelBounds.mainRot),r.includeSourceLabels&&cr(n,a.labelBounds.sourceRot),r.includeTargetLabels&&cr(n,a.labelBounds.targetRot))),n.w=n.x2-n.x1,n.h=n.y2-n.y1}return n},Va={includeNodes:!0,includeEdges:!0,includeLabels:!0,includeMainLabels:!0,includeSourceLabels:!0,includeTargetLabels:!0,includeOverlays:!0,includeUnderlays:!0,includeOutlines:!0,useCache:!0},Al=fv(Va),Ll=Et(Va);Ar.boundingBox=function(t){var e,r=t===void 0||t.useCache===void 0||t.useCache===!0,a=sa(function(f){var v=f._private;return v.bbCache==null||v.styleDirty||v.bbCachePosKey!==vv(f)},function(f){return f.id()});if(r&&this.length===1&&!a(this[0]))t===void 0?t=Va:t=Ll(t),e=Dl(this[0],t);else{e=Lt(),t=t||Va;var n=Ll(t),i=this,o=i.cy(),s=o.styleEnabled();this.edges().forEach(a),this.nodes().forEach(a),s&&this.recalculateRenderedStyle(r),this.updateCompoundBounds(!r);for(var l=0;l<i.length;l++){var u=i[l];a(u)&&u.dirtyBoundingBoxCache(),cr(e,Dl(u,n))}}return e.x1=Gt(e.x1),e.y1=Gt(e.y1),e.x2=Gt(e.x2),e.y2=Gt(e.y2),e.w=Gt(e.x2-e.x1),e.h=Gt(e.y2-e.y1),e};Ar.dirtyBoundingBoxCache=function(){for(var t=0;t<this.length;t++){var e=this[t]._private;e.bbCache=null,e.bbCachePosKey=null,e.bodyBounds=null,e.overlayBounds=null,e.labelBounds.all=null,e.labelBounds.source=null,e.labelBounds.target=null,e.labelBounds.main=null,e.labelBounds.sourceRot=null,e.labelBounds.targetRot=null,e.labelBounds.mainRot=null,e.arrowBounds.source=null,e.arrowBounds.target=null,e.arrowBounds["mid-source"]=null,e.arrowBounds["mid-target"]=null}return this.emitAndNotify("bounds"),this};Ar.boundingBoxAt=function(t){var e=this.nodes(),r=this.cy(),a=r.hasCompoundNodes(),n=r.collection();if(a&&(n=e.filter(function(u){return u.isParent()}),e=e.not(n)),Ye(t)){var i=t;t=function(){return i}}var o=function(f,v){return f._private.bbAtOldPos=t(f,v)},s=function(f){return f._private.bbAtOldPos};r.startBatch(),e.forEach(o).silentPositions(t),a&&(n.dirtyCompoundBoundsCache(),n.dirtyBoundingBoxCache(),n.updateCompoundBounds(!0));var l=Yc(this.boundingBox({useCache:!1}));return e.silentPositions(s),a&&(n.dirtyCompoundBoundsCache(),n.dirtyBoundingBoxCache(),n.updateCompoundBounds(!0)),r.endBatch(),l};oa.boundingbox=oa.bb=oa.boundingBox;oa.renderedBoundingbox=oa.renderedBoundingBox;var vp=Ar,La,Za;La=Za={};var hv=function(e){e.uppercaseName=qs(e.name),e.autoName="auto"+e.uppercaseName,e.labelName="label"+e.uppercaseName,e.outerName="outer"+e.uppercaseName,e.uppercaseOuterName=qs(e.outerName),La[e.name]=function(){var a=this[0],n=a._private,i=n.cy,o=i._private.styleEnabled;if(a)if(o){if(a.isParent())return a.updateCompoundBounds(),n[e.autoName]||0;var s=a.pstyle(e.name);return s.strValue==="label"?(a.recalculateRenderedStyle(),n.rstyle[e.labelName]||0):s.pfValue}else return 1},La["outer"+e.uppercaseName]=function(){var a=this[0],n=a._private,i=n.cy,o=i._private.styleEnabled;if(a)if(o){var s=a[e.name](),l=a.pstyle("border-position").value,u;l==="center"?u=a.pstyle("border-width").pfValue:l==="outside"?u=2*a.pstyle("border-width").pfValue:u=0;var f=2*a.padding();return s+u+f}else return 1},La["rendered"+e.uppercaseName]=function(){var a=this[0];if(a){var n=a[e.name]();return n*this.cy().zoom()}},La["rendered"+e.uppercaseOuterName]=function(){var a=this[0];if(a){var n=a[e.outerName]();return n*this.cy().zoom()}}};hv({name:"width"});hv({name:"height"});Za.padding=function(){var t=this[0],e=t._private;return t.isParent()?(t.updateCompoundBounds(),e.autoPadding!==void 0?e.autoPadding:t.pstyle("padding").pfValue):t.pstyle("padding").pfValue};Za.paddedHeight=function(){var t=this[0];return t.height()+2*t.padding()};Za.paddedWidth=function(){var t=this[0];return t.width()+2*t.padding()};var hp=Za,cp=function(e,r){if(e.isEdge()&&e.takesUpSpace())return r(e)},dp=function(e,r){if(e.isEdge()&&e.takesUpSpace()){var a=e.cy();return _n(r(e),a.zoom(),a.pan())}},gp=function(e,r){if(e.isEdge()&&e.takesUpSpace()){var a=e.cy(),n=a.pan(),i=a.zoom();return r(e).map(function(o){return _n(o,i,n)})}},pp=function(e){return e.renderer().getControlPoints(e)},yp=function(e){return e.renderer().getSegmentPoints(e)},mp=function(e){return e.renderer().getSourceEndpoint(e)},bp=function(e){return e.renderer().getTargetEndpoint(e)},wp=function(e){return e.renderer().getEdgeMidpoint(e)},Ml={controlPoints:{get:pp,mult:!0},segmentPoints:{get:yp,mult:!0},sourceEndpoint:{get:mp},targetEndpoint:{get:bp},midpoint:{get:wp}},Ep=function(e){return"rendered"+e[0].toUpperCase()+e.substr(1)},xp=Object.keys(Ml).reduce(function(t,e){var r=Ml[e],a=Ep(e);return t[e]=function(){return cp(this,r.get)},r.mult?t[a]=function(){return gp(this,r.get)}:t[a]=function(){return dp(this,r.get)},t},{}),Tp=Ne({},up,vp,hp,xp);var cv=function(e,r){this.recycle(e,r)};function xa(){return!1}function gn(){return!0}cv.prototype={instanceString:function(){return"event"},recycle:function(e,r){if(this.isImmediatePropagationStopped=this.isPropagationStopped=this.isDefaultPrevented=xa,e!=null&&e.preventDefault?(this.type=e.type,this.isDefaultPrevented=e.defaultPrevented?gn:xa):e!=null&&e.type?r=e:this.type=e,r!=null&&(this.originalEvent=r.originalEvent,this.type=r.type!=null?r.type:this.type,this.cy=r.cy,this.target=r.target,this.position=r.position,this.renderedPosition=r.renderedPosition,this.namespace=r.namespace,this.layout=r.layout),this.cy!=null&&this.position!=null&&this.renderedPosition==null){var a=this.position,n=this.cy.zoom(),i=this.cy.pan();this.renderedPosition={x:a.x*n+i.x,y:a.y*n+i.y}}this.timeStamp=e&&e.timeStamp||Date.now()},preventDefault:function(){this.isDefaultPrevented=gn;var e=this.originalEvent;e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.isPropagationStopped=gn;var e=this.originalEvent;e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=gn,this.stopPropagation()},isDefaultPrevented:xa,isPropagationStopped:xa,isImmediatePropagationStopped:xa};var dv=/^([^.]+)(\.(?:[^.]+))?$/,Cp=".*",gv={qualifierCompare:function(e,r){return e===r},eventMatches:function(){return!0},addEventFields:function(){},callbackContext:function(e){return e},beforeEmit:function(){},afterEmit:function(){},bubble:function(){return!1},parent:function(){return null},context:null},Rl=Object.keys(gv),Sp={};function ri(){for(var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sp,e=arguments.length>1?arguments[1]:void 0,r=0;r<Rl.length;r++){var a=Rl[r];this[a]=t[a]||gv[a]}this.context=e||this.context,this.listeners=[],this.emitting=0}var Cr=ri.prototype,pv=function(e,r,a,n,i,o,s){at(n)&&(i=n,n=null),s&&(o==null?o=s:o=Ne({},o,s));for(var l=Je(a)?a:a.split(/\s+/),u=0;u<l.length;u++){var f=l[u];if(!br(f)){var v=f.match(dv);if(v){var h=v[1],c=v[2]?v[2]:null,d=r(e,f,h,c,n,i,o);if(d===!1)break}}}},Nl=function(e,r){return e.addEventFields(e.context,r),new cv(r.type,r)},Dp=function(e,r,a){if(Ph(a)){r(e,a);return}else if(Ye(a)){r(e,Nl(e,a));return}for(var n=Je(a)?a:a.split(/\s+/),i=0;i<n.length;i++){var o=n[i];if(!br(o)){var s=o.match(dv);if(s){var l=s[1],u=s[2]?s[2]:null,f=Nl(e,{type:l,namespace:u,target:e.context});r(e,f)}}}};Cr.on=Cr.addListener=function(t,e,r,a,n){return pv(this,function(i,o,s,l,u,f,v){at(f)&&i.listeners.push({event:o,callback:f,type:s,namespace:l,qualifier:u,conf:v})},t,e,r,a,n),this};Cr.one=function(t,e,r,a){return this.on(t,e,r,a,{one:!0})};Cr.removeListener=Cr.off=function(t,e,r,a){var n=this;this.emitting!==0&&(this.listeners=dc(this.listeners));for(var i=this.listeners,o=function(u){var f=i[u];pv(n,function(v,h,c,d,g,y){if((f.type===c||t==="*")&&(!d&&f.namespace!==".*"||f.namespace===d)&&(!g||v.qualifierCompare(f.qualifier,g))&&(!y||f.callback===y))return i.splice(u,1),!1},t,e,r,a)},s=i.length-1;s>=0;s--)o(s);return this};Cr.removeAllListeners=function(){return this.removeListener("*")};Cr.emit=Cr.trigger=function(t,e,r){var a=this.listeners,n=a.length;return this.emitting++,Je(e)||(e=[e]),Dp(this,function(i,o){r!=null&&(a=[{event:o.event,type:o.type,namespace:o.namespace,callback:r}],n=a.length);for(var s=function(){var f=a[l];if(f.type===o.type&&(!f.namespace||f.namespace===o.namespace||f.namespace===Cp)&&i.eventMatches(i.context,f,o)){var v=[o];e!=null&&pc(v,e),i.beforeEmit(i.context,f,o),f.conf&&f.conf.one&&(i.listeners=i.listeners.filter(function(d){return d!==f}));var h=i.callbackContext(i.context,f,o),c=f.callback.apply(h,v);i.afterEmit(i.context,f,o),c===!1&&(o.stopPropagation(),o.preventDefault())}},l=0;l<n;l++)s();i.bubble(i.context)&&!o.isPropagationStopped()&&i.parent(i.context).emit(o,e)},t),this.emitting--,this};var Ap={qualifierCompare:function(e,r){return e==null||r==null?e==null&&r==null:e.sameText(r)},eventMatches:function(e,r,a){var n=r.qualifier;return n!=null?e!==a.target&&Ya(a.target)&&n.matches(a.target):!0},addEventFields:function(e,r){r.cy=e.cy(),r.target=e},callbackContext:function(e,r,a){return r.qualifier!=null?a.target:e},beforeEmit:function(e,r){r.conf&&r.conf.once&&r.conf.onceCollection.removeListener(r.event,r.qualifier,r.callback)},bubble:function(){return!0},parent:function(e){return e.isChild()?e.parent():e.cy()}},pn=function(e){return Me(e)?new xr(e):e},yv={createEmitter:function(){for(var e=0;e<this.length;e++){var r=this[e],a=r._private;a.emitter||(a.emitter=new ri(Ap,r))}return this},emitter:function(){return this._private.emitter},on:function(e,r,a){for(var n=pn(r),i=0;i<this.length;i++){var o=this[i];o.emitter().on(e,n,a)}return this},removeListener:function(e,r,a){for(var n=pn(r),i=0;i<this.length;i++){var o=this[i];o.emitter().removeListener(e,n,a)}return this},removeAllListeners:function(){for(var e=0;e<this.length;e++){var r=this[e];r.emitter().removeAllListeners()}return this},one:function(e,r,a){for(var n=pn(r),i=0;i<this.length;i++){var o=this[i];o.emitter().one(e,n,a)}return this},once:function(e,r,a){for(var n=pn(r),i=0;i<this.length;i++){var o=this[i];o.emitter().on(e,n,a,{once:!0,onceCollection:this})}},emit:function(e,r){for(var a=0;a<this.length;a++){var n=this[a];n.emitter().emit(e,r)}return this},emitAndNotify:function(e,r){if(this.length!==0)return this.cy().notify(e,this),this.emit(e,r),this}};Ke.eventAliasesOn(yv);var mv={nodes:function(e){return this.filter(function(r){return r.isNode()}).filter(e)},edges:function(e){return this.filter(function(r){return r.isEdge()}).filter(e)},byGroup:function(){for(var e=this.spawn(),r=this.spawn(),a=0;a<this.length;a++){var n=this[a];n.isNode()?e.push(n):r.push(n)}return{nodes:e,edges:r}},filter:function(e,r){if(e===void 0)return this;if(Me(e)||kt(e))return new xr(e).filter(this);if(at(e)){for(var a=this.spawn(),n=this,i=0;i<n.length;i++){var o=n[i],s=r?e.apply(r,[o,i,n]):e(o,i,n);s&&a.push(o)}return a}return this.spawn()},not:function(e){if(e){Me(e)&&(e=this.filter(e));for(var r=this.spawn(),a=0;a<this.length;a++){var n=this[a],i=e.has(n);i||r.push(n)}return r}else return this},absoluteComplement:function(){var e=this.cy();return e.mutableElements().not(this)},intersect:function(e){if(Me(e)){var r=e;return this.filter(r)}for(var a=this.spawn(),n=this,i=e,o=this.length<e.length,s=o?n:i,l=o?i:n,u=0;u<s.length;u++){var f=s[u];l.has(f)&&a.push(f)}return a},xor:function(e){var r=this._private.cy;Me(e)&&(e=r.$(e));var a=this.spawn(),n=this,i=e,o=function(l,u){for(var f=0;f<l.length;f++){var v=l[f],h=v._private.data.id,c=u.hasElementWithId(h);c||a.push(v)}};return o(n,i),o(i,n),a},diff:function(e){var r=this._private.cy;Me(e)&&(e=r.$(e));var a=this.spawn(),n=this.spawn(),i=this.spawn(),o=this,s=e,l=function(f,v,h){for(var c=0;c<f.length;c++){var d=f[c],g=d._private.data.id,y=v.hasElementWithId(g);y?i.merge(d):h.push(d)}};return l(o,s,a),l(s,o,n),{left:a,right:n,both:i}},add:function(e){var r=this._private.cy;if(!e)return this;if(Me(e)){var a=e;e=r.mutableElements().filter(a)}for(var n=this.spawnSelf(),i=0;i<e.length;i++){var o=e[i],s=!this.has(o);s&&n.push(o)}return n},merge:function(e){var r=this._private,a=r.cy;if(!e)return this;if(e&&Me(e)){var n=e;e=a.mutableElements().filter(n)}for(var i=r.map,o=0;o<e.length;o++){var s=e[o],l=s._private.data.id,u=!i.has(l);if(u){var f=this.length++;this[f]=s,i.set(l,{ele:s,index:f})}}return this},unmergeAt:function(e){var r=this[e],a=r.id(),n=this._private,i=n.map;this[e]=void 0,i.delete(a);var o=e===this.length-1;if(this.length>1&&!o){var s=this.length-1,l=this[s],u=l._private.data.id;this[s]=void 0,this[e]=l,i.set(u,{ele:l,index:e})}return this.length--,this},unmergeOne:function(e){e=e[0];var r=this._private,a=e._private.data.id,n=r.map,i=n.get(a);if(!i)return this;var o=i.index;return this.unmergeAt(o),this},unmerge:function(e){var r=this._private.cy;if(!e)return this;if(e&&Me(e)){var a=e;e=r.mutableElements().filter(a)}for(var n=0;n<e.length;n++)this.unmergeOne(e[n]);return this},unmergeBy:function(e){for(var r=this.length-1;r>=0;r--){var a=this[r];e(a)&&this.unmergeAt(r)}return this},map:function(e,r){for(var a=[],n=this,i=0;i<n.length;i++){var o=n[i],s=r?e.apply(r,[o,i,n]):e(o,i,n);a.push(s)}return a},reduce:function(e,r){for(var a=r,n=this,i=0;i<n.length;i++)a=e(a,n[i],i,n);return a},max:function(e,r){for(var a=-1/0,n,i=this,o=0;o<i.length;o++){var s=i[o],l=r?e.apply(r,[s,o,i]):e(s,o,i);l>a&&(a=l,n=s)}return{value:a,ele:n}},min:function(e,r){for(var a=1/0,n,i=this,o=0;o<i.length;o++){var s=i[o],l=r?e.apply(r,[s,o,i]):e(s,o,i);l<a&&(a=l,n=s)}return{value:a,ele:n}}},$e=mv;$e.u=$e["|"]=$e["+"]=$e.union=$e.or=$e.add;$e["\\"]=$e["!"]=$e["-"]=$e.difference=$e.relativeComplement=$e.subtract=$e.not;$e.n=$e["&"]=$e["."]=$e.and=$e.intersection=$e.intersect;$e["^"]=$e["(+)"]=$e["(-)"]=$e.symmetricDifference=$e.symdiff=$e.xor;$e.fnFilter=$e.filterFn=$e.stdFilter=$e.filter;$e.complement=$e.abscomp=$e.absoluteComplement;var Lp={isNode:function(){return this.group()==="nodes"},isEdge:function(){return this.group()==="edges"},isLoop:function(){return this.isEdge()&&this.source()[0]===this.target()[0]},isSimple:function(){return this.isEdge()&&this.source()[0]!==this.target()[0]},group:function(){var e=this[0];if(e)return e._private.group}},bv=function(e,r){var a=e.cy(),n=a.hasCompoundNodes();function i(f){var v=f.pstyle("z-compound-depth");return v.value==="auto"?n?f.zDepth():0:v.value==="bottom"?-1:v.value==="top"?ds:0}var o=i(e)-i(r);if(o!==0)return o;function s(f){var v=f.pstyle("z-index-compare");return v.value==="auto"&&f.isNode()?1:0}var l=s(e)-s(r);if(l!==0)return l;var u=e.pstyle("z-index").value-r.pstyle("z-index").value;return u!==0?u:e.poolIndex()-r.poolIndex()},Vn={forEach:function(e,r){if(at(e))for(var a=this.length,n=0;n<a;n++){var i=this[n],o=r?e.apply(r,[i,n,this]):e(i,n,this);if(o===!1)break}return this},toArray:function(){for(var e=[],r=0;r<this.length;r++)e.push(this[r]);return e},slice:function(e,r){var a=[],n=this.length;r==null&&(r=n),e==null&&(e=0),e<0&&(e=n+e),r<0&&(r=n+r);for(var i=e;i>=0&&i<r&&i<n;i++)a.push(this[i]);return this.spawn(a)},size:function(){return this.length},eq:function(e){return this[e]||this.spawn()},first:function(){return this[0]||this.spawn()},last:function(){return this[this.length-1]||this.spawn()},empty:function(){return this.length===0},nonempty:function(){return!this.empty()},sort:function(e){if(!at(e))return this;var r=this.toArray().sort(e);return this.spawn(r)},sortByZIndex:function(){return this.sort(bv)},zDepth:function(){var e=this[0];if(e){var r=e._private,a=r.group;if(a==="nodes"){var n=r.data.parent?e.parents().size():0;return e.isParent()?n:ds-1}else{var i=r.source,o=r.target,s=i.zDepth(),l=o.zDepth();return Math.max(s,l,0)}}}};Vn.each=Vn.forEach;var Mp=function(){var e="undefined",r=(typeof Symbol>"u"?"undefined":dt(Symbol))!=e&&dt(Symbol.iterator)!=e;r&&(Vn[Symbol.iterator]=function(){var a=this,n={value:void 0,done:!1},i=0,o=this.length;return yf({next:function(){return i<o?n.value=a[i++]:(n.value=void 0,n.done=!0),n}},Symbol.iterator,function(){return this})})};Mp();var Rp=Et({nodeDimensionsIncludeLabels:!1}),Sn={layoutDimensions:function(e){e=Rp(e);var r;if(!this.takesUpSpace())r={w:0,h:0};else if(e.nodeDimensionsIncludeLabels){var a=this.boundingBox();r={w:a.w,h:a.h}}else r={w:this.outerWidth(),h:this.outerHeight()};return(r.w===0||r.h===0)&&(r.w=r.h=1),r},layoutPositions:function(e,r,a){var n=this.nodes().filter(function(C){return!C.isParent()}),i=this.cy(),o=r.eles,s=function(L){return L.id()},l=sa(a,s);e.emit({type:"layoutstart",layout:e}),e.animations=[];var u=function(L,D,R){var O={x:D.x1+D.w/2,y:D.y1+D.h/2},M={x:(R.x-O.x)*L,y:(R.y-O.y)*L};return{x:O.x+M.x,y:O.y+M.y}},f=r.spacingFactor&&r.spacingFactor!==1,v=function(){if(!f)return null;for(var L=Lt(),D=0;D<n.length;D++){var R=n[D],O=l(R,D);kf(L,O.x,O.y)}return L},h=v(),c=sa(function(C,L){var D=l(C,L);if(f){var R=Math.abs(r.spacingFactor);D=u(R,h,D)}return r.transform!=null&&(D=r.transform(C,D)),D},s);if(r.animate){for(var d=0;d<n.length;d++){var g=n[d],y=c(g,d),p=r.animateFilter==null||r.animateFilter(g,d);if(p){var m=g.animation({position:y,duration:r.animationDuration,easing:r.animationEasing});e.animations.push(m)}else g.position(y)}if(r.fit){var b=i.animation({fit:{boundingBox:o.boundingBoxAt(c),padding:r.padding},duration:r.animationDuration,easing:r.animationEasing});e.animations.push(b)}else if(r.zoom!==void 0&&r.pan!==void 0){var E=i.animation({zoom:r.zoom,pan:r.pan,duration:r.animationDuration,easing:r.animationEasing});e.animations.push(E)}e.animations.forEach(function(C){return C.play()}),e.one("layoutready",r.ready),e.emit({type:"layoutready",layout:e}),va.all(e.animations.map(function(C){return C.promise()})).then(function(){e.one("layoutstop",r.stop),e.emit({type:"layoutstop",layout:e})})}else n.positions(c),r.fit&&i.fit(r.eles,r.padding),r.zoom!=null&&i.zoom(r.zoom),r.pan&&i.pan(r.pan),e.one("layoutready",r.ready),e.emit({type:"layoutready",layout:e}),e.one("layoutstop",r.stop),e.emit({type:"layoutstop",layout:e});return this},layout:function(e){var r=this.cy();return r.makeLayout(Ne({},e,{eles:this}))}};Sn.createLayout=Sn.makeLayout=Sn.layout;function wv(t,e,r){var a=r._private,n=a.styleCache=a.styleCache||[],i;return(i=n[t])!=null||(i=n[t]=e(r)),i}function ai(t,e){return t=zr(t),function(a){return wv(t,e,a)}}function ni(t,e){t=zr(t);var r=function(n){return e.call(n)};return function(){var n=this[0];if(n)return wv(t,r,n)}}var bt={recalculateRenderedStyle:function(e){var r=this.cy(),a=r.renderer(),n=r.styleEnabled();return a&&n&&a.recalculateRenderedStyle(this,e),this},dirtyStyleCache:function(){var e=this.cy(),r=function(i){return i._private.styleCache=null};if(e.hasCompoundNodes()){var a;a=this.spawnSelf().merge(this.descendants()).merge(this.parents()),a.merge(a.connectedEdges()),a.forEach(r)}else this.forEach(function(n){r(n),n.connectedEdges().forEach(r)});return this},updateStyle:function(e){var r=this._private.cy;if(!r.styleEnabled())return this;if(r.batching()){var a=r._private.batchStyleEles;return a.merge(this),this}var n=r.hasCompoundNodes(),i=this;e=!!(e||e===void 0),n&&(i=this.spawnSelf().merge(this.descendants()).merge(this.parents()));var o=i;return e?o.emitAndNotify("style"):o.emit("style"),i.forEach(function(s){return s._private.styleDirty=!0}),this},cleanStyle:function(){var e=this.cy();if(e.styleEnabled())for(var r=0;r<this.length;r++){var a=this[r];a._private.styleDirty&&(a._private.styleDirty=!1,e.style().apply(a))}},parsedStyle:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,a=this[0],n=a.cy();if(n.styleEnabled()&&a){a._private.styleDirty&&(a._private.styleDirty=!1,n.style().apply(a));var i=a._private.style[e];return i??(r?n.style().getDefaultProperty(e):null)}},numericStyle:function(e){var r=this[0];if(r.cy().styleEnabled()&&r){var a=r.pstyle(e);return a.pfValue!==void 0?a.pfValue:a.value}},numericStyleUnits:function(e){var r=this[0];if(r.cy().styleEnabled()&&r)return r.pstyle(e).units},renderedStyle:function(e){var r=this.cy();if(!r.styleEnabled())return this;var a=this[0];if(a)return r.style().getRenderedStyle(a,e)},style:function(e,r){var a=this.cy();if(!a.styleEnabled())return this;var n=!1,i=a.style();if(Ye(e)){var o=e;i.applyBypass(this,o,n),this.emitAndNotify("style")}else if(Me(e))if(r===void 0){var s=this[0];return s?i.getStylePropertyValue(s,e):void 0}else i.applyBypass(this,e,r,n),this.emitAndNotify("style");else if(e===void 0){var l=this[0];return l?i.getRawStyle(l):void 0}return this},removeStyle:function(e){var r=this.cy();if(!r.styleEnabled())return this;var a=!1,n=r.style(),i=this;if(e===void 0)for(var o=0;o<i.length;o++){var s=i[o];n.removeAllBypasses(s,a)}else{e=e.split(/\s+/);for(var l=0;l<i.length;l++){var u=i[l];n.removeBypasses(u,e,a)}}return this.emitAndNotify("style"),this},show:function(){return this.css("display","element"),this},hide:function(){return this.css("display","none"),this},effectiveOpacity:function(){var e=this.cy();if(!e.styleEnabled())return 1;var r=e.hasCompoundNodes(),a=this[0];if(a){var n=a._private,i=a.pstyle("opacity").value;if(!r)return i;var o=n.data.parent?a.parents():null;if(o)for(var s=0;s<o.length;s++){var l=o[s],u=l.pstyle("opacity").value;i=u*i}return i}},transparent:function(){var e=this.cy();if(!e.styleEnabled())return!1;var r=this[0],a=r.cy().hasCompoundNodes();if(r)return a?r.effectiveOpacity()===0:r.pstyle("opacity").value===0},backgrounding:function(){var e=this.cy();if(!e.styleEnabled())return!1;var r=this[0];return!!r._private.backgrounding}};function Io(t,e){var r=t._private,a=r.data.parent?t.parents():null;if(a)for(var n=0;n<a.length;n++){var i=a[n];if(!e(i))return!1}return!0}function Ds(t){var e=t.ok,r=t.edgeOkViaNode||t.ok,a=t.parentOk||t.ok;return function(){var n=this.cy();if(!n.styleEnabled())return!0;var i=this[0],o=n.hasCompoundNodes();if(i){var s=i._private;if(!e(i))return!1;if(i.isNode())return!o||Io(i,a);var l=s.source,u=s.target;return r(l)&&(!o||Io(l,r))&&(l===u||r(u)&&(!o||Io(u,r)))}}}var ha=ai("eleTakesUpSpace",function(t){return t.pstyle("display").value==="element"&&t.width()!==0&&(t.isNode()?t.height()!==0:!0)});bt.takesUpSpace=ni("takesUpSpace",Ds({ok:ha}));var Np=ai("eleInteractive",function(t){return t.pstyle("events").value==="yes"&&t.pstyle("visibility").value==="visible"&&ha(t)}),Pp=ai("parentInteractive",function(t){return t.pstyle("visibility").value==="visible"&&ha(t)});bt.interactive=ni("interactive",Ds({ok:Np,parentOk:Pp,edgeOkViaNode:ha}));bt.noninteractive=function(){var t=this[0];if(t)return!t.interactive()};var Op=ai("eleVisible",function(t){return t.pstyle("visibility").value==="visible"&&t.pstyle("opacity").pfValue!==0&&ha(t)}),Ip=ha;bt.visible=ni("visible",Ds({ok:Op,edgeOkViaNode:Ip}));bt.hidden=function(){var t=this[0];if(t)return!t.visible()};bt.isBundledBezier=ni("isBundledBezier",function(){return this.cy().styleEnabled()?!this.removed()&&this.pstyle("curve-style").value==="bezier"&&this.takesUpSpace():!1});bt.bypass=bt.css=bt.style;bt.renderedCss=bt.renderedStyle;bt.removeBypass=bt.removeCss=bt.removeStyle;bt.pstyle=bt.parsedStyle;var mr={};function Pl(t){return function(){var e=arguments,r=[];if(e.length===2){var a=e[0],n=e[1];this.on(t.event,a,n)}else if(e.length===1&&at(e[0])){var i=e[0];this.on(t.event,i)}else if(e.length===0||e.length===1&&Je(e[0])){for(var o=e.length===1?e[0]:null,s=0;s<this.length;s++){var l=this[s],u=!t.ableField||l._private[t.ableField],f=l._private[t.field]!=t.value;if(t.overrideAble){var v=t.overrideAble(l);if(v!==void 0&&(u=v,!v))return this}u&&(l._private[t.field]=t.value,f&&r.push(l))}var h=this.spawn(r);h.updateStyle(),h.emit(t.event),o&&h.emit(o)}return this}}function ca(t){mr[t.field]=function(){var e=this[0];if(e){if(t.overrideField){var r=t.overrideField(e);if(r!==void 0)return r}return e._private[t.field]}},mr[t.on]=Pl({event:t.on,field:t.field,ableField:t.ableField,overrideAble:t.overrideAble,value:!0}),mr[t.off]=Pl({event:t.off,field:t.field,ableField:t.ableField,overrideAble:t.overrideAble,value:!1})}ca({field:"locked",overrideField:function(e){return e.cy().autolock()?!0:void 0},on:"lock",off:"unlock"});ca({field:"grabbable",overrideField:function(e){return e.cy().autoungrabify()||e.pannable()?!1:void 0},on:"grabify",off:"ungrabify"});ca({field:"selected",ableField:"selectable",overrideAble:function(e){return e.cy().autounselectify()?!1:void 0},on:"select",off:"unselect"});ca({field:"selectable",overrideField:function(e){return e.cy().autounselectify()?!1:void 0},on:"selectify",off:"unselectify"});mr.deselect=mr.unselect;mr.grabbed=function(){var t=this[0];if(t)return t._private.grabbed};ca({field:"active",on:"activate",off:"unactivate"});ca({field:"pannable",on:"panify",off:"unpanify"});mr.inactive=function(){var t=this[0];if(t)return!t._private.active};var Tt={},Ol=function(e){return function(a){for(var n=this,i=[],o=0;o<n.length;o++){var s=n[o];if(s.isNode()){for(var l=!1,u=s.connectedEdges(),f=0;f<u.length;f++){var v=u[f],h=v.source(),c=v.target();if(e.noIncomingEdges&&c===s&&h!==s||e.noOutgoingEdges&&h===s&&c!==s){l=!0;break}}l||i.push(s)}}return this.spawn(i,!0).filter(a)}},Il=function(e){return function(r){for(var a=this,n=[],i=0;i<a.length;i++){var o=a[i];if(o.isNode())for(var s=o.connectedEdges(),l=0;l<s.length;l++){var u=s[l],f=u.source(),v=u.target();e.outgoing&&f===o?(n.push(u),n.push(v)):e.incoming&&v===o&&(n.push(u),n.push(f))}}return this.spawn(n,!0).filter(r)}},Bl=function(e){return function(r){for(var a=this,n=[],i={};;){var o=e.outgoing?a.outgoers():a.incomers();if(o.length===0)break;for(var s=!1,l=0;l<o.length;l++){var u=o[l],f=u.id();i[f]||(i[f]=!0,n.push(u),s=!0)}if(!s)break;a=o}return this.spawn(n,!0).filter(r)}};Tt.clearTraversalCache=function(){for(var t=0;t<this.length;t++)this[t]._private.traversalCache=null};Ne(Tt,{roots:Ol({noIncomingEdges:!0}),leaves:Ol({noOutgoingEdges:!0}),outgoers:Ut(Il({outgoing:!0}),"outgoers"),successors:Bl({outgoing:!0}),incomers:Ut(Il({incoming:!0}),"incomers"),predecessors:Bl({})});Ne(Tt,{neighborhood:Ut(function(t){for(var e=[],r=this.nodes(),a=0;a<r.length;a++)for(var n=r[a],i=n.connectedEdges(),o=0;o<i.length;o++){var s=i[o],l=s.source(),u=s.target(),f=n===l?u:l;f.length>0&&e.push(f[0]),e.push(s[0])}return this.spawn(e,!0).filter(t)},"neighborhood"),closedNeighborhood:function(e){return this.neighborhood().add(this).filter(e)},openNeighborhood:function(e){return this.neighborhood(e)}});Tt.neighbourhood=Tt.neighborhood;Tt.closedNeighbourhood=Tt.closedNeighborhood;Tt.openNeighbourhood=Tt.openNeighborhood;Ne(Tt,{source:Ut(function(e){var r=this[0],a;return r&&(a=r._private.source||r.cy().collection()),a&&e?a.filter(e):a},"source"),target:Ut(function(e){var r=this[0],a;return r&&(a=r._private.target||r.cy().collection()),a&&e?a.filter(e):a},"target"),sources:Fl({attr:"source"}),targets:Fl({attr:"target"})});function Fl(t){return function(r){for(var a=[],n=0;n<this.length;n++){var i=this[n],o=i._private[t.attr];o&&a.push(o)}return this.spawn(a,!0).filter(r)}}Ne(Tt,{edgesWith:Ut(kl(),"edgesWith"),edgesTo:Ut(kl({thisIsSrc:!0}),"edgesTo")});function kl(t){return function(r){var a=[],n=this._private.cy,i=t||{};Me(r)&&(r=n.$(r));for(var o=0;o<r.length;o++)for(var s=r[o]._private.edges,l=0;l<s.length;l++){var u=s[l],f=u._private.data,v=this.hasElementWithId(f.source)&&r.hasElementWithId(f.target),h=r.hasElementWithId(f.source)&&this.hasElementWithId(f.target),c=v||h;c&&((i.thisIsSrc||i.thisIsTgt)&&(i.thisIsSrc&&!v||i.thisIsTgt&&!h)||a.push(u))}return this.spawn(a,!0)}}Ne(Tt,{connectedEdges:Ut(function(t){for(var e=[],r=this,a=0;a<r.length;a++){var n=r[a];if(n.isNode())for(var i=n._private.edges,o=0;o<i.length;o++){var s=i[o];e.push(s)}}return this.spawn(e,!0).filter(t)},"connectedEdges"),connectedNodes:Ut(function(t){for(var e=[],r=this,a=0;a<r.length;a++){var n=r[a];n.isEdge()&&(e.push(n.source()[0]),e.push(n.target()[0]))}return this.spawn(e,!0).filter(t)},"connectedNodes"),parallelEdges:Ut(zl(),"parallelEdges"),codirectedEdges:Ut(zl({codirected:!0}),"codirectedEdges")});function zl(t){var e={codirected:!1};return t=Ne({},e,t),function(a){for(var n=[],i=this.edges(),o=t,s=0;s<i.length;s++)for(var l=i[s],u=l._private,f=u.source,v=f._private.data.id,h=u.data.target,c=f._private.edges,d=0;d<c.length;d++){var g=c[d],y=g._private.data,p=y.target,m=y.source,b=p===h&&m===v,E=v===p&&h===m;(o.codirected&&b||!o.codirected&&(b||E))&&n.push(g)}return this.spawn(n,!0).filter(a)}}Ne(Tt,{components:function(e){var r=this,a=r.cy(),n=a.collection(),i=e==null?r.nodes():e.nodes(),o=[];e!=null&&i.empty()&&(i=e.sources());var s=function(f,v){n.merge(f),i.unmerge(f),v.merge(f)};if(i.empty())return r.spawn();var l=function(){var f=a.collection();o.push(f);var v=i[0];s(v,f),r.bfs({directed:!1,roots:v,visit:function(c){return s(c,f)}}),f.forEach(function(h){h.connectedEdges().forEach(function(c){r.has(c)&&f.has(c.source())&&f.has(c.target())&&f.merge(c)})})};do l();while(i.length>0);return o},component:function(){var e=this[0];return e.cy().mutableElements().components(e)[0]}});Tt.componentsOf=Tt.components;var wt=function(e,r){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e===void 0){rt("A collection must have a reference to the core");return}var i=new nr,o=!1;if(!r)r=[];else if(r.length>0&&Ye(r[0])&&!Ya(r[0])){o=!0;for(var s=[],l=new fa,u=0,f=r.length;u<f;u++){var v=r[u];v.data==null&&(v.data={});var h=v.data;if(h.id==null)h.id=If();else if(e.hasElementWithId(h.id)||l.has(h.id))continue;var c=new Kn(e,v,!1);s.push(c),l.add(h.id)}r=s}this.length=0;for(var d=0,g=r.length;d<g;d++){var y=r[d][0];if(y!=null){var p=y._private.data.id;(!a||!i.has(p))&&(a&&i.set(p,{index:this.length,ele:y}),this[this.length]=y,this.length++)}}this._private={eles:this,cy:e,get map(){return this.lazyMap==null&&this.rebuildMap(),this.lazyMap},set map(m){this.lazyMap=m},rebuildMap:function(){for(var b=this.lazyMap=new nr,E=this.eles,C=0;C<E.length;C++){var L=E[C];b.set(L.id(),{index:C,ele:L})}}},a&&(this._private.map=i),o&&!n&&this.restore()},et=Kn.prototype=wt.prototype=Object.create(Array.prototype);et.instanceString=function(){return"collection"};et.spawn=function(t,e){return new wt(this.cy(),t,e)};et.spawnSelf=function(){return this.spawn(this)};et.cy=function(){return this._private.cy};et.renderer=function(){return this._private.cy.renderer()};et.element=function(){return this[0]};et.collection=function(){return wf(this)?this:new wt(this._private.cy,[this])};et.unique=function(){return new wt(this._private.cy,this,!0)};et.hasElementWithId=function(t){return t=""+t,this._private.map.has(t)};et.getElementById=function(t){t=""+t;var e=this._private.cy,r=this._private.map.get(t);return r?r.ele:new wt(e)};et.$id=et.getElementById;et.poolIndex=function(){var t=this._private.cy,e=t._private.elements,r=this[0]._private.data.id;return e._private.map.get(r).index};et.indexOf=function(t){var e=t[0]._private.data.id;return this._private.map.get(e).index};et.indexOfId=function(t){return t=""+t,this._private.map.get(t).index};et.json=function(t){var e=this.element(),r=this.cy();if(e==null&&t)return this;if(e!=null){var a=e._private;if(Ye(t)){if(r.startBatch(),t.data){e.data(t.data);var n=a.data;if(e.isEdge()){var i=!1,o={},s=t.data.source,l=t.data.target;s!=null&&s!=n.source&&(o.source=""+s,i=!0),l!=null&&l!=n.target&&(o.target=""+l,i=!0),i&&(e=e.move(o))}else{var u="parent"in t.data,f=t.data.parent;u&&(f!=null||n.parent!=null)&&f!=n.parent&&(f===void 0&&(f=null),f!=null&&(f=""+f),e=e.move({parent:f}))}}t.position&&e.position(t.position);var v=function(g,y,p){var m=t[g];m!=null&&m!==a[g]&&(m?e[y]():e[p]())};return v("removed","remove","restore"),v("selected","select","unselect"),v("selectable","selectify","unselectify"),v("locked","lock","unlock"),v("grabbable","grabify","ungrabify"),v("pannable","panify","unpanify"),t.classes!=null&&e.classes(t.classes),r.endBatch(),this}else if(t===void 0){var h={data:Jt(a.data),position:Jt(a.position),group:a.group,removed:a.removed,selected:a.selected,selectable:a.selectable,locked:a.locked,grabbable:a.grabbable,pannable:a.pannable,classes:null};h.classes="";var c=0;return a.classes.forEach(function(d){return h.classes+=c++===0?d:" "+d}),h}}};et.jsons=function(){for(var t=[],e=0;e<this.length;e++){var r=this[e],a=r.json();t.push(a)}return t};et.clone=function(){for(var t=this.cy(),e=[],r=0;r<this.length;r++){var a=this[r],n=a.json(),i=new Kn(t,n,!1);e.push(i)}return new wt(t,e)};et.copy=et.clone;et.restore=function(){for(var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=this,a=r.cy(),n=a._private,i=[],o=[],s,l=0,u=r.length;l<u;l++){var f=r[l];e&&!f.removed()||(f.isNode()?i.push(f):o.push(f))}s=i.concat(o);var v,h=function(){s.splice(v,1),v--};for(v=0;v<s.length;v++){var c=s[v],d=c._private,g=d.data;if(c.clearTraversalCache(),!(!e&&!d.removed)){if(g.id===void 0)g.id=If();else if(xe(g.id))g.id=""+g.id;else if(br(g.id)||!Me(g.id)){rt("Can not create element with invalid string ID `"+g.id+"`"),h();continue}else if(a.hasElementWithId(g.id)){rt("Can not create second element with ID `"+g.id+"`"),h();continue}}var y=g.id;if(c.isNode()){var p=d.position;p.x==null&&(p.x=0),p.y==null&&(p.y=0)}if(c.isEdge()){for(var m=c,b=["source","target"],E=b.length,C=!1,L=0;L<E;L++){var D=b[L],R=g[D];xe(R)&&(R=g[D]=""+g[D]),R==null||R===""?(rt("Can not create edge `"+y+"` with unspecified "+D),C=!0):a.hasElementWithId(R)||(rt("Can not create edge `"+y+"` with nonexistant "+D+" `"+R+"`"),C=!0)}if(C){h();continue}var O=a.getElementById(g.source),M=a.getElementById(g.target);O.same(M)?O._private.edges.push(m):(O._private.edges.push(m),M._private.edges.push(m)),m._private.source=O,m._private.target=M}d.map=new nr,d.map.set(y,{ele:c,index:0}),d.removed=!1,e&&a.addToPool(c)}for(var P=0;P<i.length;P++){var w=i[P],x=w._private.data;xe(x.parent)&&(x.parent=""+x.parent);var T=x.parent,A=T!=null;if(A||w._private.parent){var S=w._private.parent?a.collection().merge(w._private.parent):a.getElementById(T);if(S.empty())x.parent=void 0;else if(S[0].removed())_e("Node added with missing parent, reference to parent removed"),x.parent=void 0,w._private.parent=null;else{for(var I=!1,B=S;!B.empty();){if(w.same(B)){I=!0,x.parent=void 0;break}B=B.parent()}I||(S[0]._private.children.push(w),w._private.parent=S[0],n.hasCompoundNodes=!0)}}}if(s.length>0){for(var k=s.length===r.length?r:new wt(a,s),z=0;z<k.length;z++){var F=k[z];F.isNode()||(F.parallelEdges().clearTraversalCache(),F.source().clearTraversalCache(),F.target().clearTraversalCache())}var V;n.hasCompoundNodes?V=a.collection().merge(k).merge(k.connectedNodes()).merge(k.parent()):V=k,V.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(t),t?k.emitAndNotify("add"):e&&k.emit("add")}return r};et.removed=function(){var t=this[0];return t&&t._private.removed};et.inside=function(){var t=this[0];return t&&!t._private.removed};et.remove=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=this,a=[],n={},i=r._private.cy;function o(T){for(var A=T._private.edges,S=0;S<A.length;S++)l(A[S])}function s(T){for(var A=T._private.children,S=0;S<A.length;S++)l(A[S])}function l(T){var A=n[T.id()];e&&T.removed()||A||(n[T.id()]=!0,T.isNode()?(a.push(T),o(T),s(T)):a.unshift(T))}for(var u=0,f=r.length;u<f;u++){var v=r[u];l(v)}function h(T,A){var S=T._private.edges;wr(S,A),T.clearTraversalCache()}function c(T){T.clearTraversalCache()}var d=[];d.ids={};function g(T,A){A=A[0],T=T[0];var S=T._private.children,I=T.id();wr(S,A),A._private.parent=null,d.ids[I]||(d.ids[I]=!0,d.push(T))}r.dirtyCompoundBoundsCache(),e&&i.removeFromPool(a);for(var y=0;y<a.length;y++){var p=a[y];if(p.isEdge()){var m=p.source()[0],b=p.target()[0];h(m,p),h(b,p);for(var E=p.parallelEdges(),C=0;C<E.length;C++){var L=E[C];c(L),L.isBundledBezier()&&L.dirtyBoundingBoxCache()}}else{var D=p.parent();D.length!==0&&g(D,p)}e&&(p._private.removed=!0)}var R=i._private.elements;i._private.hasCompoundNodes=!1;for(var O=0;O<R.length;O++){var M=R[O];if(M.isParent()){i._private.hasCompoundNodes=!0;break}}var P=new wt(this.cy(),a);P.size()>0&&(t?P.emitAndNotify("remove"):e&&P.emit("remove"));for(var w=0;w<d.length;w++){var x=d[w];(!e||!x.removed())&&x.updateStyle()}return P};et.move=function(t){var e=this._private.cy,r=this,a=!1,n=!1,i=function(d){return d==null?d:""+d};if(t.source!==void 0||t.target!==void 0){var o=i(t.source),s=i(t.target),l=o!=null&&e.hasElementWithId(o),u=s!=null&&e.hasElementWithId(s);(l||u)&&(e.batch(function(){r.remove(a,n),r.emitAndNotify("moveout");for(var c=0;c<r.length;c++){var d=r[c],g=d._private.data;d.isEdge()&&(l&&(g.source=o),u&&(g.target=s))}r.restore(a,n)}),r.emitAndNotify("move"))}else if(t.parent!==void 0){var f=i(t.parent),v=f===null||e.hasElementWithId(f);if(v){var h=f===null?void 0:f;e.batch(function(){var c=r.remove(a,n);c.emitAndNotify("moveout");for(var d=0;d<r.length;d++){var g=r[d],y=g._private.data;g.isNode()&&(y.parent=h)}c.restore(a,n)}),r.emitAndNotify("move")}}return this};[Xf,Wg,Cn,yr,la,sp,ti,Tp,yv,mv,Lp,Vn,Sn,bt,mr,Tt].forEach(function(t){Ne(et,t)});var Bp={add:function(e){var r,a=this;if(kt(e)){var n=e;if(n._private.cy===a)r=n.restore();else{for(var i=[],o=0;o<n.length;o++){var s=n[o];i.push(s.json())}r=new wt(a,i)}}else if(Je(e)){var l=e;r=new wt(a,l)}else if(Ye(e)&&(Je(e.nodes)||Je(e.edges))){for(var u=e,f=[],v=["nodes","edges"],h=0,c=v.length;h<c;h++){var d=v[h],g=u[d];if(Je(g))for(var y=0,p=g.length;y<p;y++){var m=Ne({group:d},g[y]);f.push(m)}}r=new wt(a,f)}else{var b=e;r=new Kn(a,b).collection()}return r},remove:function(e){if(!kt(e)){if(Me(e)){var r=e;e=this.$(r)}}return e.remove()}};function Fp(t,e,r,a){var n=4,i=.001,o=1e-7,s=10,l=11,u=1/(l-1),f=typeof Float32Array<"u";if(arguments.length!==4)return!1;for(var v=0;v<4;++v)if(typeof arguments[v]!="number"||isNaN(arguments[v])||!isFinite(arguments[v]))return!1;t=Math.min(t,1),r=Math.min(r,1),t=Math.max(t,0),r=Math.max(r,0);var h=f?new Float32Array(l):new Array(l);function c(M,P){return 1-3*P+3*M}function d(M,P){return 3*P-6*M}function g(M){return 3*M}function y(M,P,w){return((c(P,w)*M+d(P,w))*M+g(P))*M}function p(M,P,w){return 3*c(P,w)*M*M+2*d(P,w)*M+g(P)}function m(M,P){for(var w=0;w<n;++w){var x=p(P,t,r);if(x===0)return P;var T=y(P,t,r)-M;P-=T/x}return P}function b(){for(var M=0;M<l;++M)h[M]=y(M*u,t,r)}function E(M,P,w){var x,T,A=0;do T=P+(w-P)/2,x=y(T,t,r)-M,x>0?w=T:P=T;while(Math.abs(x)>o&&++A<s);return T}function C(M){for(var P=0,w=1,x=l-1;w!==x&&h[w]<=M;++w)P+=u;--w;var T=(M-h[w])/(h[w+1]-h[w]),A=P+T*u,S=p(A,t,r);return S>=i?m(M,A):S===0?A:E(M,P,P+u)}var L=!1;function D(){L=!0,(t!==e||r!==a)&&b()}var R=function(P){return L||D(),t===e&&r===a?P:P===0?0:P===1?1:y(C(P),e,a)};R.getControlPoints=function(){return[{x:t,y:e},{x:r,y:a}]};var O="generateBezier("+[t,e,r,a]+")";return R.toString=function(){return O},R}var kp=(function(){function t(a){return-a.tension*a.x-a.friction*a.v}function e(a,n,i){var o={x:a.x+i.dx*n,v:a.v+i.dv*n,tension:a.tension,friction:a.friction};return{dx:o.v,dv:t(o)}}function r(a,n){var i={dx:a.v,dv:t(a)},o=e(a,n*.5,i),s=e(a,n*.5,o),l=e(a,n,s),u=1/6*(i.dx+2*(o.dx+s.dx)+l.dx),f=1/6*(i.dv+2*(o.dv+s.dv)+l.dv);return a.x=a.x+u*n,a.v=a.v+f*n,a}return function a(n,i,o){var s={x:-1,v:0,tension:null,friction:null},l=[0],u=0,f=1/1e4,v=16/1e3,h,c,d;for(n=parseFloat(n)||500,i=parseFloat(i)||20,o=o||null,s.tension=n,s.friction=i,h=o!==null,h?(u=a(n,i),c=u/o*v):c=v;d=r(d||s,c),l.push(1+d.x),u+=16,Math.abs(d.x)>f&&Math.abs(d.v)>f;);return h?function(g){return l[g*(l.length-1)|0]}:u}})(),je=function(e,r,a,n){var i=Fp(e,r,a,n);return function(o,s,l){return o+(s-o)*i(l)}},Dn={linear:function(e,r,a){return e+(r-e)*a},ease:je(.25,.1,.25,1),"ease-in":je(.42,0,1,1),"ease-out":je(0,0,.58,1),"ease-in-out":je(.42,0,.58,1),"ease-in-sine":je(.47,0,.745,.715),"ease-out-sine":je(.39,.575,.565,1),"ease-in-out-sine":je(.445,.05,.55,.95),"ease-in-quad":je(.55,.085,.68,.53),"ease-out-quad":je(.25,.46,.45,.94),"ease-in-out-quad":je(.455,.03,.515,.955),"ease-in-cubic":je(.55,.055,.675,.19),"ease-out-cubic":je(.215,.61,.355,1),"ease-in-out-cubic":je(.645,.045,.355,1),"ease-in-quart":je(.895,.03,.685,.22),"ease-out-quart":je(.165,.84,.44,1),"ease-in-out-quart":je(.77,0,.175,1),"ease-in-quint":je(.755,.05,.855,.06),"ease-out-quint":je(.23,1,.32,1),"ease-in-out-quint":je(.86,0,.07,1),"ease-in-expo":je(.95,.05,.795,.035),"ease-out-expo":je(.19,1,.22,1),"ease-in-out-expo":je(1,0,0,1),"ease-in-circ":je(.6,.04,.98,.335),"ease-out-circ":je(.075,.82,.165,1),"ease-in-out-circ":je(.785,.135,.15,.86),spring:function(e,r,a){if(a===0)return Dn.linear;var n=kp(e,r,a);return function(i,o,s){return i+(o-i)*n(s)}},"cubic-bezier":je};function Vl(t,e,r,a,n){if(a===1||e===r)return r;var i=n(e,r,a);return t==null||((t.roundValue||t.color)&&(i=Math.round(i)),t.min!==void 0&&(i=Math.max(i,t.min)),t.max!==void 0&&(i=Math.min(i,t.max))),i}function Gl(t,e){return t.pfValue!=null||t.value!=null?t.pfValue!=null&&(e==null||e.type.units!=="%")?t.pfValue:t.value:t}function Kr(t,e,r,a,n){var i=n!=null?n.type:null;r<0?r=0:r>1&&(r=1);var o=Gl(t,n),s=Gl(e,n);if(xe(o)&&xe(s))return Vl(i,o,s,r,a);if(Je(o)&&Je(s)){for(var l=[],u=0;u<s.length;u++){var f=o[u],v=s[u];if(f!=null&&v!=null){var h=Vl(i,f,v,r,a);l.push(h)}else l.push(v)}return l}}function zp(t,e,r,a){var n=!a,i=t._private,o=e._private,s=o.easing,l=o.startTime,u=a?t:t.cy(),f=u.style();if(!o.easingImpl)if(s==null)o.easingImpl=Dn.linear;else{var v;if(Me(s)){var h=f.parse("transition-timing-function",s);v=h.value}else v=s;var c,d;Me(v)?(c=v,d=[]):(c=v[1],d=v.slice(2).map(function(k){return+k})),d.length>0?(c==="spring"&&d.push(o.duration),o.easingImpl=Dn[c].apply(null,d)):o.easingImpl=Dn[c]}var g=o.easingImpl,y;if(o.duration===0?y=1:y=(r-l)/o.duration,o.applying&&(y=o.progress),y<0?y=0:y>1&&(y=1),o.delay==null){var p=o.startPosition,m=o.position;if(m&&n&&!t.locked()){var b={};Ta(p.x,m.x)&&(b.x=Kr(p.x,m.x,y,g)),Ta(p.y,m.y)&&(b.y=Kr(p.y,m.y,y,g)),t.position(b)}var E=o.startPan,C=o.pan,L=i.pan,D=C!=null&&a;D&&(Ta(E.x,C.x)&&(L.x=Kr(E.x,C.x,y,g)),Ta(E.y,C.y)&&(L.y=Kr(E.y,C.y,y,g)),t.emit("pan"));var R=o.startZoom,O=o.zoom,M=O!=null&&a;M&&(Ta(R,O)&&(i.zoom=Fa(i.minZoom,Kr(R,O,y,g),i.maxZoom)),t.emit("zoom")),(D||M)&&t.emit("viewport");var P=o.style;if(P&&P.length>0&&n){for(var w=0;w<P.length;w++){var x=P[w],T=x.name,A=x,S=o.startStyle[T],I=f.properties[S.name],B=Kr(S,A,y,g,I);f.overrideBypass(t,T,B)}t.emit("style")}}return o.progress=y,y}function Ta(t,e){return t==null||e==null?!1:xe(t)&&xe(e)?!0:!!(t&&e)}function Vp(t,e,r,a){var n=e._private;n.started=!0,n.startTime=r-n.progress*n.duration}function Ul(t,e){var r=e._private.aniEles,a=[];function n(f,v){var h=f._private,c=h.animation.current,d=h.animation.queue,g=!1;if(c.length===0){var y=d.shift();y&&c.push(y)}for(var p=function(L){for(var D=L.length-1;D>=0;D--){var R=L[D];R()}L.splice(0,L.length)},m=c.length-1;m>=0;m--){var b=c[m],E=b._private;if(E.stopped){c.splice(m,1),E.hooked=!1,E.playing=!1,E.started=!1,p(E.frames);continue}!E.playing&&!E.applying||(E.playing&&E.applying&&(E.applying=!1),E.started||Vp(f,b,t),zp(f,b,t,v),E.applying&&(E.applying=!1),p(E.frames),E.step!=null&&E.step(t),b.completed()&&(c.splice(m,1),E.hooked=!1,E.playing=!1,E.started=!1,p(E.completes)),g=!0)}return!v&&c.length===0&&d.length===0&&a.push(f),g}for(var i=!1,o=0;o<r.length;o++){var s=r[o],l=n(s);i=i||l}var u=n(e,!0);(i||u)&&(r.length>0?e.notify("draw",r):e.notify("draw")),r.unmerge(a),e.emit("step")}var Gp={animate:Ke.animate(),animation:Ke.animation(),animated:Ke.animated(),clearQueue:Ke.clearQueue(),delay:Ke.delay(),delayAnimation:Ke.delayAnimation(),stop:Ke.stop(),addToAnimationPool:function(e){var r=this;r.styleEnabled()&&r._private.aniEles.merge(e)},stopAnimationLoop:function(){this._private.animationsRunning=!1},startAnimationLoop:function(){var e=this;if(e._private.animationsRunning=!0,!e.styleEnabled())return;function r(){e._private.animationsRunning&&In(function(i){Ul(i,e),r()})}var a=e.renderer();a&&a.beforeRender?a.beforeRender(function(i,o){Ul(o,e)},a.beforeRenderPriorities.animations):r()}},Up={qualifierCompare:function(e,r){return e==null||r==null?e==null&&r==null:e.sameText(r)},eventMatches:function(e,r,a){var n=r.qualifier;return n!=null?e!==a.target&&Ya(a.target)&&n.matches(a.target):!0},addEventFields:function(e,r){r.cy=e,r.target=e},callbackContext:function(e,r,a){return r.qualifier!=null?a.target:e}},yn=function(e){return Me(e)?new xr(e):e},Ev={createEmitter:function(){var e=this._private;return e.emitter||(e.emitter=new ri(Up,this)),this},emitter:function(){return this._private.emitter},on:function(e,r,a){return this.emitter().on(e,yn(r),a),this},removeListener:function(e,r,a){return this.emitter().removeListener(e,yn(r),a),this},removeAllListeners:function(){return this.emitter().removeAllListeners(),this},one:function(e,r,a){return this.emitter().one(e,yn(r),a),this},once:function(e,r,a){return this.emitter().one(e,yn(r),a),this},emit:function(e,r){return this.emitter().emit(e,r),this},emitAndNotify:function(e,r){return this.emit(e),this.notify(e,r),this}};Ke.eventAliasesOn(Ev);var jo={png:function(e){var r=this._private.renderer;return e=e||{},r.png(e)},jpg:function(e){var r=this._private.renderer;return e=e||{},e.bg=e.bg||"#fff",r.jpg(e)}};jo.jpeg=jo.jpg;var An={layout:function(e){var r=this;if(e==null){rt("Layout options must be specified to make a layout");return}if(e.name==null){rt("A `name` must be specified to make a layout");return}var a=e.name,n=r.extension("layout",a);if(n==null){rt("No such layout `"+a+"` found.  Did you forget to import it and `cytoscape.use()` it?");return}var i;Me(e.eles)?i=r.$(e.eles):i=e.eles!=null?e.eles:r.$();var o=new n(Ne({},e,{cy:r,eles:i}));return o}};An.createLayout=An.makeLayout=An.layout;var Hp={notify:function(e,r){var a=this._private;if(this.batching()){a.batchNotifications=a.batchNotifications||{};var n=a.batchNotifications[e]=a.batchNotifications[e]||this.collection();r!=null&&n.merge(r);return}if(a.notificationsEnabled){var i=this.renderer();this.destroyed()||!i||i.notify(e,r)}},notifications:function(e){var r=this._private;return e===void 0?r.notificationsEnabled:(r.notificationsEnabled=!!e,this)},noNotifications:function(e){this.notifications(!1),e(),this.notifications(!0)},batching:function(){return this._private.batchCount>0},startBatch:function(){var e=this._private;return e.batchCount==null&&(e.batchCount=0),e.batchCount===0&&(e.batchStyleEles=this.collection(),e.batchNotifications={}),e.batchCount++,this},endBatch:function(){var e=this._private;if(e.batchCount===0)return this;if(e.batchCount--,e.batchCount===0){e.batchStyleEles.updateStyle();var r=this.renderer();Object.keys(e.batchNotifications).forEach(function(a){var n=e.batchNotifications[a];n.empty()?r.notify(a):r.notify(a,n)})}return this},batch:function(e){return this.startBatch(),e(),this.endBatch(),this},batchData:function(e){var r=this;return this.batch(function(){for(var a=Object.keys(e),n=0;n<a.length;n++){var i=a[n],o=e[i],s=r.getElementById(i);s.data(o)}})}},qp=Et({hideEdgesOnViewport:!1,textureOnViewport:!1,motionBlur:!1,motionBlurOpacity:.05,pixelRatio:void 0,desktopTapThreshold:4,touchTapThreshold:8,wheelSensitivity:1,debug:!1,showFps:!1,webgl:!1,webglDebug:!1,webglDebugShowAtlases:!1,webglTexSize:2048,webglTexRows:36,webglTexRowsNodes:18,webglBatchSize:2048,webglTexPerBatch:14,webglBgColor:[255,255,255]}),es={renderTo:function(e,r,a,n){var i=this._private.renderer;return i.renderTo(e,r,a,n),this},renderer:function(){return this._private.renderer},forceRender:function(){return this.notify("draw"),this},resize:function(){return this.invalidateSize(),this.emitAndNotify("resize"),this},initRenderer:function(e){var r=this,a=r.extension("renderer",e.name);if(a==null){rt("Can not initialise: No such renderer `".concat(e.name,"` found. Did you forget to import it and `cytoscape.use()` it?"));return}e.wheelSensitivity!==void 0&&_e("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");var n=qp(e);n.cy=r,r._private.renderer=new a(n),this.notify("init")},destroyRenderer:function(){var e=this;e.notify("destroy");var r=e.container();if(r)for(r._cyreg=null;r.childNodes.length>0;)r.removeChild(r.childNodes[0]);e._private.renderer=null,e.mutableElements().forEach(function(a){var n=a._private;n.rscratch={},n.rstyle={},n.animation.current=[],n.animation.queue=[]})},onRender:function(e){return this.on("render",e)},offRender:function(e){return this.off("render",e)}};es.invalidateDimensions=es.resize;var Ln={collection:function(e,r){return Me(e)?this.$(e):kt(e)?e.collection():Je(e)?(r||(r={}),new wt(this,e,r.unique,r.removed)):new wt(this)},nodes:function(e){var r=this.$(function(a){return a.isNode()});return e?r.filter(e):r},edges:function(e){var r=this.$(function(a){return a.isEdge()});return e?r.filter(e):r},$:function(e){var r=this._private.elements;return e?r.filter(e):r.spawnSelf()},mutableElements:function(){return this._private.elements}};Ln.elements=Ln.filter=Ln.$;var mt={},Ra="t",Yp="f";mt.apply=function(t){for(var e=this,r=e._private,a=r.cy,n=a.collection(),i=0;i<t.length;i++){var o=t[i],s=e.getContextMeta(o);if(!s.empty){var l=e.getContextStyle(s),u=e.applyContextStyle(s,l,o);o._private.appliedInitStyle?e.updateTransitions(o,u.diffProps):o._private.appliedInitStyle=!0;var f=e.updateStyleHints(o);f&&n.push(o)}}return n};mt.getPropertiesDiff=function(t,e){var r=this,a=r._private.propDiffs=r._private.propDiffs||{},n=t+"-"+e,i=a[n];if(i)return i;for(var o=[],s={},l=0;l<r.length;l++){var u=r[l],f=t[l]===Ra,v=e[l]===Ra,h=f!==v,c=u.mappedProperties.length>0;if(h||v&&c){var d=void 0;h&&c||h?d=u.properties:c&&(d=u.mappedProperties);for(var g=0;g<d.length;g++){for(var y=d[g],p=y.name,m=!1,b=l+1;b<r.length;b++){var E=r[b],C=e[b]===Ra;if(C&&(m=E.properties[y.name]!=null,m))break}!s[p]&&!m&&(s[p]=!0,o.push(p))}}}return a[n]=o,o};mt.getContextMeta=function(t){for(var e=this,r="",a,n=t._private.styleCxtKey||"",i=0;i<e.length;i++){var o=e[i],s=o.selector&&o.selector.matches(t);s?r+=Ra:r+=Yp}return a=e.getPropertiesDiff(n,r),t._private.styleCxtKey=r,{key:r,diffPropNames:a,empty:a.length===0}};mt.getContextStyle=function(t){var e=t.key,r=this,a=this._private.contextStyles=this._private.contextStyles||{};if(a[e])return a[e];for(var n={_private:{key:e}},i=0;i<r.length;i++){var o=r[i],s=e[i]===Ra;if(s)for(var l=0;l<o.properties.length;l++){var u=o.properties[l];n[u.name]=u}}return a[e]=n,n};mt.applyContextStyle=function(t,e,r){for(var a=this,n=t.diffPropNames,i={},o=a.types,s=0;s<n.length;s++){var l=n[s],u=e[l],f=r.pstyle(l);if(!u)if(f)f.bypass?u={name:l,deleteBypassed:!0}:u={name:l,delete:!0};else continue;if(f!==u){if(u.mapped===o.fn&&f!=null&&f.mapping!=null&&f.mapping.value===u.value){var v=f.mapping,h=v.fnValue=u.value(r);if(h===v.prevFnValue)continue}var c=i[l]={prev:f};a.applyParsedProperty(r,u),c.next=r.pstyle(l),c.next&&c.next.bypass&&(c.next=c.next.bypassed)}}return{diffProps:i}};mt.updateStyleHints=function(t){var e=t._private,r=this,a=r.propertyGroupNames,n=r.propertyGroupKeys,i=function(Q,oe,te){return r.getPropertiesHash(Q,oe,te)},o=e.styleKey;if(t.removed())return!1;var s=e.group==="nodes",l=t._private.style;a=Object.keys(l);for(var u=0;u<n.length;u++){var f=n[u];e.styleKeys[f]=[Br,jr]}for(var v=function(Q,oe){return e.styleKeys[oe][0]=Oa(Q,e.styleKeys[oe][0])},h=function(Q,oe){return e.styleKeys[oe][1]=Ia(Q,e.styleKeys[oe][1])},c=function(Q,oe){v(Q,oe),h(Q,oe)},d=function(Q,oe){for(var te=0;te<Q.length;te++){var Te=Q.charCodeAt(te);v(Te,oe),h(Te,oe)}},g=2e9,y=function(Q){return-128<Q&&Q<128&&Math.floor(Q)!==Q?g-(Q*1024|0):Q},p=0;p<a.length;p++){var m=a[p],b=l[m];if(b!=null){var E=this.properties[m],C=E.type,L=E.groupKey,D=void 0;E.hashOverride!=null?D=E.hashOverride(t,b):b.pfValue!=null&&(D=b.pfValue);var R=E.enums==null?b.value:null,O=D!=null,M=R!=null,P=O||M,w=b.units;if(C.number&&P&&!C.multiple){var x=O?D:R;c(y(x),L),!O&&w!=null&&d(w,L)}else d(b.strValue,L)}}for(var T=[Br,jr],A=0;A<n.length;A++){var S=n[A],I=e.styleKeys[S];T[0]=Oa(I[0],T[0]),T[1]=Ia(I[1],T[1])}e.styleKey=oc(T[0],T[1]);var B=e.styleKeys;e.labelDimsKey=vr(B.labelDimensions);var k=i(t,["label"],B.labelDimensions);if(e.labelKey=vr(k),e.labelStyleKey=vr(ln(B.commonLabel,k)),!s){var z=i(t,["source-label"],B.labelDimensions);e.sourceLabelKey=vr(z),e.sourceLabelStyleKey=vr(ln(B.commonLabel,z));var F=i(t,["target-label"],B.labelDimensions);e.targetLabelKey=vr(F),e.targetLabelStyleKey=vr(ln(B.commonLabel,F))}if(s){var V=e.styleKeys,Z=V.nodeBody,q=V.nodeBorder,_=V.nodeOutline,K=V.backgroundImage,U=V.compound,J=V.pie,$=V.stripe,H=[Z,q,_,K,U,J,$].filter(function(Y){return Y!=null}).reduce(ln,[Br,jr]);e.nodeKey=vr(H),e.hasPie=J!=null&&J[0]!==Br&&J[1]!==jr,e.hasStripe=$!=null&&$[0]!==Br&&$[1]!==jr}return o!==e.styleKey};mt.clearStyleHints=function(t){var e=t._private;e.styleCxtKey="",e.styleKeys={},e.styleKey=null,e.labelKey=null,e.labelStyleKey=null,e.sourceLabelKey=null,e.sourceLabelStyleKey=null,e.targetLabelKey=null,e.targetLabelStyleKey=null,e.nodeKey=null,e.hasPie=null,e.hasStripe=null};mt.applyParsedProperty=function(t,e){var r=this,a=e,n=t._private.style,i,o=r.types,s=r.properties[a.name].type,l=a.bypass,u=n[a.name],f=u&&u.bypass,v=t._private,h="mapping",c=function(Z){return Z==null?null:Z.pfValue!=null?Z.pfValue:Z.value},d=function(){var Z=c(u),q=c(a);r.checkTriggers(t,a.name,Z,q)};if(e.name==="curve-style"&&t.isEdge()&&(e.value!=="bezier"&&t.isLoop()||e.value==="haystack"&&(t.source().isParent()||t.target().isParent()))&&(a=e=this.parse(e.name,"bezier",l)),a.delete)return n[a.name]=void 0,d(),!0;if(a.deleteBypassed)return u?u.bypass?(u.bypassed=void 0,d(),!0):!1:(d(),!0);if(a.deleteBypass)return u?u.bypass?(n[a.name]=u.bypassed,d(),!0):!1:(d(),!0);var g=function(){_e("Do not assign mappings to elements without corresponding data (i.e. ele `"+t.id()+"` has no mapping for property `"+a.name+"` with data field `"+a.field+"`); try a `["+a.field+"]` selector to limit scope to elements with `"+a.field+"` defined")};switch(a.mapped){case o.mapData:{for(var y=a.field.split("."),p=v.data,m=0;m<y.length&&p;m++){var b=y[m];p=p[b]}if(p==null)return g(),!1;var E;if(xe(p)){var C=a.fieldMax-a.fieldMin;C===0?E=0:E=(p-a.fieldMin)/C}else return _e("Do not use continuous mappers without specifying numeric data (i.e. `"+a.field+": "+p+"` for `"+t.id()+"` is non-numeric)"),!1;if(E<0?E=0:E>1&&(E=1),s.color){var L=a.valueMin[0],D=a.valueMax[0],R=a.valueMin[1],O=a.valueMax[1],M=a.valueMin[2],P=a.valueMax[2],w=a.valueMin[3]==null?1:a.valueMin[3],x=a.valueMax[3]==null?1:a.valueMax[3],T=[Math.round(L+(D-L)*E),Math.round(R+(O-R)*E),Math.round(M+(P-M)*E),Math.round(w+(x-w)*E)];i={bypass:a.bypass,name:a.name,value:T,strValue:"rgb("+T[0]+", "+T[1]+", "+T[2]+")"}}else if(s.number){var A=a.valueMin+(a.valueMax-a.valueMin)*E;i=this.parse(a.name,A,a.bypass,h)}else return!1;if(!i)return g(),!1;i.mapping=a,a=i;break}case o.data:{for(var S=a.field.split("."),I=v.data,B=0;B<S.length&&I;B++){var k=S[B];I=I[k]}if(I!=null&&(i=this.parse(a.name,I,a.bypass,h)),!i)return g(),!1;i.mapping=a,a=i;break}case o.fn:{var z=a.value,F=a.fnValue!=null?a.fnValue:z(t);if(a.prevFnValue=F,F==null)return _e("Custom function mappers may not return null (i.e. `"+a.name+"` for ele `"+t.id()+"` is null)"),!1;if(i=this.parse(a.name,F,a.bypass,h),!i)return _e("Custom function mappers may not return invalid values for the property type (i.e. `"+a.name+"` for ele `"+t.id()+"` is invalid)"),!1;i.mapping=Jt(a),a=i;break}case void 0:break;default:return!1}return l?(f?a.bypassed=u.bypassed:a.bypassed=u,n[a.name]=a):f?u.bypassed=a:n[a.name]=a,d(),!0};mt.cleanElements=function(t,e){for(var r=0;r<t.length;r++){var a=t[r];if(this.clearStyleHints(a),a.dirtyCompoundBoundsCache(),a.dirtyBoundingBoxCache(),!e)a._private.style={};else for(var n=a._private.style,i=Object.keys(n),o=0;o<i.length;o++){var s=i[o],l=n[s];l!=null&&(l.bypass?l.bypassed=null:n[s]=null)}}};mt.update=function(){var t=this._private.cy,e=t.mutableElements();e.updateStyle()};mt.updateTransitions=function(t,e){var r=this,a=t._private,n=t.pstyle("transition-property").value,i=t.pstyle("transition-duration").pfValue,o=t.pstyle("transition-delay").pfValue;if(n.length>0&&i>0){for(var s={},l=!1,u=0;u<n.length;u++){var f=n[u],v=t.pstyle(f),h=e[f];if(h){var c=h.prev,d=c,g=h.next!=null?h.next:v,y=!1,p=void 0,m=1e-6;d&&(xe(d.pfValue)&&xe(g.pfValue)?(y=g.pfValue-d.pfValue,p=d.pfValue+m*y):xe(d.value)&&xe(g.value)?(y=g.value-d.value,p=d.value+m*y):Je(d.value)&&Je(g.value)&&(y=d.value[0]!==g.value[0]||d.value[1]!==g.value[1]||d.value[2]!==g.value[2],p=d.strValue),y&&(s[f]=g.strValue,this.applyBypass(t,f,p),l=!0))}}if(!l)return;a.transitioning=!0,new va(function(b){o>0?t.delayAnimation(o).play().promise().then(b):b()}).then(function(){return t.animation({style:s,duration:i,easing:t.pstyle("transition-timing-function").value,queue:!1}).play().promise()}).then(function(){r.removeBypasses(t,n),t.emitAndNotify("style"),a.transitioning=!1})}else a.transitioning&&(this.removeBypasses(t,n),t.emitAndNotify("style"),a.transitioning=!1)};mt.checkTrigger=function(t,e,r,a,n,i){var o=this.properties[e],s=n(o);t.removed()||s!=null&&s(r,a,t)&&i(o)};mt.checkZOrderTrigger=function(t,e,r,a){var n=this;this.checkTrigger(t,e,r,a,function(i){return i.triggersZOrder},function(){n._private.cy.notify("zorder",t)})};mt.checkBoundsTrigger=function(t,e,r,a){this.checkTrigger(t,e,r,a,function(n){return n.triggersBounds},function(n){t.dirtyCompoundBoundsCache(),t.dirtyBoundingBoxCache()})};mt.checkConnectedEdgesBoundsTrigger=function(t,e,r,a){this.checkTrigger(t,e,r,a,function(n){return n.triggersBoundsOfConnectedEdges},function(n){t.connectedEdges().forEach(function(i){i.dirtyBoundingBoxCache()})})};mt.checkParallelEdgesBoundsTrigger=function(t,e,r,a){this.checkTrigger(t,e,r,a,function(n){return n.triggersBoundsOfParallelEdges},function(n){t.parallelEdges().forEach(function(i){i.dirtyBoundingBoxCache()})})};mt.checkTriggers=function(t,e,r,a){t.dirtyStyleCache(),this.checkZOrderTrigger(t,e,r,a),this.checkBoundsTrigger(t,e,r,a),this.checkConnectedEdgesBoundsTrigger(t,e,r,a),this.checkParallelEdgesBoundsTrigger(t,e,r,a)};var Qa={};Qa.applyBypass=function(t,e,r,a){var n=this,i=[],o=!0;if(e==="*"||e==="**"){if(r!==void 0)for(var s=0;s<n.properties.length;s++){var l=n.properties[s],u=l.name,f=this.parse(u,r,!0);f&&i.push(f)}}else if(Me(e)){var v=this.parse(e,r,!0);v&&i.push(v)}else if(Ye(e)){var h=e;a=r;for(var c=Object.keys(h),d=0;d<c.length;d++){var g=c[d],y=h[g];if(y===void 0&&(y=h[Xn(g)]),y!==void 0){var p=this.parse(g,y,!0);p&&i.push(p)}}}else return!1;if(i.length===0)return!1;for(var m=!1,b=0;b<t.length;b++){for(var E=t[b],C={},L=void 0,D=0;D<i.length;D++){var R=i[D];if(a){var O=E.pstyle(R.name);L=C[R.name]={prev:O}}m=this.applyParsedProperty(E,Jt(R))||m,a&&(L.next=E.pstyle(R.name))}m&&this.updateStyleHints(E),a&&this.updateTransitions(E,C,o)}return m};Qa.overrideBypass=function(t,e,r){e=hs(e);for(var a=0;a<t.length;a++){var n=t[a],i=n._private.style[e],o=this.properties[e].type,s=o.color,l=o.mutiple,u=i?i.pfValue!=null?i.pfValue:i.value:null;!i||!i.bypass?this.applyBypass(n,e,r):(i.value=r,i.pfValue!=null&&(i.pfValue=r),s?i.strValue="rgb("+r.join(",")+")":l?i.strValue=r.join(" "):i.strValue=""+r,this.updateStyleHints(n)),this.checkTriggers(n,e,u,r)}};Qa.removeAllBypasses=function(t,e){return this.removeBypasses(t,this.propertyNames,e)};Qa.removeBypasses=function(t,e,r){for(var a=!0,n=0;n<t.length;n++){for(var i=t[n],o={},s=0;s<e.length;s++){var l=e[s],u=this.properties[l],f=i.pstyle(u.name);if(!(!f||!f.bypass)){var v="",h=this.parse(l,v,!0),c=o[u.name]={prev:f};this.applyParsedProperty(i,h),c.next=i.pstyle(u.name)}}this.updateStyleHints(i),r&&this.updateTransitions(i,o,a)}};var As={};As.getEmSizeInPixels=function(){var t=this.containerCss("font-size");return t!=null?parseFloat(t):1};As.containerCss=function(t){var e=this._private.cy,r=e.container(),a=e.window();if(a&&r&&a.getComputedStyle)return a.getComputedStyle(r).getPropertyValue(t)};var jt={};jt.getRenderedStyle=function(t,e){return e?this.getStylePropertyValue(t,e,!0):this.getRawStyle(t,!0)};jt.getRawStyle=function(t,e){var r=this;if(t=t[0],t){for(var a={},n=0;n<r.properties.length;n++){var i=r.properties[n],o=r.getStylePropertyValue(t,i.name,e);o!=null&&(a[i.name]=o,a[Xn(i.name)]=o)}return a}};jt.getIndexedStyle=function(t,e,r,a){var n=t.pstyle(e)[r][a];return n??t.cy().style().getDefaultProperty(e)[r][0]};jt.getStylePropertyValue=function(t,e,r){var a=this;if(t=t[0],t){var n=a.properties[e];n.alias&&(n=n.pointsTo);var i=n.type,o=t.pstyle(n.name);if(o){var s=o.value,l=o.units,u=o.strValue;if(r&&i.number&&s!=null&&xe(s)){var f=t.cy().zoom(),v=function(y){return y*f},h=function(y,p){return v(y)+p},c=Je(s),d=c?l.every(function(g){return g!=null}):l!=null;return d?c?s.map(function(g,y){return h(g,l[y])}).join(" "):h(s,l):c?s.map(function(g){return Me(g)?g:""+v(g)}).join(" "):""+v(s)}else if(u!=null)return u}return null}};jt.getAnimationStartStyle=function(t,e){for(var r={},a=0;a<e.length;a++){var n=e[a],i=n.name,o=t.pstyle(i);o!==void 0&&(Ye(o)?o=this.parse(i,o.strValue):o=this.parse(i,o)),o&&(r[i]=o)}return r};jt.getPropsList=function(t){var e=this,r=[],a=t,n=e.properties;if(a)for(var i=Object.keys(a),o=0;o<i.length;o++){var s=i[o],l=a[s],u=n[s]||n[hs(s)],f=this.parse(u.name,l);f&&r.push(f)}return r};jt.getNonDefaultPropertiesHash=function(t,e,r){var a=r.slice(),n,i,o,s,l,u;for(l=0;l<e.length;l++)if(n=e[l],i=t.pstyle(n,!1),i!=null)if(i.pfValue!=null)a[0]=Oa(s,a[0]),a[1]=Ia(s,a[1]);else for(o=i.strValue,u=0;u<o.length;u++)s=o.charCodeAt(u),a[0]=Oa(s,a[0]),a[1]=Ia(s,a[1]);return a};jt.getPropertiesHash=jt.getNonDefaultPropertiesHash;var ii={};ii.appendFromJson=function(t){for(var e=this,r=0;r<t.length;r++){var a=t[r],n=a.selector,i=a.style||a.css,o=Object.keys(i);e.selector(n);for(var s=0;s<o.length;s++){var l=o[s],u=i[l];e.css(l,u)}}return e};ii.fromJson=function(t){var e=this;return e.resetToDefault(),e.appendFromJson(t),e};ii.json=function(){for(var t=[],e=this.defaultLength;e<this.length;e++){for(var r=this[e],a=r.selector,n=r.properties,i={},o=0;o<n.length;o++){var s=n[o];i[s.name]=s.strValue}t.push({selector:a?a.toString():"core",style:i})}return t};var Ls={};Ls.appendFromString=function(t){var e=this,r=this,a=""+t,n,i,o;a=a.replace(/[/][*](\s|.)+?[*][/]/g,"");function s(){a.length>n.length?a=a.substr(n.length):a=""}function l(){i.length>o.length?i=i.substr(o.length):i=""}for(;;){var u=a.match(/^\s*$/);if(u)break;var f=a.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);if(!f){_e("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: "+a);break}n=f[0];var v=f[1];if(v!=="core"){var h=new xr(v);if(h.invalid){_e("Skipping parsing of block: Invalid selector found in string stylesheet: "+v),s();continue}}var c=f[2],d=!1;i=c;for(var g=[];;){var y=i.match(/^\s*$/);if(y)break;var p=i.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);if(!p){_e("Skipping parsing of block: Invalid formatting of style property and value definitions found in:"+c),d=!0;break}o=p[0];var m=p[1],b=p[2],E=e.properties[m];if(!E){_e("Skipping property: Invalid property name in: "+o),l();continue}var C=r.parse(m,b);if(!C){_e("Skipping property: Invalid property definition in: "+o),l();continue}g.push({name:m,val:b}),l()}if(d){s();break}r.selector(v);for(var L=0;L<g.length;L++){var D=g[L];r.css(D.name,D.val)}s()}return r};Ls.fromString=function(t){var e=this;return e.resetToDefault(),e.appendFromString(t),e};var ft={};(function(){var t=ct,e=zh,r=Gh,a=Uh,n=Hh,i=function(Y){return"^"+Y+"\\s*\\(\\s*([\\w\\.]+)\\s*\\)$"},o=function(Y){var Q=t+"|\\w+|"+e+"|"+r+"|"+a+"|"+n;return"^"+Y+"\\s*\\(([\\w\\.]+)\\s*\\,\\s*("+t+")\\s*\\,\\s*("+t+")\\s*,\\s*("+Q+")\\s*\\,\\s*("+Q+")\\)$"},s=[`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`,"^(none)$","^(.+)$"];ft.types={time:{number:!0,min:0,units:"s|ms",implicitUnits:"ms"},percent:{number:!0,min:0,max:100,units:"%",implicitUnits:"%"},percentages:{number:!0,min:0,max:100,units:"%",implicitUnits:"%",multiple:!0},zeroOneNumber:{number:!0,min:0,max:1,unitless:!0},zeroOneNumbers:{number:!0,min:0,max:1,unitless:!0,multiple:!0},nOneOneNumber:{number:!0,min:-1,max:1,unitless:!0},nonNegativeInt:{number:!0,min:0,integer:!0,unitless:!0},nonNegativeNumber:{number:!0,min:0,unitless:!0},position:{enums:["parent","origin"]},nodeSize:{number:!0,min:0,enums:["label"]},number:{number:!0,unitless:!0},numbers:{number:!0,unitless:!0,multiple:!0},positiveNumber:{number:!0,unitless:!0,min:0,strictMin:!0},size:{number:!0,min:0},bidirectionalSize:{number:!0},bidirectionalSizeMaybePercent:{number:!0,allowPercent:!0},bidirectionalSizes:{number:!0,multiple:!0},sizeMaybePercent:{number:!0,min:0,allowPercent:!0},axisDirection:{enums:["horizontal","leftward","rightward","vertical","upward","downward","auto"]},axisDirectionExplicit:{enums:["leftward","rightward","upward","downward"]},axisDirectionPrimary:{enums:["horizontal","vertical"]},paddingRelativeTo:{enums:["width","height","average","min","max"]},bgWH:{number:!0,min:0,allowPercent:!0,enums:["auto"],multiple:!0},bgPos:{number:!0,allowPercent:!0,multiple:!0},bgRelativeTo:{enums:["inner","include-padding"],multiple:!0},bgRepeat:{enums:["repeat","repeat-x","repeat-y","no-repeat"],multiple:!0},bgFit:{enums:["none","contain","cover"],multiple:!0},bgCrossOrigin:{enums:["anonymous","use-credentials","null"],multiple:!0},bgClip:{enums:["none","node"],multiple:!0},bgContainment:{enums:["inside","over"],multiple:!0},boxSelection:{enums:["contain","overlap","none"]},color:{color:!0},colors:{color:!0,multiple:!0},fill:{enums:["solid","linear-gradient","radial-gradient"]},bool:{enums:["yes","no"]},bools:{enums:["yes","no"],multiple:!0},lineStyle:{enums:["solid","dotted","dashed"]},lineCap:{enums:["butt","round","square"]},linePosition:{enums:["center","inside","outside"]},lineJoin:{enums:["round","bevel","miter"]},borderStyle:{enums:["solid","dotted","dashed","double"]},curveStyle:{enums:["bezier","unbundled-bezier","haystack","segments","straight","straight-triangle","taxi","round-segments","round-taxi"]},radiusType:{enums:["arc-radius","influence-radius"],multiple:!0},fontFamily:{regex:'^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'},fontStyle:{enums:["italic","normal","oblique"]},fontWeight:{enums:["normal","bold","bolder","lighter","100","200","300","400","500","600","800","900",100,200,300,400,500,600,700,800,900]},textDecoration:{enums:["none","underline","overline","line-through"]},textTransform:{enums:["none","uppercase","lowercase"]},textWrap:{enums:["none","wrap","ellipsis"]},textOverflowWrap:{enums:["whitespace","anywhere"]},textBackgroundShape:{enums:["rectangle","roundrectangle","round-rectangle","circle"]},nodeShape:{enums:["rectangle","roundrectangle","round-rectangle","cutrectangle","cut-rectangle","bottomroundrectangle","bottom-round-rectangle","barrel","ellipse","triangle","round-triangle","square","pentagon","round-pentagon","hexagon","round-hexagon","concavehexagon","concave-hexagon","heptagon","round-heptagon","octagon","round-octagon","tag","round-tag","star","diamond","round-diamond","vee","rhomboid","right-rhomboid","polygon"]},overlayShape:{enums:["roundrectangle","round-rectangle","ellipse"]},cornerRadius:{number:!0,min:0,units:"px|em",implicitUnits:"px",enums:["auto"]},compoundIncludeLabels:{enums:["include","exclude"]},arrowShape:{enums:["tee","triangle","triangle-tee","circle-triangle","triangle-cross","triangle-backcurve","vee","square","circle","diamond","chevron","none"]},arrowFill:{enums:["filled","hollow"]},arrowWidth:{number:!0,units:"%|px|em",implicitUnits:"px",enums:["match-line"]},display:{enums:["element","none"]},visibility:{enums:["hidden","visible"]},zCompoundDepth:{enums:["bottom","orphan","auto","top"]},zIndexCompare:{enums:["auto","manual"]},valign:{enums:["top","center","bottom"]},halign:{enums:["left","center","right"]},justification:{enums:["left","center","right","auto"]},text:{string:!0},data:{mapping:!0,regex:i("data")},layoutData:{mapping:!0,regex:i("layoutData")},scratch:{mapping:!0,regex:i("scratch")},mapData:{mapping:!0,regex:o("mapData")},mapLayoutData:{mapping:!0,regex:o("mapLayoutData")},mapScratch:{mapping:!0,regex:o("mapScratch")},fn:{mapping:!0,fn:!0},url:{regexes:s,singleRegexMatchValue:!0},urls:{regexes:s,singleRegexMatchValue:!0,multiple:!0},propList:{propList:!0},angle:{number:!0,units:"deg|rad",implicitUnits:"rad"},textRotation:{number:!0,units:"deg|rad",implicitUnits:"rad",enums:["none","autorotate"]},polygonPointList:{number:!0,multiple:!0,evenMultiple:!0,min:-1,max:1,unitless:!0},edgeDistances:{enums:["intersection","node-position","endpoints"]},edgeEndpoint:{number:!0,multiple:!0,units:"%|px|em|deg|rad",implicitUnits:"px",enums:["inside-to-node","outside-to-node","outside-to-node-or-label","outside-to-line","outside-to-line-or-label"],singleEnum:!0,validate:function(Y,Q){switch(Y.length){case 2:return Q[0]!=="deg"&&Q[0]!=="rad"&&Q[1]!=="deg"&&Q[1]!=="rad";case 1:return Me(Y[0])||Q[0]==="deg"||Q[0]==="rad";default:return!1}}},easing:{regexes:["^(spring)\\s*\\(\\s*("+t+")\\s*,\\s*("+t+")\\s*\\)$","^(cubic-bezier)\\s*\\(\\s*("+t+")\\s*,\\s*("+t+")\\s*,\\s*("+t+")\\s*,\\s*("+t+")\\s*\\)$"],enums:["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine","ease-out-sine","ease-in-out-sine","ease-in-quad","ease-out-quad","ease-in-out-quad","ease-in-cubic","ease-out-cubic","ease-in-out-cubic","ease-in-quart","ease-out-quart","ease-in-out-quart","ease-in-quint","ease-out-quint","ease-in-out-quint","ease-in-expo","ease-out-expo","ease-in-out-expo","ease-in-circ","ease-out-circ","ease-in-out-circ"]},gradientDirection:{enums:["to-bottom","to-top","to-left","to-right","to-bottom-right","to-bottom-left","to-top-right","to-top-left","to-right-bottom","to-left-bottom","to-right-top","to-left-top"]},boundsExpansion:{number:!0,multiple:!0,min:0,validate:function(Y){var Q=Y.length;return Q===1||Q===2||Q===4}}};var l={zeroNonZero:function(Y,Q){return(Y==null||Q==null)&&Y!==Q||Y==0&&Q!=0?!0:Y!=0&&Q==0},any:function(Y,Q){return Y!=Q},emptyNonEmpty:function(Y,Q){var oe=br(Y),te=br(Q);return oe&&!te||!oe&&te}},u=ft.types,f=[{name:"label",type:u.text,triggersBounds:l.any,triggersZOrder:l.emptyNonEmpty},{name:"text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any}],v=[{name:"source-label",type:u.text,triggersBounds:l.any},{name:"source-text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"source-text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"source-text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"source-text-offset",type:u.size,triggersBounds:l.any}],h=[{name:"target-label",type:u.text,triggersBounds:l.any},{name:"target-text-rotation",type:u.textRotation,triggersBounds:l.any},{name:"target-text-margin-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"target-text-margin-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"target-text-offset",type:u.size,triggersBounds:l.any}],c=[{name:"font-family",type:u.fontFamily,triggersBounds:l.any},{name:"font-style",type:u.fontStyle,triggersBounds:l.any},{name:"font-weight",type:u.fontWeight,triggersBounds:l.any},{name:"font-size",type:u.size,triggersBounds:l.any},{name:"text-transform",type:u.textTransform,triggersBounds:l.any},{name:"text-wrap",type:u.textWrap,triggersBounds:l.any},{name:"text-overflow-wrap",type:u.textOverflowWrap,triggersBounds:l.any},{name:"text-max-width",type:u.size,triggersBounds:l.any},{name:"text-outline-width",type:u.size,triggersBounds:l.any},{name:"line-height",type:u.positiveNumber,triggersBounds:l.any}],d=[{name:"text-valign",type:u.valign,triggersBounds:l.any},{name:"text-halign",type:u.halign,triggersBounds:l.any},{name:"color",type:u.color},{name:"text-outline-color",type:u.color},{name:"text-outline-opacity",type:u.zeroOneNumber},{name:"text-background-color",type:u.color},{name:"text-background-opacity",type:u.zeroOneNumber},{name:"text-background-padding",type:u.size,triggersBounds:l.any},{name:"text-border-opacity",type:u.zeroOneNumber},{name:"text-border-color",type:u.color},{name:"text-border-width",type:u.size,triggersBounds:l.any},{name:"text-border-style",type:u.borderStyle,triggersBounds:l.any},{name:"text-background-shape",type:u.textBackgroundShape,triggersBounds:l.any},{name:"text-justification",type:u.justification},{name:"box-select-labels",type:u.bool,triggersBounds:l.any}],g=[{name:"events",type:u.bool,triggersZOrder:l.any},{name:"text-events",type:u.bool,triggersZOrder:l.any},{name:"box-selection",type:u.boxSelection,triggersZOrder:l.any}],y=[{name:"display",type:u.display,triggersZOrder:l.any,triggersBounds:l.any,triggersBoundsOfConnectedEdges:l.any,triggersBoundsOfParallelEdges:function(Y,Q,oe){return Y===Q?!1:oe.pstyle("curve-style").value==="bezier"}},{name:"visibility",type:u.visibility,triggersZOrder:l.any},{name:"opacity",type:u.zeroOneNumber,triggersZOrder:l.zeroNonZero},{name:"text-opacity",type:u.zeroOneNumber},{name:"min-zoomed-font-size",type:u.size},{name:"z-compound-depth",type:u.zCompoundDepth,triggersZOrder:l.any},{name:"z-index-compare",type:u.zIndexCompare,triggersZOrder:l.any},{name:"z-index",type:u.number,triggersZOrder:l.any}],p=[{name:"overlay-padding",type:u.size,triggersBounds:l.any},{name:"overlay-color",type:u.color},{name:"overlay-opacity",type:u.zeroOneNumber,triggersBounds:l.zeroNonZero},{name:"overlay-shape",type:u.overlayShape,triggersBounds:l.any},{name:"overlay-corner-radius",type:u.cornerRadius}],m=[{name:"underlay-padding",type:u.size,triggersBounds:l.any},{name:"underlay-color",type:u.color},{name:"underlay-opacity",type:u.zeroOneNumber,triggersBounds:l.zeroNonZero},{name:"underlay-shape",type:u.overlayShape,triggersBounds:l.any},{name:"underlay-corner-radius",type:u.cornerRadius}],b=[{name:"transition-property",type:u.propList},{name:"transition-duration",type:u.time},{name:"transition-delay",type:u.time},{name:"transition-timing-function",type:u.easing}],E=function(Y,Q){return Q.value==="label"?-Y.poolIndex():Q.pfValue},C=[{name:"height",type:u.nodeSize,triggersBounds:l.any,hashOverride:E},{name:"width",type:u.nodeSize,triggersBounds:l.any,hashOverride:E},{name:"shape",type:u.nodeShape,triggersBounds:l.any},{name:"shape-polygon-points",type:u.polygonPointList,triggersBounds:l.any},{name:"corner-radius",type:u.cornerRadius},{name:"background-color",type:u.color},{name:"background-fill",type:u.fill},{name:"background-opacity",type:u.zeroOneNumber},{name:"background-blacken",type:u.nOneOneNumber},{name:"background-gradient-stop-colors",type:u.colors},{name:"background-gradient-stop-positions",type:u.percentages},{name:"background-gradient-direction",type:u.gradientDirection},{name:"padding",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"padding-relative-to",type:u.paddingRelativeTo,triggersBounds:l.any},{name:"bounds-expansion",type:u.boundsExpansion,triggersBounds:l.any}],L=[{name:"border-color",type:u.color},{name:"border-opacity",type:u.zeroOneNumber},{name:"border-width",type:u.size,triggersBounds:l.any},{name:"border-style",type:u.borderStyle},{name:"border-cap",type:u.lineCap},{name:"border-join",type:u.lineJoin},{name:"border-dash-pattern",type:u.numbers},{name:"border-dash-offset",type:u.number},{name:"border-position",type:u.linePosition}],D=[{name:"outline-color",type:u.color},{name:"outline-opacity",type:u.zeroOneNumber},{name:"outline-width",type:u.size,triggersBounds:l.any},{name:"outline-style",type:u.borderStyle},{name:"outline-offset",type:u.size,triggersBounds:l.any}],R=[{name:"background-image",type:u.urls},{name:"background-image-crossorigin",type:u.bgCrossOrigin},{name:"background-image-opacity",type:u.zeroOneNumbers},{name:"background-image-containment",type:u.bgContainment},{name:"background-image-smoothing",type:u.bools},{name:"background-position-x",type:u.bgPos},{name:"background-position-y",type:u.bgPos},{name:"background-width-relative-to",type:u.bgRelativeTo},{name:"background-height-relative-to",type:u.bgRelativeTo},{name:"background-repeat",type:u.bgRepeat},{name:"background-fit",type:u.bgFit},{name:"background-clip",type:u.bgClip},{name:"background-width",type:u.bgWH},{name:"background-height",type:u.bgWH},{name:"background-offset-x",type:u.bgPos},{name:"background-offset-y",type:u.bgPos}],O=[{name:"position",type:u.position,triggersBounds:l.any},{name:"compound-sizing-wrt-labels",type:u.compoundIncludeLabels,triggersBounds:l.any},{name:"min-width",type:u.size,triggersBounds:l.any},{name:"min-width-bias-left",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-width-bias-right",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-height",type:u.size,triggersBounds:l.any},{name:"min-height-bias-top",type:u.sizeMaybePercent,triggersBounds:l.any},{name:"min-height-bias-bottom",type:u.sizeMaybePercent,triggersBounds:l.any}],M=[{name:"line-style",type:u.lineStyle},{name:"line-color",type:u.color},{name:"line-fill",type:u.fill},{name:"line-cap",type:u.lineCap},{name:"line-opacity",type:u.zeroOneNumber},{name:"line-dash-pattern",type:u.numbers},{name:"line-dash-offset",type:u.number},{name:"line-outline-width",type:u.size},{name:"line-outline-color",type:u.color},{name:"line-gradient-stop-colors",type:u.colors},{name:"line-gradient-stop-positions",type:u.percentages},{name:"curve-style",type:u.curveStyle,triggersBounds:l.any,triggersBoundsOfParallelEdges:function(Y,Q){return Y===Q?!1:Y==="bezier"||Q==="bezier"}},{name:"haystack-radius",type:u.zeroOneNumber,triggersBounds:l.any},{name:"source-endpoint",type:u.edgeEndpoint,triggersBounds:l.any},{name:"target-endpoint",type:u.edgeEndpoint,triggersBounds:l.any},{name:"control-point-step-size",type:u.size,triggersBounds:l.any},{name:"control-point-distances",type:u.bidirectionalSizes,triggersBounds:l.any},{name:"control-point-weights",type:u.numbers,triggersBounds:l.any},{name:"segment-distances",type:u.bidirectionalSizes,triggersBounds:l.any},{name:"segment-weights",type:u.numbers,triggersBounds:l.any},{name:"segment-radii",type:u.numbers,triggersBounds:l.any},{name:"radius-type",type:u.radiusType,triggersBounds:l.any},{name:"taxi-turn",type:u.bidirectionalSizeMaybePercent,triggersBounds:l.any},{name:"taxi-turn-min-distance",type:u.size,triggersBounds:l.any},{name:"taxi-direction",type:u.axisDirection,triggersBounds:l.any},{name:"taxi-radius",type:u.number,triggersBounds:l.any},{name:"edge-distances",type:u.edgeDistances,triggersBounds:l.any},{name:"arrow-scale",type:u.positiveNumber,triggersBounds:l.any},{name:"loop-direction",type:u.angle,triggersBounds:l.any},{name:"loop-sweep",type:u.angle,triggersBounds:l.any},{name:"source-distance-from-node",type:u.size,triggersBounds:l.any},{name:"target-distance-from-node",type:u.size,triggersBounds:l.any}],P=[{name:"ghost",type:u.bool,triggersBounds:l.any},{name:"ghost-offset-x",type:u.bidirectionalSize,triggersBounds:l.any},{name:"ghost-offset-y",type:u.bidirectionalSize,triggersBounds:l.any},{name:"ghost-opacity",type:u.zeroOneNumber}],w=[{name:"selection-box-color",type:u.color},{name:"selection-box-opacity",type:u.zeroOneNumber},{name:"selection-box-border-color",type:u.color},{name:"selection-box-border-width",type:u.size},{name:"active-bg-color",type:u.color},{name:"active-bg-opacity",type:u.zeroOneNumber},{name:"active-bg-size",type:u.size},{name:"outside-texture-bg-color",type:u.color},{name:"outside-texture-bg-opacity",type:u.zeroOneNumber}],x=[];ft.pieBackgroundN=16,x.push({name:"pie-size",type:u.sizeMaybePercent}),x.push({name:"pie-hole",type:u.sizeMaybePercent}),x.push({name:"pie-start-angle",type:u.angle});for(var T=1;T<=ft.pieBackgroundN;T++)x.push({name:"pie-"+T+"-background-color",type:u.color}),x.push({name:"pie-"+T+"-background-size",type:u.percent}),x.push({name:"pie-"+T+"-background-opacity",type:u.zeroOneNumber});var A=[];ft.stripeBackgroundN=16,A.push({name:"stripe-size",type:u.sizeMaybePercent}),A.push({name:"stripe-direction",type:u.axisDirectionPrimary});for(var S=1;S<=ft.stripeBackgroundN;S++)A.push({name:"stripe-"+S+"-background-color",type:u.color}),A.push({name:"stripe-"+S+"-background-size",type:u.percent}),A.push({name:"stripe-"+S+"-background-opacity",type:u.zeroOneNumber});var I=[],B=ft.arrowPrefixes=["source","mid-source","target","mid-target"];[{name:"arrow-shape",type:u.arrowShape,triggersBounds:l.any},{name:"arrow-color",type:u.color},{name:"arrow-fill",type:u.arrowFill},{name:"arrow-width",type:u.arrowWidth}].forEach(function(H){B.forEach(function(Y){var Q=Y+"-"+H.name,oe=H.type,te=H.triggersBounds;I.push({name:Q,type:oe,triggersBounds:te})})},{});var k=ft.properties=[].concat(g,b,y,p,m,P,d,c,f,v,h,C,L,D,R,x,A,O,M,I,w),z=ft.propertyGroups={behavior:g,transition:b,visibility:y,overlay:p,underlay:m,ghost:P,commonLabel:d,labelDimensions:c,mainLabel:f,sourceLabel:v,targetLabel:h,nodeBody:C,nodeBorder:L,nodeOutline:D,backgroundImage:R,pie:x,stripe:A,compound:O,edgeLine:M,edgeArrow:I,core:w},F=ft.propertyGroupNames={},V=ft.propertyGroupKeys=Object.keys(z);V.forEach(function(H){F[H]=z[H].map(function(Y){return Y.name}),z[H].forEach(function(Y){return Y.groupKey=H})});var Z=ft.aliases=[{name:"content",pointsTo:"label"},{name:"control-point-distance",pointsTo:"control-point-distances"},{name:"control-point-weight",pointsTo:"control-point-weights"},{name:"segment-distance",pointsTo:"segment-distances"},{name:"segment-weight",pointsTo:"segment-weights"},{name:"segment-radius",pointsTo:"segment-radii"},{name:"edge-text-rotation",pointsTo:"text-rotation"},{name:"padding-left",pointsTo:"padding"},{name:"padding-right",pointsTo:"padding"},{name:"padding-top",pointsTo:"padding"},{name:"padding-bottom",pointsTo:"padding"}];ft.propertyNames=k.map(function(H){return H.name});for(var q=0;q<k.length;q++){var _=k[q];k[_.name]=_}for(var K=0;K<Z.length;K++){var U=Z[K],J=k[U.pointsTo],$={name:U.name,alias:!0,pointsTo:J};k.push($),k[U.name]=$}})();ft.getDefaultProperty=function(t){return this.getDefaultProperties()[t]};ft.getDefaultProperties=function(){var t=this._private;if(t.defaultProperties!=null)return t.defaultProperties;for(var e=Ne({"selection-box-color":"#ddd","selection-box-opacity":.65,"selection-box-border-color":"#aaa","selection-box-border-width":1,"active-bg-color":"black","active-bg-opacity":.15,"active-bg-size":30,"outside-texture-bg-color":"#000","outside-texture-bg-opacity":.125,events:"yes","text-events":"no","text-valign":"top","text-halign":"center","text-justification":"auto","line-height":1,color:"#000","box-selection":"contain","text-outline-color":"#000","text-outline-width":0,"text-outline-opacity":1,"text-opacity":1,"text-decoration":"none","text-transform":"none","text-wrap":"none","text-overflow-wrap":"whitespace","text-max-width":9999,"text-background-color":"#000","text-background-opacity":0,"text-background-shape":"rectangle","text-background-padding":0,"text-border-opacity":0,"text-border-width":0,"text-border-style":"solid","text-border-color":"#000","font-family":"Helvetica Neue, Helvetica, sans-serif","font-style":"normal","font-weight":"normal","font-size":16,"min-zoomed-font-size":0,"text-rotation":"none","source-text-rotation":"none","target-text-rotation":"none",visibility:"visible",display:"element",opacity:1,"z-compound-depth":"auto","z-index-compare":"auto","z-index":0,label:"","text-margin-x":0,"text-margin-y":0,"source-label":"","source-text-offset":0,"source-text-margin-x":0,"source-text-margin-y":0,"target-label":"","target-text-offset":0,"target-text-margin-x":0,"target-text-margin-y":0,"overlay-opacity":0,"overlay-color":"#000","overlay-padding":10,"overlay-shape":"round-rectangle","overlay-corner-radius":"auto","underlay-opacity":0,"underlay-color":"#000","underlay-padding":10,"underlay-shape":"round-rectangle","underlay-corner-radius":"auto","transition-property":"none","transition-duration":0,"transition-delay":0,"transition-timing-function":"linear","box-select-labels":"no","background-blacken":0,"background-color":"#999","background-fill":"solid","background-opacity":1,"background-image":"none","background-image-crossorigin":"anonymous","background-image-opacity":1,"background-image-containment":"inside","background-image-smoothing":"yes","background-position-x":"50%","background-position-y":"50%","background-offset-x":0,"background-offset-y":0,"background-width-relative-to":"include-padding","background-height-relative-to":"include-padding","background-repeat":"no-repeat","background-fit":"none","background-clip":"node","background-width":"auto","background-height":"auto","border-color":"#000","border-opacity":1,"border-width":0,"border-style":"solid","border-dash-pattern":[4,2],"border-dash-offset":0,"border-cap":"butt","border-join":"miter","border-position":"center","outline-color":"#999","outline-opacity":1,"outline-width":0,"outline-offset":0,"outline-style":"solid",height:30,width:30,shape:"ellipse","shape-polygon-points":"-1, -1,   1, -1,   1, 1,   -1, 1","corner-radius":"auto","bounds-expansion":0,"background-gradient-direction":"to-bottom","background-gradient-stop-colors":"#999","background-gradient-stop-positions":"0%",ghost:"no","ghost-offset-y":0,"ghost-offset-x":0,"ghost-opacity":0,padding:0,"padding-relative-to":"width",position:"origin","compound-sizing-wrt-labels":"include","min-width":0,"min-width-bias-left":0,"min-width-bias-right":0,"min-height":0,"min-height-bias-top":0,"min-height-bias-bottom":0},{"pie-size":"100%","pie-hole":0,"pie-start-angle":"0deg"},[{name:"pie-{{i}}-background-color",value:"black"},{name:"pie-{{i}}-background-size",value:"0%"},{name:"pie-{{i}}-background-opacity",value:1}].reduce(function(l,u){for(var f=1;f<=ft.pieBackgroundN;f++){var v=u.name.replace("{{i}}",f),h=u.value;l[v]=h}return l},{}),{"stripe-size":"100%","stripe-direction":"horizontal"},[{name:"stripe-{{i}}-background-color",value:"black"},{name:"stripe-{{i}}-background-size",value:"0%"},{name:"stripe-{{i}}-background-opacity",value:1}].reduce(function(l,u){for(var f=1;f<=ft.stripeBackgroundN;f++){var v=u.name.replace("{{i}}",f),h=u.value;l[v]=h}return l},{}),{"line-style":"solid","line-color":"#999","line-fill":"solid","line-cap":"butt","line-opacity":1,"line-outline-width":0,"line-outline-color":"#000","line-gradient-stop-colors":"#999","line-gradient-stop-positions":"0%","control-point-step-size":40,"control-point-weights":.5,"segment-weights":.5,"segment-distances":20,"segment-radii":15,"radius-type":"arc-radius","taxi-turn":"50%","taxi-radius":15,"taxi-turn-min-distance":10,"taxi-direction":"auto","edge-distances":"intersection","curve-style":"haystack","haystack-radius":0,"arrow-scale":1,"loop-direction":"-45deg","loop-sweep":"-90deg","source-distance-from-node":0,"target-distance-from-node":0,"source-endpoint":"outside-to-node","target-endpoint":"outside-to-node","line-dash-pattern":[6,3],"line-dash-offset":0},[{name:"arrow-shape",value:"none"},{name:"arrow-color",value:"#999"},{name:"arrow-fill",value:"filled"},{name:"arrow-width",value:1}].reduce(function(l,u){return ft.arrowPrefixes.forEach(function(f){var v=f+"-"+u.name,h=u.value;l[v]=h}),l},{})),r={},a=0;a<this.properties.length;a++){var n=this.properties[a];if(!n.pointsTo){var i=n.name,o=e[i],s=this.parse(i,o);r[i]=s}}return t.defaultProperties=r,t.defaultProperties};ft.addDefaultStylesheet=function(){this.selector(":parent").css({shape:"rectangle",padding:10,"background-color":"#eee","border-color":"#ccc","border-width":1}).selector("edge").css({width:3}).selector(":loop").css({"curve-style":"bezier"}).selector("edge:compound").css({"curve-style":"bezier","source-endpoint":"outside-to-line","target-endpoint":"outside-to-line"}).selector(":selected").css({"background-color":"#0169D9","line-color":"#0169D9","source-arrow-color":"#0169D9","target-arrow-color":"#0169D9","mid-source-arrow-color":"#0169D9","mid-target-arrow-color":"#0169D9"}).selector(":parent:selected").css({"background-color":"#CCE1F9","border-color":"#aec8e5"}).selector(":active").css({"overlay-color":"black","overlay-padding":10,"overlay-opacity":.25}),this.defaultLength=this.length};var oi={};oi.parse=function(t,e,r,a){var n=this;if(at(e))return n.parseImplWarn(t,e,r,a);var i=a==="mapping"||a===!0||a===!1||a==null?"dontcare":a,o=r?"t":"f",s=""+e,l=Nf(t,s,o,i),u=n.propCache=n.propCache||[],f;return(f=u[l])||(f=u[l]=n.parseImplWarn(t,e,r,a)),(r||a==="mapping")&&(f=Jt(f),f&&(f.value=Jt(f.value))),f};oi.parseImplWarn=function(t,e,r,a){var n=this.parseImpl(t,e,r,a);return!n&&e!=null&&_e("The style property `".concat(t,": ").concat(e,"` is invalid")),n&&(n.name==="width"||n.name==="height")&&e==="label"&&_e("The style value of `label` is deprecated for `"+n.name+"`"),n};oi.parseImpl=function(t,e,r,a){var n=this;t=hs(t);var i=n.properties[t],o=e,s=n.types;if(!i||e===void 0)return null;i.alias&&(i=i.pointsTo,t=i.name);var l=Me(e);l&&(e=e.trim());var u=i.type;if(!u)return null;if(r&&(e===""||e===null))return{name:t,value:e,bypass:!0,deleteBypass:!0};if(at(e))return{name:t,value:e,strValue:"fn",mapped:s.fn,bypass:r};var f,v;if(!(!l||a||e.length<7||e[1]!=="a")){if(e.length>=7&&e[0]==="d"&&(f=new RegExp(s.data.regex).exec(e))){if(r)return!1;var h=s.data;return{name:t,value:f,strValue:""+e,mapped:h,field:f[1],bypass:r}}else if(e.length>=10&&e[0]==="m"&&(v=new RegExp(s.mapData.regex).exec(e))){if(r||u.multiple)return!1;var c=s.mapData;if(!(u.color||u.number))return!1;var d=this.parse(t,v[4]);if(!d||d.mapped)return!1;var g=this.parse(t,v[5]);if(!g||g.mapped)return!1;if(d.pfValue===g.pfValue||d.strValue===g.strValue)return _e("`"+t+": "+e+"` is not a valid mapper because the output range is zero; converting to `"+t+": "+d.strValue+"`"),this.parse(t,d.strValue);if(u.color){var y=d.value,p=g.value,m=y[0]===p[0]&&y[1]===p[1]&&y[2]===p[2]&&(y[3]===p[3]||(y[3]==null||y[3]===1)&&(p[3]==null||p[3]===1));if(m)return!1}return{name:t,value:v,strValue:""+e,mapped:c,field:v[1],fieldMin:parseFloat(v[2]),fieldMax:parseFloat(v[3]),valueMin:d.value,valueMax:g.value,bypass:r}}}if(u.multiple&&a!=="multiple"){var b;if(l?b=e.split(/\s+/):Je(e)?b=e:b=[e],u.evenMultiple&&b.length%2!==0)return null;for(var E=[],C=[],L=[],D="",R=!1,O=0;O<b.length;O++){var M=n.parse(t,b[O],r,"multiple");R=R||Me(M.value),E.push(M.value),L.push(M.pfValue!=null?M.pfValue:M.value),C.push(M.units),D+=(O>0?" ":"")+M.strValue}return u.validate&&!u.validate(E,C)?null:u.singleEnum&&R?E.length===1&&Me(E[0])?{name:t,value:E[0],strValue:E[0],bypass:r}:null:{name:t,value:E,pfValue:L,strValue:D,bypass:r,units:C}}var P=function(){for(var $=0;$<u.enums.length;$++){var H=u.enums[$];if(H===e)return{name:t,value:e,strValue:""+e,bypass:r}}return null};if(u.number){var w,x="px";if(u.units&&(w=u.units),u.implicitUnits&&(x=u.implicitUnits),!u.unitless)if(l){var T="px|em"+(u.allowPercent?"|\\%":"");w&&(T=w);var A=e.match("^("+ct+")("+T+")?$");A&&(e=A[1],w=A[2]||x)}else(!w||u.implicitUnits)&&(w=x);if(e=parseFloat(e),isNaN(e)&&u.enums===void 0)return null;if(isNaN(e)&&u.enums!==void 0)return e=o,P();if(u.integer&&!Nh(e)||u.min!==void 0&&(e<u.min||u.strictMin&&e===u.min)||u.max!==void 0&&(e>u.max||u.strictMax&&e===u.max))return null;var S={name:t,value:e,strValue:""+e+(w||""),units:w,bypass:r};return u.unitless||w!=="px"&&w!=="em"?S.pfValue=e:S.pfValue=w==="px"||!w?e:this.getEmSizeInPixels()*e,(w==="ms"||w==="s")&&(S.pfValue=w==="ms"?e:1e3*e),(w==="deg"||w==="rad")&&(S.pfValue=w==="rad"?e:Uc(e)),w==="%"&&(S.pfValue=e/100),S}else if(u.propList){var I=[],B=""+e;if(B!=="none"){for(var k=B.split(/\s*,\s*|\s+/),z=0;z<k.length;z++){var F=k[z].trim();n.properties[F]?I.push(F):_e("`"+F+"` is not a valid property name")}if(I.length===0)return null}return{name:t,value:I,strValue:I.length===0?"none":I.join(" "),bypass:r}}else if(u.color){var V=Cf(e);return V?{name:t,value:V,pfValue:V,strValue:"rgb("+V[0]+","+V[1]+","+V[2]+")",bypass:r}:null}else if(u.regex||u.regexes){if(u.enums){var Z=P();if(Z)return Z}for(var q=u.regexes?u.regexes:[u.regex],_=0;_<q.length;_++){var K=new RegExp(q[_]),U=K.exec(e);if(U)return{name:t,value:u.singleRegexMatchValue?U[1]:U,strValue:""+e,bypass:r}}return null}else return u.string?{name:t,value:""+e,strValue:""+e,bypass:r}:u.enums?P():null};var yt=function(e){if(!(this instanceof yt))return new yt(e);if(!vs(e)){rt("A style must have a core reference");return}this._private={cy:e,coreStyle:{}},this.length=0,this.resetToDefault()},Ct=yt.prototype;Ct.instanceString=function(){return"style"};Ct.clear=function(){for(var t=this._private,e=t.cy,r=e.elements(),a=0;a<this.length;a++)this[a]=void 0;return this.length=0,t.contextStyles={},t.propDiffs={},this.cleanElements(r,!0),r.forEach(function(n){var i=n[0]._private;i.styleDirty=!0,i.appliedInitStyle=!1}),this};Ct.resetToDefault=function(){return this.clear(),this.addDefaultStylesheet(),this};Ct.core=function(t){return this._private.coreStyle[t]||this.getDefaultProperty(t)};Ct.selector=function(t){var e=t==="core"?null:new xr(t),r=this.length++;return this[r]={selector:e,properties:[],mappedProperties:[],index:r},this};Ct.css=function(){var t=this,e=arguments;if(e.length===1)for(var r=e[0],a=0;a<t.properties.length;a++){var n=t.properties[a],i=r[n.name];i===void 0&&(i=r[Xn(n.name)]),i!==void 0&&this.cssRule(n.name,i)}else e.length===2&&this.cssRule(e[0],e[1]);return this};Ct.style=Ct.css;Ct.cssRule=function(t,e){var r=this.parse(t,e);if(r){var a=this.length-1;this[a].properties.push(r),this[a].properties[r.name]=r,r.name.match(/pie-(\d+)-background-size/)&&r.value&&(this._private.hasPie=!0),r.name.match(/stripe-(\d+)-background-size/)&&r.value&&(this._private.hasStripe=!0),r.mapped&&this[a].mappedProperties.push(r);var n=!this[a].selector;n&&(this._private.coreStyle[r.name]=r)}return this};Ct.append=function(t){return Ef(t)?t.appendToStyle(this):Je(t)?this.appendFromJson(t):Me(t)&&this.appendFromString(t),this};yt.fromJson=function(t,e){var r=new yt(t);return r.fromJson(e),r};yt.fromString=function(t,e){return new yt(t).fromString(e)};[mt,Qa,As,jt,ii,Ls,ft,oi].forEach(function(t){Ne(Ct,t)});yt.types=Ct.types;yt.properties=Ct.properties;yt.propertyGroups=Ct.propertyGroups;yt.propertyGroupNames=Ct.propertyGroupNames;yt.propertyGroupKeys=Ct.propertyGroupKeys;var Wp={style:function(e){if(e){var r=this.setStyle(e);r.update()}return this._private.style},setStyle:function(e){var r=this._private;return Ef(e)?r.style=e.generateStyle(this):Je(e)?r.style=yt.fromJson(this,e):Me(e)?r.style=yt.fromString(this,e):r.style=yt(this),r.style},updateStyle:function(){this.mutableElements().updateStyle()}},Xp="single",Ur={autolock:function(e){if(e!==void 0)this._private.autolock=!!e;else return this._private.autolock;return this},autoungrabify:function(e){if(e!==void 0)this._private.autoungrabify=!!e;else return this._private.autoungrabify;return this},autounselectify:function(e){if(e!==void 0)this._private.autounselectify=!!e;else return this._private.autounselectify;return this},selectionType:function(e){var r=this._private;if(r.selectionType==null&&(r.selectionType=Xp),e!==void 0)(e==="additive"||e==="single")&&(r.selectionType=e);else return r.selectionType;return this},panningEnabled:function(e){if(e!==void 0)this._private.panningEnabled=!!e;else return this._private.panningEnabled;return this},userPanningEnabled:function(e){if(e!==void 0)this._private.userPanningEnabled=!!e;else return this._private.userPanningEnabled;return this},zoomingEnabled:function(e){if(e!==void 0)this._private.zoomingEnabled=!!e;else return this._private.zoomingEnabled;return this},userZoomingEnabled:function(e){if(e!==void 0)this._private.userZoomingEnabled=!!e;else return this._private.userZoomingEnabled;return this},boxSelectionEnabled:function(e){if(e!==void 0)this._private.boxSelectionEnabled=!!e;else return this._private.boxSelectionEnabled;return this},pan:function(){var e=arguments,r=this._private.pan,a,n,i,o,s;switch(e.length){case 0:return r;case 1:if(Me(e[0]))return a=e[0],r[a];if(Ye(e[0])){if(!this._private.panningEnabled)return this;i=e[0],o=i.x,s=i.y,xe(o)&&(r.x=o),xe(s)&&(r.y=s),this.emit("pan viewport")}break;case 2:if(!this._private.panningEnabled)return this;a=e[0],n=e[1],(a==="x"||a==="y")&&xe(n)&&(r[a]=n),this.emit("pan viewport");break}return this.notify("viewport"),this},panBy:function(e,r){var a=arguments,n=this._private.pan,i,o,s,l,u;if(!this._private.panningEnabled)return this;switch(a.length){case 1:Ye(e)&&(s=a[0],l=s.x,u=s.y,xe(l)&&(n.x+=l),xe(u)&&(n.y+=u),this.emit("pan viewport"));break;case 2:i=e,o=r,(i==="x"||i==="y")&&xe(o)&&(n[i]+=o),this.emit("pan viewport");break}return this.notify("viewport"),this},gc:function(){this.notify("gc")},fit:function(e,r){var a=this.getFitViewport(e,r);if(a){var n=this._private;n.zoom=a.zoom,n.pan=a.pan,this.emit("pan zoom viewport"),this.notify("viewport")}return this},getFitViewport:function(e,r){if(xe(e)&&r===void 0&&(r=e,e=void 0),!(!this._private.panningEnabled||!this._private.zoomingEnabled)){var a;if(Me(e)){var n=e;e=this.$(n)}else if(Ih(e)){var i=e;a={x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2},a.w=a.x2-a.x1,a.h=a.y2-a.y1}else kt(e)||(e=this.mutableElements());if(!(kt(e)&&e.empty())){a=a||e.boundingBox();var o=this.width(),s=this.height(),l;if(r=xe(r)?r:0,!isNaN(o)&&!isNaN(s)&&o>0&&s>0&&!isNaN(a.w)&&!isNaN(a.h)&&a.w>0&&a.h>0){l=Math.min((o-2*r)/a.w,(s-2*r)/a.h),l=l>this._private.maxZoom?this._private.maxZoom:l,l=l<this._private.minZoom?this._private.minZoom:l;var u={x:(o-l*(a.x1+a.x2))/2,y:(s-l*(a.y1+a.y2))/2};return{zoom:l,pan:u}}}}},zoomRange:function(e,r){var a=this._private;if(r==null){var n=e;e=n.min,r=n.max}return xe(e)&&xe(r)&&e<=r?(a.minZoom=e,a.maxZoom=r):xe(e)&&r===void 0&&e<=a.maxZoom?a.minZoom=e:xe(r)&&e===void 0&&r>=a.minZoom&&(a.maxZoom=r),this},minZoom:function(e){return e===void 0?this._private.minZoom:this.zoomRange({min:e})},maxZoom:function(e){return e===void 0?this._private.maxZoom:this.zoomRange({max:e})},getZoomedViewport:function(e){var r=this._private,a=r.pan,n=r.zoom,i,o,s=!1;if(r.zoomingEnabled||(s=!0),xe(e)?o=e:Ye(e)&&(o=e.level,e.position!=null?i=_n(e.position,n,a):e.renderedPosition!=null&&(i=e.renderedPosition),i!=null&&!r.panningEnabled&&(s=!0)),o=o>r.maxZoom?r.maxZoom:o,o=o<r.minZoom?r.minZoom:o,s||!xe(o)||o===n||i!=null&&(!xe(i.x)||!xe(i.y)))return null;if(i!=null){var l=a,u=n,f=o,v={x:-f/u*(i.x-l.x)+i.x,y:-f/u*(i.y-l.y)+i.y};return{zoomed:!0,panned:!0,zoom:f,pan:v}}else return{zoomed:!0,panned:!1,zoom:o,pan:a}},zoom:function(e){if(e===void 0)return this._private.zoom;var r=this.getZoomedViewport(e),a=this._private;return r==null||!r.zoomed?this:(a.zoom=r.zoom,r.panned&&(a.pan.x=r.pan.x,a.pan.y=r.pan.y),this.emit("zoom"+(r.panned?" pan":"")+" viewport"),this.notify("viewport"),this)},viewport:function(e){var r=this._private,a=!0,n=!0,i=[],o=!1,s=!1;if(!e)return this;if(xe(e.zoom)||(a=!1),Ye(e.pan)||(n=!1),!a&&!n)return this;if(a){var l=e.zoom;l<r.minZoom||l>r.maxZoom||!r.zoomingEnabled?o=!0:(r.zoom=l,i.push("zoom"))}if(n&&(!o||!e.cancelOnFailedZoom)&&r.panningEnabled){var u=e.pan;xe(u.x)&&(r.pan.x=u.x,s=!1),xe(u.y)&&(r.pan.y=u.y,s=!1),s||i.push("pan")}return i.length>0&&(i.push("viewport"),this.emit(i.join(" ")),this.notify("viewport")),this},center:function(e){var r=this.getCenterPan(e);return r&&(this._private.pan=r,this.emit("pan viewport"),this.notify("viewport")),this},getCenterPan:function(e,r){if(this._private.panningEnabled){if(Me(e)){var a=e;e=this.mutableElements().filter(a)}else kt(e)||(e=this.mutableElements());if(e.length!==0){var n=e.boundingBox(),i=this.width(),o=this.height();r=r===void 0?this._private.zoom:r;var s={x:(i-r*(n.x1+n.x2))/2,y:(o-r*(n.y1+n.y2))/2};return s}}},reset:function(){return!this._private.panningEnabled||!this._private.zoomingEnabled?this:(this.viewport({pan:{x:0,y:0},zoom:1}),this)},invalidateSize:function(){this._private.sizeCache=null},size:function(){var e=this._private,r=e.container,a=this;return e.sizeCache=e.sizeCache||(r?(function(){var n=a.window().getComputedStyle(r),i=function(s){return parseFloat(n.getPropertyValue(s))};return{width:r.clientWidth-i("padding-left")-i("padding-right"),height:r.clientHeight-i("padding-top")-i("padding-bottom")}})():{width:1,height:1})},width:function(){return this.size().width},height:function(){return this.size().height},extent:function(){var e=this._private.pan,r=this._private.zoom,a=this.renderedExtent(),n={x1:(a.x1-e.x)/r,x2:(a.x2-e.x)/r,y1:(a.y1-e.y)/r,y2:(a.y2-e.y)/r};return n.w=n.x2-n.x1,n.h=n.y2-n.y1,n},renderedExtent:function(){var e=this.width(),r=this.height();return{x1:0,y1:0,x2:e,y2:r,w:e,h:r}},multiClickDebounceTime:function(e){if(e)this._private.multiClickDebounceTime=e;else return this._private.multiClickDebounceTime;return this}};Ur.centre=Ur.center;Ur.autolockNodes=Ur.autolock;Ur.autoungrabifyNodes=Ur.autoungrabify;var Ga={data:Ke.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeData:Ke.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),scratch:Ke.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:Ke.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0})};Ga.attr=Ga.data;Ga.removeAttr=Ga.removeData;var Ua=function(e){var r=this;e=Ne({},e);var a=e.container;a&&!On(a)&&On(a[0])&&(a=a[0]);var n=a?a._cyreg:null;n=n||{},n&&n.cy&&(n.cy.destroy(),n={});var i=n.readies=n.readies||[];a&&(a._cyreg=n),n.cy=r;var o=ht!==void 0&&a!==void 0&&!e.headless,s=e;s.layout=Ne({name:o?"grid":"null"},s.layout),s.renderer=Ne({name:o?"canvas":"null"},s.renderer);var l=function(d,g,y){return g!==void 0?g:y!==void 0?y:d},u=this._private={container:a,ready:!1,options:s,elements:new wt(this),listeners:[],aniEles:new wt(this),data:s.data||{},scratch:{},layout:null,renderer:null,destroyed:!1,notificationsEnabled:!0,minZoom:1e-50,maxZoom:1e50,zoomingEnabled:l(!0,s.zoomingEnabled),userZoomingEnabled:l(!0,s.userZoomingEnabled),panningEnabled:l(!0,s.panningEnabled),userPanningEnabled:l(!0,s.userPanningEnabled),boxSelectionEnabled:l(!0,s.boxSelectionEnabled),autolock:l(!1,s.autolock,s.autolockNodes),autoungrabify:l(!1,s.autoungrabify,s.autoungrabifyNodes),autounselectify:l(!1,s.autounselectify),styleEnabled:s.styleEnabled===void 0?o:s.styleEnabled,zoom:xe(s.zoom)?s.zoom:1,pan:{x:Ye(s.pan)&&xe(s.pan.x)?s.pan.x:0,y:Ye(s.pan)&&xe(s.pan.y)?s.pan.y:0},animation:{current:[],queue:[]},hasCompoundNodes:!1,multiClickDebounceTime:l(250,s.multiClickDebounceTime)};this.createEmitter(),this.selectionType(s.selectionType),this.zoomRange({min:s.minZoom,max:s.maxZoom});var f=function(d,g){var y=d.some(Bh);if(y)return va.all(d).then(g);g(d)};u.styleEnabled&&r.setStyle([]);var v=Ne({},s,s.renderer);r.initRenderer(v);var h=function(d,g,y){r.notifications(!1);var p=r.mutableElements();p.length>0&&p.remove(),d!=null&&(Ye(d)||Je(d))&&r.add(d),r.one("layoutready",function(b){r.notifications(!0),r.emit(b),r.one("load",g),r.emitAndNotify("load")}).one("layoutstop",function(){r.one("done",y),r.emit("done")});var m=Ne({},r._private.options.layout);m.eles=r.elements(),r.layout(m).run()};f([s.style,s.elements],function(c){var d=c[0],g=c[1];u.styleEnabled&&r.style().append(d),h(g,function(){r.startAnimationLoop(),u.ready=!0,at(s.ready)&&r.on("ready",s.ready);for(var y=0;y<i.length;y++){var p=i[y];r.on("ready",p)}n&&(n.readies=[]),r.emit("ready")},s.done)})},Gn=Ua.prototype;Ne(Gn,{instanceString:function(){return"core"},isReady:function(){return this._private.ready},destroyed:function(){return this._private.destroyed},ready:function(e){return this.isReady()?this.emitter().emit("ready",[],e):this.on("ready",e),this},destroy:function(){var e=this;if(!e.destroyed())return e.stopAnimationLoop(),e.destroyRenderer(),this.emit("destroy"),e._private.destroyed=!0,e},hasElementWithId:function(e){return this._private.elements.hasElementWithId(e)},getElementById:function(e){return this._private.elements.getElementById(e)},hasCompoundNodes:function(){return this._private.hasCompoundNodes},headless:function(){return this._private.renderer.isHeadless()},styleEnabled:function(){return this._private.styleEnabled},addToPool:function(e){return this._private.elements.merge(e),this},removeFromPool:function(e){return this._private.elements.unmerge(e),this},container:function(){return this._private.container||null},window:function(){var e=this._private.container;if(e==null)return ht;var r=this._private.container.ownerDocument;return r===void 0||r==null?ht:r.defaultView||ht},mount:function(e){if(e!=null){var r=this,a=r._private,n=a.options;return!On(e)&&On(e[0])&&(e=e[0]),r.stopAnimationLoop(),r.destroyRenderer(),a.container=e,a.styleEnabled=!0,r.invalidateSize(),r.initRenderer(Ne({},n,n.renderer,{name:n.renderer.name==="null"?"canvas":n.renderer.name})),r.startAnimationLoop(),r.style(n.style),r.emit("mount"),r}},unmount:function(){var e=this;return e.stopAnimationLoop(),e.destroyRenderer(),e.initRenderer({name:"null"}),e.emit("unmount"),e},options:function(){return Jt(this._private.options)},json:function(e){var r=this,a=r._private,n=r.mutableElements(),i=function(E){return r.getElementById(E.id())};if(Ye(e)){if(r.startBatch(),e.elements){var o={},s=function(E,C){for(var L=[],D=[],R=0;R<E.length;R++){var O=E[R];if(!O.data.id){_e("cy.json() cannot handle elements without an ID attribute");continue}var M=""+O.data.id,P=r.getElementById(M);o[M]=!0,P.length!==0?D.push({ele:P,json:O}):(C&&(O.group=C),L.push(O))}r.add(L);for(var w=0;w<D.length;w++){var x=D[w],T=x.ele,A=x.json;T.json(A)}};if(Je(e.elements))s(e.elements);else for(var l=["nodes","edges"],u=0;u<l.length;u++){var f=l[u],v=e.elements[f];Je(v)&&s(v,f)}var h=r.collection();n.filter(function(b){return!o[b.id()]}).forEach(function(b){b.isParent()?h.merge(b):b.remove()}),h.forEach(function(b){return b.children().move({parent:null})}),h.forEach(function(b){return i(b).remove()})}e.style&&r.style(e.style),e.zoom!=null&&e.zoom!==a.zoom&&r.zoom(e.zoom),e.pan&&(e.pan.x!==a.pan.x||e.pan.y!==a.pan.y)&&r.pan(e.pan),e.data&&r.data(e.data);for(var c=["minZoom","maxZoom","zoomingEnabled","userZoomingEnabled","panningEnabled","userPanningEnabled","boxSelectionEnabled","autolock","autoungrabify","autounselectify","multiClickDebounceTime"],d=0;d<c.length;d++){var g=c[d];e[g]!=null&&r[g](e[g])}return r.endBatch(),this}else{var y=!!e,p={};y?p.elements=this.elements().map(function(b){return b.json()}):(p.elements={},n.forEach(function(b){var E=b.group();p.elements[E]||(p.elements[E]=[]),p.elements[E].push(b.json())})),this._private.styleEnabled&&(p.style=r.style().json()),p.data=Jt(r.data());var m=a.options;return p.zoomingEnabled=a.zoomingEnabled,p.userZoomingEnabled=a.userZoomingEnabled,p.zoom=a.zoom,p.minZoom=a.minZoom,p.maxZoom=a.maxZoom,p.panningEnabled=a.panningEnabled,p.userPanningEnabled=a.userPanningEnabled,p.pan=Jt(a.pan),p.boxSelectionEnabled=a.boxSelectionEnabled,p.renderer=Jt(m.renderer),p.hideEdgesOnViewport=m.hideEdgesOnViewport,p.textureOnViewport=m.textureOnViewport,p.wheelSensitivity=m.wheelSensitivity,p.motionBlur=m.motionBlur,p.multiClickDebounceTime=m.multiClickDebounceTime,p}}});Gn.$id=Gn.getElementById;[Bp,Gp,Ev,jo,An,Hp,es,Ln,Wp,Ur,Ga].forEach(function(t){Ne(Gn,t)});var $p={fit:!0,directed:!1,direction:"downward",padding:30,circle:!1,grid:!1,spacingFactor:1.75,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,roots:void 0,depthSort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}},Kp={maximal:!1,acyclic:!1},_r=function(e){return e.scratch("breadthfirst")},Hl=function(e,r){return e.scratch("breadthfirst",r)};function xv(t){this.options=Ne({},$p,Kp,t)}xv.prototype.run=function(){var t=this.options,e=t.cy,r=t.eles,a=r.nodes().filter(function(ce){return ce.isChildless()}),n=r,i=t.directed,o=t.acyclic||t.maximal||t.maximalAdjustments>0,s=!!t.boundingBox,l=Lt(s?t.boundingBox:structuredClone(e.extent())),u;if(kt(t.roots))u=t.roots;else if(Je(t.roots)){for(var f=[],v=0;v<t.roots.length;v++){var h=t.roots[v],c=e.getElementById(h);f.push(c)}u=e.collection(f)}else if(Me(t.roots))u=e.$(t.roots);else if(i)u=a.roots();else{var d=r.components();u=e.collection();for(var g=function(){var fe=d[y],ye=fe.maxDegree(!1),me=fe.filter(function(Ee){return Ee.degree(!1)===ye});u=u.add(me)},y=0;y<d.length;y++)g()}var p=[],m={},b=function(fe,ye){p[ye]==null&&(p[ye]=[]);var me=p[ye].length;p[ye].push(fe),Hl(fe,{index:me,depth:ye})},E=function(fe,ye){var me=_r(fe),Ee=me.depth,be=me.index;p[Ee][be]=null,fe.isChildless()&&b(fe,ye)};n.bfs({roots:u,directed:t.directed,visit:function(fe,ye,me,Ee,be){var Ae=fe[0],Ie=Ae.id();Ae.isChildless()&&b(Ae,be),m[Ie]=!0}});for(var C=[],L=0;L<a.length;L++){var D=a[L];m[D.id()]||C.push(D)}var R=function(fe){for(var ye=p[fe],me=0;me<ye.length;me++){var Ee=ye[me];if(Ee==null){ye.splice(me,1),me--;continue}Hl(Ee,{depth:fe,index:me})}},O=function(fe,ye){for(var me=_r(fe),Ee=fe.incomers().filter(function(ne){return ne.isNode()&&r.has(ne)}),be=-1,Ae=fe.id(),Ie=0;Ie<Ee.length;Ie++){var Oe=Ee[Ie],Be=_r(Oe);be=Math.max(be,Be.depth)}if(me.depth<=be){if(!t.acyclic&&ye[Ae])return null;var Pe=be+1;return E(fe,Pe),ye[Ae]=Pe,!0}return!1};if(i&&o){var M=[],P={},w=function(fe){return M.push(fe)},x=function(){return M.shift()};for(a.forEach(function(ce){return M.push(ce)});M.length>0;){var T=x(),A=O(T,P);if(A)T.outgoers().filter(function(ce){return ce.isNode()&&r.has(ce)}).forEach(w);else if(A===null){_e("Detected double maximal shift for node `"+T.id()+"`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");break}}}var S=0;if(t.avoidOverlap)for(var I=0;I<a.length;I++){var B=a[I],k=B.layoutDimensions(t),z=k.w,F=k.h;S=Math.max(S,z,F)}var V={},Z=function(fe){if(V[fe.id()])return V[fe.id()];for(var ye=_r(fe).depth,me=fe.neighborhood(),Ee=0,be=0,Ae=0;Ae<me.length;Ae++){var Ie=me[Ae];if(!(Ie.isEdge()||Ie.isParent()||!a.has(Ie))){var Oe=_r(Ie);if(Oe!=null){var Be=Oe.index,Pe=Oe.depth;if(!(Be==null||Pe==null)){var ne=p[Pe].length;Pe<ye&&(Ee+=Be/ne,be++)}}}}return be=Math.max(1,be),Ee=Ee/be,be===0&&(Ee=0),V[fe.id()]=Ee,Ee},q=function(fe,ye){var me=Z(fe),Ee=Z(ye),be=me-Ee;return be===0?Tf(fe.id(),ye.id()):be};t.depthSort!==void 0&&(q=t.depthSort);for(var _=p.length,K=0;K<_;K++)p[K].sort(q),R(K);for(var U=[],J=0;J<C.length;J++)U.push(C[J]);var $=function(){for(var fe=0;fe<_;fe++)R(fe)};U.length&&(p.unshift(U),_=p.length,$());for(var H=0,Y=0;Y<_;Y++)H=Math.max(p[Y].length,H);var Q={x:l.x1+l.w/2,y:l.y1+l.h/2},oe=a.reduce(function(ce,fe){return(function(ye){return{w:ce.w===-1?ye.w:(ce.w+ye.w)/2,h:ce.h===-1?ye.h:(ce.h+ye.h)/2}})(fe.boundingBox({includeLabels:t.nodeDimensionsIncludeLabels}))},{w:-1,h:-1}),te=Math.max(_===1?0:s?(l.h-t.padding*2-oe.h)/(_-1):(l.h-t.padding*2-oe.h)/(_+1),S),Te=p.reduce(function(ce,fe){return Math.max(ce,fe.length)},0),Le=function(fe){var ye=_r(fe),me=ye.depth,Ee=ye.index;if(t.circle){var be=Math.min(l.w/2/_,l.h/2/_);be=Math.max(be,S);var Ae=be*me+be-(_>0&&p[0].length<=3?be/2:0),Ie=2*Math.PI/p[me].length*Ee;return me===0&&p[0].length===1&&(Ae=1),{x:Q.x+Ae*Math.cos(Ie),y:Q.y+Ae*Math.sin(Ie)}}else{var Oe=p[me].length,Be=Math.max(Oe===1?0:s?(l.w-t.padding*2-oe.w)/((t.grid?Te:Oe)-1):(l.w-t.padding*2-oe.w)/((t.grid?Te:Oe)+1),S),Pe={x:Q.x+(Ee+1-(Oe+1)/2)*Be,y:Q.y+(me+1-(_+1)/2)*te};return Pe}},he={downward:0,leftward:90,upward:180,rightward:-90};Object.keys(he).indexOf(t.direction)===-1&&rt("Invalid direction '".concat(t.direction,"' specified for breadthfirst layout. Valid values are: ").concat(Object.keys(he).join(", ")));var le=function(fe){return fc(Le(fe),l,he[t.direction])};return r.nodes().layoutPositions(this,t,le),this};var _p={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,radius:void 0,startAngle:3/2*Math.PI,sweep:void 0,clockwise:!0,sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function Tv(t){this.options=Ne({},_p,t)}Tv.prototype.run=function(){var t=this.options,e=t,r=t.cy,a=e.eles,n=e.counterclockwise!==void 0?!e.counterclockwise:e.clockwise,i=a.nodes().not(":parent");e.sort&&(i=i.sort(e.sort));for(var o=Lt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()}),s={x:o.x1+o.w/2,y:o.y1+o.h/2},l=e.sweep===void 0?2*Math.PI-2*Math.PI/i.length:e.sweep,u=l/Math.max(1,i.length-1),f,v=0,h=0;h<i.length;h++){var c=i[h],d=c.layoutDimensions(e),g=d.w,y=d.h;v=Math.max(v,g,y)}if(xe(e.radius)?f=e.radius:i.length<=1?f=0:f=Math.min(o.h,o.w)/2-v,i.length>1&&e.avoidOverlap){v*=1.75;var p=Math.cos(u)-Math.cos(0),m=Math.sin(u)-Math.sin(0),b=Math.sqrt(v*v/(p*p+m*m));f=Math.max(b,f)}var E=function(L,D){var R=e.startAngle+D*u*(n?1:-1),O=f*Math.cos(R),M=f*Math.sin(R),P={x:s.x+O,y:s.y+M};return P};return a.nodes().layoutPositions(this,e,E),this};var Zp={fit:!0,padding:30,startAngle:3/2*Math.PI,sweep:void 0,clockwise:!0,equidistant:!1,minNodeSpacing:10,boundingBox:void 0,avoidOverlap:!0,nodeDimensionsIncludeLabels:!1,height:void 0,width:void 0,spacingFactor:void 0,concentric:function(e){return e.degree()},levelWidth:function(e){return e.maxDegree()/4},animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function Cv(t){this.options=Ne({},Zp,t)}Cv.prototype.run=function(){for(var t=this.options,e=t,r=e.counterclockwise!==void 0?!e.counterclockwise:e.clockwise,a=t.cy,n=e.eles,i=n.nodes().not(":parent"),o=Lt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:a.width(),h:a.height()}),s={x:o.x1+o.w/2,y:o.y1+o.h/2},l=[],u=0,f=0;f<i.length;f++){var v=i[f],h=void 0;h=e.concentric(v),l.push({value:h,node:v}),v._private.scratch.concentric=h}i.updateStyle();for(var c=0;c<i.length;c++){var d=i[c],g=d.layoutDimensions(e);u=Math.max(u,g.w,g.h)}l.sort(function(te,Te){return Te.value-te.value});for(var y=e.levelWidth(i),p=[[]],m=p[0],b=0;b<l.length;b++){var E=l[b];if(m.length>0){var C=Math.abs(m[0].value-E.value);C>=y&&(m=[],p.push(m))}m.push(E)}var L=u+e.minNodeSpacing;if(!e.avoidOverlap){var D=p.length>0&&p[0].length>1,R=Math.min(o.w,o.h)/2-L,O=R/(p.length+D?1:0);L=Math.min(L,O)}for(var M=0,P=0;P<p.length;P++){var w=p[P],x=e.sweep===void 0?2*Math.PI-2*Math.PI/w.length:e.sweep,T=w.dTheta=x/Math.max(1,w.length-1);if(w.length>1&&e.avoidOverlap){var A=Math.cos(T)-Math.cos(0),S=Math.sin(T)-Math.sin(0),I=Math.sqrt(L*L/(A*A+S*S));M=Math.max(I,M)}w.r=M,M+=L}if(e.equidistant){for(var B=0,k=0,z=0;z<p.length;z++){var F=p[z],V=F.r-k;B=Math.max(B,V)}k=0;for(var Z=0;Z<p.length;Z++){var q=p[Z];Z===0&&(k=q.r),q.r=k,k+=B}}for(var _={},K=0;K<p.length;K++)for(var U=p[K],J=U.dTheta,$=U.r,H=0;H<U.length;H++){var Y=U[H],Q=e.startAngle+(r?1:-1)*J*H,oe={x:s.x+$*Math.cos(Q),y:s.y+$*Math.sin(Q)};_[Y.node.id()]=oe}return n.nodes().layoutPositions(this,e,function(te){var Te=te.id();return _[Te]}),this};var Bo,Qp={ready:function(){},stop:function(){},animate:!0,animationEasing:void 0,animationDuration:void 0,animateFilter:function(e,r){return!0},animationThreshold:250,refresh:20,fit:!0,padding:30,boundingBox:void 0,nodeDimensionsIncludeLabels:!1,randomize:!1,componentSpacing:40,nodeRepulsion:function(e){return 2048},nodeOverlap:4,idealEdgeLength:function(e){return 32},edgeElasticity:function(e){return 32},nestingFactor:1.2,gravity:1,numIter:1e3,initialTemp:1e3,coolingFactor:.99,minTemp:1};function si(t){this.options=Ne({},Qp,t),this.options.layout=this;var e=this.options.eles.nodes(),r=this.options.eles.edges(),a=r.filter(function(n){var i=n.source().data("id"),o=n.target().data("id"),s=e.some(function(u){return u.data("id")===i}),l=e.some(function(u){return u.data("id")===o});return!s||!l});this.options.eles=this.options.eles.not(a)}si.prototype.run=function(){var t=this.options,e=t.cy,r=this;r.stopped=!1,(t.animate===!0||t.animate===!1)&&r.emit({type:"layoutstart",layout:r}),t.debug===!0?Bo=!0:Bo=!1;var a=Jp(e,r,t);Bo&&ey(a),t.randomize&&ty(a);var n=ir(),i=function(){ry(a,e,t),t.fit===!0&&e.fit(t.padding)},o=function(h){return!(r.stopped||h>=t.numIter||(ay(a,t),a.temperature=a.temperature*t.coolingFactor,a.temperature<t.minTemp))},s=function(){if(t.animate===!0||t.animate===!1)i(),r.one("layoutstop",t.stop),r.emit({type:"layoutstop",layout:r});else{var h=t.eles.nodes(),c=Dv(a,t,h);h.layoutPositions(r,t,c)}},l=0,u=!0;if(t.animate===!0){var f=function(){for(var h=0;u&&h<t.refresh;)u=o(l),l++,h++;if(!u)Yl(a,t),s();else{var c=ir();c-n>=t.animationThreshold&&i(),In(f)}};f()}else{for(;u;)u=o(l),l++;Yl(a,t),s()}return this};si.prototype.stop=function(){return this.stopped=!0,this.thread&&this.thread.stop(),this.emit("layoutstop"),this};si.prototype.destroy=function(){return this.thread&&this.thread.stop(),this};var Jp=function(e,r,a){for(var n=a.eles.edges(),i=a.eles.nodes(),o=Lt(a.boundingBox?a.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()}),s={isCompound:e.hasCompoundNodes(),layoutNodes:[],idToIndex:{},nodeSize:i.size(),graphSet:[],indexToGraph:[],layoutEdges:[],edgeSize:n.size(),temperature:a.initialTemp,clientWidth:o.w,clientHeight:o.h,boundingBox:o},l=a.eles.components(),u={},f=0;f<l.length;f++)for(var v=l[f],h=0;h<v.length;h++){var c=v[h];u[c.id()]=f}for(var f=0;f<s.nodeSize;f++){var d=i[f],g=d.layoutDimensions(a),y={};y.isLocked=d.locked(),y.id=d.data("id"),y.parentId=d.data("parent"),y.cmptId=u[d.id()],y.children=[],y.positionX=d.position("x"),y.positionY=d.position("y"),y.offsetX=0,y.offsetY=0,y.height=g.w,y.width=g.h,y.maxX=y.positionX+y.width/2,y.minX=y.positionX-y.width/2,y.maxY=y.positionY+y.height/2,y.minY=y.positionY-y.height/2,y.padLeft=parseFloat(d.style("padding")),y.padRight=parseFloat(d.style("padding")),y.padTop=parseFloat(d.style("padding")),y.padBottom=parseFloat(d.style("padding")),y.nodeRepulsion=at(a.nodeRepulsion)?a.nodeRepulsion(d):a.nodeRepulsion,s.layoutNodes.push(y),s.idToIndex[y.id]=f}for(var p=[],m=0,b=-1,E=[],f=0;f<s.nodeSize;f++){var d=s.layoutNodes[f],C=d.parentId;C!=null?s.layoutNodes[s.idToIndex[C]].children.push(d.id):(p[++b]=d.id,E.push(d.id))}for(s.graphSet.push(E);m<=b;){var L=p[m++],D=s.idToIndex[L],c=s.layoutNodes[D],R=c.children;if(R.length>0){s.graphSet.push(R);for(var f=0;f<R.length;f++)p[++b]=R[f]}}for(var f=0;f<s.graphSet.length;f++)for(var O=s.graphSet[f],h=0;h<O.length;h++){var M=s.idToIndex[O[h]];s.indexToGraph[M]=f}for(var f=0;f<s.edgeSize;f++){var P=n[f],w={};w.id=P.data("id"),w.sourceId=P.data("source"),w.targetId=P.data("target");var x=at(a.idealEdgeLength)?a.idealEdgeLength(P):a.idealEdgeLength,T=at(a.edgeElasticity)?a.edgeElasticity(P):a.edgeElasticity,A=s.idToIndex[w.sourceId],S=s.idToIndex[w.targetId],I=s.indexToGraph[A],B=s.indexToGraph[S];if(I!=B){for(var k=jp(w.sourceId,w.targetId,s),z=s.graphSet[k],F=0,y=s.layoutNodes[A];z.indexOf(y.id)===-1;)y=s.layoutNodes[s.idToIndex[y.parentId]],F++;for(y=s.layoutNodes[S];z.indexOf(y.id)===-1;)y=s.layoutNodes[s.idToIndex[y.parentId]],F++;x*=F*a.nestingFactor}w.idealLength=x,w.elasticity=T,s.layoutEdges.push(w)}return s},jp=function(e,r,a){var n=Sv(e,r,0,a);return 2>n.count?0:n.graph},Sv=function(e,r,a,n){var i=n.graphSet[a];if(-1<i.indexOf(e)&&-1<i.indexOf(r))return{count:2,graph:a};for(var o=0,s=0;s<i.length;s++){var l=i[s],u=n.idToIndex[l],f=n.layoutNodes[u].children;if(f.length!==0){var v=n.indexToGraph[n.idToIndex[f[0]]],h=Sv(e,r,v,n);if(h.count!==0)if(h.count===1){if(o++,o===2)break}else return h}}return{count:o,graph:a}},ey,ty=function(e,r){for(var a=e.clientWidth,n=e.clientHeight,i=0;i<e.nodeSize;i++){var o=e.layoutNodes[i];o.children.length===0&&!o.isLocked&&(o.positionX=Math.random()*a,o.positionY=Math.random()*n)}},Dv=function(e,r,a){var n=e.boundingBox,i={x1:1/0,x2:-1/0,y1:1/0,y2:-1/0};return r.boundingBox&&(a.forEach(function(o){var s=e.layoutNodes[e.idToIndex[o.data("id")]];i.x1=Math.min(i.x1,s.positionX),i.x2=Math.max(i.x2,s.positionX),i.y1=Math.min(i.y1,s.positionY),i.y2=Math.max(i.y2,s.positionY)}),i.w=i.x2-i.x1,i.h=i.y2-i.y1),function(o,s){var l=e.layoutNodes[e.idToIndex[o.data("id")]];if(r.boundingBox){var u=i.w===0?.5:(l.positionX-i.x1)/i.w,f=i.h===0?.5:(l.positionY-i.y1)/i.h;return{x:n.x1+u*n.w,y:n.y1+f*n.h}}else return{x:l.positionX,y:l.positionY}}},ry=function(e,r,a){var n=a.layout,i=a.eles.nodes(),o=Dv(e,a,i);i.positions(o),e.ready!==!0&&(e.ready=!0,n.one("layoutready",a.ready),n.emit({type:"layoutready",layout:this}))},ay=function(e,r,a){ny(e,r),sy(e),uy(e,r),ly(e),fy(e)},ny=function(e,r){for(var a=0;a<e.graphSet.length;a++)for(var n=e.graphSet[a],i=n.length,o=0;o<i;o++)for(var s=e.layoutNodes[e.idToIndex[n[o]]],l=o+1;l<i;l++){var u=e.layoutNodes[e.idToIndex[n[l]]];iy(s,u,e,r)}},ql=function(e){return-1+2*e*Math.random()},iy=function(e,r,a,n){var i=e.cmptId,o=r.cmptId;if(!(i!==o&&!a.isCompound)){var s=r.positionX-e.positionX,l=r.positionY-e.positionY,u=1;s===0&&l===0&&(s=ql(u),l=ql(u));var f=oy(e,r,s,l);if(f>0)var v=n.nodeOverlap*f,h=Math.sqrt(s*s+l*l),c=v*s/h,d=v*l/h;else var g=Un(e,s,l),y=Un(r,-1*s,-1*l),p=y.x-g.x,m=y.y-g.y,b=p*p+m*m,h=Math.sqrt(b),v=(e.nodeRepulsion+r.nodeRepulsion)/b,c=v*p/h,d=v*m/h;e.isLocked||(e.offsetX-=c,e.offsetY-=d),r.isLocked||(r.offsetX+=c,r.offsetY+=d)}},oy=function(e,r,a,n){if(a>0)var i=e.maxX-r.minX;else var i=r.maxX-e.minX;if(n>0)var o=e.maxY-r.minY;else var o=r.maxY-e.minY;return i>=0&&o>=0?Math.sqrt(i*i+o*o):0},Un=function(e,r,a){var n=e.positionX,i=e.positionY,o=e.height||1,s=e.width||1,l=a/r,u=o/s,f={};return r===0&&0<a||r===0&&0>a?(f.x=n,f.y=i+o/2,f):0<r&&-1*u<=l&&l<=u?(f.x=n+s/2,f.y=i+s*a/2/r,f):0>r&&-1*u<=l&&l<=u?(f.x=n-s/2,f.y=i-s*a/2/r,f):0<a&&(l<=-1*u||l>=u)?(f.x=n+o*r/2/a,f.y=i+o/2,f):(0>a&&(l<=-1*u||l>=u)&&(f.x=n-o*r/2/a,f.y=i-o/2),f)},sy=function(e,r){for(var a=0;a<e.edgeSize;a++){var n=e.layoutEdges[a],i=e.idToIndex[n.sourceId],o=e.layoutNodes[i],s=e.idToIndex[n.targetId],l=e.layoutNodes[s],u=l.positionX-o.positionX,f=l.positionY-o.positionY;if(!(u===0&&f===0)){var v=Un(o,u,f),h=Un(l,-1*u,-1*f),c=h.x-v.x,d=h.y-v.y,g=Math.sqrt(c*c+d*d),y=Math.pow(n.idealLength-g,2)/n.elasticity;if(g!==0)var p=y*c/g,m=y*d/g;else var p=0,m=0;o.isLocked||(o.offsetX+=p,o.offsetY+=m),l.isLocked||(l.offsetX-=p,l.offsetY-=m)}}},uy=function(e,r){if(r.gravity!==0)for(var a=1,n=0;n<e.graphSet.length;n++){var i=e.graphSet[n],o=i.length;if(n===0)var s=e.clientHeight/2,l=e.clientWidth/2;else var u=e.layoutNodes[e.idToIndex[i[0]]],f=e.layoutNodes[e.idToIndex[u.parentId]],s=f.positionX,l=f.positionY;for(var v=0;v<o;v++){var h=e.layoutNodes[e.idToIndex[i[v]]];if(!h.isLocked){var c=s-h.positionX,d=l-h.positionY,g=Math.sqrt(c*c+d*d);if(g>a){var y=r.gravity*c/g,p=r.gravity*d/g;h.offsetX+=y,h.offsetY+=p}}}}},ly=function(e,r){var a=[],n=0,i=-1;for(a.push.apply(a,e.graphSet[0]),i+=e.graphSet[0].length;n<=i;){var o=a[n++],s=e.idToIndex[o],l=e.layoutNodes[s],u=l.children;if(0<u.length&&!l.isLocked){for(var f=l.offsetX,v=l.offsetY,h=0;h<u.length;h++){var c=e.layoutNodes[e.idToIndex[u[h]]];c.offsetX+=f,c.offsetY+=v,a[++i]=u[h]}l.offsetX=0,l.offsetY=0}}},fy=function(e,r){for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];0<n.children.length&&(n.maxX=void 0,n.minX=void 0,n.maxY=void 0,n.minY=void 0)}for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];if(!(0<n.children.length||n.isLocked)){var i=vy(n.offsetX,n.offsetY,e.temperature);n.positionX+=i.x,n.positionY+=i.y,n.offsetX=0,n.offsetY=0,n.minX=n.positionX-n.width,n.maxX=n.positionX+n.width,n.minY=n.positionY-n.height,n.maxY=n.positionY+n.height,Av(n,e)}}for(var a=0;a<e.nodeSize;a++){var n=e.layoutNodes[a];0<n.children.length&&!n.isLocked&&(n.positionX=(n.maxX+n.minX)/2,n.positionY=(n.maxY+n.minY)/2,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY)}},vy=function(e,r,a){var n=Math.sqrt(e*e+r*r);if(n>a)var i={x:a*e/n,y:a*r/n};else var i={x:e,y:r};return i},Av=function(e,r){var a=e.parentId;if(a!=null){var n=r.layoutNodes[r.idToIndex[a]],i=!1;if((n.maxX==null||e.maxX+n.padRight>n.maxX)&&(n.maxX=e.maxX+n.padRight,i=!0),(n.minX==null||e.minX-n.padLeft<n.minX)&&(n.minX=e.minX-n.padLeft,i=!0),(n.maxY==null||e.maxY+n.padBottom>n.maxY)&&(n.maxY=e.maxY+n.padBottom,i=!0),(n.minY==null||e.minY-n.padTop<n.minY)&&(n.minY=e.minY-n.padTop,i=!0),i)return Av(n,r)}},Yl=function(e,r){for(var a=e.layoutNodes,n=[],i=0;i<a.length;i++){var o=a[i],s=o.cmptId,l=n[s]=n[s]||[];l.push(o)}for(var u=0,i=0;i<n.length;i++){var f=n[i];if(f){f.x1=1/0,f.x2=-1/0,f.y1=1/0,f.y2=-1/0;for(var v=0;v<f.length;v++){var h=f[v];f.x1=Math.min(f.x1,h.positionX-h.width/2),f.x2=Math.max(f.x2,h.positionX+h.width/2),f.y1=Math.min(f.y1,h.positionY-h.height/2),f.y2=Math.max(f.y2,h.positionY+h.height/2)}f.w=f.x2-f.x1,f.h=f.y2-f.y1,u+=f.w*f.h}}n.sort(function(m,b){return b.w*b.h-m.w*m.h});for(var c=0,d=0,g=0,y=0,p=Math.sqrt(u)*e.clientWidth/e.clientHeight,i=0;i<n.length;i++){var f=n[i];if(f){for(var v=0;v<f.length;v++){var h=f[v];h.isLocked||(h.positionX+=c-f.x1,h.positionY+=d-f.y1)}c+=f.w+r.componentSpacing,g+=f.w+r.componentSpacing,y=Math.max(y,f.h),g>p&&(d+=y+r.componentSpacing,c=0,g=0,y=0)}}},hy={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,avoidOverlapPadding:10,nodeDimensionsIncludeLabels:!1,spacingFactor:void 0,condense:!1,rows:void 0,cols:void 0,position:function(e){},sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function Lv(t){this.options=Ne({},hy,t)}Lv.prototype.run=function(){var t=this.options,e=t,r=t.cy,a=e.eles,n=a.nodes().not(":parent");e.sort&&(n=n.sort(e.sort));var i=Lt(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()});if(i.h===0||i.w===0)a.nodes().layoutPositions(this,e,function(Z){return{x:i.x1,y:i.y1}});else{var o=n.size(),s=Math.sqrt(o*i.h/i.w),l=Math.round(s),u=Math.round(i.w/i.h*s),f=function(q){if(q==null)return Math.min(l,u);var _=Math.min(l,u);_==l?l=q:u=q},v=function(q){if(q==null)return Math.max(l,u);var _=Math.max(l,u);_==l?l=q:u=q},h=e.rows,c=e.cols!=null?e.cols:e.columns;if(h!=null&&c!=null)l=h,u=c;else if(h!=null&&c==null)l=h,u=Math.ceil(o/l);else if(h==null&&c!=null)u=c,l=Math.ceil(o/u);else if(u*l>o){var d=f(),g=v();(d-1)*g>=o?f(d-1):(g-1)*d>=o&&v(g-1)}else for(;u*l<o;){var y=f(),p=v();(p+1)*y>=o?v(p+1):f(y+1)}var m=i.w/u,b=i.h/l;if(e.condense&&(m=0,b=0),e.avoidOverlap)for(var E=0;E<n.length;E++){var C=n[E],L=C._private.position;(L.x==null||L.y==null)&&(L.x=0,L.y=0);var D=C.layoutDimensions(e),R=e.avoidOverlapPadding,O=D.w+R,M=D.h+R;m=Math.max(m,O),b=Math.max(b,M)}for(var P={},w=function(q,_){return!!P["c-"+q+"-"+_]},x=function(q,_){P["c-"+q+"-"+_]=!0},T=0,A=0,S=function(){A++,A>=u&&(A=0,T++)},I={},B=0;B<n.length;B++){var k=n[B],z=e.position(k);if(z&&(z.row!==void 0||z.col!==void 0)){var F={row:z.row,col:z.col};if(F.col===void 0)for(F.col=0;w(F.row,F.col);)F.col++;else if(F.row===void 0)for(F.row=0;w(F.row,F.col);)F.row++;I[k.id()]=F,x(F.row,F.col)}}var V=function(q,_){var K,U;if(q.locked()||q.isParent())return!1;var J=I[q.id()];if(J)K=J.col*m+m/2+i.x1,U=J.row*b+b/2+i.y1;else{for(;w(T,A);)S();K=A*m+m/2+i.x1,U=T*b+b/2+i.y1,x(T,A),S()}return{x:K,y:U}};n.layoutPositions(this,e,V)}return this};var cy={ready:function(){},stop:function(){}};function Ms(t){this.options=Ne({},cy,t)}Ms.prototype.run=function(){var t=this.options,e=t.eles,r=this;return t.cy,r.emit("layoutstart"),e.nodes().positions(function(){return{x:0,y:0}}),r.one("layoutready",t.ready),r.emit("layoutready"),r.one("layoutstop",t.stop),r.emit("layoutstop"),this};Ms.prototype.stop=function(){return this};var dy={positions:void 0,zoom:void 0,pan:void 0,fit:!0,padding:30,spacingFactor:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function Mv(t){this.options=Ne({},dy,t)}Mv.prototype.run=function(){var t=this.options,e=t.eles,r=e.nodes(),a=at(t.positions);function n(i){if(t.positions==null)return Fc(i.position());if(a)return t.positions(i);var o=t.positions[i._private.data.id];return o??null}return r.layoutPositions(this,t,function(i,o){var s=n(i);return i.locked()||s==null?!1:s}),this};var gy={fit:!0,padding:30,boundingBox:void 0,animate:!1,animationDuration:500,animationEasing:void 0,animateFilter:function(e,r){return!0},ready:void 0,stop:void 0,transform:function(e,r){return r}};function Rv(t){this.options=Ne({},gy,t)}Rv.prototype.run=function(){var t=this.options,e=t.cy,r=t.eles,a=Lt(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()}),n=function(o,s){return{x:a.x1+Math.round(Math.random()*a.w),y:a.y1+Math.round(Math.random()*a.h)}};return r.nodes().layoutPositions(this,t,n),this};var py=[{name:"breadthfirst",impl:xv},{name:"circle",impl:Tv},{name:"concentric",impl:Cv},{name:"cose",impl:si},{name:"grid",impl:Lv},{name:"null",impl:Ms},{name:"preset",impl:Mv},{name:"random",impl:Rv}];function Nv(t){this.options=t,this.notifications=0}var Wl=function(){},Xl=function(){throw new Error("A headless instance can not render images")};Nv.prototype={recalculateRenderedStyle:Wl,notify:function(){this.notifications++},init:Wl,isHeadless:function(){return!0},png:Xl,jpg:Xl};var Rs={};Rs.arrowShapeWidth=.3;Rs.registerArrowShapes=function(){var t=this.arrowShapes={},e=this,r=function(u,f,v,h,c,d,g){var y=c.x-v/2-g,p=c.x+v/2+g,m=c.y-v/2-g,b=c.y+v/2+g,E=y<=u&&u<=p&&m<=f&&f<=b;return E},a=function(u,f,v,h,c){var d=u*Math.cos(h)-f*Math.sin(h),g=u*Math.sin(h)+f*Math.cos(h),y=d*v,p=g*v,m=y+c.x,b=p+c.y;return{x:m,y:b}},n=function(u,f,v,h){for(var c=[],d=0;d<u.length;d+=2){var g=u[d],y=u[d+1];c.push(a(g,y,f,v,h))}return c},i=function(u){for(var f=[],v=0;v<u.length;v++){var h=u[v];f.push(h.x,h.y)}return f},o=function(u){return u.pstyle("width").pfValue*u.pstyle("arrow-scale").pfValue*2},s=function(u,f){Me(f)&&(f=t[f]),t[u]=Ne({name:u,points:[-.15,-.3,.15,-.3,.15,.3,-.15,.3],collide:function(h,c,d,g,y,p){var m=i(n(this.points,d+2*p,g,y)),b=It(h,c,m);return b},roughCollide:r,draw:function(h,c,d,g){var y=n(this.points,c,d,g);e.arrowShapeImpl("polygon")(h,y)},spacing:function(h){return 0},gap:o},f)};s("none",{collide:Bn,roughCollide:Bn,draw:gs,spacing:ou,gap:ou}),s("triangle",{points:[-.15,-.3,0,0,.15,-.3]}),s("arrow","triangle"),s("triangle-backcurve",{points:t.triangle.points,controlPoint:[0,-.15],roughCollide:r,draw:function(u,f,v,h,c){var d=n(this.points,f,v,h),g=this.controlPoint,y=a(g[0],g[1],f,v,h);e.arrowShapeImpl(this.name)(u,d,y)},gap:function(u){return o(u)*.8}}),s("triangle-tee",{points:[0,0,.15,-.3,-.15,-.3,0,0],pointsTee:[-.15,-.4,-.15,-.5,.15,-.5,.15,-.4],collide:function(u,f,v,h,c,d,g){var y=i(n(this.points,v+2*g,h,c)),p=i(n(this.pointsTee,v+2*g,h,c)),m=It(u,f,y)||It(u,f,p);return m},draw:function(u,f,v,h,c){var d=n(this.points,f,v,h),g=n(this.pointsTee,f,v,h);e.arrowShapeImpl(this.name)(u,d,g)}}),s("circle-triangle",{radius:.15,pointsTr:[0,-.15,.15,-.45,-.15,-.45,0,-.15],collide:function(u,f,v,h,c,d,g){var y=c,p=Math.pow(y.x-u,2)+Math.pow(y.y-f,2)<=Math.pow((v+2*g)*this.radius,2),m=i(n(this.points,v+2*g,h,c));return It(u,f,m)||p},draw:function(u,f,v,h,c){var d=n(this.pointsTr,f,v,h);e.arrowShapeImpl(this.name)(u,d,h.x,h.y,this.radius*f)},spacing:function(u){return e.getArrowWidth(u.pstyle("width").pfValue,u.pstyle("arrow-scale").value)*this.radius}}),s("triangle-cross",{points:[0,0,.15,-.3,-.15,-.3,0,0],baseCrossLinePts:[-.15,-.4,-.15,-.4,.15,-.4,.15,-.4],crossLinePts:function(u,f){var v=this.baseCrossLinePts.slice(),h=f/u,c=3,d=5;return v[c]=v[c]-h,v[d]=v[d]-h,v},collide:function(u,f,v,h,c,d,g){var y=i(n(this.points,v+2*g,h,c)),p=i(n(this.crossLinePts(v,d),v+2*g,h,c)),m=It(u,f,y)||It(u,f,p);return m},draw:function(u,f,v,h,c){var d=n(this.points,f,v,h),g=n(this.crossLinePts(f,c),f,v,h);e.arrowShapeImpl(this.name)(u,d,g)}}),s("vee",{points:[-.15,-.3,0,0,.15,-.3,0,-.15],gap:function(u){return o(u)*.525}}),s("circle",{radius:.15,collide:function(u,f,v,h,c,d,g){var y=c,p=Math.pow(y.x-u,2)+Math.pow(y.y-f,2)<=Math.pow((v+2*g)*this.radius,2);return p},draw:function(u,f,v,h,c){e.arrowShapeImpl(this.name)(u,h.x,h.y,this.radius*f)},spacing:function(u){return e.getArrowWidth(u.pstyle("width").pfValue,u.pstyle("arrow-scale").value)*this.radius}}),s("tee",{points:[-.15,0,-.15,-.1,.15,-.1,.15,0],spacing:function(u){return 1},gap:function(u){return 1}}),s("square",{points:[-.15,0,.15,0,.15,-.3,-.15,-.3]}),s("diamond",{points:[-.15,-.15,0,-.3,.15,-.15,0,0],gap:function(u){return u.pstyle("width").pfValue*u.pstyle("arrow-scale").value}}),s("chevron",{points:[0,0,-.15,-.15,-.1,-.2,0,-.1,.1,-.2,.15,-.15],gap:function(u){return .95*u.pstyle("width").pfValue*u.pstyle("arrow-scale").value}})};var qr={};qr.projectIntoViewport=function(t,e){var r=this.cy,a=this.findContainerClientCoords(),n=a[0],i=a[1],o=a[4],s=r.pan(),l=r.zoom(),u=((t-n)/o-s.x)/l,f=((e-i)/o-s.y)/l;return[u,f]};qr.findContainerClientCoords=function(){if(this.containerBB)return this.containerBB;var t=this.container,e=t.getBoundingClientRect(),r=this.cy.window().getComputedStyle(t),a=function(p){return parseFloat(r.getPropertyValue(p))},n={left:a("padding-left"),right:a("padding-right"),top:a("padding-top"),bottom:a("padding-bottom")},i={left:a("border-left-width"),right:a("border-right-width"),top:a("border-top-width"),bottom:a("border-bottom-width")},o=t.clientWidth,s=t.clientHeight,l=n.left+n.right,u=n.top+n.bottom,f=i.left+i.right,v=e.width/(o+f),h=o-l,c=s-u,d=e.left+n.left+i.left,g=e.top+n.top+i.top;return this.containerBB=[d,g,h,c,v]};qr.invalidateContainerClientCoordsCache=function(){this.containerBB=null};qr.findNearestElement=function(t,e,r,a){return this.findNearestElements(t,e,r,a)[0]};qr.findNearestElements=function(t,e,r,a){var n=this,i=this,o=i.getCachedZSortedEles(),s=[],l=i.cy.zoom(),u=i.cy.hasCompoundNodes(),f=(a?24:8)/l,v=(a?8:2)/l,h=(a?8:2)/l,c=1/0,d,g;r&&(o=o.interactive);function y(D,R){if(D.isNode()){if(g)return;g=D,s.push(D)}if(D.isEdge()&&(R==null||R<c))if(d){if(d.pstyle("z-compound-depth").value===D.pstyle("z-compound-depth").value&&d.pstyle("z-compound-depth").value===D.pstyle("z-compound-depth").value){for(var O=0;O<s.length;O++)if(s[O].isEdge()){s[O]=D,d=D,c=R??c;break}}}else s.push(D),d=D,c=R??c}function p(D){var R=D.outerWidth()+2*v,O=D.outerHeight()+2*v,M=R/2,P=O/2,w=D.position(),x=D.pstyle("corner-radius").value==="auto"?"auto":D.pstyle("corner-radius").pfValue,T=D._private.rscratch;if(w.x-M<=t&&t<=w.x+M&&w.y-P<=e&&e<=w.y+P){var A=i.nodeShapes[n.getNodeShape(D)];if(A.checkPoint(t,e,0,R,O,w.x,w.y,x,T))return y(D,0),!0}}function m(D){var R=D._private,O=R.rscratch,M=D.pstyle("width").pfValue,P=D.pstyle("arrow-scale").value,w=M/2+f,x=w*w,T=w*2,B=R.source,k=R.target,A;if(O.edgeType==="segments"||O.edgeType==="straight"||O.edgeType==="haystack"){for(var S=O.allpts,I=0;I+3<S.length;I+=2)if(Zc(t,e,S[I],S[I+1],S[I+2],S[I+3],T)&&x>(A=td(t,e,S[I],S[I+1],S[I+2],S[I+3])))return y(D,A),!0}else if(O.edgeType==="bezier"||O.edgeType==="multibezier"||O.edgeType==="self"||O.edgeType==="compound"){for(var S=O.allpts,I=0;I+5<O.allpts.length;I+=4)if(Qc(t,e,S[I],S[I+1],S[I+2],S[I+3],S[I+4],S[I+5],T)&&x>(A=ed(t,e,S[I],S[I+1],S[I+2],S[I+3],S[I+4],S[I+5])))return y(D,A),!0}for(var B=B||R.source,k=k||R.target,z=n.getArrowWidth(M,P),F=[{name:"source",x:O.arrowStartX,y:O.arrowStartY,angle:O.srcArrowAngle},{name:"target",x:O.arrowEndX,y:O.arrowEndY,angle:O.tgtArrowAngle},{name:"mid-source",x:O.midX,y:O.midY,angle:O.midsrcArrowAngle},{name:"mid-target",x:O.midX,y:O.midY,angle:O.midtgtArrowAngle}],I=0;I<F.length;I++){var V=F[I],Z=i.arrowShapes[D.pstyle(V.name+"-arrow-shape").value],q=D.pstyle("width").pfValue;if(Z.roughCollide(t,e,z,V.angle,{x:V.x,y:V.y},q,f)&&Z.collide(t,e,z,V.angle,{x:V.x,y:V.y},q,f))return y(D),!0}u&&s.length>0&&(p(B),p(k))}function b(D,R,O){return Ot(D,R,O)}function E(D,R){var O=D._private,M=h,P;R?P=R+"-":P="",D.boundingBox();var w=O.labelBounds[R||"main"],x=D.pstyle(P+"label").value,T=D.pstyle("text-events").strValue==="yes";if(!(!T||!x)){var A=b(O.rscratch,"labelX",R),S=b(O.rscratch,"labelY",R),I=b(O.rscratch,"labelAngle",R),B=D.pstyle(P+"text-margin-x").pfValue,k=D.pstyle(P+"text-margin-y").pfValue,z=w.x1-M-B,F=w.x2+M-B,V=w.y1-M-k,Z=w.y2+M-k;if(I){var q=Math.cos(I),_=Math.sin(I),K=function(oe,te){return oe=oe-A,te=te-S,{x:oe*q-te*_+A,y:oe*_+te*q+S}},U=K(z,V),J=K(z,Z),$=K(F,V),H=K(F,Z),Y=[U.x+B,U.y+k,$.x+B,$.y+k,H.x+B,H.y+k,J.x+B,J.y+k];if(It(t,e,Y))return y(D),!0}else if(gr(w,t,e))return y(D),!0}}for(var C=o.length-1;C>=0;C--){var L=o[C];L.isNode()?p(L)||E(L):m(L)||E(L)||E(L,"source")||E(L,"target")}return s};qr.getAllInBox=function(t,e,r,a){var n=this.getCachedZSortedEles().interactive,i=this.cy.zoom(),o=2/i,s=[],l=Math.min(t,r),u=Math.max(t,r),f=Math.min(e,a),v=Math.max(e,a);t=l,r=u,e=f,a=v;var h=Lt({x1:t,y1:e,x2:r,y2:a}),c=[{x:h.x1,y:h.y1},{x:h.x2,y:h.y1},{x:h.x2,y:h.y2},{x:h.x1,y:h.y2}],d=[[c[0],c[1]],[c[1],c[2]],[c[2],c[3]],[c[3],c[0]]];function g(oe,te,Te){return Ot(oe,te,Te)}function y(oe,te){var Te=oe._private,Le=o,he="";oe.boundingBox();var le=Te.labelBounds.main;if(!le)return null;var ce=g(Te.rscratch,"labelX",te),fe=g(Te.rscratch,"labelY",te),ye=g(Te.rscratch,"labelAngle",te),me=oe.pstyle(he+"text-margin-x").pfValue,Ee=oe.pstyle(he+"text-margin-y").pfValue,be=le.x1-Le-me,Ae=le.x2+Le-me,Ie=le.y1-Le-Ee,Oe=le.y2+Le-Ee;if(ye){var Be=Math.cos(ye),Pe=Math.sin(ye),ne=function(W,N){return W=W-ce,N=N-fe,{x:W*Be-N*Pe+ce,y:W*Pe+N*Be+fe}};return[ne(be,Ie),ne(Ae,Ie),ne(Ae,Oe),ne(be,Oe)]}else return[{x:be,y:Ie},{x:Ae,y:Ie},{x:Ae,y:Oe},{x:be,y:Oe}]}function p(oe,te,Te,Le){function he(le,ce,fe){return(fe.y-le.y)*(ce.x-le.x)>(ce.y-le.y)*(fe.x-le.x)}return he(oe,Te,Le)!==he(te,Te,Le)&&he(oe,te,Te)!==he(oe,te,Le)}for(var m=0;m<n.length;m++){var b=n[m];if(b.isNode()){var E=b,C=E.pstyle("text-events").strValue==="yes",L=E.pstyle("box-selection").strValue,D=E.pstyle("box-select-labels").strValue==="yes";if(L==="none")continue;var R=(L==="overlap"||D)&&C,O=E.boundingBox({includeNodes:!0,includeEdges:!1,includeLabels:R});if(L==="contain"){var M=!1;if(D&&C){var P=y(E);P&&Pi(P,c)&&(s.push(E),M=!0)}!M&&zf(h,O)&&s.push(E)}else if(L==="overlap"&&bs(h,O)){var w=E.boundingBox({includeNodes:!0,includeEdges:!0,includeLabels:!1,includeMainLabels:!1,includeSourceLabels:!1,includeTargetLabels:!1}),x=[{x:w.x1,y:w.y1},{x:w.x2,y:w.y1},{x:w.x2,y:w.y2},{x:w.x1,y:w.y2}];if(Pi(x,c))s.push(E);else{var T=y(E);T&&Pi(T,c)&&s.push(E)}}}else{var A=b,S=A._private,I=S.rscratch,B=A.pstyle("box-selection").strValue;if(B==="none")continue;if(B==="contain"){if(I.startX!=null&&I.startY!=null&&!gr(h,I.startX,I.startY)||I.endX!=null&&I.endY!=null&&!gr(h,I.endX,I.endY))continue;if(I.edgeType==="bezier"||I.edgeType==="multibezier"||I.edgeType==="self"||I.edgeType==="compound"||I.edgeType==="segments"||I.edgeType==="haystack"){for(var k=S.rstyle.bezierPts||S.rstyle.linePts||S.rstyle.haystackPts,z=!0,F=0;F<k.length;F++)if(!vu(h,k[F])){z=!1;break}z&&s.push(A)}else I.edgeType==="straight"&&s.push(A)}else if(B==="overlap"){var V=!1;if(I.startX!=null&&I.startY!=null&&I.endX!=null&&I.endY!=null&&(gr(h,I.startX,I.startY)||gr(h,I.endX,I.endY)))s.push(A),V=!0;else if(!V&&I.edgeType==="haystack"){for(var Z=S.rstyle.haystackPts,q=0;q<Z.length;q++)if(vu(h,Z[q])){s.push(A),V=!0;break}}if(!V){var _=S.rstyle.bezierPts||S.rstyle.linePts||S.rstyle.haystackPts;if((!_||_.length<2)&&I.edgeType==="straight"&&I.startX!=null&&I.startY!=null&&I.endX!=null&&I.endY!=null&&(_=[{x:I.startX,y:I.startY},{x:I.endX,y:I.endY}]),!_||_.length<2)continue;for(var K=0;K<_.length-1;K++){for(var U=_[K],J=_[K+1],$=0;$<d.length;$++){var H=vt(d[$],2),Y=H[0],Q=H[1];if(p(U,J,Y,Q)){s.push(A),V=!0;break}}if(V)break}}}}}return s};var Hn={};Hn.calculateArrowAngles=function(t){var e=t._private.rscratch,r=e.edgeType==="haystack",a=e.edgeType==="bezier",n=e.edgeType==="multibezier",i=e.edgeType==="segments",o=e.edgeType==="compound",s=e.edgeType==="self",l,u,f,v,h,c,p,m;if(r?(f=e.haystackPts[0],v=e.haystackPts[1],h=e.haystackPts[2],c=e.haystackPts[3]):(f=e.arrowStartX,v=e.arrowStartY,h=e.arrowEndX,c=e.arrowEndY),p=e.midX,m=e.midY,i)l=f-e.segpts[0],u=v-e.segpts[1];else if(n||o||s||a){var d=e.allpts,g=pt(d[0],d[2],d[4],.1),y=pt(d[1],d[3],d[5],.1);l=f-g,u=v-y}else l=f-p,u=v-m;e.srcArrowAngle=fn(l,u);var p=e.midX,m=e.midY;if(r&&(p=(f+h)/2,m=(v+c)/2),l=h-f,u=c-v,i){var d=e.allpts;if(d.length/2%2===0){var b=d.length/2,E=b-2;l=d[b]-d[E],u=d[b+1]-d[E+1]}else if(e.isRound)l=e.midVector[1],u=-e.midVector[0];else{var b=d.length/2-1,E=b-2;l=d[b]-d[E],u=d[b+1]-d[E+1]}}else if(n||o||s){var d=e.allpts,C=e.ctrlpts,L,D,R,O;if(C.length/2%2===0){var M=d.length/2-1,P=M+2,w=P+2;L=pt(d[M],d[P],d[w],0),D=pt(d[M+1],d[P+1],d[w+1],0),R=pt(d[M],d[P],d[w],1e-4),O=pt(d[M+1],d[P+1],d[w+1],1e-4)}else{var P=d.length/2-1,M=P-2,w=P+2;L=pt(d[M],d[P],d[w],.4999),D=pt(d[M+1],d[P+1],d[w+1],.4999),R=pt(d[M],d[P],d[w],.5),O=pt(d[M+1],d[P+1],d[w+1],.5)}l=R-L,u=O-D}if(e.midtgtArrowAngle=fn(l,u),e.midDispX=l,e.midDispY=u,l*=-1,u*=-1,i){var d=e.allpts;if(d.length/2%2!==0){if(!e.isRound){var b=d.length/2-1,x=b+2;l=-(d[x]-d[b]),u=-(d[x+1]-d[b+1])}}}if(e.midsrcArrowAngle=fn(l,u),i)l=h-e.segpts[e.segpts.length-2],u=c-e.segpts[e.segpts.length-1];else if(n||o||s||a){var d=e.allpts,T=d.length,g=pt(d[T-6],d[T-4],d[T-2],.9),y=pt(d[T-5],d[T-3],d[T-1],.9);l=h-g,u=c-y}else l=h-p,u=c-m;e.tgtArrowAngle=fn(l,u)};Hn.getArrowWidth=Hn.getArrowHeight=function(t,e){var r=this.arrowWidthCache=this.arrowWidthCache||{},a=r[t+", "+e];return a||(a=Math.max(Math.pow(t*13.37,.9),29)*e,r[t+", "+e]=a,a)};var ts,rs,Qt={},Vt={},$l,Kl,Fr,Mn,rr,Rr,Ir,_t,Zr,mn,Pv,Ov,as,ns,_l,Zl=function(e,r,a){a.x=r.x-e.x,a.y=r.y-e.y,a.len=Math.sqrt(a.x*a.x+a.y*a.y),a.nx=a.x/a.len,a.ny=a.y/a.len,a.ang=Math.atan2(a.ny,a.nx)},yy=function(e,r){r.x=e.x*-1,r.y=e.y*-1,r.nx=e.nx*-1,r.ny=e.ny*-1,r.ang=e.ang>0?-(Math.PI-e.ang):Math.PI+e.ang},my=function(e,r,a,n,i){if(e!==_l?Zl(r,e,Qt):yy(Vt,Qt),Zl(r,a,Vt),$l=Qt.nx*Vt.ny-Qt.ny*Vt.nx,Kl=Qt.nx*Vt.nx-Qt.ny*-Vt.ny,rr=Math.asin(Math.max(-1,Math.min(1,$l))),Math.abs(rr)<1e-6){ts=r.x,rs=r.y,Ir=Zr=0;return}Fr=1,Mn=!1,Kl<0?rr<0?rr=Math.PI+rr:(rr=Math.PI-rr,Fr=-1,Mn=!0):rr>0&&(Fr=-1,Mn=!0),r.radius!==void 0?Zr=r.radius:Zr=n,Rr=rr/2,mn=Math.min(Qt.len/2,Vt.len/2),i?(_t=Math.abs(Math.cos(Rr)*Zr/Math.sin(Rr)),_t>mn?(_t=mn,Ir=Math.abs(_t*Math.sin(Rr)/Math.cos(Rr))):Ir=Zr):(_t=Math.min(mn,Zr),Ir=Math.abs(_t*Math.sin(Rr)/Math.cos(Rr))),as=r.x+Vt.nx*_t,ns=r.y+Vt.ny*_t,ts=as-Vt.ny*Ir*Fr,rs=ns+Vt.nx*Ir*Fr,Pv=r.x+Qt.nx*_t,Ov=r.y+Qt.ny*_t,_l=r};function Iv(t,e){e.radius===0?t.lineTo(e.cx,e.cy):t.arc(e.cx,e.cy,e.radius,e.startAngle,e.endAngle,e.counterClockwise)}function Ns(t,e,r,a){var n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0;return a===0||e.radius===0?{cx:e.x,cy:e.y,radius:0,startX:e.x,startY:e.y,stopX:e.x,stopY:e.y,startAngle:void 0,endAngle:void 0,counterClockwise:void 0}:(my(t,e,r,a,n),{cx:ts,cy:rs,radius:Ir,startX:Pv,startY:Ov,stopX:as,stopY:ns,startAngle:Qt.ang+Math.PI/2*Fr,endAngle:Vt.ang-Math.PI/2*Fr,counterClockwise:Mn})}var Ha=.01,by=Math.sqrt(2*Ha),St={};St.findMidptPtsEtc=function(t,e){var r=e.posPts,a=e.intersectionPts,n=e.vectorNormInverse,i,o=t.pstyle("source-endpoint"),s=t.pstyle("target-endpoint"),l=o.units!=null&&s.units!=null,u=function(C,L,D,R){var O=R-L,M=D-C,P=Math.sqrt(M*M+O*O);return{x:-O/P,y:M/P}},f=t.pstyle("edge-distances").value;switch(f){case"node-position":i=r;break;case"intersection":i=a;break;case"endpoints":{if(l){var v=this.manualEndptToPx(t.source()[0],o),h=vt(v,2),c=h[0],d=h[1],g=this.manualEndptToPx(t.target()[0],s),y=vt(g,2),p=y[0],m=y[1],b={x1:c,y1:d,x2:p,y2:m};n=u(c,d,p,m),i=b}else _e("Edge ".concat(t.id()," has edge-distances:endpoints specified without manual endpoints specified via source-endpoint and target-endpoint.  Falling back on edge-distances:intersection (default).")),i=a;break}}return{midptPts:i,vectorNormInverse:n}};St.findHaystackPoints=function(t){for(var e=0;e<t.length;e++){var r=t[e],a=r._private,n=a.rscratch;if(!n.haystack){var i=Math.random()*2*Math.PI;n.source={x:Math.cos(i),y:Math.sin(i)},i=Math.random()*2*Math.PI,n.target={x:Math.cos(i),y:Math.sin(i)}}var o=a.source,s=a.target,l=o.position(),u=s.position(),f=o.width(),v=s.width(),h=o.height(),c=s.height(),d=r.pstyle("haystack-radius").value,g=d/2;n.haystackPts=n.allpts=[n.source.x*f*g+l.x,n.source.y*h*g+l.y,n.target.x*v*g+u.x,n.target.y*c*g+u.y],n.midX=(n.allpts[0]+n.allpts[2])/2,n.midY=(n.allpts[1]+n.allpts[3])/2,n.edgeType="haystack",n.haystack=!0,this.storeEdgeProjections(r),this.calculateArrowAngles(r),this.recalculateEdgeLabelProjections(r),this.calculateLabelAngles(r)}};St.findSegmentsPoints=function(t,e){var r=t._private.rscratch,a=t.pstyle("segment-weights"),n=t.pstyle("segment-distances"),i=t.pstyle("segment-radii"),o=t.pstyle("radius-type"),s=Math.min(a.pfValue.length,n.pfValue.length),l=i.pfValue[i.pfValue.length-1],u=o.pfValue[o.pfValue.length-1];r.edgeType="segments",r.segpts=[],r.radii=[],r.isArcRadius=[];for(var f=0;f<s;f++){var v=a.pfValue[f],h=n.pfValue[f],c=1-v,d=v,g=this.findMidptPtsEtc(t,e),y=g.midptPts,p=g.vectorNormInverse,m={x:y.x1*c+y.x2*d,y:y.y1*c+y.y2*d};r.segpts.push(m.x+p.x*h,m.y+p.y*h),r.radii.push(i.pfValue[f]!==void 0?i.pfValue[f]:l),r.isArcRadius.push((o.pfValue[f]!==void 0?o.pfValue[f]:u)==="arc-radius")}};St.findLoopPoints=function(t,e,r,a){var n=t._private.rscratch,i=e.dirCounts,o=e.srcPos,s=t.pstyle("control-point-distances"),l=s?s.pfValue[0]:void 0,u=t.pstyle("loop-direction").pfValue,f=t.pstyle("loop-sweep").pfValue,v=t.pstyle("control-point-step-size").pfValue;n.edgeType="self";var h=r,c=v;a&&(h=0,c=l);var d=u-Math.PI/2,g=d-f/2,y=d+f/2,p=u+"_"+f;h=i[p]===void 0?i[p]=0:++i[p],n.ctrlpts=[o.x+Math.cos(g)*1.4*c*(h/3+1),o.y+Math.sin(g)*1.4*c*(h/3+1),o.x+Math.cos(y)*1.4*c*(h/3+1),o.y+Math.sin(y)*1.4*c*(h/3+1)]};St.findCompoundLoopPoints=function(t,e,r,a){var n=t._private.rscratch;n.edgeType="compound";var i=e.srcPos,o=e.tgtPos,s=e.srcW,l=e.srcH,u=e.tgtW,f=e.tgtH,v=t.pstyle("control-point-step-size").pfValue,h=t.pstyle("control-point-distances"),c=h?h.pfValue[0]:void 0,d=r,g=v;a&&(d=0,g=c);var y=50,p={x:i.x-s/2,y:i.y-l/2},m={x:o.x-u/2,y:o.y-f/2},b={x:Math.min(p.x,m.x),y:Math.min(p.y,m.y)},E=.5,C=Math.max(E,Math.log(s*Ha)),L=Math.max(E,Math.log(u*Ha));n.ctrlpts=[b.x,b.y-(1+Math.pow(y,1.12)/100)*g*(d/3+1)*C,b.x-(1+Math.pow(y,1.12)/100)*g*(d/3+1)*L,b.y]};St.findStraightEdgePoints=function(t){t._private.rscratch.edgeType="straight"};St.findBezierPoints=function(t,e,r,a,n){var i=t._private.rscratch,o=t.pstyle("control-point-step-size").pfValue,s=t.pstyle("control-point-distances"),l=t.pstyle("control-point-weights"),u=s&&l?Math.min(s.value.length,l.value.length):1,f=s?s.pfValue[0]:void 0,v=l.value[0],h=a;i.edgeType=h?"multibezier":"bezier",i.ctrlpts=[];for(var c=0;c<u;c++){var d=(.5-e.eles.length/2+r)*o*(n?-1:1),g=void 0,y=ms(d);h&&(f=s?s.pfValue[c]:o,v=l.value[c]),a?g=f:g=f!==void 0?y*f:void 0;var p=g!==void 0?g:d,m=1-v,b=v,E=this.findMidptPtsEtc(t,e),C=E.midptPts,L=E.vectorNormInverse,D={x:C.x1*m+C.x2*b,y:C.y1*m+C.y2*b};i.ctrlpts.push(D.x+L.x*p,D.y+L.y*p)}};St.findTaxiPoints=function(t,e){var r=t._private.rscratch;r.edgeType="segments";var a="vertical",n="horizontal",i="leftward",o="rightward",s="downward",l="upward",u="auto",f=e.posPts,v=e.srcW,h=e.srcH,c=e.tgtW,d=e.tgtH,g=t.pstyle("edge-distances").value,y=g!=="node-position",p=t.pstyle("taxi-direction").value,m=p,b=t.pstyle("taxi-turn"),E=b.units==="%",C=b.pfValue,L=C<0,D=t.pstyle("taxi-turn-min-distance").pfValue,R=y?(v+c)/2:0,O=y?(h+d)/2:0,M=f.x2-f.x1,P=f.y2-f.y1,w=function(N,G){return N>0?Math.max(N-G,0):Math.min(N+G,0)},x=w(M,R),T=w(P,O),A=!1;m===u?p=Math.abs(x)>Math.abs(T)?n:a:m===l||m===s?(p=a,A=!0):(m===i||m===o)&&(p=n,A=!0);var S=p===a,I=S?T:x,B=S?P:M,k=ms(B),z=!1;!(A&&(E||L))&&(m===s&&B<0||m===l&&B>0||m===i&&B>0||m===o&&B<0)&&(k*=-1,I=k*Math.abs(I),z=!0);var F;if(E){var V=C<0?1+C:C;F=V*I}else{var Z=C<0?I:0;F=Z+C*k}var q=function(N){return Math.abs(N)<D||Math.abs(N)>=Math.abs(I)},_=q(F),K=q(Math.abs(I)-Math.abs(F)),U=_||K;if(U&&!z)if(S){var J=Math.abs(B)<=h/2,$=Math.abs(M)<=c/2;if(J){var H=(f.x1+f.x2)/2,Y=f.y1,Q=f.y2;r.segpts=[H,Y,H,Q]}else if($){var oe=(f.y1+f.y2)/2,te=f.x1,Te=f.x2;r.segpts=[te,oe,Te,oe]}else r.segpts=[f.x1,f.y2]}else{var Le=Math.abs(B)<=v/2,he=Math.abs(P)<=d/2;if(Le){var le=(f.y1+f.y2)/2,ce=f.x1,fe=f.x2;r.segpts=[ce,le,fe,le]}else if(he){var ye=(f.x1+f.x2)/2,me=f.y1,Ee=f.y2;r.segpts=[ye,me,ye,Ee]}else r.segpts=[f.x2,f.y1]}else if(S){var be=f.y1+F+(y?h/2*k:0),Ae=f.x1,Ie=f.x2;r.segpts=[Ae,be,Ie,be]}else{var Oe=f.x1+F+(y?v/2*k:0),Be=f.y1,Pe=f.y2;r.segpts=[Oe,Be,Oe,Pe]}if(r.isRound){var ne=t.pstyle("taxi-radius").value,ae=t.pstyle("radius-type").value[0]==="arc-radius";r.radii=new Array(r.segpts.length/2).fill(ne),r.isArcRadius=new Array(r.segpts.length/2).fill(ae)}};St.tryToCorrectInvalidPoints=function(t,e){var r=t._private.rscratch;if(r.edgeType==="bezier"){var a=e.srcPos,n=e.tgtPos,i=e.srcW,o=e.srcH,s=e.tgtW,l=e.tgtH,u=e.srcShape,f=e.tgtShape,v=e.srcCornerRadius,h=e.tgtCornerRadius,c=e.srcRs,d=e.tgtRs,g=!xe(r.startX)||!xe(r.startY),y=!xe(r.arrowStartX)||!xe(r.arrowStartY),p=!xe(r.endX)||!xe(r.endY),m=!xe(r.arrowEndX)||!xe(r.arrowEndY),b=3,E=this.getArrowWidth(t.pstyle("width").pfValue,t.pstyle("arrow-scale").value)*this.arrowShapeWidth,C=b*E,L=Vr({x:r.ctrlpts[0],y:r.ctrlpts[1]},{x:r.startX,y:r.startY}),D=L<C,R=Vr({x:r.ctrlpts[0],y:r.ctrlpts[1]},{x:r.endX,y:r.endY}),O=R<C,M=!1;if(g||y||D){M=!0;var P={x:r.ctrlpts[0]-a.x,y:r.ctrlpts[1]-a.y},w=Math.sqrt(P.x*P.x+P.y*P.y),x={x:P.x/w,y:P.y/w},T=Math.max(i,o),A={x:r.ctrlpts[0]+x.x*2*T,y:r.ctrlpts[1]+x.y*2*T},S=u.intersectLine(a.x,a.y,i,o,A.x,A.y,0,v,c);D?(r.ctrlpts[0]=r.ctrlpts[0]+x.x*(C-L),r.ctrlpts[1]=r.ctrlpts[1]+x.y*(C-L)):(r.ctrlpts[0]=S[0]+x.x*C,r.ctrlpts[1]=S[1]+x.y*C)}if(p||m||O){M=!0;var I={x:r.ctrlpts[0]-n.x,y:r.ctrlpts[1]-n.y},B=Math.sqrt(I.x*I.x+I.y*I.y),k={x:I.x/B,y:I.y/B},z=Math.max(i,o),F={x:r.ctrlpts[0]+k.x*2*z,y:r.ctrlpts[1]+k.y*2*z},V=f.intersectLine(n.x,n.y,s,l,F.x,F.y,0,h,d);O?(r.ctrlpts[0]=r.ctrlpts[0]+k.x*(C-R),r.ctrlpts[1]=r.ctrlpts[1]+k.y*(C-R)):(r.ctrlpts[0]=V[0]+k.x*C,r.ctrlpts[1]=V[1]+k.y*C)}M&&this.findEndpoints(t)}};St.storeAllpts=function(t){var e=t._private.rscratch;if(e.edgeType==="multibezier"||e.edgeType==="bezier"||e.edgeType==="self"||e.edgeType==="compound"){e.allpts=[],e.allpts.push(e.startX,e.startY);for(var r=0;r+1<e.ctrlpts.length;r+=2)e.allpts.push(e.ctrlpts[r],e.ctrlpts[r+1]),r+3<e.ctrlpts.length&&e.allpts.push((e.ctrlpts[r]+e.ctrlpts[r+2])/2,(e.ctrlpts[r+1]+e.ctrlpts[r+3])/2);e.allpts.push(e.endX,e.endY);var a,n;e.ctrlpts.length/2%2===0?(a=e.allpts.length/2-1,e.midX=e.allpts[a],e.midY=e.allpts[a+1]):(a=e.allpts.length/2-3,n=.5,e.midX=pt(e.allpts[a],e.allpts[a+2],e.allpts[a+4],n),e.midY=pt(e.allpts[a+1],e.allpts[a+3],e.allpts[a+5],n))}else if(e.edgeType==="straight")e.allpts=[e.startX,e.startY,e.endX,e.endY],e.midX=(e.startX+e.endX+e.arrowStartX+e.arrowEndX)/4,e.midY=(e.startY+e.endY+e.arrowStartY+e.arrowEndY)/4;else if(e.edgeType==="segments"){if(e.allpts=[],e.allpts.push(e.startX,e.startY),e.allpts.push.apply(e.allpts,e.segpts),e.allpts.push(e.endX,e.endY),e.isRound){e.roundCorners=[];for(var i=2;i+3<e.allpts.length;i+=2){var o=e.radii[i/2-1],s=e.isArcRadius[i/2-1];e.roundCorners.push(Ns({x:e.allpts[i-2],y:e.allpts[i-1]},{x:e.allpts[i],y:e.allpts[i+1],radius:o},{x:e.allpts[i+2],y:e.allpts[i+3]},o,s))}}if(e.segpts.length%4===0){var l=e.segpts.length/2,u=l-2;e.midX=(e.segpts[u]+e.segpts[l])/2,e.midY=(e.segpts[u+1]+e.segpts[l+1])/2}else{var f=e.segpts.length/2-1;if(!e.isRound)e.midX=e.segpts[f],e.midY=e.segpts[f+1];else{var v={x:e.segpts[f],y:e.segpts[f+1]},h=e.roundCorners[f/2];if(h.radius===0){var c={x:e.segpts[f+2],y:e.segpts[f+3]};e.midX=v.x,e.midY=v.y,e.midVector=[v.y-c.y,c.x-v.x]}else{var d=[v.x-h.cx,v.y-h.cy],g=h.radius/Math.sqrt(Math.pow(d[0],2)+Math.pow(d[1],2));d=d.map(function(y){return y*g}),e.midX=h.cx+d[0],e.midY=h.cy+d[1],e.midVector=d}}}}};St.checkForInvalidEdgeWarning=function(t){var e=t[0]._private.rscratch;e.nodesOverlap||xe(e.startX)&&xe(e.startY)&&xe(e.endX)&&xe(e.endY)?e.loggedErr=!1:e.loggedErr||(e.loggedErr=!0,_e("Edge `"+t.id()+"` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."))};St.findEdgeControlPoints=function(t){var e=this;if(!(!t||t.length===0)){for(var r=this,a=r.cy,n=a.hasCompoundNodes(),i=new nr,o=function(O,M){return[].concat(Pn(O),[M?1:0]).join("-")},s=[],l=[],u=0;u<t.length;u++){var f=t[u],v=f._private,h=f.pstyle("curve-style").value;if(!(f.removed()||!f.takesUpSpace())){if(h==="haystack"){l.push(f);continue}var c=h==="unbundled-bezier"||dr(h,"segments")||h==="straight"||h==="straight-triangle"||dr(h,"taxi"),d=h==="unbundled-bezier"||h==="bezier",g=v.source,y=v.target,p=g.poolIndex(),m=y.poolIndex(),b=[p,m].sort(),E=o(b,c),C=i.get(E);C==null&&(C={eles:[]},s.push({pairId:b,edgeIsUnbundled:c}),i.set(E,C)),C.eles.push(f),c&&(C.hasUnbundled=!0),d&&(C.hasBezier=!0)}}for(var L=function(){var O=s[D],M=O.pairId,P=O.edgeIsUnbundled,w=o(M,P),x=i.get(w),T;if(!x.hasUnbundled){var A=x.eles[0].parallelEdges().filter(function(ae){return ae.isBundledBezier()});ps(x.eles),A.forEach(function(ae){return x.eles.push(ae)}),x.eles.sort(function(ae,W){return ae.poolIndex()-W.poolIndex()})}var S=x.eles[0],I=S.source(),B=S.target();if(I.poolIndex()>B.poolIndex()){var k=I;I=B,B=k}var z=x.srcPos=I.position(),F=x.tgtPos=B.position(),V=x.srcW=I.outerWidth(),Z=x.srcH=I.outerHeight(),q=x.tgtW=B.outerWidth(),_=x.tgtH=B.outerHeight(),K=x.srcShape=r.nodeShapes[e.getNodeShape(I)],U=x.tgtShape=r.nodeShapes[e.getNodeShape(B)],J=x.srcCornerRadius=I.pstyle("corner-radius").value==="auto"?"auto":I.pstyle("corner-radius").pfValue,$=x.tgtCornerRadius=B.pstyle("corner-radius").value==="auto"?"auto":B.pstyle("corner-radius").pfValue,H=x.tgtRs=B._private.rscratch,Y=x.srcRs=I._private.rscratch;x.dirCounts={north:0,west:0,south:0,east:0,northwest:0,southwest:0,northeast:0,southeast:0};for(var Q=0;Q<x.eles.length;Q++){var oe=x.eles[Q],te=oe[0]._private.rscratch,Te=oe.pstyle("curve-style").value,Le=Te==="unbundled-bezier"||dr(Te,"segments")||dr(Te,"taxi"),he=!I.same(oe.source());if(!x.calculatedIntersection&&I!==B&&(x.hasBezier||x.hasUnbundled)){x.calculatedIntersection=!0;var le=K.intersectLine(z.x,z.y,V,Z,F.x,F.y,0,J,Y),ce=x.srcIntn=le,fe=U.intersectLine(F.x,F.y,q,_,z.x,z.y,0,$,H),ye=x.tgtIntn=fe,me=x.intersectionPts={x1:le[0],x2:fe[0],y1:le[1],y2:fe[1]},Ee=x.posPts={x1:z.x,x2:F.x,y1:z.y,y2:F.y},be=fe[1]-le[1],Ae=fe[0]-le[0],Ie=Math.sqrt(Ae*Ae+be*be);xe(Ie)&&Ie>=by||(Ie=Math.sqrt(Math.max(Ae*Ae,Ha)+Math.max(be*be,Ha)));var Oe=x.vector={x:Ae,y:be},Be=x.vectorNorm={x:Oe.x/Ie,y:Oe.y/Ie},Pe={x:-Be.y,y:Be.x};x.nodesOverlap=!xe(Ie)||U.checkPoint(le[0],le[1],0,q,_,F.x,F.y,$,H)||K.checkPoint(fe[0],fe[1],0,V,Z,z.x,z.y,J,Y),x.vectorNormInverse=Pe,T={nodesOverlap:x.nodesOverlap,dirCounts:x.dirCounts,calculatedIntersection:!0,hasBezier:x.hasBezier,hasUnbundled:x.hasUnbundled,eles:x.eles,srcPos:F,srcRs:H,tgtPos:z,tgtRs:Y,srcW:q,srcH:_,tgtW:V,tgtH:Z,srcIntn:ye,tgtIntn:ce,srcShape:U,tgtShape:K,posPts:{x1:Ee.x2,y1:Ee.y2,x2:Ee.x1,y2:Ee.y1},intersectionPts:{x1:me.x2,y1:me.y2,x2:me.x1,y2:me.y1},vector:{x:-Oe.x,y:-Oe.y},vectorNorm:{x:-Be.x,y:-Be.y},vectorNormInverse:{x:-Pe.x,y:-Pe.y}}}var ne=he?T:x;te.nodesOverlap=ne.nodesOverlap,te.srcIntn=ne.srcIntn,te.tgtIntn=ne.tgtIntn,te.isRound=Te.startsWith("round"),n&&(I.isParent()||I.isChild()||B.isParent()||B.isChild())&&(I.parents().anySame(B)||B.parents().anySame(I)||I.same(B)&&I.isParent())?e.findCompoundLoopPoints(oe,ne,Q,Le):I===B?e.findLoopPoints(oe,ne,Q,Le):Te.endsWith("segments")?e.findSegmentsPoints(oe,ne):Te.endsWith("taxi")?e.findTaxiPoints(oe,ne):Te==="straight"||!Le&&x.eles.length%2===1&&Q===Math.floor(x.eles.length/2)?e.findStraightEdgePoints(oe):e.findBezierPoints(oe,ne,Q,Le,he),e.findEndpoints(oe),e.tryToCorrectInvalidPoints(oe,ne),e.checkForInvalidEdgeWarning(oe),e.storeAllpts(oe),e.storeEdgeProjections(oe),e.calculateArrowAngles(oe),e.recalculateEdgeLabelProjections(oe),e.calculateLabelAngles(oe)}},D=0;D<s.length;D++)L();this.findHaystackPoints(l)}};function Bv(t){var e=[];if(t!=null){for(var r=0;r<t.length;r+=2){var a=t[r],n=t[r+1];e.push({x:a,y:n})}return e}}St.getSegmentPoints=function(t){var e=t[0]._private.rscratch;this.recalculateRenderedStyle(t);var r=e.edgeType;if(r==="segments")return Bv(e.segpts)};St.getControlPoints=function(t){var e=t[0]._private.rscratch;this.recalculateRenderedStyle(t);var r=e.edgeType;if(r==="bezier"||r==="multibezier"||r==="self"||r==="compound")return Bv(e.ctrlpts)};St.getEdgeMidpoint=function(t){var e=t[0]._private.rscratch;return this.recalculateRenderedStyle(t),{x:e.midX,y:e.midY}};var Ja={};Ja.manualEndptToPx=function(t,e){var r=this,a=t.position(),n=t.outerWidth(),i=t.outerHeight(),o=t._private.rscratch;if(e.value.length===2){var s=[e.pfValue[0],e.pfValue[1]];return e.units[0]==="%"&&(s[0]=s[0]*n),e.units[1]==="%"&&(s[1]=s[1]*i),s[0]+=a.x,s[1]+=a.y,s}else{var l=e.pfValue[0];l=-Math.PI/2+l;var u=2*Math.max(n,i),f=[a.x+Math.cos(l)*u,a.y+Math.sin(l)*u];return r.nodeShapes[this.getNodeShape(t)].intersectLine(a.x,a.y,n,i,f[0],f[1],0,t.pstyle("corner-radius").value==="auto"?"auto":t.pstyle("corner-radius").pfValue,o)}};Ja.findEndpoints=function(t){var e,r,a,n,i=this,o,s=t.source()[0],l=t.target()[0],u=s.position(),f=l.position(),v=t.pstyle("target-arrow-shape").value,h=t.pstyle("source-arrow-shape").value,c=t.pstyle("target-distance-from-node").pfValue,d=t.pstyle("source-distance-from-node").pfValue,g=s._private.rscratch,y=l._private.rscratch,p=t.pstyle("curve-style").value,m=t._private.rscratch,b=m.edgeType,E=dr(p,"taxi"),C=b==="self"||b==="compound",L=b==="bezier"||b==="multibezier"||C,D=b!=="bezier",R=b==="straight"||b==="segments",O=b==="segments",M=L||D||R,P=C||E,w=t.pstyle("source-endpoint"),x=P?"outside-to-node":w.value,T=s.pstyle("corner-radius").value==="auto"?"auto":s.pstyle("corner-radius").pfValue,A=t.pstyle("target-endpoint"),S=P?"outside-to-node":A.value,I=l.pstyle("corner-radius").value==="auto"?"auto":l.pstyle("corner-radius").pfValue;m.srcManEndpt=w,m.tgtManEndpt=A;var B,k,z,F,V=(e=(A==null||(r=A.pfValue)===null||r===void 0?void 0:r.length)===2?A.pfValue:null)!==null&&e!==void 0?e:[0,0],Z=(a=(w==null||(n=w.pfValue)===null||n===void 0?void 0:n.length)===2?w.pfValue:null)!==null&&a!==void 0?a:[0,0];if(L){var q=[m.ctrlpts[0],m.ctrlpts[1]],_=D?[m.ctrlpts[m.ctrlpts.length-2],m.ctrlpts[m.ctrlpts.length-1]]:q;B=_,k=q}else if(R){var K=O?m.segpts.slice(0,2):[f.x+V[0],f.y+V[1]],U=O?m.segpts.slice(m.segpts.length-2):[u.x+Z[0],u.y+Z[1]];B=U,k=K}if(S==="inside-to-node")o=[f.x,f.y];else if(A.units)o=this.manualEndptToPx(l,A);else if(S==="outside-to-line")o=m.tgtIntn;else if(S==="outside-to-node"||S==="outside-to-node-or-label"?z=B:(S==="outside-to-line"||S==="outside-to-line-or-label")&&(z=[u.x,u.y]),o=i.nodeShapes[this.getNodeShape(l)].intersectLine(f.x,f.y,l.outerWidth(),l.outerHeight(),z[0],z[1],0,I,y),S==="outside-to-node-or-label"||S==="outside-to-line-or-label"){var J=l._private.rscratch,$=J.labelWidth,H=J.labelHeight,Y=J.labelX,Q=J.labelY,oe=$/2,te=H/2,Te=l.pstyle("text-valign").value;Te==="top"?Q-=te:Te==="bottom"&&(Q+=te);var Le=l.pstyle("text-halign").value;Le==="left"?Y-=oe:Le==="right"&&(Y+=oe);var he=ka(z[0],z[1],[Y-oe,Q-te,Y+oe,Q-te,Y+oe,Q+te,Y-oe,Q+te],f.x,f.y);if(he.length>0){var le=u,ce=Or(le,ea(o)),fe=Or(le,ea(he)),ye=ce;if(fe<ce&&(o=he,ye=fe),he.length>2){var me=Or(le,{x:he[2],y:he[3]});me<ye&&(o=[he[2],he[3]])}}}var Ee=vn(o,B,i.arrowShapes[v].spacing(t)+c),be=vn(o,B,i.arrowShapes[v].gap(t)+c);if(m.endX=be[0],m.endY=be[1],m.arrowEndX=Ee[0],m.arrowEndY=Ee[1],x==="inside-to-node")o=[u.x,u.y];else if(w.units)o=this.manualEndptToPx(s,w);else if(x==="outside-to-line")o=m.srcIntn;else if(x==="outside-to-node"||x==="outside-to-node-or-label"?F=k:(x==="outside-to-line"||x==="outside-to-line-or-label")&&(F=[f.x,f.y]),o=i.nodeShapes[this.getNodeShape(s)].intersectLine(u.x,u.y,s.outerWidth(),s.outerHeight(),F[0],F[1],0,T,g),x==="outside-to-node-or-label"||x==="outside-to-line-or-label"){var Ae=s._private.rscratch,Ie=Ae.labelWidth,Oe=Ae.labelHeight,Be=Ae.labelX,Pe=Ae.labelY,ne=Ie/2,ae=Oe/2,W=s.pstyle("text-valign").value;W==="top"?Pe-=ae:W==="bottom"&&(Pe+=ae);var N=s.pstyle("text-halign").value;N==="left"?Be-=ne:N==="right"&&(Be+=ne);var G=ka(F[0],F[1],[Be-ne,Pe-ae,Be+ne,Pe-ae,Be+ne,Pe+ae,Be-ne,Pe+ae],u.x,u.y);if(G.length>0){var X=f,j=Or(X,ea(o)),ee=Or(X,ea(G)),ie=j;if(ee<j&&(o=[G[0],G[1]],ie=ee),G.length>2){var re=Or(X,{x:G[2],y:G[3]});re<ie&&(o=[G[2],G[3]])}}}var ve=vn(o,k,i.arrowShapes[h].spacing(t)+d),se=vn(o,k,i.arrowShapes[h].gap(t)+d);m.startX=se[0],m.startY=se[1],m.arrowStartX=ve[0],m.arrowStartY=ve[1],M&&(!xe(m.startX)||!xe(m.startY)||!xe(m.endX)||!xe(m.endY)?m.badLine=!0:m.badLine=!1)};Ja.getSourceEndpoint=function(t){var e=t[0]._private.rscratch;return this.recalculateRenderedStyle(t),e.edgeType==="haystack"?{x:e.haystackPts[0],y:e.haystackPts[1]}:{x:e.arrowStartX,y:e.arrowStartY}};Ja.getTargetEndpoint=function(t){var e=t[0]._private.rscratch;return this.recalculateRenderedStyle(t),e.edgeType==="haystack"?{x:e.haystackPts[2],y:e.haystackPts[3]}:{x:e.arrowEndX,y:e.arrowEndY}};var Ps={};function wy(t,e,r){for(var a=function(u,f,v,h){return pt(u,f,v,h)},n=e._private,i=n.rstyle.bezierPts,o=0;o<t.bezierProjPcts.length;o++){var s=t.bezierProjPcts[o];i.push({x:a(r[0],r[2],r[4],s),y:a(r[1],r[3],r[5],s)})}}Ps.storeEdgeProjections=function(t){var e=t._private,r=e.rscratch,a=r.edgeType;if(e.rstyle.bezierPts=null,e.rstyle.linePts=null,e.rstyle.haystackPts=null,a==="multibezier"||a==="bezier"||a==="self"||a==="compound"){e.rstyle.bezierPts=[];for(var n=0;n+5<r.allpts.length;n+=4)wy(this,t,r.allpts.slice(n,n+6))}else if(a==="segments")for(var i=e.rstyle.linePts=[],n=0;n+1<r.allpts.length;n+=2)i.push({x:r.allpts[n],y:r.allpts[n+1]});else if(a==="haystack"){var o=r.haystackPts;e.rstyle.haystackPts=[{x:o[0],y:o[1]},{x:o[2],y:o[3]}]}e.rstyle.arrowWidth=this.getArrowWidth(t.pstyle("width").pfValue,t.pstyle("arrow-scale").value)*this.arrowShapeWidth};Ps.recalculateEdgeProjections=function(t){this.findEdgeControlPoints(t)};var er={};er.recalculateNodeLabelProjection=function(t){var e=t.pstyle("label").strValue;if(!br(e)){var r,a,n=t._private,i=t.width(),o=t.height(),s=t.padding(),l=t.position(),u=t.pstyle("text-halign").strValue,f=t.pstyle("text-valign").strValue,v=n.rscratch,h=n.rstyle;switch(u){case"left":r=l.x-i/2-s;break;case"right":r=l.x+i/2+s;break;default:r=l.x}switch(f){case"top":a=l.y-o/2-s;break;case"bottom":a=l.y+o/2+s;break;default:a=l.y}v.labelX=r,v.labelY=a,h.labelX=r,h.labelY=a,this.calculateLabelAngles(t),this.applyLabelDimensions(t)}};var Fv=function(e,r){var a=Math.atan(r/e);return e===0&&a<0&&(a=a*-1),a},kv=function(e,r){var a=r.x-e.x,n=r.y-e.y;return Fv(a,n)},Ey=function(e,r,a,n){var i=Fa(0,n-.001,1),o=Fa(0,n+.001,1),s=aa(e,r,a,i),l=aa(e,r,a,o);return kv(s,l)};er.recalculateEdgeLabelProjections=function(t){var e,r=t._private,a=r.rscratch,n=this,i={mid:t.pstyle("label").strValue,source:t.pstyle("source-label").strValue,target:t.pstyle("target-label").strValue};if(i.mid||i.source||i.target){e={x:a.midX,y:a.midY};var o=function(v,h,c){ar(r.rscratch,v,h,c),ar(r.rstyle,v,h,c)};o("labelX",null,e.x),o("labelY",null,e.y);var s=Fv(a.midDispX,a.midDispY);o("labelAutoAngle",null,s);var l=function(){if(l.cache)return l.cache;for(var v=[],h=0;h+5<a.allpts.length;h+=4){var c={x:a.allpts[h],y:a.allpts[h+1]},d={x:a.allpts[h+2],y:a.allpts[h+3]},g={x:a.allpts[h+4],y:a.allpts[h+5]};v.push({p0:c,p1:d,p2:g,startDist:0,length:0,segments:[]})}var y=r.rstyle.bezierPts,p=n.bezierProjPcts.length;function m(D,R,O,M,P){var w=Vr(R,O),x=D.segments[D.segments.length-1],T={p0:R,p1:O,t0:M,t1:P,startDist:x?x.startDist+x.length:0,length:w};D.segments.push(T),D.length+=w}for(var b=0;b<v.length;b++){var E=v[b],C=v[b-1];C&&(E.startDist=C.startDist+C.length),m(E,E.p0,y[b*p],0,n.bezierProjPcts[0]);for(var L=0;L<p-1;L++)m(E,y[b*p+L],y[b*p+L+1],n.bezierProjPcts[L],n.bezierProjPcts[L+1]);m(E,y[b*p+p-1],E.p2,n.bezierProjPcts[p-1],1)}return l.cache=v},u=function(v){var h,c=v==="source";if(i[v]){var d=t.pstyle(v+"-text-offset").pfValue;switch(a.edgeType){case"self":case"compound":case"bezier":case"multibezier":{for(var g=l(),y,p=0,m=0,b=0;b<g.length;b++){for(var E=g[c?b:g.length-1-b],C=0;C<E.segments.length;C++){var L=E.segments[c?C:E.segments.length-1-C],D=b===g.length-1&&C===E.segments.length-1;if(p=m,m+=L.length,m>=d||D){y={cp:E,segment:L};break}}if(y)break}var R=y.cp,O=y.segment,M=(d-p)/O.length,P=O.t1-O.t0,w=c?O.t0+P*M:O.t1-P*M;w=Fa(0,w,1),e=aa(R.p0,R.p1,R.p2,w),h=Ey(R.p0,R.p1,R.p2,w);break}case"straight":case"segments":case"haystack":{for(var x=0,T,A,S,I,B=a.allpts.length,k=0;k+3<B&&(c?(S={x:a.allpts[k],y:a.allpts[k+1]},I={x:a.allpts[k+2],y:a.allpts[k+3]}):(S={x:a.allpts[B-2-k],y:a.allpts[B-1-k]},I={x:a.allpts[B-4-k],y:a.allpts[B-3-k]}),T=Vr(S,I),A=x,x+=T,!(x>=d));k+=2);var z=d-A,F=z/T;F=Fa(0,F,1),e=qc(S,I,F),h=kv(S,I);break}}o("labelX",v,e.x),o("labelY",v,e.y),o("labelAutoAngle",v,h)}};u("source"),u("target"),this.applyLabelDimensions(t)}};er.applyLabelDimensions=function(t){this.applyPrefixedLabelDimensions(t),t.isEdge()&&(this.applyPrefixedLabelDimensions(t,"source"),this.applyPrefixedLabelDimensions(t,"target"))};er.applyPrefixedLabelDimensions=function(t,e){var r=t._private,a=this.getLabelText(t,e),n=zr(a,t._private.labelDimsKey);if(Ot(r.rscratch,"prefixedLabelDimsKey",e)!==n){ar(r.rscratch,"prefixedLabelDimsKey",e,n);var i=this.calculateLabelDimensions(t,a),o=t.pstyle("line-height").pfValue,s=t.pstyle("text-wrap").strValue,l=Ot(r.rscratch,"labelWrapCachedLines",e)||[],u=s!=="wrap"?1:Math.max(l.length,1),f=i.height/u,v=f*o,h=i.width,c=i.height+(u-1)*(o-1)*f;ar(r.rstyle,"labelWidth",e,h),ar(r.rscratch,"labelWidth",e,h),ar(r.rstyle,"labelHeight",e,c),ar(r.rscratch,"labelHeight",e,c),ar(r.rscratch,"labelLineHeight",e,v)}};er.getLabelText=function(t,e){var r=t._private,a=e?e+"-":"",n=t.pstyle(a+"label").strValue,i=t.pstyle("text-transform").value,o=function(Z,q){return q?(ar(r.rscratch,Z,e,q),q):Ot(r.rscratch,Z,e)};if(!n)return"";i=="none"||(i=="uppercase"?n=n.toUpperCase():i=="lowercase"&&(n=n.toLowerCase()));var s=t.pstyle("text-wrap").value;if(s==="wrap"){var l=o("labelKey");if(l!=null&&o("labelWrapKey")===l)return o("labelWrapCachedText");for(var u="\u200B",f=n.split(`
`),v=t.pstyle("text-max-width").pfValue,h=t.pstyle("text-overflow-wrap").value,c=h==="anywhere",d=[],g=/[\s\u200b]+|$/g,y=0;y<f.length;y++){var p=f[y],m=this.calculateLabelDimensions(t,p),b=m.width;if(c){var E=p.split("").join(u);p=E}if(b>v){var C=p.matchAll(g),L="",D=0,R=Bt(C),O;try{for(R.s();!(O=R.n()).done;){var M=O.value,P=M[0],w=p.substring(D,M.index);D=M.index+P.length;var x=L.length===0?w:L+w+P,T=this.calculateLabelDimensions(t,x),A=T.width;A<=v?L+=w+P:(L&&d.push(L),L=w+P)}}catch(V){R.e(V)}finally{R.f()}L.match(/^[\s\u200b]+$/)||d.push(L)}else d.push(p)}o("labelWrapCachedLines",d),n=o("labelWrapCachedText",d.join(`
`)),o("labelWrapKey",l)}else if(s==="ellipsis"){var S=t.pstyle("text-max-width").pfValue,I="",B="\u2026",k=!1;if(this.calculateLabelDimensions(t,n).width<S)return n;for(var z=0;z<n.length;z++){var F=this.calculateLabelDimensions(t,I+n[z]+B).width;if(F>S)break;I+=n[z],z===n.length-1&&(k=!0)}return k||(I+=B),I}return n};er.getLabelJustification=function(t){var e=t.pstyle("text-justification").strValue,r=t.pstyle("text-halign").strValue;if(e==="auto")if(t.isNode())switch(r){case"left":return"right";case"right":return"left";default:return"center"}else return"center";else return e};er.calculateLabelDimensions=function(t,e){var r=this,a=r.cy.window(),n=a.document,i=0,o=t.pstyle("font-style").strValue,s=t.pstyle("font-size").pfValue,l=t.pstyle("font-family").strValue,u=t.pstyle("font-weight").strValue,f=this.labelCalcCanvas,v=this.labelCalcCanvasContext;if(!f){f=this.labelCalcCanvas=n.createElement("canvas"),v=this.labelCalcCanvasContext=f.getContext("2d");var h=f.style;h.position="absolute",h.left="-9999px",h.top="-9999px",h.zIndex="-1",h.visibility="hidden",h.pointerEvents="none"}v.font="".concat(o," ").concat(u," ").concat(s,"px ").concat(l);for(var c=0,d=0,g=e.split(`
`),y=0;y<g.length;y++){var p=g[y],m=v.measureText(p),b=Math.ceil(m.width),E=s;c=Math.max(b,c),d+=E}return c+=i,d+=i,{width:c,height:d}};er.calculateLabelAngle=function(t,e){var r=t._private,a=r.rscratch,n=t.isEdge(),i=e?e+"-":"",o=t.pstyle(i+"text-rotation"),s=o.strValue;return s==="none"?0:n&&s==="autorotate"?a.labelAutoAngle:s==="autorotate"?0:o.pfValue};er.calculateLabelAngles=function(t){var e=this,r=t.isEdge(),a=t._private,n=a.rscratch;n.labelAngle=e.calculateLabelAngle(t),r&&(n.sourceLabelAngle=e.calculateLabelAngle(t,"source"),n.targetLabelAngle=e.calculateLabelAngle(t,"target"))};var zv={},Ql=28,Jl=!1;zv.getNodeShape=function(t){var e=this,r=t.pstyle("shape").value;if(r==="cutrectangle"&&(t.width()<Ql||t.height()<Ql))return Jl||(_e("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"),Jl=!0),"rectangle";if(t.isParent())return r==="rectangle"||r==="roundrectangle"||r==="round-rectangle"||r==="cutrectangle"||r==="cut-rectangle"||r==="barrel"?r:"rectangle";if(r==="polygon"){var a=t.pstyle("shape-polygon-points").value;return e.nodeShapes.makePolygon(a).name}return r};var ui={};ui.registerCalculationListeners=function(){var t=this.cy,e=t.collection(),r=this,a=function(o){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(e.merge(o),s)for(var l=0;l<o.length;l++){var u=o[l],f=u._private,v=f.rstyle;v.clean=!1,v.cleanConnected=!1}};r.binder(t).on("bounds.* dirty.*",function(o){var s=o.target;a(s)}).on("style.* background.*",function(o){var s=o.target;a(s,!1)});var n=function(o){if(o){var s=r.onUpdateEleCalcsFns;e.cleanStyle();for(var l=0;l<e.length;l++){var u=e[l],f=u._private.rstyle;u.isNode()&&!f.cleanConnected&&(a(u.connectedEdges()),f.cleanConnected=!0)}if(s)for(var v=0;v<s.length;v++){var h=s[v];h(o,e)}r.recalculateRenderedStyle(e),e=t.collection()}};r.flushRenderedStyleQueue=function(){n(!0)},r.beforeRender(n,r.beforeRenderPriorities.eleCalcs)};ui.onUpdateEleCalcs=function(t){var e=this.onUpdateEleCalcsFns=this.onUpdateEleCalcsFns||[];e.push(t)};ui.recalculateRenderedStyle=function(t,e){var r=function(E){return E._private.rstyle.cleanConnected};if(t.length!==0){var a=[],n=[];if(!this.destroyed){e===void 0&&(e=!0);for(var i=0;i<t.length;i++){var o=t[i],s=o._private,l=s.rstyle;o.isEdge()&&(!r(o.source())||!r(o.target()))&&(l.clean=!1),o.isEdge()&&o.isBundledBezier()&&o.parallelEdges().some(function(b){return!b._private.rstyle.clean&&b.isBundledBezier()})&&(l.clean=!1),!(e&&l.clean||o.removed())&&o.pstyle("display").value!=="none"&&(s.group==="nodes"?n.push(o):a.push(o),l.clean=!0)}for(var u=0;u<n.length;u++){var f=n[u],v=f._private,h=v.rstyle,c=f.position();this.recalculateNodeLabelProjection(f),h.nodeX=c.x,h.nodeY=c.y,h.nodeW=f.pstyle("width").pfValue,h.nodeH=f.pstyle("height").pfValue}this.recalculateEdgeProjections(a);for(var d=0;d<a.length;d++){var g=a[d],y=g._private,p=y.rstyle,m=y.rscratch;p.srcX=m.arrowStartX,p.srcY=m.arrowStartY,p.tgtX=m.arrowEndX,p.tgtY=m.arrowEndY,p.midX=m.midX,p.midY=m.midY,p.labelAngle=m.labelAngle,p.sourceLabelAngle=m.sourceLabelAngle,p.targetLabelAngle=m.targetLabelAngle}}}};var li={};li.updateCachedGrabbedEles=function(){var t=this.cachedZSortedEles;if(t){t.drag=[],t.nondrag=[];for(var e=[],r=0;r<t.length;r++){var a=t[r],n=a._private.rscratch;a.grabbed()&&!a.isParent()?e.push(a):n.inDragLayer?t.drag.push(a):t.nondrag.push(a)}for(var r=0;r<e.length;r++){var a=e[r];t.drag.push(a)}}};li.invalidateCachedZSortedEles=function(){this.cachedZSortedEles=null};li.getCachedZSortedEles=function(t){if(t||!this.cachedZSortedEles){var e=this.cy.mutableElements().toArray();e.sort(bv),e.interactive=e.filter(function(r){return r.interactive()}),this.cachedZSortedEles=e,this.updateCachedGrabbedEles()}else e=this.cachedZSortedEles;return e};var Vv={};[qr,Hn,St,Ja,Ps,er,zv,ui,li].forEach(function(t){Ne(Vv,t)});var Gv={};Gv.getCachedImage=function(t,e,r){var a=this,n=a.imageCache=a.imageCache||{},i=n[t];if(i)return i.image.complete||i.image.addEventListener("load",r),i.image;i=n[t]=n[t]||{};var o=i.image=new Image;o.addEventListener("load",r),o.addEventListener("error",function(){o.error=!0});var s="data:",l=t.substring(0,s.length).toLowerCase()===s;return l||(e=e==="null"?null:e,o.crossOrigin=e),o.src=t,o};var da={};da.registerBinding=function(t,e,r,a){var n=Array.prototype.slice.apply(arguments,[1]);if(Array.isArray(t)){for(var i=[],o=0;o<t.length;o++){var s=t[o];if(s!==void 0){var l=this.binder(s);i.push(l.on.apply(l,n))}}return i}var l=this.binder(t);return l.on.apply(l,n)};da.binder=function(t){var e=this,r=e.cy.window(),a=t===r||t===r.document||t===r.document.body||Oh(t);if(e.supportsPassiveEvents==null){var n=!1;try{var i=Object.defineProperty({},"passive",{get:function(){return n=!0,!0}});r.addEventListener("test",null,i)}catch{}e.supportsPassiveEvents=n}var o=function(l,u,f){var v=Array.prototype.slice.call(arguments);return a&&e.supportsPassiveEvents&&(v[2]={capture:f??!1,passive:!1,once:!1}),e.bindings.push({target:t,args:v}),(t.addEventListener||t.on).apply(t,v),this};return{on:o,addEventListener:o,addListener:o,bind:o}};da.nodeIsDraggable=function(t){return t&&t.isNode()&&!t.locked()&&t.grabbable()};da.nodeIsGrabbable=function(t){return this.nodeIsDraggable(t)&&t.interactive()};da.load=function(){var t=this,e=t.cy.window(),r=function(N){return N.selected()},a=function(N){var G=N.getRootNode();if(G&&G.nodeType===11&&G.host!==void 0)return G},n=function(N,G,X,j){N==null&&(N=t.cy);for(var ee=0;ee<G.length;ee++){var ie=G[ee];N.emit({originalEvent:X,type:ie,position:j})}},i=function(N){return N.shiftKey||N.metaKey||N.ctrlKey},o=function(N,G){var X=!0;if(t.cy.hasCompoundNodes()&&N&&N.pannable())for(var j=0;G&&j<G.length;j++){var N=G[j];if(N.isNode()&&N.isParent()&&!N.pannable()){X=!1;break}}else X=!0;return X},s=function(N){N[0]._private.grabbed=!0},l=function(N){N[0]._private.grabbed=!1},u=function(N){N[0]._private.rscratch.inDragLayer=!0},f=function(N){N[0]._private.rscratch.inDragLayer=!1},v=function(N){N[0]._private.rscratch.isGrabTarget=!0},h=function(N){N[0]._private.rscratch.isGrabTarget=!1},c=function(N,G){var X=G.addToList,j=X.has(N);!j&&N.grabbable()&&!N.locked()&&(X.merge(N),s(N))},d=function(N,G){if(N.cy().hasCompoundNodes()&&!(G.inDragLayer==null&&G.addToList==null)){var X=N.descendants();G.inDragLayer&&(X.forEach(u),X.connectedEdges().forEach(u)),G.addToList&&c(X,G)}},g=function(N,G){G=G||{};var X=N.cy().hasCompoundNodes();G.inDragLayer&&(N.forEach(u),N.neighborhood().stdFilter(function(j){return!X||j.isEdge()}).forEach(u)),G.addToList&&N.forEach(function(j){c(j,G)}),d(N,G),m(N,{inDragLayer:G.inDragLayer}),t.updateCachedGrabbedEles()},y=g,p=function(N){N&&(t.getCachedZSortedEles().forEach(function(G){l(G),f(G),h(G)}),t.updateCachedGrabbedEles())},m=function(N,G){if(!(G.inDragLayer==null&&G.addToList==null)&&N.cy().hasCompoundNodes()){var X=N.ancestors().orphans();if(!X.same(N)){var j=X.descendants().spawnSelf().merge(X).unmerge(N).unmerge(N.descendants()),ee=j.connectedEdges();G.inDragLayer&&(ee.forEach(u),j.forEach(u)),G.addToList&&j.forEach(function(ie){c(ie,G)})}}},b=function(){document.activeElement!=null&&document.activeElement.blur!=null&&document.activeElement.blur()},E=typeof MutationObserver<"u",C=typeof ResizeObserver<"u";E?(t.removeObserver=new MutationObserver(function(W){for(var N=0;N<W.length;N++){var G=W[N],X=G.removedNodes;if(X)for(var j=0;j<X.length;j++){var ee=X[j];if(ee===t.container){t.destroy();break}}}}),t.container.parentNode&&t.removeObserver.observe(t.container.parentNode,{childList:!0})):t.registerBinding(t.container,"DOMNodeRemoved",function(W){t.destroy()});var L=Ka(function(){t.cy.resize()},100);E&&(t.styleObserver=new MutationObserver(L),t.styleObserver.observe(t.container,{attributes:!0})),t.registerBinding(e,"resize",L),C&&(t.resizeObserver=new ResizeObserver(L),t.resizeObserver.observe(t.container));var D=function(N,G){for(;N!=null;)G(N),N=N.parentNode},R=function(){t.invalidateContainerClientCoordsCache()};D(t.container,function(W){t.registerBinding(W,"transitionend",R),t.registerBinding(W,"animationend",R),t.registerBinding(W,"scroll",R)}),t.registerBinding(t.container,"contextmenu",function(W){W.preventDefault()});var O=function(){return t.selection[4]!==0},M=function(N){for(var G=t.findContainerClientCoords(),X=G[0],j=G[1],ee=G[2],ie=G[3],re=N.touches?N.touches:[N],ve=!1,se=0;se<re.length;se++){var de=re[se];if(X<=de.clientX&&de.clientX<=X+ee&&j<=de.clientY&&de.clientY<=j+ie){ve=!0;break}}if(!ve)return!1;for(var Se=t.container,ge=N.target,ue=ge.parentNode,we=!1;ue;){if(ue===Se){we=!0;break}ue=ue.parentNode}return!!we};t.registerBinding(t.container,"mousedown",function(N){if(M(N)&&!(t.hoverData.which===1&&N.which!==1)){N.preventDefault(),b(),t.hoverData.capture=!0,t.hoverData.which=N.which;var G=t.cy,X=[N.clientX,N.clientY],j=t.projectIntoViewport(X[0],X[1]),ee=t.selection,ie=t.findNearestElements(j[0],j[1],!0,!1),re=ie[0],ve=t.dragData.possibleDragElements;t.hoverData.mdownPos=j,t.hoverData.mdownGPos=X;var se=function(pe){return{originalEvent:N,type:pe,position:{x:j[0],y:j[1]}}},de=function(){t.hoverData.tapholdCancelled=!1,clearTimeout(t.hoverData.tapholdTimeout),t.hoverData.tapholdTimeout=setTimeout(function(){if(!t.hoverData.tapholdCancelled){var pe=t.hoverData.down;pe?pe.emit(se("taphold")):G.emit(se("taphold"))}},t.tapholdDuration)};if(N.which==3){t.hoverData.cxtStarted=!0;var Se={originalEvent:N,type:"cxttapstart",position:{x:j[0],y:j[1]}};re?(re.activate(),re.emit(Se),t.hoverData.down=re):G.emit(Se),t.hoverData.downTime=new Date().getTime(),t.hoverData.cxtDragged=!1}else if(N.which==1){re&&re.activate();{if(re!=null&&t.nodeIsGrabbable(re)){var ge=function(pe){pe.emit(se("grab"))};if(v(re),!re.selected())ve=t.dragData.possibleDragElements=G.collection(),y(re,{addToList:ve}),re.emit(se("grabon")).emit(se("grab"));else{ve=t.dragData.possibleDragElements=G.collection();var ue=G.$(function(we){return we.isNode()&&we.selected()&&t.nodeIsGrabbable(we)});g(ue,{addToList:ve}),re.emit(se("grabon")),ue.forEach(ge)}t.redrawHint("eles",!0),t.redrawHint("drag",!0)}t.hoverData.down=re,t.hoverData.downs=ie,t.hoverData.downTime=new Date().getTime()}n(re,["mousedown","tapstart","vmousedown"],N,{x:j[0],y:j[1]}),re==null?(ee[4]=1,t.data.bgActivePosistion={x:j[0],y:j[1]},t.redrawHint("select",!0),t.redraw()):re.pannable()&&(ee[4]=1),de()}ee[0]=ee[2]=j[0],ee[1]=ee[3]=j[1]}},!1);var P=a(t.container);t.registerBinding([e,P],"mousemove",function(N){var G=t.hoverData.capture;if(!(!G&&!M(N))){var X=!1,j=t.cy,ee=j.zoom(),ie=[N.clientX,N.clientY],re=t.projectIntoViewport(ie[0],ie[1]),ve=t.hoverData.mdownPos,se=t.hoverData.mdownGPos,de=t.selection,Se=null;!t.hoverData.draggingEles&&!t.hoverData.dragging&&!t.hoverData.selecting&&(Se=t.findNearestElement(re[0],re[1],!0,!1));var ge=t.hoverData.last,ue=t.hoverData.down,we=[re[0]-de[2],re[1]-de[3]],pe=t.dragData.possibleDragElements,Ce;if(se){var ze=ie[0]-se[0],Ve=ze*ze,He=ie[1]-se[1],Fe=He*He,Re=Ve+Fe;t.hoverData.isOverThresholdDrag=Ce=Re>=t.desktopTapThreshold2}var Ze=i(N);Ce&&(t.hoverData.tapholdCancelled=!0);var We=function(){var Dt=t.hoverData.dragDelta=t.hoverData.dragDelta||[];Dt.length===0?(Dt.push(we[0]),Dt.push(we[1])):(Dt[0]+=we[0],Dt[1]+=we[1])};X=!0,n(Se,["mousemove","vmousemove","tapdrag"],N,{x:re[0],y:re[1]});var Ue=function(Dt){return{originalEvent:N,type:Dt,position:{x:re[0],y:re[1]}}},nt=function(){t.data.bgActivePosistion=void 0,t.hoverData.selecting||j.emit(Ue("boxstart")),de[4]=1,t.hoverData.selecting=!0,t.redrawHint("select",!0),t.redraw()};if(t.hoverData.which===3){if(Ce){var Ft=Ue("cxtdrag");ue?ue.emit(Ft):j.emit(Ft),t.hoverData.cxtDragged=!0,(!t.hoverData.cxtOver||Se!==t.hoverData.cxtOver)&&(t.hoverData.cxtOver&&t.hoverData.cxtOver.emit(Ue("cxtdragout")),t.hoverData.cxtOver=Se,Se&&Se.emit(Ue("cxtdragover")))}}else if(t.hoverData.dragging){if(X=!0,j.panningEnabled()&&j.userPanningEnabled()){var Rt;if(t.hoverData.justStartedPan){var Ht=t.hoverData.mdownPos;Rt={x:(re[0]-Ht[0])*ee,y:(re[1]-Ht[1])*ee},t.hoverData.justStartedPan=!1}else Rt={x:we[0]*ee,y:we[1]*ee};j.panBy(Rt),j.emit(Ue("dragpan")),t.hoverData.dragged=!0}re=t.projectIntoViewport(N.clientX,N.clientY)}else if(de[4]==1&&(ue==null||ue.pannable())){if(Ce){if(!t.hoverData.dragging&&j.boxSelectionEnabled()&&(Ze||!j.panningEnabled()||!j.userPanningEnabled()))nt();else if(!t.hoverData.selecting&&j.panningEnabled()&&j.userPanningEnabled()){var Nt=o(ue,t.hoverData.downs);Nt&&(t.hoverData.dragging=!0,t.hoverData.justStartedPan=!0,de[4]=0,t.data.bgActivePosistion=ea(ve),t.redrawHint("select",!0),t.redraw())}ue&&ue.pannable()&&ue.active()&&ue.unactivate()}}else{if(ue&&ue.pannable()&&ue.active()&&ue.unactivate(),(!ue||!ue.grabbed())&&Se!=ge&&(ge&&n(ge,["mouseout","tapdragout"],N,{x:re[0],y:re[1]}),Se&&n(Se,["mouseover","tapdragover"],N,{x:re[0],y:re[1]}),t.hoverData.last=Se),ue)if(Ce){if(j.boxSelectionEnabled()&&Ze)ue&&ue.grabbed()&&(p(pe),ue.emit(Ue("freeon")),pe.emit(Ue("free")),t.dragData.didDrag&&(ue.emit(Ue("dragfreeon")),pe.emit(Ue("dragfree")))),nt();else if(ue&&ue.grabbed()&&t.nodeIsDraggable(ue)){var it=!t.dragData.didDrag;it&&t.redrawHint("eles",!0),t.dragData.didDrag=!0,t.hoverData.draggingEles||g(pe,{inDragLayer:!0});var st={x:0,y:0};if(xe(we[0])&&xe(we[1])&&(st.x+=we[0],st.y+=we[1],it)){var ut=t.hoverData.dragDelta;ut&&xe(ut[0])&&xe(ut[1])&&(st.x+=ut[0],st.y+=ut[1])}t.hoverData.draggingEles=!0,pe.silentShift(st).emit(Ue("position")).emit(Ue("drag")),t.redrawHint("drag",!0),t.redraw()}}else We();X=!0}if(de[2]=re[0],de[3]=re[1],X)return N.stopPropagation&&N.stopPropagation(),N.preventDefault&&N.preventDefault(),!1}},!1);var w,x,T;t.registerBinding(e,"mouseup",function(N){if(!(t.hoverData.which===1&&N.which!==1&&t.hoverData.capture)){var G=t.hoverData.capture;if(G){t.hoverData.capture=!1;var X=t.cy,j=t.projectIntoViewport(N.clientX,N.clientY),ee=t.selection,ie=t.findNearestElement(j[0],j[1],!0,!1),re=t.dragData.possibleDragElements,ve=t.hoverData.down,se=i(N);t.data.bgActivePosistion&&(t.redrawHint("select",!0),t.redraw()),t.hoverData.tapholdCancelled=!0,t.data.bgActivePosistion=void 0,ve&&ve.unactivate();var de=function(ze){return{originalEvent:N,type:ze,position:{x:j[0],y:j[1]}}};if(t.hoverData.which===3){var Se=de("cxttapend");if(ve?ve.emit(Se):X.emit(Se),!t.hoverData.cxtDragged){var ge=de("cxttap");ve?ve.emit(ge):X.emit(ge)}t.hoverData.cxtDragged=!1,t.hoverData.which=null}else if(t.hoverData.which===1){if(n(ie,["mouseup","tapend","vmouseup"],N,{x:j[0],y:j[1]}),!t.dragData.didDrag&&!t.hoverData.dragged&&!t.hoverData.selecting&&!t.hoverData.isOverThresholdDrag&&(n(ve,["click","tap","vclick"],N,{x:j[0],y:j[1]}),x=!1,N.timeStamp-T<=X.multiClickDebounceTime()?(w&&clearTimeout(w),x=!0,T=null,n(ve,["dblclick","dbltap","vdblclick"],N,{x:j[0],y:j[1]})):(w=setTimeout(function(){x||n(ve,["oneclick","onetap","voneclick"],N,{x:j[0],y:j[1]})},X.multiClickDebounceTime()),T=N.timeStamp)),ve==null&&!t.dragData.didDrag&&!t.hoverData.selecting&&!t.hoverData.dragged&&!i(N)&&(X.$(r).unselect(["tapunselect"]),re.length>0&&t.redrawHint("eles",!0),t.dragData.possibleDragElements=re=X.collection()),ie==ve&&!t.dragData.didDrag&&!t.hoverData.selecting&&ie!=null&&ie._private.selectable&&(t.hoverData.dragging||(X.selectionType()==="additive"||se?ie.selected()?ie.unselect(["tapunselect"]):ie.select(["tapselect"]):se||(X.$(r).unmerge(ie).unselect(["tapunselect"]),ie.select(["tapselect"]))),t.redrawHint("eles",!0)),t.hoverData.selecting){var ue=X.collection(t.getAllInBox(ee[0],ee[1],ee[2],ee[3]));t.redrawHint("select",!0),ue.length>0&&t.redrawHint("eles",!0),X.emit(de("boxend"));var we=function(ze){return ze.selectable()&&!ze.selected()};X.selectionType()==="additive"||se||X.$(r).unmerge(ue).unselect(),ue.emit(de("box")).stdFilter(we).select().emit(de("boxselect")),t.redraw()}if(t.hoverData.dragging&&(t.hoverData.dragging=!1,t.redrawHint("select",!0),t.redrawHint("eles",!0),t.redraw()),!ee[4]){t.redrawHint("drag",!0),t.redrawHint("eles",!0);var pe=ve&&ve.grabbed();p(re),pe&&(ve.emit(de("freeon")),re.emit(de("free")),t.dragData.didDrag&&(ve.emit(de("dragfreeon")),re.emit(de("dragfree"))))}}ee[4]=0,t.hoverData.down=null,t.hoverData.cxtStarted=!1,t.hoverData.draggingEles=!1,t.hoverData.selecting=!1,t.hoverData.isOverThresholdDrag=!1,t.dragData.didDrag=!1,t.hoverData.dragged=!1,t.hoverData.dragDelta=[],t.hoverData.mdownPos=null,t.hoverData.mdownGPos=null,t.hoverData.which=null}}},!1);var A=[],S=4,I,B=1e5,k=function(N,G){for(var X=0;X<N.length;X++)if(N[X]%G!==0)return!1;return!0},z=function(N){for(var G=Math.abs(N[0]),X=1;X<N.length;X++)if(Math.abs(N[X])!==G)return!1;return!0},F=function(N){var G=!1,X=N.deltaY;if(X==null&&(N.wheelDeltaY!=null?X=N.wheelDeltaY/4:N.wheelDelta!=null&&(X=N.wheelDelta/4)),X!==0){if(I==null)if(A.length>=S){var j=A;if(I=k(j,5),!I){var ee=Math.abs(j[0]);I=z(j)&&ee>5}if(I)for(var ie=0;ie<j.length;ie++)B=Math.min(Math.abs(j[ie]),B)}else A.push(X),G=!0;else I&&(B=Math.min(Math.abs(X),B));if(!t.scrollingPage){var re=t.cy,ve=re.zoom(),se=re.pan(),de=t.projectIntoViewport(N.clientX,N.clientY),Se=[de[0]*ve+se.x,de[1]*ve+se.y];if(t.hoverData.draggingEles||t.hoverData.dragging||t.hoverData.cxtStarted||O()){N.preventDefault();return}if(re.panningEnabled()&&re.userPanningEnabled()&&re.zoomingEnabled()&&re.userZoomingEnabled()){N.preventDefault(),t.data.wheelZooming=!0,clearTimeout(t.data.wheelTimeout),t.data.wheelTimeout=setTimeout(function(){t.data.wheelZooming=!1,t.redrawHint("eles",!0),t.redraw()},150);var ge;G&&Math.abs(X)>5&&(X=ms(X)*5),ge=X/-250,I&&(ge/=B,ge*=3),ge=ge*t.wheelSensitivity;var ue=N.deltaMode===1;ue&&(ge*=33);var we=re.zoom()*Math.pow(10,ge);N.type==="gesturechange"&&(we=t.gestureStartZoom*N.scale),re.zoom({level:we,renderedPosition:{x:Se[0],y:Se[1]}}),re.emit({type:N.type==="gesturechange"?"pinchzoom":"scrollzoom",originalEvent:N,position:{x:de[0],y:de[1]}})}}}};t.registerBinding(t.container,"wheel",F,!0),t.registerBinding(e,"scroll",function(N){t.scrollingPage=!0,clearTimeout(t.scrollingPageTimeout),t.scrollingPageTimeout=setTimeout(function(){t.scrollingPage=!1},250)},!0),t.registerBinding(t.container,"gesturestart",function(N){t.gestureStartZoom=t.cy.zoom(),t.hasTouchStarted||N.preventDefault()},!0),t.registerBinding(t.container,"gesturechange",function(W){t.hasTouchStarted||F(W)},!0),t.registerBinding(t.container,"mouseout",function(N){var G=t.projectIntoViewport(N.clientX,N.clientY);t.cy.emit({originalEvent:N,type:"mouseout",position:{x:G[0],y:G[1]}})},!1),t.registerBinding(t.container,"mouseover",function(N){var G=t.projectIntoViewport(N.clientX,N.clientY);t.cy.emit({originalEvent:N,type:"mouseover",position:{x:G[0],y:G[1]}})},!1);var V,Z,q,_,K,U,J,$,H,Y,Q,oe,te,Te=function(N,G,X,j){return Math.sqrt((X-N)*(X-N)+(j-G)*(j-G))},Le=function(N,G,X,j){return(X-N)*(X-N)+(j-G)*(j-G)},he;t.registerBinding(t.container,"touchstart",he=function(N){if(t.hasTouchStarted=!0,!!M(N)){b(),t.touchData.capture=!0,t.data.bgActivePosistion=void 0;var G=t.cy,X=t.touchData.now,j=t.touchData.earlier;if(N.touches[0]){var ee=t.projectIntoViewport(N.touches[0].clientX,N.touches[0].clientY);X[0]=ee[0],X[1]=ee[1]}if(N.touches[1]){var ee=t.projectIntoViewport(N.touches[1].clientX,N.touches[1].clientY);X[2]=ee[0],X[3]=ee[1]}if(N.touches[2]){var ee=t.projectIntoViewport(N.touches[2].clientX,N.touches[2].clientY);X[4]=ee[0],X[5]=ee[1]}var ie=function(Ze){return{originalEvent:N,type:Ze,position:{x:X[0],y:X[1]}}};if(N.touches[1]){t.touchData.singleTouchMoved=!0,p(t.dragData.touchDragEles);var re=t.findContainerClientCoords();H=re[0],Y=re[1],Q=re[2],oe=re[3],V=N.touches[0].clientX-H,Z=N.touches[0].clientY-Y,q=N.touches[1].clientX-H,_=N.touches[1].clientY-Y,te=0<=V&&V<=Q&&0<=q&&q<=Q&&0<=Z&&Z<=oe&&0<=_&&_<=oe;var ve=G.pan(),se=G.zoom();K=Te(V,Z,q,_),U=Le(V,Z,q,_),J=[(V+q)/2,(Z+_)/2],$=[(J[0]-ve.x)/se,(J[1]-ve.y)/se];var de=200,Se=de*de;if(U<Se&&!N.touches[2]){var ge=t.findNearestElement(X[0],X[1],!0,!0),ue=t.findNearestElement(X[2],X[3],!0,!0);ge&&ge.isNode()?(ge.activate().emit(ie("cxttapstart")),t.touchData.start=ge):ue&&ue.isNode()?(ue.activate().emit(ie("cxttapstart")),t.touchData.start=ue):G.emit(ie("cxttapstart")),t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxt=!0,t.touchData.cxtDragged=!1,t.data.bgActivePosistion=void 0,t.redraw();return}}if(N.touches[2])G.boxSelectionEnabled()&&N.preventDefault();else if(!N.touches[1]){if(N.touches[0]){var we=t.findNearestElements(X[0],X[1],!0,!0),pe=we[0];if(pe!=null&&(pe.activate(),t.touchData.start=pe,t.touchData.starts=we,t.nodeIsGrabbable(pe))){var Ce=t.dragData.touchDragEles=G.collection(),ze=null;t.redrawHint("eles",!0),t.redrawHint("drag",!0),pe.selected()?(ze=G.$(function(Re){return Re.selected()&&t.nodeIsGrabbable(Re)}),g(ze,{addToList:Ce})):y(pe,{addToList:Ce}),v(pe),pe.emit(ie("grabon")),ze?ze.forEach(function(Re){Re.emit(ie("grab"))}):pe.emit(ie("grab"))}n(pe,["touchstart","tapstart","vmousedown"],N,{x:X[0],y:X[1]}),pe==null&&(t.data.bgActivePosistion={x:ee[0],y:ee[1]},t.redrawHint("select",!0),t.redraw()),t.touchData.singleTouchMoved=!1,t.touchData.singleTouchStartTime=+new Date,clearTimeout(t.touchData.tapholdTimeout),t.touchData.tapholdTimeout=setTimeout(function(){t.touchData.singleTouchMoved===!1&&!t.pinching&&!t.touchData.selecting&&n(t.touchData.start,["taphold"],N,{x:X[0],y:X[1]})},t.tapholdDuration)}}if(N.touches.length>=1){for(var Ve=t.touchData.startPosition=[null,null,null,null,null,null],He=0;He<X.length;He++)Ve[He]=j[He]=X[He];var Fe=N.touches[0];t.touchData.startGPosition=[Fe.clientX,Fe.clientY]}}},!1);var le;t.registerBinding(e,"touchmove",le=function(N){var G=t.touchData.capture;if(!(!G&&!M(N))){var X=t.selection,j=t.cy,ee=t.touchData.now,ie=t.touchData.earlier,re=j.zoom();if(N.touches[0]){var ve=t.projectIntoViewport(N.touches[0].clientX,N.touches[0].clientY);ee[0]=ve[0],ee[1]=ve[1]}if(N.touches[1]){var ve=t.projectIntoViewport(N.touches[1].clientX,N.touches[1].clientY);ee[2]=ve[0],ee[3]=ve[1]}if(N.touches[2]){var ve=t.projectIntoViewport(N.touches[2].clientX,N.touches[2].clientY);ee[4]=ve[0],ee[5]=ve[1]}var se=function(vh){return{originalEvent:N,type:vh,position:{x:ee[0],y:ee[1]}}},de=t.touchData.startGPosition,Se;if(G&&N.touches[0]&&de){for(var ge=[],ue=0;ue<ee.length;ue++)ge[ue]=ee[ue]-ie[ue];var we=N.touches[0].clientX-de[0],pe=we*we,Ce=N.touches[0].clientY-de[1],ze=Ce*Ce,Ve=pe+ze;Se=Ve>=t.touchTapThreshold2}if(G&&t.touchData.cxt){N.preventDefault();var He=N.touches[0].clientX-H,Fe=N.touches[0].clientY-Y,Re=N.touches[1].clientX-H,Ze=N.touches[1].clientY-Y,We=Le(He,Fe,Re,Ze),Ue=We/U,nt=150,Ft=nt*nt,Rt=1.5,Ht=Rt*Rt;if(Ue>=Ht||We>=Ft){t.touchData.cxt=!1,t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var Nt=se("cxttapend");t.touchData.start?(t.touchData.start.unactivate().emit(Nt),t.touchData.start=null):j.emit(Nt)}}if(G&&t.touchData.cxt){var Nt=se("cxtdrag");t.data.bgActivePosistion=void 0,t.redrawHint("select",!0),t.touchData.start?t.touchData.start.emit(Nt):j.emit(Nt),t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxtDragged=!0;var it=t.findNearestElement(ee[0],ee[1],!0,!0);(!t.touchData.cxtOver||it!==t.touchData.cxtOver)&&(t.touchData.cxtOver&&t.touchData.cxtOver.emit(se("cxtdragout")),t.touchData.cxtOver=it,it&&it.emit(se("cxtdragover")))}else if(G&&N.touches[2]&&j.boxSelectionEnabled())N.preventDefault(),t.data.bgActivePosistion=void 0,this.lastThreeTouch=+new Date,t.touchData.selecting||j.emit(se("boxstart")),t.touchData.selecting=!0,t.touchData.didSelect=!0,X[4]=1,!X||X.length===0||X[0]===void 0?(X[0]=(ee[0]+ee[2]+ee[4])/3,X[1]=(ee[1]+ee[3]+ee[5])/3,X[2]=(ee[0]+ee[2]+ee[4])/3+1,X[3]=(ee[1]+ee[3]+ee[5])/3+1):(X[2]=(ee[0]+ee[2]+ee[4])/3,X[3]=(ee[1]+ee[3]+ee[5])/3),t.redrawHint("select",!0),t.redraw();else if(G&&N.touches[1]&&!t.touchData.didSelect&&j.zoomingEnabled()&&j.panningEnabled()&&j.userZoomingEnabled()&&j.userPanningEnabled()){N.preventDefault(),t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var st=t.dragData.touchDragEles;if(st){t.redrawHint("drag",!0);for(var ut=0;ut<st.length;ut++){var zt=st[ut]._private;zt.grabbed=!1,zt.rscratch.inDragLayer=!1}}var Dt=t.touchData.start,He=N.touches[0].clientX-H,Fe=N.touches[0].clientY-Y,Re=N.touches[1].clientX-H,Ze=N.touches[1].clientY-Y,Wr=Te(He,Fe,Re,Ze),nn=Wr/K;if(te){var pa=He-V,fi=Fe-Z,ya=Re-q,on=Ze-_,sn=(pa+ya)/2,ma=(fi+on)/2,fr=j.zoom(),lt=fr*nn,ke=j.pan(),Xe=$[0]*fr+ke.x,qt=$[1]*fr+ke.y,Pt={x:-lt/fr*(Xe-ke.x-sn)+Xe,y:-lt/fr*(qt-ke.y-ma)+qt};if(Dt&&Dt.active()){var st=t.dragData.touchDragEles;p(st),t.redrawHint("drag",!0),t.redrawHint("eles",!0),Dt.unactivate().emit(se("freeon")),st.emit(se("free")),t.dragData.didDrag&&(Dt.emit(se("dragfreeon")),st.emit(se("dragfree")))}j.viewport({zoom:lt,pan:Pt,cancelOnFailedZoom:!0}),j.emit(se("pinchzoom")),K=Wr,V=He,Z=Fe,q=Re,_=Ze,t.pinching=!0}if(N.touches[0]){var ve=t.projectIntoViewport(N.touches[0].clientX,N.touches[0].clientY);ee[0]=ve[0],ee[1]=ve[1]}if(N.touches[1]){var ve=t.projectIntoViewport(N.touches[1].clientX,N.touches[1].clientY);ee[2]=ve[0],ee[3]=ve[1]}if(N.touches[2]){var ve=t.projectIntoViewport(N.touches[2].clientX,N.touches[2].clientY);ee[4]=ve[0],ee[5]=ve[1]}}else if(N.touches[0]&&!t.touchData.didSelect){var Yt=t.touchData.start,vi=t.touchData.last,it;if(!t.hoverData.draggingEles&&!t.swipePanning&&(it=t.findNearestElement(ee[0],ee[1],!0,!0)),G&&Yt!=null&&N.preventDefault(),G&&Yt!=null&&t.nodeIsDraggable(Yt))if(Se){var st=t.dragData.touchDragEles,Gs=!t.dragData.didDrag;Gs&&g(st,{inDragLayer:!0}),t.dragData.didDrag=!0;var ba={x:0,y:0};if(xe(ge[0])&&xe(ge[1])&&(ba.x+=ge[0],ba.y+=ge[1],Gs)){t.redrawHint("eles",!0);var Wt=t.touchData.dragDelta;Wt&&xe(Wt[0])&&xe(Wt[1])&&(ba.x+=Wt[0],ba.y+=Wt[1])}t.hoverData.draggingEles=!0,st.silentShift(ba).emit(se("position")).emit(se("drag")),t.redrawHint("drag",!0),t.touchData.startPosition[0]==ie[0]&&t.touchData.startPosition[1]==ie[1]&&t.redrawHint("eles",!0),t.redraw()}else{var Wt=t.touchData.dragDelta=t.touchData.dragDelta||[];Wt.length===0?(Wt.push(ge[0]),Wt.push(ge[1])):(Wt[0]+=ge[0],Wt[1]+=ge[1])}if(n(Yt||it,["touchmove","tapdrag","vmousemove"],N,{x:ee[0],y:ee[1]}),(!Yt||!Yt.grabbed())&&it!=vi&&(vi&&vi.emit(se("tapdragout")),it&&it.emit(se("tapdragover"))),t.touchData.last=it,G)for(var ut=0;ut<ee.length;ut++)ee[ut]&&t.touchData.startPosition[ut]&&Se&&(t.touchData.singleTouchMoved=!0);if(G&&(Yt==null||Yt.pannable())&&j.panningEnabled()&&j.userPanningEnabled()){var fh=o(Yt,t.touchData.starts);fh&&(N.preventDefault(),t.data.bgActivePosistion||(t.data.bgActivePosistion=ea(t.touchData.startPosition)),t.swipePanning?(j.panBy({x:ge[0]*re,y:ge[1]*re}),j.emit(se("dragpan"))):Se&&(t.swipePanning=!0,j.panBy({x:we*re,y:Ce*re}),j.emit(se("dragpan")),Yt&&(Yt.unactivate(),t.redrawHint("select",!0),t.touchData.start=null)));var ve=t.projectIntoViewport(N.touches[0].clientX,N.touches[0].clientY);ee[0]=ve[0],ee[1]=ve[1]}}for(var ue=0;ue<ee.length;ue++)ie[ue]=ee[ue];G&&N.touches.length>0&&!t.hoverData.draggingEles&&!t.swipePanning&&t.data.bgActivePosistion!=null&&(t.data.bgActivePosistion=void 0,t.redrawHint("select",!0),t.redraw())}},!1);var ce;t.registerBinding(e,"touchcancel",ce=function(N){var G=t.touchData.start;t.touchData.capture=!1,G&&G.unactivate()});var fe,ye,me,Ee;if(t.registerBinding(e,"touchend",fe=function(N){var G=t.touchData.start,X=t.touchData.capture;if(X)N.touches.length===0&&(t.touchData.capture=!1),N.preventDefault();else return;var j=t.selection;t.swipePanning=!1,t.hoverData.draggingEles=!1;var ee=t.cy,ie=ee.zoom(),re=t.touchData.now,ve=t.touchData.earlier;if(N.touches[0]){var se=t.projectIntoViewport(N.touches[0].clientX,N.touches[0].clientY);re[0]=se[0],re[1]=se[1]}if(N.touches[1]){var se=t.projectIntoViewport(N.touches[1].clientX,N.touches[1].clientY);re[2]=se[0],re[3]=se[1]}if(N.touches[2]){var se=t.projectIntoViewport(N.touches[2].clientX,N.touches[2].clientY);re[4]=se[0],re[5]=se[1]}var de=function(Ft){return{originalEvent:N,type:Ft,position:{x:re[0],y:re[1]}}};G&&G.unactivate();var Se;if(t.touchData.cxt){if(Se=de("cxttapend"),G?G.emit(Se):ee.emit(Se),!t.touchData.cxtDragged){var ge=de("cxttap");G?G.emit(ge):ee.emit(ge)}t.touchData.start&&(t.touchData.start._private.grabbed=!1),t.touchData.cxt=!1,t.touchData.start=null,t.redraw();return}if(!N.touches[2]&&ee.boxSelectionEnabled()&&t.touchData.selecting){t.touchData.selecting=!1;var ue=ee.collection(t.getAllInBox(j[0],j[1],j[2],j[3]));j[0]=void 0,j[1]=void 0,j[2]=void 0,j[3]=void 0,j[4]=0,t.redrawHint("select",!0),ee.emit(de("boxend"));var we=function(Ft){return Ft.selectable()&&!Ft.selected()};ue.emit(de("box")).stdFilter(we).select().emit(de("boxselect")),ue.nonempty()&&t.redrawHint("eles",!0),t.redraw()}if(G?.unactivate(),N.touches[2])t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);else if(!N.touches[1]){if(!N.touches[0]){if(!N.touches[0]){t.data.bgActivePosistion=void 0,t.redrawHint("select",!0);var pe=t.dragData.touchDragEles;if(G!=null){var Ce=G._private.grabbed;p(pe),t.redrawHint("drag",!0),t.redrawHint("eles",!0),Ce&&(G.emit(de("freeon")),pe.emit(de("free")),t.dragData.didDrag&&(G.emit(de("dragfreeon")),pe.emit(de("dragfree")))),n(G,["touchend","tapend","vmouseup","tapdragout"],N,{x:re[0],y:re[1]}),G.unactivate(),t.touchData.start=null}else{var ze=t.findNearestElement(re[0],re[1],!0,!0);n(ze,["touchend","tapend","vmouseup","tapdragout"],N,{x:re[0],y:re[1]})}var Ve=t.touchData.startPosition[0]-re[0],He=Ve*Ve,Fe=t.touchData.startPosition[1]-re[1],Re=Fe*Fe,Ze=He+Re,We=Ze*ie*ie;t.touchData.singleTouchMoved||(G||ee.$(":selected").unselect(["tapunselect"]),n(G,["tap","vclick"],N,{x:re[0],y:re[1]}),ye=!1,N.timeStamp-Ee<=ee.multiClickDebounceTime()?(me&&clearTimeout(me),ye=!0,Ee=null,n(G,["dbltap","vdblclick"],N,{x:re[0],y:re[1]})):(me=setTimeout(function(){ye||n(G,["onetap","voneclick"],N,{x:re[0],y:re[1]})},ee.multiClickDebounceTime()),Ee=N.timeStamp)),G!=null&&!t.dragData.didDrag&&G._private.selectable&&We<t.touchTapThreshold2&&!t.pinching&&(ee.selectionType()==="single"?(ee.$(r).unmerge(G).unselect(["tapunselect"]),G.select(["tapselect"])):G.selected()?G.unselect(["tapunselect"]):G.select(["tapselect"]),t.redrawHint("eles",!0)),t.touchData.singleTouchMoved=!0}}}for(var Ue=0;Ue<re.length;Ue++)ve[Ue]=re[Ue];t.dragData.didDrag=!1,N.touches.length===0&&(t.touchData.dragDelta=[],t.touchData.startPosition=[null,null,null,null,null,null],t.touchData.startGPosition=null,t.touchData.didSelect=!1),N.touches.length<2&&(N.touches.length===1&&(t.touchData.startGPosition=[N.touches[0].clientX,N.touches[0].clientY]),t.pinching=!1,t.redrawHint("eles",!0),t.redraw())},!1),typeof TouchEvent>"u"){var be=[],Ae=function(N){return{clientX:N.clientX,clientY:N.clientY,force:1,identifier:N.pointerId,pageX:N.pageX,pageY:N.pageY,radiusX:N.width/2,radiusY:N.height/2,screenX:N.screenX,screenY:N.screenY,target:N.target}},Ie=function(N){return{event:N,touch:Ae(N)}},Oe=function(N){be.push(Ie(N))},Be=function(N){for(var G=0;G<be.length;G++){var X=be[G];if(X.event.pointerId===N.pointerId){be.splice(G,1);return}}},Pe=function(N){var G=be.filter(function(X){return X.event.pointerId===N.pointerId})[0];G.event=N,G.touch=Ae(N)},ne=function(N){N.touches=be.map(function(G){return G.touch})},ae=function(N){return N.pointerType==="mouse"||N.pointerType===4};t.registerBinding(t.container,"pointerdown",function(W){ae(W)||(W.preventDefault(),Oe(W),ne(W),he(W))}),t.registerBinding(t.container,"pointerup",function(W){ae(W)||(Be(W),ne(W),fe(W))}),t.registerBinding(t.container,"pointercancel",function(W){ae(W)||(Be(W),ne(W),ce(W))}),t.registerBinding(t.container,"pointermove",function(W){ae(W)||(W.preventDefault(),Pe(W),ne(W),le(W))})}};var ur={};ur.generatePolygon=function(t,e){return this.nodeShapes[t]={renderer:this,name:t,points:e,draw:function(a,n,i,o,s,l){this.renderer.nodeShapeImpl("polygon",a,n,i,o,s,this.points)},intersectLine:function(a,n,i,o,s,l,u,f){return ka(s,l,this.points,a,n,i/2,o/2,u)},checkPoint:function(a,n,i,o,s,l,u,f){return or(a,n,this.points,l,u,o,s,[0,-1],i)},hasMiterBounds:t!=="rectangle",miterBounds:function(a,n,i,o,s,l){return _c(this.points,a,n,i,o,s)}}};ur.generateEllipse=function(){return this.nodeShapes.ellipse={renderer:this,name:"ellipse",draw:function(e,r,a,n,i,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,i)},intersectLine:function(e,r,a,n,i,o,s,l){return ad(i,o,e,r,a/2+s,n/2+s)},checkPoint:function(e,r,a,n,i,o,s,l){return kr(e,r,n,i,o,s,a)}}};ur.generateRoundPolygon=function(t,e){return this.nodeShapes[t]={renderer:this,name:t,points:e,getOrCreateCorners:function(a,n,i,o,s,l,u){if(l[u]!==void 0&&l[u+"-cx"]===a&&l[u+"-cy"]===n)return l[u];l[u]=new Array(e.length/2),l[u+"-cx"]=a,l[u+"-cy"]=n;var f=i/2,v=o/2;s=s==="auto"?Uf(i,o):s;for(var h=new Array(e.length/2),c=0;c<e.length/2;c++)h[c]={x:a+f*e[c*2],y:n+v*e[c*2+1]};var d,g,y,p,m=h.length;for(g=h[m-1],d=0;d<m;d++)y=h[d%m],p=h[(d+1)%m],l[u][d]=Ns(g,y,p,s),g=y,y=p;return l[u]},draw:function(a,n,i,o,s,l,u){this.renderer.nodeShapeImpl("round-polygon",a,n,i,o,s,this.points,this.getOrCreateCorners(n,i,o,s,l,u,"drawCorners"))},intersectLine:function(a,n,i,o,s,l,u,f,v){return id(s,l,this.points,a,n,i,o,u,this.getOrCreateCorners(a,n,i,o,f,v,"corners"))},checkPoint:function(a,n,i,o,s,l,u,f,v){return rd(a,n,this.points,l,u,o,s,this.getOrCreateCorners(l,u,o,s,f,v,"corners"))}}};ur.generateRoundRectangle=function(){return this.nodeShapes["round-rectangle"]=this.nodeShapes.roundrectangle={renderer:this,name:"round-rectangle",points:At(4,0),draw:function(e,r,a,n,i,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,i,this.points,o)},intersectLine:function(e,r,a,n,i,o,s,l){return Vf(i,o,e,r,a,n,s,l)},checkPoint:function(e,r,a,n,i,o,s,l){var u=n/2,f=i/2;l=l==="auto"?Er(n,i):l,l=Math.min(u,f,l);var v=l*2;return!!(or(e,r,this.points,o,s,n,i-v,[0,-1],a)||or(e,r,this.points,o,s,n-v,i,[0,-1],a)||kr(e,r,v,v,o-u+l,s-f+l,a)||kr(e,r,v,v,o+u-l,s-f+l,a)||kr(e,r,v,v,o+u-l,s+f-l,a)||kr(e,r,v,v,o-u+l,s+f-l,a))}}};ur.generateCutRectangle=function(){return this.nodeShapes["cut-rectangle"]=this.nodeShapes.cutrectangle={renderer:this,name:"cut-rectangle",cornerLength:ws(),points:At(4,0),draw:function(e,r,a,n,i,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,i,null,o)},generateCutTrianglePts:function(e,r,a,n,i){var o=i==="auto"?this.cornerLength:i,s=r/2,l=e/2,u=a-l,f=a+l,v=n-s,h=n+s;return{topLeft:[u,v+o,u+o,v,u+o,v+o],topRight:[f-o,v,f,v+o,f-o,v+o],bottomRight:[f,h-o,f-o,h,f-o,h-o],bottomLeft:[u+o,h,u,h-o,u+o,h-o]}},intersectLine:function(e,r,a,n,i,o,s,l){var u=this.generateCutTrianglePts(a+2*s,n+2*s,e,r,l),f=[].concat.apply([],[u.topLeft.splice(0,4),u.topRight.splice(0,4),u.bottomRight.splice(0,4),u.bottomLeft.splice(0,4)]);return ka(i,o,f,e,r)},checkPoint:function(e,r,a,n,i,o,s,l){var u=l==="auto"?this.cornerLength:l;if(or(e,r,this.points,o,s,n,i-2*u,[0,-1],a)||or(e,r,this.points,o,s,n-2*u,i,[0,-1],a))return!0;var f=this.generateCutTrianglePts(n,i,o,s);return It(e,r,f.topLeft)||It(e,r,f.topRight)||It(e,r,f.bottomRight)||It(e,r,f.bottomLeft)}}};ur.generateBarrel=function(){return this.nodeShapes.barrel={renderer:this,name:"barrel",points:At(4,0),draw:function(e,r,a,n,i,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,i)},intersectLine:function(e,r,a,n,i,o,s,l){var u=.15,f=.5,v=.85,h=this.generateBarrelBezierPts(a+2*s,n+2*s,e,r),c=function(y){var p=aa({x:y[0],y:y[1]},{x:y[2],y:y[3]},{x:y[4],y:y[5]},u),m=aa({x:y[0],y:y[1]},{x:y[2],y:y[3]},{x:y[4],y:y[5]},f),b=aa({x:y[0],y:y[1]},{x:y[2],y:y[3]},{x:y[4],y:y[5]},v);return[y[0],y[1],p.x,p.y,m.x,m.y,b.x,b.y,y[4],y[5]]},d=[].concat(c(h.topLeft),c(h.topRight),c(h.bottomRight),c(h.bottomLeft));return ka(i,o,d,e,r)},generateBarrelBezierPts:function(e,r,a,n){var i=r/2,o=e/2,s=a-o,l=a+o,u=n-i,f=n+i,v=Xo(e,r),h=v.heightOffset,c=v.widthOffset,d=v.ctrlPtOffsetPct*e,g={topLeft:[s,u+h,s+d,u,s+c,u],topRight:[l-c,u,l-d,u,l,u+h],bottomRight:[l,f-h,l-d,f,l-c,f],bottomLeft:[s+c,f,s+d,f,s,f-h]};return g.topLeft.isTop=!0,g.topRight.isTop=!0,g.bottomLeft.isBottom=!0,g.bottomRight.isBottom=!0,g},checkPoint:function(e,r,a,n,i,o,s,l){var u=Xo(n,i),f=u.heightOffset,v=u.widthOffset;if(or(e,r,this.points,o,s,n,i-2*f,[0,-1],a)||or(e,r,this.points,o,s,n-2*v,i,[0,-1],a))return!0;for(var h=this.generateBarrelBezierPts(n,i,o,s),c=function(R,O,M){var P=M[4],w=M[2],x=M[0],T=M[5],A=M[1],S=Math.min(P,x),I=Math.max(P,x),B=Math.min(T,A),k=Math.max(T,A);if(S<=R&&R<=I&&B<=O&&O<=k){var z=od(P,w,x),F=Jc(z[0],z[1],z[2],R),V=F.filter(function(Z){return 0<=Z&&Z<=1});if(V.length>0)return V[0]}return null},d=Object.keys(h),g=0;g<d.length;g++){var y=d[g],p=h[y],m=c(e,r,p);if(m!=null){var b=p[5],E=p[3],C=p[1],L=pt(b,E,C,m);if(p.isTop&&L<=r||p.isBottom&&r<=L)return!0}}return!1}}};ur.generateBottomRoundrectangle=function(){return this.nodeShapes["bottom-round-rectangle"]=this.nodeShapes.bottomroundrectangle={renderer:this,name:"bottom-round-rectangle",points:At(4,0),draw:function(e,r,a,n,i,o){this.renderer.nodeShapeImpl(this.name,e,r,a,n,i,this.points,o)},intersectLine:function(e,r,a,n,i,o,s,l){var u=e-(a/2+s),f=r-(n/2+s),v=f,h=e+(a/2+s),c=pr(i,o,e,r,u,f,h,v,!1);return c.length>0?c:Vf(i,o,e,r,a,n,s,l)},checkPoint:function(e,r,a,n,i,o,s,l){l=l==="auto"?Er(n,i):l;var u=2*l;if(or(e,r,this.points,o,s,n,i-u,[0,-1],a)||or(e,r,this.points,o,s,n-u,i,[0,-1],a))return!0;var f=n/2+2*a,v=i/2+2*a,h=[o-f,s-v,o-f,s,o+f,s,o+f,s-v];return!!(It(e,r,h)||kr(e,r,u,u,o+n/2-l,s+i/2-l,a)||kr(e,r,u,u,o-n/2+l,s+i/2-l,a))}}};ur.registerNodeShapes=function(){var t=this.nodeShapes={},e=this;this.generateEllipse(),this.generatePolygon("triangle",At(3,0)),this.generateRoundPolygon("round-triangle",At(3,0)),this.generatePolygon("rectangle",At(4,0)),t.square=t.rectangle,this.generateRoundRectangle(),this.generateCutRectangle(),this.generateBarrel(),this.generateBottomRoundrectangle();{var r=[0,1,1,0,0,-1,-1,0];this.generatePolygon("diamond",r),this.generateRoundPolygon("round-diamond",r)}this.generatePolygon("pentagon",At(5,0)),this.generateRoundPolygon("round-pentagon",At(5,0)),this.generatePolygon("hexagon",At(6,0)),this.generateRoundPolygon("round-hexagon",At(6,0)),this.generatePolygon("heptagon",At(7,0)),this.generateRoundPolygon("round-heptagon",At(7,0)),this.generatePolygon("octagon",At(8,0)),this.generateRoundPolygon("round-octagon",At(8,0));var a=new Array(20);{var n=Wo(5,0),i=Wo(5,Math.PI/5),o=.5*(3-Math.sqrt(5));o*=1.57;for(var s=0;s<i.length/2;s++)i[s*2]*=o,i[s*2+1]*=o;for(var s=0;s<20/4;s++)a[s*4]=n[s*2],a[s*4+1]=n[s*2+1],a[s*4+2]=i[s*2],a[s*4+3]=i[s*2+1]}a=Gf(a),this.generatePolygon("star",a),this.generatePolygon("vee",[-1,-1,0,-.333,1,-1,0,1]),this.generatePolygon("rhomboid",[-1,-1,.333,-1,1,1,-.333,1]),this.generatePolygon("right-rhomboid",[-.333,-1,1,-1,.333,1,-1,1]),this.nodeShapes.concavehexagon=this.generatePolygon("concave-hexagon",[-1,-.95,-.75,0,-1,.95,1,.95,.75,0,1,-.95]);{var l=[-1,-1,.25,-1,1,0,.25,1,-1,1];this.generatePolygon("tag",l),this.generateRoundPolygon("round-tag",l)}t.makePolygon=function(u){var f=u.join("$"),v="polygon-"+f,h;return(h=this[v])?h:e.generatePolygon(v,u)}};var ja={};ja.timeToRender=function(){return this.redrawTotalTime/this.redrawCount};ja.redraw=function(t){t=t||Bf();var e=this;e.averageRedrawTime===void 0&&(e.averageRedrawTime=0),e.lastRedrawTime===void 0&&(e.lastRedrawTime=0),e.lastDrawTime===void 0&&(e.lastDrawTime=0),e.requestedFrame=!0,e.renderOptions=t};ja.beforeRender=function(t,e){if(!this.destroyed){e==null&&rt("Priority is not optional for beforeRender");var r=this.beforeRenderCallbacks;r.push({fn:t,priority:e}),r.sort(function(a,n){return n.priority-a.priority})}};var jl=function(e,r,a){for(var n=e.beforeRenderCallbacks,i=0;i<n.length;i++)n[i].fn(r,a)};ja.startRenderLoop=function(){var t=this,e=t.cy;if(!t.renderLoopStarted){t.renderLoopStarted=!0;var r=function(n){if(!t.destroyed){if(!e.batching())if(t.requestedFrame&&!t.skipFrame){jl(t,!0,n);var i=ir();t.render(t.renderOptions);var o=t.lastDrawTime=ir();t.averageRedrawTime===void 0&&(t.averageRedrawTime=o-i),t.redrawCount===void 0&&(t.redrawCount=0),t.redrawCount++,t.redrawTotalTime===void 0&&(t.redrawTotalTime=0);var s=o-i;t.redrawTotalTime+=s,t.lastRedrawTime=s,t.averageRedrawTime=t.averageRedrawTime/2+s/2,t.requestedFrame=!1}else jl(t,!1,n);t.skipFrame=!1,In(r)}};In(r)}};var xy=function(e){this.init(e)},Uv=xy,ga=Uv.prototype;ga.clientFunctions=["redrawHint","render","renderTo","matchCanvasSize","nodeShapeImpl","arrowShapeImpl"];ga.init=function(t){var e=this;e.options=t,e.cy=t.cy;var r=e.container=t.cy.container(),a=e.cy.window();if(a){var n=a.document,i=n.head,o="__________cytoscape_stylesheet",s="__________cytoscape_container",l=n.getElementById(o)!=null;if(r.className.indexOf(s)<0&&(r.className=(r.className||"")+" "+s),!l){var u=n.createElement("style");u.id=o,u.textContent="."+s+" { position: relative; }",i.insertBefore(u,i.children[0])}var f=a.getComputedStyle(r),v=f.getPropertyValue("position");v==="static"&&_e("A Cytoscape container has style position:static and so can not use UI extensions properly")}e.selection=[void 0,void 0,void 0,void 0,0],e.bezierProjPcts=[.05,.225,.4,.5,.6,.775,.95],e.hoverData={down:null,last:null,downTime:null,triggerMode:null,dragging:!1,initialPan:[null,null],capture:!1},e.dragData={possibleDragElements:[]},e.touchData={start:null,capture:!1,startPosition:[null,null,null,null,null,null],singleTouchStartTime:null,singleTouchMoved:!0,now:[null,null,null,null,null,null],earlier:[null,null,null,null,null,null]},e.redraws=0,e.showFps=t.showFps,e.debug=t.debug,e.webgl=t.webgl,e.hideEdgesOnViewport=t.hideEdgesOnViewport,e.textureOnViewport=t.textureOnViewport,e.wheelSensitivity=t.wheelSensitivity,e.motionBlurEnabled=t.motionBlur,e.forcedPixelRatio=xe(t.pixelRatio)?t.pixelRatio:null,e.motionBlur=t.motionBlur,e.motionBlurOpacity=t.motionBlurOpacity,e.motionBlurTransparency=1-e.motionBlurOpacity,e.motionBlurPxRatio=1,e.mbPxRBlurry=1,e.minMbLowQualFrames=4,e.fullQualityMb=!1,e.clearedForMotionBlur=[],e.desktopTapThreshold=t.desktopTapThreshold,e.desktopTapThreshold2=t.desktopTapThreshold*t.desktopTapThreshold,e.touchTapThreshold=t.touchTapThreshold,e.touchTapThreshold2=t.touchTapThreshold*t.touchTapThreshold,e.tapholdDuration=500,e.bindings=[],e.beforeRenderCallbacks=[],e.beforeRenderPriorities={animations:400,eleCalcs:300,eleTxrDeq:200,lyrTxrDeq:150,lyrTxrSkip:100},e.registerNodeShapes(),e.registerArrowShapes(),e.registerCalculationListeners()};ga.notify=function(t,e){var r=this,a=r.cy;if(!this.destroyed){if(t==="init"){r.load();return}if(t==="destroy"){r.destroy();return}(t==="add"||t==="remove"||t==="move"&&a.hasCompoundNodes()||t==="load"||t==="zorder"||t==="mount")&&r.invalidateCachedZSortedEles(),t==="viewport"&&r.redrawHint("select",!0),t==="gc"&&r.redrawHint("gc",!0),(t==="load"||t==="resize"||t==="mount")&&(r.invalidateContainerClientCoordsCache(),r.matchCanvasSize(r.container)),r.redrawHint("eles",!0),r.redrawHint("drag",!0),this.startRenderLoop(),this.redraw()}};ga.destroy=function(){var t=this;t.destroyed=!0,t.cy.stopAnimationLoop();for(var e=0;e<t.bindings.length;e++){var r=t.bindings[e],a=r,n=a.target;(n.off||n.removeEventListener).apply(n,a.args)}if(t.bindings=[],t.beforeRenderCallbacks=[],t.onUpdateEleCalcsFns=[],t.removeObserver&&t.removeObserver.disconnect(),t.styleObserver&&t.styleObserver.disconnect(),t.resizeObserver&&t.resizeObserver.disconnect(),t.labelCalcDiv)try{document.body.removeChild(t.labelCalcDiv)}catch{}};ga.isHeadless=function(){return!1};[Rs,Vv,Gv,da,ur,ja].forEach(function(t){Ne(ga,t)});var Fo=1e3/60,Hv={setupDequeueing:function(e){return function(){var a=this,n=this.renderer;if(!a.dequeueingSetup){a.dequeueingSetup=!0;var i=Ka(function(){n.redrawHint("eles",!0),n.redrawHint("drag",!0),n.redraw()},e.deqRedrawThreshold),o=function(u,f){var v=ir(),h=n.averageRedrawTime,c=n.lastRedrawTime,d=[],g=n.cy.extent(),y=n.getPixelRatio();for(u||n.flushRenderedStyleQueue();;){var p=ir(),m=p-v,b=p-f;if(c<Fo){var E=Fo-(u?h:0);if(b>=e.deqFastCost*E)break}else if(u){if(m>=e.deqCost*c||m>=e.deqAvgCost*h)break}else if(b>=e.deqNoDrawCost*Fo)break;var C=e.deq(a,y,g);if(C.length>0)for(var L=0;L<C.length;L++)d.push(C[L]);else break}d.length>0&&(e.onDeqd(a,d),!u&&e.shouldRedraw(a,d,y,g)&&i())},s=e.priority||gs;n.beforeRender(o,s(a))}}}},Ty=(function(){function t(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Bn;Sr(this,t),this.idsByKey=new nr,this.keyForId=new nr,this.cachesByLvl=new nr,this.lvls=[],this.getKey=e,this.doesEleInvalidateKey=r}return Dr(t,[{key:"getIdsFor",value:function(r){r==null&&rt("Can not get id list for null key");var a=this.idsByKey,n=this.idsByKey.get(r);return n||(n=new fa,a.set(r,n)),n}},{key:"addIdForKey",value:function(r,a){r!=null&&this.getIdsFor(r).add(a)}},{key:"deleteIdForKey",value:function(r,a){r!=null&&this.getIdsFor(r).delete(a)}},{key:"getNumberOfIdsForKey",value:function(r){return r==null?0:this.getIdsFor(r).size}},{key:"updateKeyMappingFor",value:function(r){var a=r.id(),n=this.keyForId.get(a),i=this.getKey(r);this.deleteIdForKey(n,a),this.addIdForKey(i,a),this.keyForId.set(a,i)}},{key:"deleteKeyMappingFor",value:function(r){var a=r.id(),n=this.keyForId.get(a);this.deleteIdForKey(n,a),this.keyForId.delete(a)}},{key:"keyHasChangedFor",value:function(r){var a=r.id(),n=this.keyForId.get(a),i=this.getKey(r);return n!==i}},{key:"isInvalid",value:function(r){return this.keyHasChangedFor(r)||this.doesEleInvalidateKey(r)}},{key:"getCachesAt",value:function(r){var a=this.cachesByLvl,n=this.lvls,i=a.get(r);return i||(i=new nr,a.set(r,i),n.push(r)),i}},{key:"getCache",value:function(r,a){return this.getCachesAt(a).get(r)}},{key:"get",value:function(r,a){var n=this.getKey(r),i=this.getCache(n,a);return i!=null&&this.updateKeyMappingFor(r),i}},{key:"getForCachedKey",value:function(r,a){var n=this.keyForId.get(r.id()),i=this.getCache(n,a);return i}},{key:"hasCache",value:function(r,a){return this.getCachesAt(a).has(r)}},{key:"has",value:function(r,a){var n=this.getKey(r);return this.hasCache(n,a)}},{key:"setCache",value:function(r,a,n){n.key=r,this.getCachesAt(a).set(r,n)}},{key:"set",value:function(r,a,n){var i=this.getKey(r);this.setCache(i,a,n),this.updateKeyMappingFor(r)}},{key:"deleteCache",value:function(r,a){this.getCachesAt(a).delete(r)}},{key:"delete",value:function(r,a){var n=this.getKey(r);this.deleteCache(n,a)}},{key:"invalidateKey",value:function(r){var a=this;this.lvls.forEach(function(n){return a.deleteCache(r,n)})}},{key:"invalidate",value:function(r){var a=r.id(),n=this.keyForId.get(a);this.deleteKeyMappingFor(r);var i=this.doesEleInvalidateKey(r);return i&&this.invalidateKey(n),i||this.getNumberOfIdsForKey(n)===0}}])})(),ef=25,bn=50,Rn=-4,is=3,qv=7.99,Cy=8,Sy=1024,Dy=1024,Ay=1024,Ly=.2,My=.8,Ry=10,Ny=.15,Py=.1,Oy=.9,Iy=.9,By=100,Fy=1,ra={dequeue:"dequeue",downscale:"downscale",highQuality:"highQuality"},ky=Et({getKey:null,doesEleInvalidateKey:Bn,drawElement:null,getBoundingBox:null,getRotationPoint:null,getRotationOffset:null,isVisible:Pf,allowEdgeTxrCaching:!0,allowParentTxrCaching:!0}),Ma=function(e,r){var a=this;a.renderer=e,a.onDequeues=[];var n=ky(r);Ne(a,n),a.lookup=new Ty(n.getKey,n.doesEleInvalidateKey),a.setupDequeueing()},gt=Ma.prototype;gt.reasons=ra;gt.getTextureQueue=function(t){var e=this;return e.eleImgCaches=e.eleImgCaches||{},e.eleImgCaches[t]=e.eleImgCaches[t]||[]};gt.getRetiredTextureQueue=function(t){var e=this,r=e.eleImgCaches.retired=e.eleImgCaches.retired||{},a=r[t]=r[t]||[];return a};gt.getElementQueue=function(){var t=this,e=t.eleCacheQueue=t.eleCacheQueue||new _a(function(r,a){return a.reqs-r.reqs});return e};gt.getElementKeyToQueue=function(){var t=this,e=t.eleKeyToCacheQueue=t.eleKeyToCacheQueue||{};return e};gt.getElement=function(t,e,r,a,n){var i=this,o=this.renderer,s=o.cy.zoom(),l=this.lookup;if(!e||e.w===0||e.h===0||isNaN(e.w)||isNaN(e.h)||!t.visible()||t.removed()||!i.allowEdgeTxrCaching&&t.isEdge()||!i.allowParentTxrCaching&&t.isParent())return null;if(a==null&&(a=Math.ceil(ys(s*r))),a<Rn)a=Rn;else if(s>=qv||a>is)return null;var u=Math.pow(2,a),f=e.h*u,v=e.w*u,h=o.eleTextBiggerThanMin(t,u);if(!this.isVisible(t,h))return null;var c=l.get(t,a);if(c&&c.invalidated&&(c.invalidated=!1,c.texture.invalidatedWidth-=c.width),c)return c;var d;if(f<=ef?d=ef:f<=bn?d=bn:d=Math.ceil(f/bn)*bn,f>Ay||v>Dy)return null;var g=i.getTextureQueue(d),y=g[g.length-2],p=function(){return i.recycleTexture(d,v)||i.addTexture(d,v)};y||(y=g[g.length-1]),y||(y=p()),y.width-y.usedWidth<v&&(y=p());for(var m=function(S){return S&&S.scaledLabelShown===h},b=n&&n===ra.dequeue,E=n&&n===ra.highQuality,C=n&&n===ra.downscale,L,D=a+1;D<=is;D++){var R=l.get(t,D);if(R){L=R;break}}var O=L&&L.level===a+1?L:null,M=function(){y.context.drawImage(O.texture.canvas,O.x,0,O.width,O.height,y.usedWidth,0,v,f)};if(y.context.setTransform(1,0,0,1,0,0),y.context.clearRect(y.usedWidth,0,v,d),m(O))M();else if(m(L))if(E){for(var P=L.level;P>a;P--)O=i.getElement(t,e,r,P,ra.downscale);M()}else return i.queueElement(t,L.level-1),L;else{var w;if(!b&&!E&&!C)for(var x=a-1;x>=Rn;x--){var T=l.get(t,x);if(T){w=T;break}}if(m(w))return i.queueElement(t,a),w;y.context.translate(y.usedWidth,0),y.context.scale(u,u),this.drawElement(y.context,t,e,h,!1),y.context.scale(1/u,1/u),y.context.translate(-y.usedWidth,0)}return c={x:y.usedWidth,texture:y,level:a,scale:u,width:v,height:f,scaledLabelShown:h},y.usedWidth+=Math.ceil(v+Cy),y.eleCaches.push(c),l.set(t,a,c),i.checkTextureFullness(y),c};gt.invalidateElements=function(t){for(var e=0;e<t.length;e++)this.invalidateElement(t[e])};gt.invalidateElement=function(t){var e=this,r=e.lookup,a=[],n=r.isInvalid(t);if(n){for(var i=Rn;i<=is;i++){var o=r.getForCachedKey(t,i);o&&a.push(o)}var s=r.invalidate(t);if(s)for(var l=0;l<a.length;l++){var u=a[l],f=u.texture;f.invalidatedWidth+=u.width,u.invalidated=!0,e.checkTextureUtility(f)}e.removeFromQueue(t)}};gt.checkTextureUtility=function(t){t.invalidatedWidth>=Ly*t.width&&this.retireTexture(t)};gt.checkTextureFullness=function(t){var e=this,r=e.getTextureQueue(t.height);t.usedWidth/t.width>My&&t.fullnessChecks>=Ry?wr(r,t):t.fullnessChecks++};gt.retireTexture=function(t){var e=this,r=t.height,a=e.getTextureQueue(r),n=this.lookup;wr(a,t),t.retired=!0;for(var i=t.eleCaches,o=0;o<i.length;o++){var s=i[o];n.deleteCache(s.key,s.level)}ps(i);var l=e.getRetiredTextureQueue(r);l.push(t)};gt.addTexture=function(t,e){var r=this,a=r.getTextureQueue(t),n={};return a.push(n),n.eleCaches=[],n.height=t,n.width=Math.max(Sy,e),n.usedWidth=0,n.invalidatedWidth=0,n.fullnessChecks=0,n.canvas=r.renderer.makeOffscreenCanvas(n.width,n.height),n.context=n.canvas.getContext("2d"),n};gt.recycleTexture=function(t,e){for(var r=this,a=r.getTextureQueue(t),n=r.getRetiredTextureQueue(t),i=0;i<n.length;i++){var o=n[i];if(o.width>=e)return o.retired=!1,o.usedWidth=0,o.invalidatedWidth=0,o.fullnessChecks=0,ps(o.eleCaches),o.context.setTransform(1,0,0,1,0,0),o.context.clearRect(0,0,o.width,o.height),wr(n,o),a.push(o),o}};gt.queueElement=function(t,e){var r=this,a=r.getElementQueue(),n=r.getElementKeyToQueue(),i=this.getKey(t),o=n[i];if(o)o.level=Math.max(o.level,e),o.eles.merge(t),o.reqs++,a.updateItem(o);else{var s={eles:t.spawn().merge(t),level:e,reqs:1,key:i};a.push(s),n[i]=s}};gt.dequeue=function(t){for(var e=this,r=e.getElementQueue(),a=e.getElementKeyToQueue(),n=[],i=e.lookup,o=0;o<Fy&&r.size()>0;o++){var s=r.pop(),l=s.key,u=s.eles[0],f=i.hasCache(u,s.level);if(a[l]=null,f)continue;n.push(s);var v=e.getBoundingBox(u);e.getElement(u,v,t,s.level,ra.dequeue)}return n};gt.removeFromQueue=function(t){var e=this,r=e.getElementQueue(),a=e.getElementKeyToQueue(),n=this.getKey(t),i=a[n];i!=null&&(i.eles.length===1?(i.reqs=ds,r.updateItem(i),r.pop(),a[n]=null):i.eles.unmerge(t))};gt.onDequeue=function(t){this.onDequeues.push(t)};gt.offDequeue=function(t){wr(this.onDequeues,t)};gt.setupDequeueing=Hv.setupDequeueing({deqRedrawThreshold:By,deqCost:Ny,deqAvgCost:Py,deqNoDrawCost:Oy,deqFastCost:Iy,deq:function(e,r,a){return e.dequeue(r,a)},onDeqd:function(e,r){for(var a=0;a<e.onDequeues.length;a++){var n=e.onDequeues[a];n(r)}},shouldRedraw:function(e,r,a,n){for(var i=0;i<r.length;i++)for(var o=r[i].eles,s=0;s<o.length;s++){var l=o[s].boundingBox();if(bs(l,n))return!0}return!1},priority:function(e){return e.renderer.beforeRenderPriorities.eleTxrDeq}});var zy=1,Na=-4,qn=2,Vy=3.99,Gy=50,Uy=50,Hy=.15,qy=.1,Yy=.9,Wy=.9,Xy=1,tf=250,$y=4e3*4e3,rf=32767,Ky=!0,Yv=function(e){var r=this,a=r.renderer=e,n=a.cy;r.layersByLevel={},r.firstGet=!0,r.lastInvalidationTime=ir()-2*tf,r.skipping=!1,r.eleTxrDeqs=n.collection(),r.scheduleElementRefinement=Ka(function(){r.refineElementTextures(r.eleTxrDeqs),r.eleTxrDeqs.unmerge(r.eleTxrDeqs)},Uy),a.beforeRender(function(o,s){s-r.lastInvalidationTime<=tf?r.skipping=!0:r.skipping=!1},a.beforeRenderPriorities.lyrTxrSkip);var i=function(s,l){return l.reqs-s.reqs};r.layersQueue=new _a(i),r.setupDequeueing()},xt=Yv.prototype,af=0,_y=Math.pow(2,53)-1;xt.makeLayer=function(t,e){var r=Math.pow(2,e),a=Math.ceil(t.w*r),n=Math.ceil(t.h*r),i=this.renderer.makeOffscreenCanvas(a,n),o={id:af=++af%_y,bb:t,level:e,width:a,height:n,canvas:i,context:i.getContext("2d"),eles:[],elesQueue:[],reqs:0},s=o.context,l=-o.bb.x1,u=-o.bb.y1;return s.scale(r,r),s.translate(l,u),o};xt.getLayers=function(t,e,r){var a=this,n=a.renderer,i=n.cy,o=i.zoom(),s=a.firstGet;if(a.firstGet=!1,r==null){if(r=Math.ceil(ys(o*e)),r<Na)r=Na;else if(o>=Vy||r>qn)return null}a.validateLayersElesOrdering(r,t);var l=a.layersByLevel,u=Math.pow(2,r),f=l[r]=l[r]||[],v,h=a.levelIsComplete(r,t),c,d=function(){var M=function(A){if(a.validateLayersElesOrdering(A,t),a.levelIsComplete(A,t))return c=l[A],!0},P=function(A){if(!c)for(var S=r+A;Na<=S&&S<=qn&&!M(S);S+=A);};P(1),P(-1);for(var w=f.length-1;w>=0;w--){var x=f[w];x.invalid&&wr(f,x)}};if(!h)d();else return f;var g=function(){if(!v){v=Lt();for(var M=0;M<t.length;M++)Xc(v,t[M].boundingBox())}return v},y=function(M){M=M||{};var P=M.after;g();var w=Math.ceil(v.w*u),x=Math.ceil(v.h*u);if(w>rf||x>rf)return null;var T=w*x;if(T>$y)return null;var A=a.makeLayer(v,r);if(P!=null){var S=f.indexOf(P)+1;f.splice(S,0,A)}else(M.insert===void 0||M.insert)&&f.unshift(A);return A};if(a.skipping&&!s)return null;for(var p=null,m=t.length/zy,b=!s,E=0;E<t.length;E++){var C=t[E],L=C._private.rscratch,D=L.imgLayerCaches=L.imgLayerCaches||{},R=D[r];if(R){p=R;continue}if((!p||p.eles.length>=m||!zf(p.bb,C.boundingBox()))&&(p=y({insert:!0,after:p}),!p))return null;c||b?a.queueLayer(p,C):a.drawEleInLayer(p,C,r,e),p.eles.push(C),D[r]=p}return c||(b?null:f)};xt.getEleLevelForLayerLevel=function(t,e){return t};xt.drawEleInLayer=function(t,e,r,a){var n=this,i=this.renderer,o=t.context,s=e.boundingBox();s.w===0||s.h===0||!e.visible()||(r=n.getEleLevelForLayerLevel(r,a),i.setImgSmoothing(o,!1),i.drawCachedElement(o,e,null,null,r,Ky),i.setImgSmoothing(o,!0))};xt.levelIsComplete=function(t,e){var r=this,a=r.layersByLevel[t];if(!a||a.length===0)return!1;for(var n=0,i=0;i<a.length;i++){var o=a[i];if(o.reqs>0||o.invalid)return!1;n+=o.eles.length}return n===e.length};xt.validateLayersElesOrdering=function(t,e){var r=this.layersByLevel[t];if(r)for(var a=0;a<r.length;a++){for(var n=r[a],i=-1,o=0;o<e.length;o++)if(n.eles[0]===e[o]){i=o;break}if(i<0){this.invalidateLayer(n);continue}for(var s=i,o=0;o<n.eles.length;o++)if(n.eles[o]!==e[s+o]){this.invalidateLayer(n);break}}};xt.updateElementsInLayers=function(t,e){for(var r=this,a=Ya(t[0]),n=0;n<t.length;n++)for(var i=a?null:t[n],o=a?t[n]:t[n].ele,s=o._private.rscratch,l=s.imgLayerCaches=s.imgLayerCaches||{},u=Na;u<=qn;u++){var f=l[u];f&&(i&&r.getEleLevelForLayerLevel(f.level)!==i.level||e(f,o,i))}};xt.haveLayers=function(){for(var t=this,e=!1,r=Na;r<=qn;r++){var a=t.layersByLevel[r];if(a&&a.length>0){e=!0;break}}return e};xt.invalidateElements=function(t){var e=this;t.length!==0&&(e.lastInvalidationTime=ir(),!(t.length===0||!e.haveLayers())&&e.updateElementsInLayers(t,function(a,n,i){e.invalidateLayer(a)}))};xt.invalidateLayer=function(t){if(this.lastInvalidationTime=ir(),!t.invalid){var e=t.level,r=t.eles,a=this.layersByLevel[e];wr(a,t),t.elesQueue=[],t.invalid=!0,t.replacement&&(t.replacement.invalid=!0);for(var n=0;n<r.length;n++){var i=r[n]._private.rscratch.imgLayerCaches;i&&(i[e]=null)}}};xt.refineElementTextures=function(t){var e=this;e.updateElementsInLayers(t,function(a,n,i){var o=a.replacement;if(o||(o=a.replacement=e.makeLayer(a.bb,a.level),o.replaces=a,o.eles=a.eles),!o.reqs)for(var s=0;s<o.eles.length;s++)e.queueLayer(o,o.eles[s])})};xt.enqueueElementRefinement=function(t){this.eleTxrDeqs.merge(t),this.scheduleElementRefinement()};xt.queueLayer=function(t,e){var r=this,a=r.layersQueue,n=t.elesQueue,i=n.hasId=n.hasId||{};if(!t.replacement){if(e){if(i[e.id()])return;n.push(e),i[e.id()]=!0}t.reqs?(t.reqs++,a.updateItem(t)):(t.reqs=1,a.push(t))}};xt.dequeue=function(t){for(var e=this,r=e.layersQueue,a=[],n=0;n<Xy&&r.size()!==0;){var i=r.peek();if(i.replacement){r.pop();continue}if(i.replaces&&i!==i.replaces.replacement){r.pop();continue}if(i.invalid){r.pop();continue}var o=i.elesQueue.shift();o&&(e.drawEleInLayer(i,o,i.level,t),n++),a.length===0&&a.push(!0),i.elesQueue.length===0&&(r.pop(),i.reqs=0,i.replaces&&e.applyLayerReplacement(i),e.requestRedraw())}return a};xt.applyLayerReplacement=function(t){var e=this,r=e.layersByLevel[t.level],a=t.replaces,n=r.indexOf(a);if(!(n<0||a.invalid)){r[n]=t;for(var i=0;i<t.eles.length;i++){var o=t.eles[i]._private,s=o.imgLayerCaches=o.imgLayerCaches||{};s&&(s[t.level]=t)}e.requestRedraw()}};xt.requestRedraw=Ka(function(){var t=this.renderer;t.redrawHint("eles",!0),t.redrawHint("drag",!0),t.redraw()},100);xt.setupDequeueing=Hv.setupDequeueing({deqRedrawThreshold:Gy,deqCost:Hy,deqAvgCost:qy,deqNoDrawCost:Yy,deqFastCost:Wy,deq:function(e,r){return e.dequeue(r)},onDeqd:gs,shouldRedraw:Pf,priority:function(e){return e.renderer.beforeRenderPriorities.lyrTxrDeq}});var Wv={},nf;function Zy(t,e){for(var r=0;r<e.length;r++){var a=e[r];t.lineTo(a.x,a.y)}}function Qy(t,e,r){for(var a,n=0;n<e.length;n++){var i=e[n];n===0&&(a=i),t.lineTo(i.x,i.y)}t.quadraticCurveTo(r.x,r.y,a.x,a.y)}function of(t,e,r){t.beginPath&&t.beginPath();for(var a=e,n=0;n<a.length;n++){var i=a[n];t.lineTo(i.x,i.y)}var o=r,s=r[0];t.moveTo(s.x,s.y);for(var n=1;n<o.length;n++){var i=o[n];t.lineTo(i.x,i.y)}t.closePath&&t.closePath()}function Jy(t,e,r,a,n){t.beginPath&&t.beginPath(),t.arc(r,a,n,0,Math.PI*2,!1);var i=e,o=i[0];t.moveTo(o.x,o.y);for(var s=0;s<i.length;s++){var l=i[s];t.lineTo(l.x,l.y)}t.closePath&&t.closePath()}function jy(t,e,r,a){t.arc(e,r,a,0,Math.PI*2,!1)}Wv.arrowShapeImpl=function(t){return(nf||(nf={polygon:Zy,"triangle-backcurve":Qy,"triangle-tee":of,"circle-triangle":Jy,"triangle-cross":of,circle:jy}))[t]};var tr={};tr.drawElement=function(t,e,r,a,n,i){var o=this;e.isNode()?o.drawNode(t,e,r,a,n,i):o.drawEdge(t,e,r,a,n,i)};tr.drawElementOverlay=function(t,e){var r=this;e.isNode()?r.drawNodeOverlay(t,e):r.drawEdgeOverlay(t,e)};tr.drawElementUnderlay=function(t,e){var r=this;e.isNode()?r.drawNodeUnderlay(t,e):r.drawEdgeUnderlay(t,e)};tr.drawCachedElementPortion=function(t,e,r,a,n,i,o,s){var l=this,u=r.getBoundingBox(e);if(!(u.w===0||u.h===0)){var f=r.getElement(e,u,a,n,i);if(f!=null){var v=s(l,e);if(v===0)return;var h=o(l,e),c=u.x1,d=u.y1,g=u.w,y=u.h,p,m,b,E,C;if(h!==0){var L=r.getRotationPoint(e);b=L.x,E=L.y,t.translate(b,E),t.rotate(h),C=l.getImgSmoothing(t),C||l.setImgSmoothing(t,!0);var D=r.getRotationOffset(e);p=D.x,m=D.y}else p=c,m=d;var R;v!==1&&(R=t.globalAlpha,t.globalAlpha=R*v),t.drawImage(f.texture.canvas,f.x,0,f.width,f.height,p,m,g,y),v!==1&&(t.globalAlpha=R),h!==0&&(t.rotate(-h),t.translate(-b,-E),C||l.setImgSmoothing(t,!1))}else r.drawElement(t,e)}};var em=function(){return 0},tm=function(e,r){return e.getTextAngle(r,null)},rm=function(e,r){return e.getTextAngle(r,"source")},am=function(e,r){return e.getTextAngle(r,"target")},nm=function(e,r){return r.effectiveOpacity()},ko=function(e,r){return r.pstyle("text-opacity").pfValue*r.effectiveOpacity()};tr.drawCachedElement=function(t,e,r,a,n,i){var o=this,s=o.data,l=s.eleTxrCache,u=s.lblTxrCache,f=s.slbTxrCache,v=s.tlbTxrCache,h=e.boundingBox(),c=i===!0?l.reasons.highQuality:null;if(!(h.w===0||h.h===0||!e.visible())&&(!a||bs(h,a))){var d=e.isEdge(),g=e.element()._private.rscratch.badLine;o.drawElementUnderlay(t,e),o.drawCachedElementPortion(t,e,l,r,n,c,em,nm),(!d||!g)&&o.drawCachedElementPortion(t,e,u,r,n,c,tm,ko),d&&!g&&(o.drawCachedElementPortion(t,e,f,r,n,c,rm,ko),o.drawCachedElementPortion(t,e,v,r,n,c,am,ko)),o.drawElementOverlay(t,e)}};tr.drawElements=function(t,e){for(var r=this,a=0;a<e.length;a++){var n=e[a];r.drawElement(t,n)}};tr.drawCachedElements=function(t,e,r,a){for(var n=this,i=0;i<e.length;i++){var o=e[i];n.drawCachedElement(t,o,r,a)}};tr.drawCachedNodes=function(t,e,r,a){for(var n=this,i=0;i<e.length;i++){var o=e[i];o.isNode()&&n.drawCachedElement(t,o,r,a)}};tr.drawLayeredElements=function(t,e,r,a){var n=this,i=n.data.lyrTxrCache.getLayers(e,r);if(i)for(var o=0;o<i.length;o++){var s=i[o],l=s.bb;l.w===0||l.h===0||t.drawImage(s.canvas,l.x1,l.y1,l.w,l.h)}else n.drawCachedElements(t,e,r,a)};var lr={};lr.drawEdge=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,o=this,s=e._private.rscratch;if(!(i&&!e.visible())&&!(s.badLine||s.allpts==null||isNaN(s.allpts[0]))){var l;r&&(l=r,t.translate(-l.x1,-l.y1));var u=i?e.pstyle("opacity").value:1,f=i?e.pstyle("line-opacity").value:1,v=e.pstyle("curve-style").value,h=e.pstyle("line-style").value,c=e.pstyle("width").pfValue,d=e.pstyle("line-cap").value,g=e.pstyle("line-outline-width").value,y=e.pstyle("line-outline-color").value,p=u*f,m=u*f,b=function(){var A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:p;v==="straight-triangle"?(o.eleStrokeStyle(t,e,A),o.drawEdgeTrianglePath(e,t,s.allpts)):(t.lineWidth=c,t.lineCap=d,o.eleStrokeStyle(t,e,A),o.drawEdgePath(e,t,s.allpts,h),t.lineCap="butt")},E=function(){var A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:p;if(t.lineWidth=c+g,t.lineCap=d,g>0)o.colorStrokeStyle(t,y[0],y[1],y[2],A);else{t.lineCap="butt";return}v==="straight-triangle"?o.drawEdgeTrianglePath(e,t,s.allpts):(o.drawEdgePath(e,t,s.allpts,h),t.lineCap="butt")},C=function(){n&&o.drawEdgeOverlay(t,e)},L=function(){n&&o.drawEdgeUnderlay(t,e)},D=function(){var A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:m;o.drawArrowheads(t,e,A)},R=function(){o.drawElementText(t,e,null,a)};t.lineJoin="round";var O=e.pstyle("ghost").value==="yes";if(O){var M=e.pstyle("ghost-offset-x").pfValue,P=e.pstyle("ghost-offset-y").pfValue,w=e.pstyle("ghost-opacity").value,x=p*w;t.translate(M,P),b(x),D(x),t.translate(-M,-P)}else E();L(),b(),D(),C(),R(),r&&t.translate(l.x1,l.y1)}};var Xv=function(e){if(!["overlay","underlay"].includes(e))throw new Error("Invalid state");return function(r,a){if(a.visible()){var n=a.pstyle("".concat(e,"-opacity")).value;if(n!==0){var i=this,o=i.usePaths(),s=a._private.rscratch,l=a.pstyle("".concat(e,"-padding")).pfValue,u=2*l,f=a.pstyle("".concat(e,"-color")).value;r.lineWidth=u,s.edgeType==="self"&&!o?r.lineCap="butt":r.lineCap="round",i.colorStrokeStyle(r,f[0],f[1],f[2],n),i.drawEdgePath(a,r,s.allpts,"solid")}}}};lr.drawEdgeOverlay=Xv("overlay");lr.drawEdgeUnderlay=Xv("underlay");lr.drawEdgePath=function(t,e,r,a){var n=t._private.rscratch,i=e,o,s=!1,l=this.usePaths(),u=t.pstyle("line-dash-pattern").pfValue,f=t.pstyle("line-dash-offset").pfValue;if(l){var v=r.join("$"),h=n.pathCacheKey&&n.pathCacheKey===v;h?(o=e=n.pathCache,s=!0):(o=e=new Path2D,n.pathCacheKey=v,n.pathCache=o)}if(i.setLineDash)switch(a){case"dotted":i.setLineDash([1,1]);break;case"dashed":i.setLineDash(u),i.lineDashOffset=f;break;case"solid":i.setLineDash([]);break}if(!s&&!n.badLine)switch(e.beginPath&&e.beginPath(),e.moveTo(r[0],r[1]),n.edgeType){case"bezier":case"self":case"compound":case"multibezier":for(var c=2;c+3<r.length;c+=4)e.quadraticCurveTo(r[c],r[c+1],r[c+2],r[c+3]);break;case"straight":case"haystack":for(var d=2;d+1<r.length;d+=2)e.lineTo(r[d],r[d+1]);break;case"segments":if(n.isRound){var g=Bt(n.roundCorners),y;try{for(g.s();!(y=g.n()).done;){var p=y.value;Iv(e,p)}}catch(b){g.e(b)}finally{g.f()}e.lineTo(r[r.length-2],r[r.length-1])}else for(var m=2;m+1<r.length;m+=2)e.lineTo(r[m],r[m+1]);break}e=i,l?e.stroke(o):e.stroke(),e.setLineDash&&e.setLineDash([])};lr.drawEdgeTrianglePath=function(t,e,r){e.fillStyle=e.strokeStyle;for(var a=t.pstyle("width").pfValue,n=0;n+1<r.length;n+=2){var i=[r[n+2]-r[n],r[n+3]-r[n+1]],o=Math.sqrt(i[0]*i[0]+i[1]*i[1]),s=[i[1]/o,-i[0]/o],l=[s[0]*a/2,s[1]*a/2];e.beginPath(),e.moveTo(r[n]-l[0],r[n+1]-l[1]),e.lineTo(r[n]+l[0],r[n+1]+l[1]),e.lineTo(r[n+2],r[n+3]),e.closePath(),e.fill()}};lr.drawArrowheads=function(t,e,r){var a=e._private.rscratch,n=a.edgeType==="haystack";n||this.drawArrowhead(t,e,"source",a.arrowStartX,a.arrowStartY,a.srcArrowAngle,r),this.drawArrowhead(t,e,"mid-target",a.midX,a.midY,a.midtgtArrowAngle,r),this.drawArrowhead(t,e,"mid-source",a.midX,a.midY,a.midsrcArrowAngle,r),n||this.drawArrowhead(t,e,"target",a.arrowEndX,a.arrowEndY,a.tgtArrowAngle,r)};lr.drawArrowhead=function(t,e,r,a,n,i,o){if(!(isNaN(a)||a==null||isNaN(n)||n==null||isNaN(i)||i==null)){var s=this,l=e.pstyle(r+"-arrow-shape").value;if(l!=="none"){var u=e.pstyle(r+"-arrow-fill").value==="hollow"?"both":"filled",f=e.pstyle(r+"-arrow-fill").value,v=e.pstyle("width").pfValue,h=e.pstyle(r+"-arrow-width"),c=h.value==="match-line"?v:h.pfValue;h.units==="%"&&(c*=v);var d=e.pstyle("opacity").value;o===void 0&&(o=d);var g=t.globalCompositeOperation;(o!==1||f==="hollow")&&(t.globalCompositeOperation="destination-out",s.colorFillStyle(t,255,255,255,1),s.colorStrokeStyle(t,255,255,255,1),s.drawArrowShape(e,t,u,v,l,c,a,n,i),t.globalCompositeOperation=g);var y=e.pstyle(r+"-arrow-color").value;s.colorFillStyle(t,y[0],y[1],y[2],o),s.colorStrokeStyle(t,y[0],y[1],y[2],o),s.drawArrowShape(e,t,f,v,l,c,a,n,i)}}};lr.drawArrowShape=function(t,e,r,a,n,i,o,s,l){var u=this,f=this.usePaths()&&n!=="triangle-cross",v=!1,h,c=e,d={x:o,y:s},g=t.pstyle("arrow-scale").value,y=this.getArrowWidth(a,g),p=u.arrowShapes[n];if(f){var m=u.arrowPathCache=u.arrowPathCache||[],b=zr(n),E=m[b];E!=null?(h=e=E,v=!0):(h=e=new Path2D,m[b]=h)}v||(e.beginPath&&e.beginPath(),f?p.draw(e,1,0,{x:0,y:0},1):p.draw(e,y,l,d,a),e.closePath&&e.closePath()),e=c,f&&(e.translate(o,s),e.rotate(l),e.scale(y,y)),(r==="filled"||r==="both")&&(f?e.fill(h):e.fill()),(r==="hollow"||r==="both")&&(e.lineWidth=i/(f?y:1),e.lineJoin="miter",f?e.stroke(h):e.stroke()),f&&(e.scale(1/y,1/y),e.rotate(-l),e.translate(-o,-s))};var Os={};Os.safeDrawImage=function(t,e,r,a,n,i,o,s,l,u){if(!(n<=0||i<=0||l<=0||u<=0))try{t.drawImage(e,r,a,n,i,o,s,l,u)}catch(f){_e(f)}};Os.drawInscribedImage=function(t,e,r,a,n){var i=this,o=r.position(),s=o.x,l=o.y,u=r.cy().style(),f=u.getIndexedStyle.bind(u),v=f(r,"background-fit","value",a),h=f(r,"background-repeat","value",a),c=r.width(),d=r.height(),g=r.padding()*2,y=c+(f(r,"background-width-relative-to","value",a)==="inner"?0:g),p=d+(f(r,"background-height-relative-to","value",a)==="inner"?0:g),m=r._private.rscratch,b=f(r,"background-clip","value",a),E=b==="node",C=f(r,"background-image-opacity","value",a)*n,L=f(r,"background-image-smoothing","value",a),D=r.pstyle("corner-radius").value;D!=="auto"&&(D=r.pstyle("corner-radius").pfValue);var R=e.width||e.cachedW,O=e.height||e.cachedH;(R==null||O==null)&&(document.body.appendChild(e),R=e.cachedW=e.width||e.offsetWidth,O=e.cachedH=e.height||e.offsetHeight,document.body.removeChild(e));var M=R,P=O;if(f(r,"background-width","value",a)!=="auto"&&(f(r,"background-width","units",a)==="%"?M=f(r,"background-width","pfValue",a)*y:M=f(r,"background-width","pfValue",a)),f(r,"background-height","value",a)!=="auto"&&(f(r,"background-height","units",a)==="%"?P=f(r,"background-height","pfValue",a)*p:P=f(r,"background-height","pfValue",a)),!(M===0||P===0)){if(v==="contain"){var w=Math.min(y/M,p/P);M*=w,P*=w}else if(v==="cover"){var w=Math.max(y/M,p/P);M*=w,P*=w}var x=s-y/2,T=f(r,"background-position-x","units",a),A=f(r,"background-position-x","pfValue",a);T==="%"?x+=(y-M)*A:x+=A;var S=f(r,"background-offset-x","units",a),I=f(r,"background-offset-x","pfValue",a);S==="%"?x+=(y-M)*I:x+=I;var B=l-p/2,k=f(r,"background-position-y","units",a),z=f(r,"background-position-y","pfValue",a);k==="%"?B+=(p-P)*z:B+=z;var F=f(r,"background-offset-y","units",a),V=f(r,"background-offset-y","pfValue",a);F==="%"?B+=(p-P)*V:B+=V,m.pathCache&&(x-=s,B-=l,s=0,l=0);var Z=t.globalAlpha;t.globalAlpha=C;var q=i.getImgSmoothing(t),_=!1;if(L==="no"&&q?(i.setImgSmoothing(t,!1),_=!0):L==="yes"&&!q&&(i.setImgSmoothing(t,!0),_=!0),h==="no-repeat")E&&(t.save(),m.pathCache?t.clip(m.pathCache):(i.nodeShapes[i.getNodeShape(r)].draw(t,s,l,y,p,D,m),t.clip())),i.safeDrawImage(t,e,0,0,R,O,x,B,M,P),E&&t.restore();else{var K=t.createPattern(e,h);t.fillStyle=K,i.nodeShapes[i.getNodeShape(r)].draw(t,s,l,y,p,D,m),t.translate(x,B),t.fill(),t.translate(-x,-B)}t.globalAlpha=Z,_&&i.setImgSmoothing(t,q)}};var Yr={};Yr.eleTextBiggerThanMin=function(t,e){if(!e){var r=t.cy().zoom(),a=this.getPixelRatio(),n=Math.ceil(ys(r*a));e=Math.pow(2,n)}var i=t.pstyle("font-size").pfValue*e,o=t.pstyle("min-zoomed-font-size").pfValue;return!(i<o)};Yr.drawElementText=function(t,e,r,a,n){var i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,o=this;if(a==null){if(i&&!o.eleTextBiggerThanMin(e))return}else if(a===!1)return;if(e.isNode()){var s=e.pstyle("label");if(!s||!s.value)return;var l=o.getLabelJustification(e);t.textAlign=l,t.textBaseline="bottom"}else{var u=e.element()._private.rscratch.badLine,f=e.pstyle("label"),v=e.pstyle("source-label"),h=e.pstyle("target-label");if(u||(!f||!f.value)&&(!v||!v.value)&&(!h||!h.value))return;t.textAlign="center",t.textBaseline="bottom"}var c=!r,d;r&&(d=r,t.translate(-d.x1,-d.y1)),n==null?(o.drawText(t,e,null,c,i),e.isEdge()&&(o.drawText(t,e,"source",c,i),o.drawText(t,e,"target",c,i))):o.drawText(t,e,n,c,i),r&&t.translate(d.x1,d.y1)};Yr.getFontCache=function(t){var e;this.fontCaches=this.fontCaches||[];for(var r=0;r<this.fontCaches.length;r++)if(e=this.fontCaches[r],e.context===t)return e;return e={context:t},this.fontCaches.push(e),e};Yr.setupTextStyle=function(t,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,a=e.pstyle("font-style").strValue,n=e.pstyle("font-size").pfValue+"px",i=e.pstyle("font-family").strValue,o=e.pstyle("font-weight").strValue,s=r?e.effectiveOpacity()*e.pstyle("text-opacity").value:1,l=e.pstyle("text-outline-opacity").value*s,u=e.pstyle("color").value,f=e.pstyle("text-outline-color").value;t.font=a+" "+o+" "+n+" "+i,t.lineJoin="round",this.colorFillStyle(t,u[0],u[1],u[2],s),this.colorStrokeStyle(t,f[0],f[1],f[2],l)};function im(t,e,r,a,n){var i=Math.min(a,n),o=i/2,s=e+a/2,l=r+n/2;t.beginPath(),t.arc(s,l,o,0,Math.PI*2),t.closePath()}function sf(t,e,r,a,n){var i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:5,o=Math.min(i,a/2,n/2);t.beginPath(),t.moveTo(e+o,r),t.lineTo(e+a-o,r),t.quadraticCurveTo(e+a,r,e+a,r+o),t.lineTo(e+a,r+n-o),t.quadraticCurveTo(e+a,r+n,e+a-o,r+n),t.lineTo(e+o,r+n),t.quadraticCurveTo(e,r+n,e,r+n-o),t.lineTo(e,r+o),t.quadraticCurveTo(e,r,e+o,r),t.closePath()}Yr.getTextAngle=function(t,e){var r,a=t._private,n=a.rscratch,i=e?e+"-":"",o=t.pstyle(i+"text-rotation");if(o.strValue==="autorotate"){var s=Ot(n,"labelAngle",e);r=t.isEdge()?s:0}else o.strValue==="none"?r=0:r=o.pfValue;return r};Yr.drawText=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,i=e._private,o=i.rscratch,s=n?e.effectiveOpacity():1;if(!(n&&(s===0||e.pstyle("text-opacity").value===0))){r==="main"&&(r=null);var l=Ot(o,"labelX",r),u=Ot(o,"labelY",r),f,v,h=this.getLabelText(e,r);if(h!=null&&h!==""&&!isNaN(l)&&!isNaN(u)){this.setupTextStyle(t,e,n);var c=r?r+"-":"",d=Ot(o,"labelWidth",r),g=Ot(o,"labelHeight",r),y=e.pstyle(c+"text-margin-x").pfValue,p=e.pstyle(c+"text-margin-y").pfValue,m=e.isEdge(),b=e.pstyle("text-halign").value,E=e.pstyle("text-valign").value;m&&(b="center",E="center"),l+=y,u+=p;var C;switch(a?C=this.getTextAngle(e,r):C=0,C!==0&&(f=l,v=u,t.translate(f,v),t.rotate(C),l=0,u=0),E){case"top":break;case"center":u+=g/2;break;case"bottom":u+=g;break}var L=e.pstyle("text-background-opacity").value,D=e.pstyle("text-border-opacity").value,R=e.pstyle("text-border-width").pfValue,O=e.pstyle("text-background-padding").pfValue,M=e.pstyle("text-background-shape").strValue,P=M==="round-rectangle"||M==="roundrectangle",w=M==="circle",x=2;if(L>0||R>0&&D>0){var T=t.fillStyle,A=t.strokeStyle,S=t.lineWidth,I=e.pstyle("text-background-color").value,B=e.pstyle("text-border-color").value,k=e.pstyle("text-border-style").value,z=L>0,F=R>0&&D>0,V=l-O;switch(b){case"left":V-=d;break;case"center":V-=d/2;break}var Z=u-g-O,q=d+2*O,_=g+2*O;if(z&&(t.fillStyle="rgba(".concat(I[0],",").concat(I[1],",").concat(I[2],",").concat(L*s,")")),F&&(t.strokeStyle="rgba(".concat(B[0],",").concat(B[1],",").concat(B[2],",").concat(D*s,")"),t.lineWidth=R,t.setLineDash))switch(k){case"dotted":t.setLineDash([1,1]);break;case"dashed":t.setLineDash([4,2]);break;case"double":t.lineWidth=R/4,t.setLineDash([]);break;default:t.setLineDash([]);break}if(P?(t.beginPath(),sf(t,V,Z,q,_,x)):w?(t.beginPath(),im(t,V,Z,q,_)):(t.beginPath(),t.rect(V,Z,q,_)),z&&t.fill(),F&&t.stroke(),F&&k==="double"){var K=R/2;t.beginPath(),P?sf(t,V+K,Z+K,q-2*K,_-2*K,x):t.rect(V+K,Z+K,q-2*K,_-2*K),t.stroke()}t.fillStyle=T,t.strokeStyle=A,t.lineWidth=S,t.setLineDash&&t.setLineDash([])}var U=2*e.pstyle("text-outline-width").pfValue;if(U>0&&(t.lineWidth=U),e.pstyle("text-wrap").value==="wrap"){var J=Ot(o,"labelWrapCachedLines",r),$=Ot(o,"labelLineHeight",r),H=d/2,Y=this.getLabelJustification(e);switch(Y==="auto"||(b==="left"?Y==="left"?l+=-d:Y==="center"&&(l+=-H):b==="center"?Y==="left"?l+=-H:Y==="right"&&(l+=H):b==="right"&&(Y==="center"?l+=H:Y==="right"&&(l+=d))),E){case"top":u-=(J.length-1)*$;break;case"center":case"bottom":u-=(J.length-1)*$;break}for(var Q=0;Q<J.length;Q++)U>0&&t.strokeText(J[Q],l,u),t.fillText(J[Q],l,u),u+=$}else U>0&&t.strokeText(h,l,u),t.fillText(h,l,u);C!==0&&(t.rotate(-C),t.translate(-f,-v))}}};var Lr={};Lr.drawNode=function(t,e,r){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!0,n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:!0,o=this,s,l,u=e._private,f=u.rscratch,v=e.position();if(!(!xe(v.x)||!xe(v.y))&&!(i&&!e.visible())){var h=i?e.effectiveOpacity():1,c=o.usePaths(),d,g=!1,y=e.padding();s=e.width()+2*y,l=e.height()+2*y;var p;r&&(p=r,t.translate(-p.x1,-p.y1));for(var m=e.pstyle("background-image"),b=m.value,E=new Array(b.length),C=new Array(b.length),L=0,D=0;D<b.length;D++){var R=b[D],O=E[D]=R!=null&&R!=="none";if(O){var M=e.cy().style().getIndexedStyle(e,"background-image-crossorigin","value",D);L++,C[D]=o.getCachedImage(R,M,function(){u.backgroundTimestamp=Date.now(),e.emitAndNotify("background")})}}var P=e.pstyle("background-blacken").value,w=e.pstyle("border-width").pfValue,x=e.pstyle("background-opacity").value*h,T=e.pstyle("border-color").value,A=e.pstyle("border-style").value,S=e.pstyle("border-join").value,I=e.pstyle("border-cap").value,B=e.pstyle("border-position").value,k=e.pstyle("border-dash-pattern").pfValue,z=e.pstyle("border-dash-offset").pfValue,F=e.pstyle("border-opacity").value*h,V=e.pstyle("outline-width").pfValue,Z=e.pstyle("outline-color").value,q=e.pstyle("outline-style").value,_=e.pstyle("outline-opacity").value*h,K=e.pstyle("outline-offset").value,U=e.pstyle("corner-radius").value;U!=="auto"&&(U=e.pstyle("corner-radius").pfValue);var J=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:x;o.eleFillStyle(t,e,ae)},$=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:F;o.colorStrokeStyle(t,T[0],T[1],T[2],ae)},H=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:_;o.colorStrokeStyle(t,Z[0],Z[1],Z[2],ae)},Y=function(ae,W,N,G){var X=o.nodePathCache=o.nodePathCache||[],j=Nf(N==="polygon"?N+","+G.join(","):N,""+W,""+ae,""+U),ee=X[j],ie,re=!1;return ee!=null?(ie=ee,re=!0,f.pathCache=ie):(ie=new Path2D,X[j]=f.pathCache=ie),{path:ie,cacheHit:re}},Q=e.pstyle("shape").strValue,oe=e.pstyle("shape-polygon-points").pfValue;if(c){t.translate(v.x,v.y);var te=Y(s,l,Q,oe);d=te.path,g=te.cacheHit}var Te=function(){if(!g){var ae=v;c&&(ae={x:0,y:0}),o.nodeShapes[o.getNodeShape(e)].draw(d||t,ae.x,ae.y,s,l,U,f)}c?t.fill(d):t.fill()},Le=function(){for(var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h,W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,N=u.backgrounding,G=0,X=0;X<C.length;X++){var j=e.cy().style().getIndexedStyle(e,"background-image-containment","value",X);if(W&&j==="over"||!W&&j==="inside"){G++;continue}E[X]&&C[X].complete&&!C[X].error&&(G++,o.drawInscribedImage(t,C[X],e,X,ae))}u.backgrounding=G!==L,N!==u.backgrounding&&e.updateStyle(!1)},he=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:h;o.hasPie(e)&&(o.drawPie(t,e,W),ae&&(c||o.nodeShapes[o.getNodeShape(e)].draw(t,v.x,v.y,s,l,U,f)))},le=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,W=arguments.length>1&&arguments[1]!==void 0?arguments[1]:h;o.hasStripe(e)&&(t.save(),c?t.clip(f.pathCache):(o.nodeShapes[o.getNodeShape(e)].draw(t,v.x,v.y,s,l,U,f),t.clip()),o.drawStripe(t,e,W),t.restore(),ae&&(c||o.nodeShapes[o.getNodeShape(e)].draw(t,v.x,v.y,s,l,U,f)))},ce=function(){var ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h,W=(P>0?P:-P)*ae,N=P>0?0:255;P!==0&&(o.colorFillStyle(t,N,N,N,W),c?t.fill(d):t.fill())},fe=function(){if(w>0){if(t.lineWidth=w,t.lineCap=I,t.lineJoin=S,t.setLineDash)switch(A){case"dotted":t.setLineDash([1,1]);break;case"dashed":t.setLineDash(k),t.lineDashOffset=z;break;case"solid":case"double":t.setLineDash([]);break}if(B!=="center"){if(t.save(),t.lineWidth*=2,B==="inside")c?t.clip(d):t.clip();else{var ae=new Path2D;ae.rect(-s/2-w,-l/2-w,s+2*w,l+2*w),ae.addPath(d),t.clip(ae,"evenodd")}c?t.stroke(d):t.stroke(),t.restore()}else c?t.stroke(d):t.stroke();if(A==="double"){t.lineWidth=w/3;var W=t.globalCompositeOperation;t.globalCompositeOperation="destination-out",c?t.stroke(d):t.stroke(),t.globalCompositeOperation=W}t.setLineDash&&t.setLineDash([])}},ye=function(){if(V>0){if(t.lineWidth=V,t.lineCap="butt",t.setLineDash)switch(q){case"dotted":t.setLineDash([1,1]);break;case"dashed":t.setLineDash([4,2]);break;case"solid":case"double":t.setLineDash([]);break}var ae=v;c&&(ae={x:0,y:0});var W=o.getNodeShape(e),N=w;B==="inside"&&(N=0),B==="outside"&&(N*=2);var G=(s+N+(V+K))/s,X=(l+N+(V+K))/l,j=s*G,ee=l*X,ie=o.nodeShapes[W].points,re;if(c){var ve=Y(j,ee,W,ie);re=ve.path}if(W==="ellipse")o.drawEllipsePath(re||t,ae.x,ae.y,j,ee);else if(["round-diamond","round-heptagon","round-hexagon","round-octagon","round-pentagon","round-polygon","round-triangle","round-tag"].includes(W)){var se=0,de=0,Se=0;W==="round-diamond"?se=(N+K+V)*1.4:W==="round-heptagon"?(se=(N+K+V)*1.075,Se=-(N/2+K+V)/35):W==="round-hexagon"?se=(N+K+V)*1.12:W==="round-pentagon"?(se=(N+K+V)*1.13,Se=-(N/2+K+V)/15):W==="round-tag"?(se=(N+K+V)*1.12,de=(N/2+V+K)*.07):W==="round-triangle"&&(se=(N+K+V)*(Math.PI/2),Se=-(N+K/2+V)/Math.PI),se!==0&&(G=(s+se)/s,j=s*G,["round-hexagon","round-tag"].includes(W)||(X=(l+se)/l,ee=l*X)),U=U==="auto"?Uf(j,ee):U;for(var ge=j/2,ue=ee/2,we=U+(N+V+K)/2,pe=new Array(ie.length/2),Ce=new Array(ie.length/2),ze=0;ze<ie.length/2;ze++)pe[ze]={x:ae.x+de+ge*ie[ze*2],y:ae.y+Se+ue*ie[ze*2+1]};var Ve,He,Fe,Re,Ze=pe.length;for(He=pe[Ze-1],Ve=0;Ve<Ze;Ve++)Fe=pe[Ve%Ze],Re=pe[(Ve+1)%Ze],Ce[Ve]=Ns(He,Fe,Re,we),He=Fe,Fe=Re;o.drawRoundPolygonPath(re||t,ae.x+de,ae.y+Se,s*G,l*X,ie,Ce)}else if(["roundrectangle","round-rectangle"].includes(W))U=U==="auto"?Er(j,ee):U,o.drawRoundRectanglePath(re||t,ae.x,ae.y,j,ee,U+(N+V+K)/2);else if(["cutrectangle","cut-rectangle"].includes(W))U=U==="auto"?ws():U,o.drawCutRectanglePath(re||t,ae.x,ae.y,j,ee,null,U+(N+V+K)/4);else if(["bottomroundrectangle","bottom-round-rectangle"].includes(W))U=U==="auto"?Er(j,ee):U,o.drawBottomRoundRectanglePath(re||t,ae.x,ae.y,j,ee,U+(N+V+K)/2);else if(W==="barrel")o.drawBarrelPath(re||t,ae.x,ae.y,j,ee);else if(W.startsWith("polygon")||["rhomboid","right-rhomboid","round-tag","tag","vee"].includes(W)){var We=(N+V+K)/s;ie=Fn(kn(ie,We)),o.drawPolygonPath(re||t,ae.x,ae.y,s,l,ie)}else{var Ue=(N+V+K)/s;ie=Fn(kn(ie,-Ue)),o.drawPolygonPath(re||t,ae.x,ae.y,s,l,ie)}if(c?t.stroke(re):t.stroke(),q==="double"){t.lineWidth=N/3;var nt=t.globalCompositeOperation;t.globalCompositeOperation="destination-out",c?t.stroke(re):t.stroke(),t.globalCompositeOperation=nt}t.setLineDash&&t.setLineDash([])}},me=function(){n&&o.drawNodeOverlay(t,e,v,s,l)},Ee=function(){n&&o.drawNodeUnderlay(t,e,v,s,l)},be=function(){o.drawElementText(t,e,null,a)},Ae=e.pstyle("ghost").value==="yes";if(Ae){var Ie=e.pstyle("ghost-offset-x").pfValue,Oe=e.pstyle("ghost-offset-y").pfValue,Be=e.pstyle("ghost-opacity").value,Pe=Be*h;t.translate(Ie,Oe),H(),ye(),J(Be*x),Te(),Le(Pe,!0),$(Be*F),fe(),he(P!==0||w!==0),le(P!==0||w!==0),Le(Pe,!1),ce(Pe),t.translate(-Ie,-Oe)}c&&t.translate(-v.x,-v.y),Ee(),c&&t.translate(v.x,v.y),H(),ye(),J(),Te(),Le(h,!0),$(),fe(),he(P!==0||w!==0),le(P!==0||w!==0),Le(h,!1),ce(),c&&t.translate(-v.x,-v.y),be(),me(),r&&t.translate(p.x1,p.y1)}};var $v=function(e){if(!["overlay","underlay"].includes(e))throw new Error("Invalid state");return function(r,a,n,i,o){var s=this;if(a.visible()){var l=a.pstyle("".concat(e,"-padding")).pfValue,u=a.pstyle("".concat(e,"-opacity")).value,f=a.pstyle("".concat(e,"-color")).value,v=a.pstyle("".concat(e,"-shape")).value,h=a.pstyle("".concat(e,"-corner-radius")).value;if(u>0){if(n=n||a.position(),i==null||o==null){var c=a.padding();i=a.width()+2*c,o=a.height()+2*c}s.colorFillStyle(r,f[0],f[1],f[2],u),s.nodeShapes[v].draw(r,n.x,n.y,i+l*2,o+l*2,h),r.fill()}}}};Lr.drawNodeOverlay=$v("overlay");Lr.drawNodeUnderlay=$v("underlay");Lr.hasPie=function(t){return t=t[0],t._private.hasPie};Lr.hasStripe=function(t){return t=t[0],t._private.hasStripe};Lr.drawPie=function(t,e,r,a){e=e[0],a=a||e.position();var n=e.cy().style(),i=e.pstyle("pie-size"),o=e.pstyle("pie-hole"),s=e.pstyle("pie-start-angle").pfValue,l=a.x,u=a.y,f=e.width(),v=e.height(),h=Math.min(f,v)/2,c,d=0,g=this.usePaths();if(g&&(l=0,u=0),i.units==="%"?h=h*i.pfValue:i.pfValue!==void 0&&(h=i.pfValue/2),o.units==="%"?c=h*o.pfValue:o.pfValue!==void 0&&(c=o.pfValue/2),!(c>=h))for(var y=1;y<=n.pieBackgroundN;y++){var p=e.pstyle("pie-"+y+"-background-size").value,m=e.pstyle("pie-"+y+"-background-color").value,b=e.pstyle("pie-"+y+"-background-opacity").value*r,E=p/100;E+d>1&&(E=1-d);var C=1.5*Math.PI+2*Math.PI*d;C+=s;var L=2*Math.PI*E,D=C+L;p===0||d>=1||d+E>1||(c===0?(t.beginPath(),t.moveTo(l,u),t.arc(l,u,h,C,D),t.closePath()):(t.beginPath(),t.arc(l,u,h,C,D),t.arc(l,u,c,D,C,!0),t.closePath()),this.colorFillStyle(t,m[0],m[1],m[2],b),t.fill(),d+=E)}};Lr.drawStripe=function(t,e,r,a){e=e[0],a=a||e.position();var n=e.cy().style(),i=a.x,o=a.y,s=e.width(),l=e.height(),u=0,f=this.usePaths();t.save();var v=e.pstyle("stripe-direction").value,h=e.pstyle("stripe-size");switch(v){case"vertical":break;case"righward":t.rotate(-Math.PI/2);break}var c=s,d=l;h.units==="%"?(c=c*h.pfValue,d=d*h.pfValue):h.pfValue!==void 0&&(c=h.pfValue,d=h.pfValue),f&&(i=0,o=0),o-=c/2,i-=d/2;for(var g=1;g<=n.stripeBackgroundN;g++){var y=e.pstyle("stripe-"+g+"-background-size").value,p=e.pstyle("stripe-"+g+"-background-color").value,m=e.pstyle("stripe-"+g+"-background-opacity").value*r,b=y/100;b+u>1&&(b=1-u),!(y===0||u>=1||u+b>1)&&(t.beginPath(),t.rect(i,o+d*u,c,d*b),t.closePath(),this.colorFillStyle(t,p[0],p[1],p[2],m),t.fill(),u+=b)}t.restore()};var Mt={},om=100;Mt.getPixelRatio=function(){var t=this.data.contexts[0];if(this.forcedPixelRatio!=null)return this.forcedPixelRatio;var e=this.cy.window(),r=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(e.devicePixelRatio||1)/r};Mt.paintCache=function(t){for(var e=this.paintCaches=this.paintCaches||[],r=!0,a,n=0;n<e.length;n++)if(a=e[n],a.context===t){r=!1;break}return r&&(a={context:t},e.push(a)),a};Mt.createGradientStyleFor=function(t,e,r,a,n){var i,o=this.usePaths(),s=r.pstyle(e+"-gradient-stop-colors").value,l=r.pstyle(e+"-gradient-stop-positions").pfValue;if(a==="radial-gradient")if(r.isEdge()){var u=r.sourceEndpoint(),f=r.targetEndpoint(),v=r.midpoint(),h=Vr(u,v),c=Vr(f,v);i=t.createRadialGradient(v.x,v.y,0,v.x,v.y,Math.max(h,c))}else{var d=o?{x:0,y:0}:r.position(),g=r.paddedWidth(),y=r.paddedHeight();i=t.createRadialGradient(d.x,d.y,0,d.x,d.y,Math.max(g,y))}else if(r.isEdge()){var p=r.sourceEndpoint(),m=r.targetEndpoint();i=t.createLinearGradient(p.x,p.y,m.x,m.y)}else{var b=o?{x:0,y:0}:r.position(),E=r.paddedWidth(),C=r.paddedHeight(),L=E/2,D=C/2,R=r.pstyle("background-gradient-direction").value;switch(R){case"to-bottom":i=t.createLinearGradient(b.x,b.y-D,b.x,b.y+D);break;case"to-top":i=t.createLinearGradient(b.x,b.y+D,b.x,b.y-D);break;case"to-left":i=t.createLinearGradient(b.x+L,b.y,b.x-L,b.y);break;case"to-right":i=t.createLinearGradient(b.x-L,b.y,b.x+L,b.y);break;case"to-bottom-right":case"to-right-bottom":i=t.createLinearGradient(b.x-L,b.y-D,b.x+L,b.y+D);break;case"to-top-right":case"to-right-top":i=t.createLinearGradient(b.x-L,b.y+D,b.x+L,b.y-D);break;case"to-bottom-left":case"to-left-bottom":i=t.createLinearGradient(b.x+L,b.y-D,b.x-L,b.y+D);break;case"to-top-left":case"to-left-top":i=t.createLinearGradient(b.x+L,b.y+D,b.x-L,b.y-D);break}}if(!i)return null;for(var O=l.length===s.length,M=s.length,P=0;P<M;P++)i.addColorStop(O?l[P]:P/(M-1),"rgba("+s[P][0]+","+s[P][1]+","+s[P][2]+","+n+")");return i};Mt.gradientFillStyle=function(t,e,r,a){var n=this.createGradientStyleFor(t,"background",e,r,a);if(!n)return null;t.fillStyle=n};Mt.colorFillStyle=function(t,e,r,a,n){t.fillStyle="rgba("+e+","+r+","+a+","+n+")"};Mt.eleFillStyle=function(t,e,r){var a=e.pstyle("background-fill").value;if(a==="linear-gradient"||a==="radial-gradient")this.gradientFillStyle(t,e,a,r);else{var n=e.pstyle("background-color").value;this.colorFillStyle(t,n[0],n[1],n[2],r)}};Mt.gradientStrokeStyle=function(t,e,r,a){var n=this.createGradientStyleFor(t,"line",e,r,a);if(!n)return null;t.strokeStyle=n};Mt.colorStrokeStyle=function(t,e,r,a,n){t.strokeStyle="rgba("+e+","+r+","+a+","+n+")"};Mt.eleStrokeStyle=function(t,e,r){var a=e.pstyle("line-fill").value;if(a==="linear-gradient"||a==="radial-gradient")this.gradientStrokeStyle(t,e,a,r);else{var n=e.pstyle("line-color").value;this.colorStrokeStyle(t,n[0],n[1],n[2],r)}};Mt.matchCanvasSize=function(t){var e=this,r=e.data,a=e.findContainerClientCoords(),n=a[2],i=a[3],o=e.getPixelRatio(),s=e.motionBlurPxRatio;(t===e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE]||t===e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG])&&(o=s);var l=n*o,u=i*o,f;if(!(l===e.canvasWidth&&u===e.canvasHeight)){e.fontCaches=null;var v=r.canvasContainer;v.style.width=n+"px",v.style.height=i+"px";for(var h=0;h<e.CANVAS_LAYERS;h++)f=r.canvases[h],f.width=l,f.height=u,f.style.width=n+"px",f.style.height=i+"px";for(var h=0;h<e.BUFFER_COUNT;h++)f=r.bufferCanvases[h],f.width=l,f.height=u,f.style.width=n+"px",f.style.height=i+"px";e.textureMult=1,o<=1&&(f=r.bufferCanvases[e.TEXTURE_BUFFER],e.textureMult=2,f.width=l*e.textureMult,f.height=u*e.textureMult),e.canvasWidth=l,e.canvasHeight=u,e.pixelRatio=o}};Mt.renderTo=function(t,e,r,a){this.render({forcedContext:t,forcedZoom:e,forcedPan:r,drawAllLayers:!0,forcedPxRatio:a})};Mt.clearCanvas=function(){var t=this,e=t.data;function r(a){a.clearRect(0,0,t.canvasWidth,t.canvasHeight)}r(e.contexts[t.NODE]),r(e.contexts[t.DRAG])};Mt.render=function(t){var e=this;t=t||Bf();var r=e.cy,a=t.forcedContext,n=t.drawAllLayers,i=t.drawOnlyNodeLayer,o=t.forcedZoom,s=t.forcedPan,l=t.forcedPxRatio===void 0?this.getPixelRatio():t.forcedPxRatio,u=e.data,f=u.canvasNeedsRedraw,v=e.textureOnViewport&&!a&&(e.pinching||e.hoverData.dragging||e.swipePanning||e.data.wheelZooming),h=t.motionBlur!==void 0?t.motionBlur:e.motionBlur,c=e.motionBlurPxRatio,d=r.hasCompoundNodes(),g=e.hoverData.draggingEles,y=!!(e.hoverData.selecting||e.touchData.selecting);h=h&&!a&&e.motionBlurEnabled&&!y;var p=h;a||(e.prevPxRatio!==l&&(e.invalidateContainerClientCoordsCache(),e.matchCanvasSize(e.container),e.redrawHint("eles",!0),e.redrawHint("drag",!0)),e.prevPxRatio=l),!a&&e.motionBlurTimeout&&clearTimeout(e.motionBlurTimeout),h&&(e.mbFrames==null&&(e.mbFrames=0),e.mbFrames++,e.mbFrames<3&&(p=!1),e.mbFrames>e.minMbLowQualFrames&&(e.motionBlurPxRatio=e.mbPxRBlurry)),e.clearingMotionBlur&&(e.motionBlurPxRatio=1),e.textureDrawLastFrame&&!v&&(f[e.NODE]=!0,f[e.SELECT_BOX]=!0);var m=r.style(),b=r.zoom(),E=o!==void 0?o:b,C=r.pan(),L={x:C.x,y:C.y},D={zoom:b,pan:{x:C.x,y:C.y}},R=e.prevViewport,O=R===void 0||D.zoom!==R.zoom||D.pan.x!==R.pan.x||D.pan.y!==R.pan.y;!O&&!(g&&!d)&&(e.motionBlurPxRatio=1),s&&(L=s),E*=l,L.x*=l,L.y*=l;var M=e.getCachedZSortedEles();function P($,H,Y,Q,oe){var te=$.globalCompositeOperation;$.globalCompositeOperation="destination-out",e.colorFillStyle($,255,255,255,e.motionBlurTransparency),$.fillRect(H,Y,Q,oe),$.globalCompositeOperation=te}function w($,H){var Y,Q,oe,te;!e.clearingMotionBlur&&($===u.bufferContexts[e.MOTIONBLUR_BUFFER_NODE]||$===u.bufferContexts[e.MOTIONBLUR_BUFFER_DRAG])?(Y={x:C.x*c,y:C.y*c},Q=b*c,oe=e.canvasWidth*c,te=e.canvasHeight*c):(Y=L,Q=E,oe=e.canvasWidth,te=e.canvasHeight),$.setTransform(1,0,0,1,0,0),H==="motionBlur"?P($,0,0,oe,te):!a&&(H===void 0||H)&&$.clearRect(0,0,oe,te),n||($.translate(Y.x,Y.y),$.scale(Q,Q)),s&&$.translate(s.x,s.y),o&&$.scale(o,o)}if(v||(e.textureDrawLastFrame=!1),v){if(e.textureDrawLastFrame=!0,!e.textureCache){e.textureCache={},e.textureCache.bb=r.mutableElements().boundingBox(),e.textureCache.texture=e.data.bufferCanvases[e.TEXTURE_BUFFER];var x=e.data.bufferContexts[e.TEXTURE_BUFFER];x.setTransform(1,0,0,1,0,0),x.clearRect(0,0,e.canvasWidth*e.textureMult,e.canvasHeight*e.textureMult),e.render({forcedContext:x,drawOnlyNodeLayer:!0,forcedPxRatio:l*e.textureMult});var D=e.textureCache.viewport={zoom:r.zoom(),pan:r.pan(),width:e.canvasWidth,height:e.canvasHeight};D.mpan={x:(0-D.pan.x)/D.zoom,y:(0-D.pan.y)/D.zoom}}f[e.DRAG]=!1,f[e.NODE]=!1;var T=u.contexts[e.NODE],A=e.textureCache.texture,D=e.textureCache.viewport;T.setTransform(1,0,0,1,0,0),h?P(T,0,0,D.width,D.height):T.clearRect(0,0,D.width,D.height);var S=m.core("outside-texture-bg-color").value,I=m.core("outside-texture-bg-opacity").value;e.colorFillStyle(T,S[0],S[1],S[2],I),T.fillRect(0,0,D.width,D.height);var b=r.zoom();w(T,!1),T.clearRect(D.mpan.x,D.mpan.y,D.width/D.zoom/l,D.height/D.zoom/l),T.drawImage(A,D.mpan.x,D.mpan.y,D.width/D.zoom/l,D.height/D.zoom/l)}else e.textureOnViewport&&!a&&(e.textureCache=null);var B=r.extent(),k=e.pinching||e.hoverData.dragging||e.swipePanning||e.data.wheelZooming||e.hoverData.draggingEles||e.cy.animated(),z=e.hideEdgesOnViewport&&k,F=[];if(F[e.NODE]=!f[e.NODE]&&h&&!e.clearedForMotionBlur[e.NODE]||e.clearingMotionBlur,F[e.NODE]&&(e.clearedForMotionBlur[e.NODE]=!0),F[e.DRAG]=!f[e.DRAG]&&h&&!e.clearedForMotionBlur[e.DRAG]||e.clearingMotionBlur,F[e.DRAG]&&(e.clearedForMotionBlur[e.DRAG]=!0),f[e.NODE]||n||i||F[e.NODE]){var V=h&&!F[e.NODE]&&c!==1,T=a||(V?e.data.bufferContexts[e.MOTIONBLUR_BUFFER_NODE]:u.contexts[e.NODE]),Z=h&&!V?"motionBlur":void 0;w(T,Z),z?e.drawCachedNodes(T,M.nondrag,l,B):e.drawLayeredElements(T,M.nondrag,l,B),e.debug&&e.drawDebugPoints(T,M.nondrag),!n&&!h&&(f[e.NODE]=!1)}if(!i&&(f[e.DRAG]||n||F[e.DRAG])){var V=h&&!F[e.DRAG]&&c!==1,T=a||(V?e.data.bufferContexts[e.MOTIONBLUR_BUFFER_DRAG]:u.contexts[e.DRAG]);w(T,h&&!V?"motionBlur":void 0),z?e.drawCachedNodes(T,M.drag,l,B):e.drawCachedElements(T,M.drag,l,B),e.debug&&e.drawDebugPoints(T,M.drag),!n&&!h&&(f[e.DRAG]=!1)}if(this.drawSelectionRectangle(t,w),h&&c!==1){var q=u.contexts[e.NODE],_=e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE],K=u.contexts[e.DRAG],U=e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG],J=function(H,Y,Q){H.setTransform(1,0,0,1,0,0),Q||!p?H.clearRect(0,0,e.canvasWidth,e.canvasHeight):P(H,0,0,e.canvasWidth,e.canvasHeight);var oe=c;H.drawImage(Y,0,0,e.canvasWidth*oe,e.canvasHeight*oe,0,0,e.canvasWidth,e.canvasHeight)};(f[e.NODE]||F[e.NODE])&&(J(q,_,F[e.NODE]),f[e.NODE]=!1),(f[e.DRAG]||F[e.DRAG])&&(J(K,U,F[e.DRAG]),f[e.DRAG]=!1)}e.prevViewport=D,e.clearingMotionBlur&&(e.clearingMotionBlur=!1,e.motionBlurCleared=!0,e.motionBlur=!0),h&&(e.motionBlurTimeout=setTimeout(function(){e.motionBlurTimeout=null,e.clearedForMotionBlur[e.NODE]=!1,e.clearedForMotionBlur[e.DRAG]=!1,e.motionBlur=!1,e.clearingMotionBlur=!v,e.mbFrames=0,f[e.NODE]=!0,f[e.DRAG]=!0,e.redraw()},om)),a||r.emit("render")};var Ca;Mt.drawSelectionRectangle=function(t,e){var r=this,a=r.cy,n=r.data,i=a.style(),o=t.drawOnlyNodeLayer,s=t.drawAllLayers,l=n.canvasNeedsRedraw,u=t.forcedContext;if(r.showFps||!o&&l[r.SELECT_BOX]&&!s){var f=u||n.contexts[r.SELECT_BOX];if(e(f),r.selection[4]==1&&(r.hoverData.selecting||r.touchData.selecting)){var v=r.cy.zoom(),h=i.core("selection-box-border-width").value/v;f.lineWidth=h,f.fillStyle="rgba("+i.core("selection-box-color").value[0]+","+i.core("selection-box-color").value[1]+","+i.core("selection-box-color").value[2]+","+i.core("selection-box-opacity").value+")",f.fillRect(r.selection[0],r.selection[1],r.selection[2]-r.selection[0],r.selection[3]-r.selection[1]),h>0&&(f.strokeStyle="rgba("+i.core("selection-box-border-color").value[0]+","+i.core("selection-box-border-color").value[1]+","+i.core("selection-box-border-color").value[2]+","+i.core("selection-box-opacity").value+")",f.strokeRect(r.selection[0],r.selection[1],r.selection[2]-r.selection[0],r.selection[3]-r.selection[1]))}if(n.bgActivePosistion&&!r.hoverData.selecting){var v=r.cy.zoom(),c=n.bgActivePosistion;f.fillStyle="rgba("+i.core("active-bg-color").value[0]+","+i.core("active-bg-color").value[1]+","+i.core("active-bg-color").value[2]+","+i.core("active-bg-opacity").value+")",f.beginPath(),f.arc(c.x,c.y,i.core("active-bg-size").pfValue/v,0,2*Math.PI),f.fill()}var d=r.lastRedrawTime;if(r.showFps&&d){d=Math.round(d);var g=Math.round(1e3/d),y="1 frame = "+d+" ms = "+g+" fps";if(f.setTransform(1,0,0,1,0,0),f.fillStyle="rgba(255, 0, 0, 0.75)",f.strokeStyle="rgba(255, 0, 0, 0.75)",f.font="30px Arial",!Ca){var p=f.measureText(y);Ca=p.actualBoundingBoxAscent}f.fillText(y,0,Ca);var m=60;f.strokeRect(0,Ca+10,250,20),f.fillRect(0,Ca+10,250*Math.min(g/m,1),20)}s||(l[r.SELECT_BOX]=!1)}};function uf(t,e,r){var a=t.createShader(e);if(t.shaderSource(a,r),t.compileShader(a),!t.getShaderParameter(a,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(a));return a}function sm(t,e,r){var a=uf(t,t.VERTEX_SHADER,e),n=uf(t,t.FRAGMENT_SHADER,r),i=t.createProgram();if(t.attachShader(i,a),t.attachShader(i,n),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))throw new Error("Could not initialize shaders");return i}function um(t,e,r){r===void 0&&(r=e);var a=t.makeOffscreenCanvas(e,r),n=a.context=a.getContext("2d");return a.clear=function(){return n.clearRect(0,0,a.width,a.height)},a.clear(),a}function Is(t){var e=t.pixelRatio,r=t.cy.zoom(),a=t.cy.pan();return{zoom:r*e,pan:{x:a.x*e,y:a.y*e}}}function lm(t){var e=t.pixelRatio,r=t.cy.zoom();return r*e}function fm(t,e,r,a,n){var i=a*r+e.x,o=n*r+e.y;return o=Math.round(t.canvasHeight-o),[i,o]}function vm(t){return t.pstyle("background-fill").value!=="solid"||t.pstyle("background-image").strValue!=="none"?!1:t.pstyle("border-width").value===0||t.pstyle("border-opacity").value===0?!0:t.pstyle("border-style").value==="solid"}function hm(t,e){if(t.length!==e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}function Nr(t,e,r){var a=t[0]/255,n=t[1]/255,i=t[2]/255,o=e,s=r||new Array(4);return s[0]=a*o,s[1]=n*o,s[2]=i*o,s[3]=o,s}function Qr(t,e){var r=e||new Array(4);return r[0]=(t>>0&255)/255,r[1]=(t>>8&255)/255,r[2]=(t>>16&255)/255,r[3]=(t>>24&255)/255,r}function cm(t){return t[0]+(t[1]<<8)+(t[2]<<16)+(t[3]<<24)}function dm(t,e){var r=t.createTexture();return r.buffer=function(a){t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_NEAREST),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,a),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null)},r.deleteTexture=function(){t.deleteTexture(r)},r}function Kv(t,e){switch(e){case"float":return[1,t.FLOAT,4];case"vec2":return[2,t.FLOAT,4];case"vec3":return[3,t.FLOAT,4];case"vec4":return[4,t.FLOAT,4];case"int":return[1,t.INT,4];case"ivec2":return[2,t.INT,4]}}function _v(t,e,r){switch(e){case t.FLOAT:return new Float32Array(r);case t.INT:return new Int32Array(r)}}function gm(t,e,r,a,n,i){switch(e){case t.FLOAT:return new Float32Array(r.buffer,i*a,n);case t.INT:return new Int32Array(r.buffer,i*a,n)}}function pm(t,e,r,a){var n=Kv(t,e),i=vt(n,2),o=i[0],s=i[1],l=_v(t,s,a),u=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW),s===t.FLOAT?t.vertexAttribPointer(r,o,s,!1,0,0):s===t.INT&&t.vertexAttribIPointer(r,o,s,0,0),t.enableVertexAttribArray(r),t.bindBuffer(t.ARRAY_BUFFER,null),u}function Zt(t,e,r,a){var n=Kv(t,r),i=vt(n,3),o=i[0],s=i[1],l=i[2],u=_v(t,s,e*o),f=o*l,v=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,v),t.bufferData(t.ARRAY_BUFFER,e*f,t.DYNAMIC_DRAW),t.enableVertexAttribArray(a),s===t.FLOAT?t.vertexAttribPointer(a,o,s,!1,f,0):s===t.INT&&t.vertexAttribIPointer(a,o,s,f,0),t.vertexAttribDivisor(a,1),t.bindBuffer(t.ARRAY_BUFFER,null);for(var h=new Array(e),c=0;c<e;c++)h[c]=gm(t,s,u,f,o,c);return v.dataArray=u,v.stride=f,v.size=o,v.getView=function(d){return h[d]},v.setPoint=function(d,g,y){var p=h[d];p[0]=g,p[1]=y},v.bufferSubData=function(d){t.bindBuffer(t.ARRAY_BUFFER,v),d?t.bufferSubData(t.ARRAY_BUFFER,0,u,0,d*o):t.bufferSubData(t.ARRAY_BUFFER,0,u)},v}function ym(t,e,r){for(var a=9,n=new Float32Array(e*a),i=new Array(e),o=0;o<e;o++){var s=o*a*4;i[o]=new Float32Array(n.buffer,s,a)}var l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,n.byteLength,t.DYNAMIC_DRAW);for(var u=0;u<3;u++){var f=r+u;t.enableVertexAttribArray(f),t.vertexAttribPointer(f,3,t.FLOAT,!1,36,u*12),t.vertexAttribDivisor(f,1)}return t.bindBuffer(t.ARRAY_BUFFER,null),l.getMatrixView=function(v){return i[v]},l.setData=function(v,h){i[h].set(v,0)},l.bufferSubData=function(){t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferSubData(t.ARRAY_BUFFER,0,n)},l}function mm(t){var e=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,e);var r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.bindFramebuffer(t.FRAMEBUFFER,null),e.setFramebufferAttachmentSizes=function(a,n){t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,a,n,0,t.RGBA,t.UNSIGNED_BYTE,null)},e}var lf=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});function zo(){var t=new lf(9);return lf!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function ff(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function bm(t,e,r){var a=e[0],n=e[1],i=e[2],o=e[3],s=e[4],l=e[5],u=e[6],f=e[7],v=e[8],h=r[0],c=r[1],d=r[2],g=r[3],y=r[4],p=r[5],m=r[6],b=r[7],E=r[8];return t[0]=h*a+c*o+d*u,t[1]=h*n+c*s+d*f,t[2]=h*i+c*l+d*v,t[3]=g*a+y*o+p*u,t[4]=g*n+y*s+p*f,t[5]=g*i+y*l+p*v,t[6]=m*a+b*o+E*u,t[7]=m*n+b*s+E*f,t[8]=m*i+b*l+E*v,t}function Nn(t,e,r){var a=e[0],n=e[1],i=e[2],o=e[3],s=e[4],l=e[5],u=e[6],f=e[7],v=e[8],h=r[0],c=r[1];return t[0]=a,t[1]=n,t[2]=i,t[3]=o,t[4]=s,t[5]=l,t[6]=h*a+c*o+u,t[7]=h*n+c*s+f,t[8]=h*i+c*l+v,t}function vf(t,e,r){var a=e[0],n=e[1],i=e[2],o=e[3],s=e[4],l=e[5],u=e[6],f=e[7],v=e[8],h=Math.sin(r),c=Math.cos(r);return t[0]=c*a+h*o,t[1]=c*n+h*s,t[2]=c*i+h*l,t[3]=c*o-h*a,t[4]=c*s-h*n,t[5]=c*l-h*i,t[6]=u,t[7]=f,t[8]=v,t}function os(t,e,r){var a=r[0],n=r[1];return t[0]=a*e[0],t[1]=a*e[1],t[2]=a*e[2],t[3]=n*e[3],t[4]=n*e[4],t[5]=n*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function wm(t,e,r){return t[0]=2/e,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/r,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t}var Em=(function(){function t(e,r,a,n){Sr(this,t),this.debugID=Math.floor(Math.random()*1e4),this.r=e,this.texSize=r,this.texRows=a,this.texHeight=Math.floor(r/a),this.enableWrapping=!0,this.locked=!1,this.texture=null,this.needsBuffer=!0,this.freePointer={x:0,row:0},this.keyToLocation=new Map,this.canvas=n(e,r,r),this.scratch=n(e,r,this.texHeight,"scratch")}return Dr(t,[{key:"lock",value:function(){this.locked=!0}},{key:"getKeys",value:function(){return new Set(this.keyToLocation.keys())}},{key:"getScale",value:function(r){var a=r.w,n=r.h,i=this.texHeight,o=this.texSize,s=i/n,l=a*s,u=n*s;return l>o&&(s=o/a,l=a*s,u=n*s),{scale:s,texW:l,texH:u}}},{key:"draw",value:function(r,a,n){var i=this;if(this.locked)throw new Error("can't draw, atlas is locked");var o=this.texSize,s=this.texRows,l=this.texHeight,u=this.getScale(a),f=u.scale,v=u.texW,h=u.texH,c=function(b,E){if(n&&E){var C=E.context,L=b.x,D=b.row,R=L,O=l*D;C.save(),C.translate(R,O),C.scale(f,f),n(C,a),C.restore()}},d=[null,null],g=function(){c(i.freePointer,i.canvas),d[0]={x:i.freePointer.x,y:i.freePointer.row*l,w:v,h},d[1]={x:i.freePointer.x+v,y:i.freePointer.row*l,w:0,h},i.freePointer.x+=v,i.freePointer.x==o&&(i.freePointer.x=0,i.freePointer.row++)},y=function(){var b=i.scratch,E=i.canvas;b.clear(),c({x:0,row:0},b);var C=o-i.freePointer.x,L=v-C,D=l;{var R=i.freePointer.x,O=i.freePointer.row*l,M=C;E.context.drawImage(b,0,0,M,D,R,O,M,D),d[0]={x:R,y:O,w:M,h}}{var P=C,w=(i.freePointer.row+1)*l,x=L;E&&E.context.drawImage(b,P,0,x,D,0,w,x,D),d[1]={x:0,y:w,w:x,h}}i.freePointer.x=L,i.freePointer.row++},p=function(){i.freePointer.x=0,i.freePointer.row++};if(this.freePointer.x+v<=o)g();else{if(this.freePointer.row>=s-1)return!1;this.freePointer.x===o?(p(),g()):this.enableWrapping?y():(p(),g())}return this.keyToLocation.set(r,d),this.needsBuffer=!0,d}},{key:"getOffsets",value:function(r){return this.keyToLocation.get(r)}},{key:"isEmpty",value:function(){return this.freePointer.x===0&&this.freePointer.row===0}},{key:"canFit",value:function(r){if(this.locked)return!1;var a=this.texSize,n=this.texRows,i=this.getScale(r),o=i.texW;return this.freePointer.x+o>a?this.freePointer.row<n-1:!0}},{key:"bufferIfNeeded",value:function(r){this.texture||(this.texture=dm(r,this.debugID)),this.needsBuffer&&(this.texture.buffer(this.canvas),this.needsBuffer=!1,this.locked&&(this.canvas=null,this.scratch=null))}},{key:"dispose",value:function(){this.texture&&(this.texture.deleteTexture(),this.texture=null),this.canvas=null,this.scratch=null,this.locked=!0}}])})(),xm=(function(){function t(e,r,a,n){Sr(this,t),this.r=e,this.texSize=r,this.texRows=a,this.createTextureCanvas=n,this.atlases=[],this.styleKeyToAtlas=new Map,this.markedKeys=new Set}return Dr(t,[{key:"getKeys",value:function(){return new Set(this.styleKeyToAtlas.keys())}},{key:"_createAtlas",value:function(){var r=this.r,a=this.texSize,n=this.texRows,i=this.createTextureCanvas;return new Em(r,a,n,i)}},{key:"_getScratchCanvas",value:function(){if(!this.scratch){var r=this.r,a=this.texSize,n=this.texRows,i=this.createTextureCanvas,o=Math.floor(a/n);this.scratch=i(r,a,o,"scratch")}return this.scratch}},{key:"draw",value:function(r,a,n){var i=this.styleKeyToAtlas.get(r);return i||(i=this.atlases[this.atlases.length-1],(!i||!i.canFit(a))&&(i&&i.lock(),i=this._createAtlas(),this.atlases.push(i)),i.draw(r,a,n),this.styleKeyToAtlas.set(r,i)),i}},{key:"getAtlas",value:function(r){return this.styleKeyToAtlas.get(r)}},{key:"hasAtlas",value:function(r){return this.styleKeyToAtlas.has(r)}},{key:"markKeyForGC",value:function(r){this.markedKeys.add(r)}},{key:"gc",value:function(){var r=this,a=this.markedKeys;if(a.size===0){console.log("nothing to garbage collect");return}var n=[],i=new Map,o=null,s=Bt(this.atlases),l;try{var u=function(){var v=l.value,h=v.getKeys(),c=Tm(a,h);if(c.size===0)return n.push(v),h.forEach(function(C){return i.set(C,v)}),1;o||(o=r._createAtlas(),n.push(o));var d=Bt(h),g;try{for(d.s();!(g=d.n()).done;){var y=g.value;if(!c.has(y)){var p=v.getOffsets(y),m=vt(p,2),b=m[0],E=m[1];o.canFit({w:b.w+E.w,h:b.h})||(o.lock(),o=r._createAtlas(),n.push(o)),v.canvas&&(r._copyTextureToNewAtlas(y,v,o),i.set(y,o))}}}catch(C){d.e(C)}finally{d.f()}v.dispose()};for(s.s();!(l=s.n()).done;)u()}catch(f){s.e(f)}finally{s.f()}this.atlases=n,this.styleKeyToAtlas=i,this.markedKeys=new Set}},{key:"_copyTextureToNewAtlas",value:function(r,a,n){var i=a.getOffsets(r),o=vt(i,2),s=o[0],l=o[1];if(l.w===0)n.draw(r,s,function(h){h.drawImage(a.canvas,s.x,s.y,s.w,s.h,0,0,s.w,s.h)});else{var u=this._getScratchCanvas();u.clear(),u.context.drawImage(a.canvas,s.x,s.y,s.w,s.h,0,0,s.w,s.h),u.context.drawImage(a.canvas,l.x,l.y,l.w,l.h,s.w,0,l.w,l.h);var f=s.w+l.w,v=s.h;n.draw(r,{w:f,h:v},function(h){h.drawImage(u,0,0,f,v,0,0,f,v)})}}},{key:"getCounts",value:function(){return{keyCount:this.styleKeyToAtlas.size,atlasCount:new Set(this.styleKeyToAtlas.values()).size}}}])})();function Tm(t,e){return t.intersection?t.intersection(e):new Set(Pn(t).filter(function(r){return e.has(r)}))}var Cm=(function(){function t(e,r){Sr(this,t),this.r=e,this.globalOptions=r,this.atlasSize=r.webglTexSize,this.maxAtlasesPerBatch=r.webglTexPerBatch,this.renderTypes=new Map,this.collections=new Map,this.typeAndIdToKey=new Map}return Dr(t,[{key:"getAtlasSize",value:function(){return this.atlasSize}},{key:"addAtlasCollection",value:function(r,a){var n=this.globalOptions,i=n.webglTexSize,o=n.createTextureCanvas,s=a.texRows,l=this._cacheScratchCanvas(o),u=new xm(this.r,i,s,l);this.collections.set(r,u)}},{key:"addRenderType",value:function(r,a){var n=a.collection;if(!this.collections.has(n))throw new Error("invalid atlas collection name '".concat(n,"'"));var i=this.collections.get(n),o=Ne({type:r,atlasCollection:i},a);this.renderTypes.set(r,o)}},{key:"getRenderTypeOpts",value:function(r){return this.renderTypes.get(r)}},{key:"getAtlasCollection",value:function(r){return this.collections.get(r)}},{key:"_cacheScratchCanvas",value:function(r){var a=-1,n=-1,i=null;return function(o,s,l,u){return u?((!i||s!=a||l!=n)&&(a=s,n=l,i=r(o,s,l)),i):r(o,s,l)}}},{key:"_key",value:function(r,a){return"".concat(r,"-").concat(a)}},{key:"invalidate",value:function(r){var a=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=n.forceRedraw,o=i===void 0?!1:i,s=n.filterEle,l=s===void 0?function(){return!0}:s,u=n.filterType,f=u===void 0?function(){return!0}:u,v=!1,h=!1,c=Bt(r),d;try{for(c.s();!(d=c.n()).done;){var g=d.value;if(l(g)){var y=Bt(this.renderTypes.values()),p;try{var m=function(){var E=p.value,C=E.type;if(f(C)){var L=a.collections.get(E.collection),D=E.getKey(g),R=Array.isArray(D)?D:[D];if(o)R.forEach(function(w){return L.markKeyForGC(w)}),h=!0;else{var O=E.getID?E.getID(g):g.id(),M=a._key(C,O),P=a.typeAndIdToKey.get(M);P!==void 0&&!hm(R,P)&&(v=!0,a.typeAndIdToKey.delete(M),P.forEach(function(w){return L.markKeyForGC(w)}))}}};for(y.s();!(p=y.n()).done;)m()}catch(b){y.e(b)}finally{y.f()}}}}catch(b){c.e(b)}finally{c.f()}return h&&(this.gc(),v=!1),v}},{key:"gc",value:function(){var r=Bt(this.collections.values()),a;try{for(r.s();!(a=r.n()).done;){var n=a.value;n.gc()}}catch(i){r.e(i)}finally{r.f()}}},{key:"getOrCreateAtlas",value:function(r,a,n,i){var o=this.renderTypes.get(a),s=this.collections.get(o.collection),l=!1,u=s.draw(i,n,function(h){o.drawClipped?(h.save(),h.beginPath(),h.rect(0,0,n.w,n.h),h.clip(),o.drawElement(h,r,n,!0,!0),h.restore()):o.drawElement(h,r,n,!0,!0),l=!0});if(l){var f=o.getID?o.getID(r):r.id(),v=this._key(a,f);this.typeAndIdToKey.has(v)?this.typeAndIdToKey.get(v).push(i):this.typeAndIdToKey.set(v,[i])}return u}},{key:"getAtlasInfo",value:function(r,a){var n=this,i=this.renderTypes.get(a),o=i.getKey(r),s=Array.isArray(o)?o:[o];return s.map(function(l){var u=i.getBoundingBox(r,l),f=n.getOrCreateAtlas(r,a,u,l),v=f.getOffsets(l),h=vt(v,2),c=h[0],d=h[1];return{atlas:f,tex:c,tex1:c,tex2:d,bb:u}})}},{key:"getDebugInfo",value:function(){var r=[],a=Bt(this.collections),n;try{for(a.s();!(n=a.n()).done;){var i=vt(n.value,2),o=i[0],s=i[1],l=s.getCounts(),u=l.keyCount,f=l.atlasCount;r.push({type:o,keyCount:u,atlasCount:f})}}catch(v){a.e(v)}finally{a.f()}return r}}])})(),Sm=(function(){function t(e){Sr(this,t),this.globalOptions=e,this.atlasSize=e.webglTexSize,this.maxAtlasesPerBatch=e.webglTexPerBatch,this.batchAtlases=[]}return Dr(t,[{key:"getMaxAtlasesPerBatch",value:function(){return this.maxAtlasesPerBatch}},{key:"getAtlasSize",value:function(){return this.atlasSize}},{key:"getIndexArray",value:function(){return Array.from({length:this.maxAtlasesPerBatch},function(r,a){return a})}},{key:"startBatch",value:function(){this.batchAtlases=[]}},{key:"getAtlasCount",value:function(){return this.batchAtlases.length}},{key:"getAtlases",value:function(){return this.batchAtlases}},{key:"canAddToCurrentBatch",value:function(r){return this.batchAtlases.length===this.maxAtlasesPerBatch?this.batchAtlases.includes(r):!0}},{key:"getAtlasIndexForBatch",value:function(r){var a=this.batchAtlases.indexOf(r);if(a<0){if(this.batchAtlases.length===this.maxAtlasesPerBatch)throw new Error("cannot add more atlases to batch");this.batchAtlases.push(r),a=this.batchAtlases.length-1}return a}}])})(),Dm=`
  float circleSD(vec2 p, float r) {
    return distance(vec2(0), p) - r; // signed distance
  }
`,Am=`
  float rectangleSD(vec2 p, vec2 b) {
    vec2 d = abs(p)-b;
    return distance(vec2(0),max(d,0.0)) + min(max(d.x,d.y),0.0);
  }
`,Lm=`
  float roundRectangleSD(vec2 p, vec2 b, vec4 cr) {
    cr.xy = (p.x > 0.0) ? cr.xy : cr.zw;
    cr.x  = (p.y > 0.0) ? cr.x  : cr.y;
    vec2 q = abs(p) - b + cr.x;
    return min(max(q.x, q.y), 0.0) + distance(vec2(0), max(q, 0.0)) - cr.x;
  }
`,Mm=`
  float ellipseSD(vec2 p, vec2 ab) {
    p = abs( p ); // symmetry

    // find root with Newton solver
    vec2 q = ab*(p-ab);
    float w = (q.x<q.y)? 1.570796327 : 0.0;
    for( int i=0; i<5; i++ ) {
      vec2 cs = vec2(cos(w),sin(w));
      vec2 u = ab*vec2( cs.x,cs.y);
      vec2 v = ab*vec2(-cs.y,cs.x);
      w = w + dot(p-u,v)/(dot(p-u,u)+dot(v,v));
    }
    
    // compute final point and distance
    float d = length(p-ab*vec2(cos(w),sin(w)));
    
    // return signed distance
    return (dot(p/ab,p/ab)>1.0) ? d : -d;
  }
`,Pa={SCREEN:{name:"screen",screen:!0},PICKING:{name:"picking",picking:!0}},Yn={IGNORE:1,USE_BB:2},Vo=0,hf=1,cf=2,Go=3,Jr=4,wn=5,Sa=6,Da=7,Rm=(function(){function t(e,r,a){Sr(this,t),this.r=e,this.gl=r,this.maxInstances=a.webglBatchSize,this.atlasSize=a.webglTexSize,this.bgColor=a.bgColor,this.debug=a.webglDebug,this.batchDebugInfo=[],a.enableWrapping=!0,a.createTextureCanvas=um,this.atlasManager=new Cm(e,a),this.batchManager=new Sm(a),this.simpleShapeOptions=new Map,this.program=this._createShaderProgram(Pa.SCREEN),this.pickingProgram=this._createShaderProgram(Pa.PICKING),this.vao=this._createVAO()}return Dr(t,[{key:"addAtlasCollection",value:function(r,a){this.atlasManager.addAtlasCollection(r,a)}},{key:"addTextureAtlasRenderType",value:function(r,a){this.atlasManager.addRenderType(r,a)}},{key:"addSimpleShapeRenderType",value:function(r,a){this.simpleShapeOptions.set(r,a)}},{key:"invalidate",value:function(r){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=a.type,i=this.atlasManager;return n?i.invalidate(r,{filterType:function(s){return s===n},forceRedraw:!0}):i.invalidate(r)}},{key:"gc",value:function(){this.atlasManager.gc()}},{key:"_createShaderProgram",value:function(r){var a=this.gl,n=`#version 300 es
      precision highp float;

      uniform mat3 uPanZoomMatrix;
      uniform int  uAtlasSize;
      
      // instanced
      in vec2 aPosition; // a vertex from the unit square
      
      in mat3 aTransform; // used to transform verticies, eg into a bounding box
      in int aVertType; // the type of thing we are rendering

      // the z-index that is output when using picking mode
      in vec4 aIndex;
      
      // For textures
      in int aAtlasId; // which shader unit/atlas to use
      in vec4 aTex; // x/y/w/h of texture in atlas

      // for edges
      in vec4 aPointAPointB;
      in vec4 aPointCPointD;
      in vec2 aLineWidth; // also used for node border width

      // simple shapes
      in vec4 aCornerRadius; // for round-rectangle [top-right, bottom-right, top-left, bottom-left]
      in vec4 aColor; // also used for edges
      in vec4 aBorderColor; // aLineWidth is used for border width

      // output values passed to the fragment shader
      out vec2 vTexCoord;
      out vec4 vColor;
      out vec2 vPosition;
      // flat values are not interpolated
      flat out int vAtlasId; 
      flat out int vVertType;
      flat out vec2 vTopRight;
      flat out vec2 vBotLeft;
      flat out vec4 vCornerRadius;
      flat out vec4 vBorderColor;
      flat out vec2 vBorderWidth;
      flat out vec4 vIndex;
      
      void main(void) {
        int vid = gl_VertexID;
        vec2 position = aPosition; // TODO make this a vec3, simplifies some code below

        if(aVertType == `.concat(Vo,`) {
          float texX = aTex.x; // texture coordinates
          float texY = aTex.y;
          float texW = aTex.z;
          float texH = aTex.w;

          if(vid == 1 || vid == 2 || vid == 4) {
            texX += texW;
          }
          if(vid == 2 || vid == 4 || vid == 5) {
            texY += texH;
          }

          float d = float(uAtlasSize);
          vTexCoord = vec2(texX / d, texY / d); // tex coords must be between 0 and 1

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
        }
        else if(aVertType == `).concat(Jr," || aVertType == ").concat(Da,` 
             || aVertType == `).concat(wn," || aVertType == ").concat(Sa,`) { // simple shapes

          // the bounding box is needed by the fragment shader
          vBotLeft  = (aTransform * vec3(0, 0, 1)).xy; // flat
          vTopRight = (aTransform * vec3(1, 1, 1)).xy; // flat
          vPosition = (aTransform * vec3(position, 1)).xy; // will be interpolated

          // calculations are done in the fragment shader, just pass these along
          vColor = aColor;
          vCornerRadius = aCornerRadius;
          vBorderColor = aBorderColor;
          vBorderWidth = aLineWidth;

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
        }
        else if(aVertType == `).concat(hf,`) {
          vec2 source = aPointAPointB.xy;
          vec2 target = aPointAPointB.zw;

          // adjust the geometry so that the line is centered on the edge
          position.y = position.y - 0.5;

          // stretch the unit square into a long skinny rectangle
          vec2 xBasis = target - source;
          vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));
          vec2 point = source + xBasis * position.x + yBasis * aLineWidth[0] * position.y;

          gl_Position = vec4(uPanZoomMatrix * vec3(point, 1.0), 1.0);
          vColor = aColor;
        } 
        else if(aVertType == `).concat(cf,`) {
          vec2 pointA = aPointAPointB.xy;
          vec2 pointB = aPointAPointB.zw;
          vec2 pointC = aPointCPointD.xy;
          vec2 pointD = aPointCPointD.zw;

          // adjust the geometry so that the line is centered on the edge
          position.y = position.y - 0.5;

          vec2 p0, p1, p2, pos;
          if(position.x == 0.0) { // The left side of the unit square
            p0 = pointA;
            p1 = pointB;
            p2 = pointC;
            pos = position;
          } else { // The right side of the unit square, use same approach but flip the geometry upside down
            p0 = pointD;
            p1 = pointC;
            p2 = pointB;
            pos = vec2(0.0, -position.y);
          }

          vec2 p01 = p1 - p0;
          vec2 p12 = p2 - p1;
          vec2 p21 = p1 - p2;

          // Find the normal vector.
          vec2 tangent = normalize(normalize(p12) + normalize(p01));
          vec2 normal = vec2(-tangent.y, tangent.x);

          // Find the vector perpendicular to p0 -> p1.
          vec2 p01Norm = normalize(vec2(-p01.y, p01.x));

          // Determine the bend direction.
          float sigma = sign(dot(p01 + p21, normal));
          float width = aLineWidth[0];

          if(sign(pos.y) == -sigma) {
            // This is an intersecting vertex. Adjust the position so that there's no overlap.
            vec2 point = 0.5 * width * normal * -sigma / dot(normal, p01Norm);
            gl_Position = vec4(uPanZoomMatrix * vec3(p1 + point, 1.0), 1.0);
          } else {
            // This is a non-intersecting vertex. Treat it like a mitre join.
            vec2 point = 0.5 * width * normal * sigma * dot(normal, p01Norm);
            gl_Position = vec4(uPanZoomMatrix * vec3(p1 + point, 1.0), 1.0);
          }

          vColor = aColor;
        } 
        else if(aVertType == `).concat(Go,` && vid < 3) {
          // massage the first triangle into an edge arrow
          if(vid == 0)
            position = vec2(-0.15, -0.3);
          if(vid == 1)
            position = vec2(  0.0,  0.0);
          if(vid == 2)
            position = vec2( 0.15, -0.3);

          gl_Position = vec4(uPanZoomMatrix * aTransform * vec3(position, 1.0), 1.0);
          vColor = aColor;
        }
        else {
          gl_Position = vec4(2.0, 0.0, 0.0, 1.0); // discard vertex by putting it outside webgl clip space
        }

        vAtlasId = aAtlasId;
        vVertType = aVertType;
        vIndex = aIndex;
      }
    `),i=this.batchManager.getIndexArray(),o=`#version 300 es
      precision highp float;

      // declare texture unit for each texture atlas in the batch
      `.concat(i.map(function(u){return"uniform sampler2D uTexture".concat(u,";")}).join(`
	`),`

      uniform vec4 uBGColor;
      uniform float uZoom;

      in vec2 vTexCoord;
      in vec4 vColor;
      in vec2 vPosition; // model coordinates

      flat in int vAtlasId;
      flat in vec4 vIndex;
      flat in int vVertType;
      flat in vec2 vTopRight;
      flat in vec2 vBotLeft;
      flat in vec4 vCornerRadius;
      flat in vec4 vBorderColor;
      flat in vec2 vBorderWidth;

      out vec4 outColor;

      `).concat(Dm,`
      `).concat(Am,`
      `).concat(Lm,`
      `).concat(Mm,`

      vec4 blend(vec4 top, vec4 bot) { // blend colors with premultiplied alpha
        return vec4( 
          top.rgb + (bot.rgb * (1.0 - top.a)),
          top.a   + (bot.a   * (1.0 - top.a)) 
        );
      }

      vec4 distInterp(vec4 cA, vec4 cB, float d) { // interpolate color using Signed Distance
        // scale to the zoom level so that borders don't look blurry when zoomed in
        // note 1.5 is an aribitrary value chosen because it looks good
        return mix(cA, cB, 1.0 - smoothstep(0.0, 1.5 / uZoom, abs(d))); 
      }

      void main(void) {
        if(vVertType == `).concat(Vo,`) {
          // look up the texel from the texture unit
          `).concat(i.map(function(u){return"if(vAtlasId == ".concat(u,") outColor = texture(uTexture").concat(u,", vTexCoord);")}).join(`
	else `),`
        } 
        else if(vVertType == `).concat(Go,`) {
          // mimics how canvas renderer uses context.globalCompositeOperation = 'destination-out';
          outColor = blend(vColor, uBGColor);
          outColor.a = 1.0; // make opaque, masks out line under arrow
        }
        else if(vVertType == `).concat(Jr,` && vBorderWidth == vec2(0.0)) { // simple rectangle with no border
          outColor = vColor; // unit square is already transformed to the rectangle, nothing else needs to be done
        }
        else if(vVertType == `).concat(Jr," || vVertType == ").concat(Da,` 
          || vVertType == `).concat(wn," || vVertType == ").concat(Sa,`) { // use SDF

          float outerBorder = vBorderWidth[0];
          float innerBorder = vBorderWidth[1];
          float borderPadding = outerBorder * 2.0;
          float w = vTopRight.x - vBotLeft.x - borderPadding;
          float h = vTopRight.y - vBotLeft.y - borderPadding;
          vec2 b = vec2(w/2.0, h/2.0); // half width, half height
          vec2 p = vPosition - vec2(vTopRight.x - b[0] - outerBorder, vTopRight.y - b[1] - outerBorder); // translate to center

          float d; // signed distance
          if(vVertType == `).concat(Jr,`) {
            d = rectangleSD(p, b);
          } else if(vVertType == `).concat(Da,` && w == h) {
            d = circleSD(p, b.x); // faster than ellipse
          } else if(vVertType == `).concat(Da,`) {
            d = ellipseSD(p, b);
          } else {
            d = roundRectangleSD(p, b, vCornerRadius.wzyx);
          }

          // use the distance to interpolate a color to smooth the edges of the shape, doesn't need multisampling
          // we must smooth colors inwards, because we can't change pixels outside the shape's bounding box
          if(d > 0.0) {
            if(d > outerBorder) {
              discard;
            } else {
              outColor = distInterp(vBorderColor, vec4(0), d - outerBorder);
            }
          } else {
            if(d > innerBorder) {
              vec4 outerColor = outerBorder == 0.0 ? vec4(0) : vBorderColor;
              vec4 innerBorderColor = blend(vBorderColor, vColor);
              outColor = distInterp(innerBorderColor, outerColor, d);
            } 
            else {
              vec4 outerColor;
              if(innerBorder == 0.0 && outerBorder == 0.0) {
                outerColor = vec4(0);
              } else if(innerBorder == 0.0) {
                outerColor = vBorderColor;
              } else {
                outerColor = blend(vBorderColor, vColor);
              }
              outColor = distInterp(vColor, outerColor, d - innerBorder);
            }
          }
        }
        else {
          outColor = vColor;
        }

        `).concat(r.picking?`if(outColor.a == 0.0) discard;
             else outColor = vIndex;`:"",`
      }
    `),s=sm(a,n,o);s.aPosition=a.getAttribLocation(s,"aPosition"),s.aIndex=a.getAttribLocation(s,"aIndex"),s.aVertType=a.getAttribLocation(s,"aVertType"),s.aTransform=a.getAttribLocation(s,"aTransform"),s.aAtlasId=a.getAttribLocation(s,"aAtlasId"),s.aTex=a.getAttribLocation(s,"aTex"),s.aPointAPointB=a.getAttribLocation(s,"aPointAPointB"),s.aPointCPointD=a.getAttribLocation(s,"aPointCPointD"),s.aLineWidth=a.getAttribLocation(s,"aLineWidth"),s.aColor=a.getAttribLocation(s,"aColor"),s.aCornerRadius=a.getAttribLocation(s,"aCornerRadius"),s.aBorderColor=a.getAttribLocation(s,"aBorderColor"),s.uPanZoomMatrix=a.getUniformLocation(s,"uPanZoomMatrix"),s.uAtlasSize=a.getUniformLocation(s,"uAtlasSize"),s.uBGColor=a.getUniformLocation(s,"uBGColor"),s.uZoom=a.getUniformLocation(s,"uZoom"),s.uTextures=[];for(var l=0;l<this.batchManager.getMaxAtlasesPerBatch();l++)s.uTextures.push(a.getUniformLocation(s,"uTexture".concat(l)));return s}},{key:"_createVAO",value:function(){var r=[0,0,1,0,1,1,0,0,1,1,0,1];this.vertexCount=r.length/2;var a=this.maxInstances,n=this.gl,i=this.program,o=n.createVertexArray();return n.bindVertexArray(o),pm(n,"vec2",i.aPosition,r),this.transformBuffer=ym(n,a,i.aTransform),this.indexBuffer=Zt(n,a,"vec4",i.aIndex),this.vertTypeBuffer=Zt(n,a,"int",i.aVertType),this.atlasIdBuffer=Zt(n,a,"int",i.aAtlasId),this.texBuffer=Zt(n,a,"vec4",i.aTex),this.pointAPointBBuffer=Zt(n,a,"vec4",i.aPointAPointB),this.pointCPointDBuffer=Zt(n,a,"vec4",i.aPointCPointD),this.lineWidthBuffer=Zt(n,a,"vec2",i.aLineWidth),this.colorBuffer=Zt(n,a,"vec4",i.aColor),this.cornerRadiusBuffer=Zt(n,a,"vec4",i.aCornerRadius),this.borderColorBuffer=Zt(n,a,"vec4",i.aBorderColor),n.bindVertexArray(null),o}},{key:"buffers",get:function(){var r=this;return this._buffers||(this._buffers=Object.keys(this).filter(function(a){return dr(a,"Buffer")}).map(function(a){return r[a]})),this._buffers}},{key:"startFrame",value:function(r){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Pa.SCREEN;this.panZoomMatrix=r,this.renderTarget=a,this.batchDebugInfo=[],this.wrappedCount=0,this.simpleCount=0,this.startBatch()}},{key:"startBatch",value:function(){this.instanceCount=0,this.batchManager.startBatch()}},{key:"endFrame",value:function(){this.endBatch()}},{key:"_isVisible",value:function(r,a){return r.visible()?a&&a.isVisible?a.isVisible(r):!0:!1}},{key:"drawTexture",value:function(r,a,n){var i=this.atlasManager,o=this.batchManager,s=i.getRenderTypeOpts(n);if(this._isVisible(r,s)&&!(r.isEdge()&&!this._isValidEdge(r))){if(this.renderTarget.picking&&s.getTexPickingMode){var l=s.getTexPickingMode(r);if(l===Yn.IGNORE)return;if(l==Yn.USE_BB){this.drawPickingRectangle(r,a,n);return}}var u=i.getAtlasInfo(r,n),f=Bt(u),v;try{for(f.s();!(v=f.n()).done;){var h=v.value,c=h.atlas,d=h.tex1,g=h.tex2;o.canAddToCurrentBatch(c)||this.endBatch();for(var y=o.getAtlasIndexForBatch(c),p=0,m=[[d,!0],[g,!1]];p<m.length;p++){var b=vt(m[p],2),E=b[0],C=b[1];if(E.w!=0){var L=this.instanceCount;this.vertTypeBuffer.getView(L)[0]=Vo;var D=this.indexBuffer.getView(L);Qr(a,D);var R=this.atlasIdBuffer.getView(L);R[0]=y;var O=this.texBuffer.getView(L);O[0]=E.x,O[1]=E.y,O[2]=E.w,O[3]=E.h;var M=this.transformBuffer.getMatrixView(L);this.setTransformMatrix(r,M,s,h,C),this.instanceCount++,C||this.wrappedCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}}}}catch(P){f.e(P)}finally{f.f()}}}},{key:"setTransformMatrix",value:function(r,a,n,i){var o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,s=0;if(n.shapeProps&&n.shapeProps.padding&&(s=r.pstyle(n.shapeProps.padding).pfValue),i){var l=i.bb,u=i.tex1,f=i.tex2,v=u.w/(u.w+f.w);o||(v=1-v);var h=this._getAdjustedBB(l,s,o,v);this._applyTransformMatrix(a,h,n,r)}else{var c=n.getBoundingBox(r),d=this._getAdjustedBB(c,s,!0,1);this._applyTransformMatrix(a,d,n,r)}}},{key:"_applyTransformMatrix",value:function(r,a,n,i){var o,s;ff(r);var l=n.getRotation?n.getRotation(i):0;if(l!==0){var u=n.getRotationPoint(i),f=u.x,v=u.y;Nn(r,r,[f,v]),vf(r,r,l);var h=n.getRotationOffset(i);o=h.x+(a.xOffset||0),s=h.y+(a.yOffset||0)}else o=a.x1,s=a.y1;Nn(r,r,[o,s]),os(r,r,[a.w,a.h])}},{key:"_getAdjustedBB",value:function(r,a,n,i){var o=r.x1,s=r.y1,l=r.w,u=r.h,f=r.yOffset;a&&(o-=a,s-=a,l+=2*a,u+=2*a);var v=0,h=l*i;return n&&i<1?l=h:!n&&i<1&&(v=l-h,o+=v,l=h),{x1:o,y1:s,w:l,h:u,xOffset:v,yOffset:f}}},{key:"drawPickingRectangle",value:function(r,a,n){var i=this.atlasManager.getRenderTypeOpts(n),o=this.instanceCount;this.vertTypeBuffer.getView(o)[0]=Jr;var s=this.indexBuffer.getView(o);Qr(a,s);var l=this.colorBuffer.getView(o);Nr([0,0,0],1,l);var u=this.transformBuffer.getMatrixView(o);this.setTransformMatrix(r,u,i),this.simpleCount++,this.instanceCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}},{key:"drawNode",value:function(r,a,n){var i=this.simpleShapeOptions.get(n);if(this._isVisible(r,i)){var o=i.shapeProps,s=this._getVertTypeForShape(r,o.shape);if(s===void 0||i.isSimple&&!i.isSimple(r)){this.drawTexture(r,a,n);return}var l=this.instanceCount;if(this.vertTypeBuffer.getView(l)[0]=s,s===wn||s===Sa){var u=i.getBoundingBox(r),f=this._getCornerRadius(r,o.radius,u),v=this.cornerRadiusBuffer.getView(l);v[0]=f,v[1]=f,v[2]=f,v[3]=f,s===Sa&&(v[0]=0,v[2]=0)}var h=this.indexBuffer.getView(l);Qr(a,h);var c=r.pstyle(o.color).value,d=r.pstyle(o.opacity).value,g=this.colorBuffer.getView(l);Nr(c,d,g);var y=this.lineWidthBuffer.getView(l);if(y[0]=0,y[1]=0,o.border){var p=r.pstyle("border-width").value;if(p>0){var m=r.pstyle("border-color").value,b=r.pstyle("border-opacity").value,E=this.borderColorBuffer.getView(l);Nr(m,b,E);var C=r.pstyle("border-position").value;if(C==="inside")y[0]=0,y[1]=-p;else if(C==="outside")y[0]=p,y[1]=0;else{var L=p/2;y[0]=L,y[1]=-L}}}var D=this.transformBuffer.getMatrixView(l);this.setTransformMatrix(r,D,i),this.simpleCount++,this.instanceCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}}},{key:"_getVertTypeForShape",value:function(r,a){var n=r.pstyle(a).value;switch(n){case"rectangle":return Jr;case"ellipse":return Da;case"roundrectangle":case"round-rectangle":return wn;case"bottom-round-rectangle":return Sa;default:return}}},{key:"_getCornerRadius",value:function(r,a,n){var i=n.w,o=n.h;if(r.pstyle(a).value==="auto")return Er(i,o);var s=r.pstyle(a).pfValue,l=i/2,u=o/2;return Math.min(s,u,l)}},{key:"drawEdgeArrow",value:function(r,a,n){if(r.visible()){var i=r._private.rscratch,o,s,l;if(n==="source"?(o=i.arrowStartX,s=i.arrowStartY,l=i.srcArrowAngle):(o=i.arrowEndX,s=i.arrowEndY,l=i.tgtArrowAngle),!(isNaN(o)||o==null||isNaN(s)||s==null||isNaN(l)||l==null)){var u=r.pstyle(n+"-arrow-shape").value;if(u!=="none"){var f=r.pstyle(n+"-arrow-color").value,v=r.pstyle("opacity").value,h=r.pstyle("line-opacity").value,c=v*h,d=r.pstyle("width").pfValue,g=r.pstyle("arrow-scale").value,y=this.r.getArrowWidth(d,g),p=this.instanceCount,m=this.transformBuffer.getMatrixView(p);ff(m),Nn(m,m,[o,s]),os(m,m,[y,y]),vf(m,m,l),this.vertTypeBuffer.getView(p)[0]=Go;var b=this.indexBuffer.getView(p);Qr(a,b);var E=this.colorBuffer.getView(p);Nr(f,c,E),this.instanceCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}}}}},{key:"drawEdgeLine",value:function(r,a){if(r.visible()){var n=this._getEdgePoints(r);if(n){var i=r.pstyle("opacity").value,o=r.pstyle("line-opacity").value,s=r.pstyle("width").pfValue,l=r.pstyle("line-color").value,u=i*o;if(n.length/2+this.instanceCount>this.maxInstances&&this.endBatch(),n.length==4){var f=this.instanceCount;this.vertTypeBuffer.getView(f)[0]=hf;var v=this.indexBuffer.getView(f);Qr(a,v);var h=this.colorBuffer.getView(f);Nr(l,u,h);var c=this.lineWidthBuffer.getView(f);c[0]=s;var d=this.pointAPointBBuffer.getView(f);d[0]=n[0],d[1]=n[1],d[2]=n[2],d[3]=n[3],this.instanceCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}else for(var g=0;g<n.length-2;g+=2){var y=this.instanceCount;this.vertTypeBuffer.getView(y)[0]=cf;var p=this.indexBuffer.getView(y);Qr(a,p);var m=this.colorBuffer.getView(y);Nr(l,u,m);var b=this.lineWidthBuffer.getView(y);b[0]=s;var E=n[g-2],C=n[g-1],L=n[g],D=n[g+1],R=n[g+2],O=n[g+3],M=n[g+4],P=n[g+5];g==0&&(E=2*L-R+.001,C=2*D-O+.001),g==n.length-4&&(M=2*R-L+.001,P=2*O-D+.001);var w=this.pointAPointBBuffer.getView(y);w[0]=E,w[1]=C,w[2]=L,w[3]=D;var x=this.pointCPointDBuffer.getView(y);x[0]=R,x[1]=O,x[2]=M,x[3]=P,this.instanceCount++,this.instanceCount>=this.maxInstances&&this.endBatch()}}}}},{key:"_isValidEdge",value:function(r){var a=r._private.rscratch;return!(a.badLine||a.allpts==null||isNaN(a.allpts[0]))}},{key:"_getEdgePoints",value:function(r){var a=r._private.rscratch;if(this._isValidEdge(r)){var n=a.allpts;if(n.length==4)return n;var i=this._getNumSegments(r);return this._getCurveSegmentPoints(n,i)}}},{key:"_getNumSegments",value:function(r){var a=15;return Math.min(Math.max(a,5),this.maxInstances)}},{key:"_getCurveSegmentPoints",value:function(r,a){if(r.length==4)return r;for(var n=Array((a+1)*2),i=0;i<=a;i++)if(i==0)n[0]=r[0],n[1]=r[1];else if(i==a)n[i*2]=r[r.length-2],n[i*2+1]=r[r.length-1];else{var o=i/a;this._setCurvePoint(r,o,n,i*2)}return n}},{key:"_setCurvePoint",value:function(r,a,n,i){if(r.length<=2)n[i]=r[0],n[i+1]=r[1];else{for(var o=Array(r.length-2),s=0;s<o.length;s+=2){var l=(1-a)*r[s]+a*r[s+2],u=(1-a)*r[s+1]+a*r[s+3];o[s]=l,o[s+1]=u}return this._setCurvePoint(o,a,n,i)}}},{key:"endBatch",value:function(){var r=this.gl,a=this.vao,n=this.vertexCount,i=this.instanceCount;if(i!==0){var o=this.renderTarget.picking?this.pickingProgram:this.program;r.useProgram(o),r.bindVertexArray(a);var s=Bt(this.buffers),l;try{for(s.s();!(l=s.n()).done;){var u=l.value;u.bufferSubData(i)}}catch(d){s.e(d)}finally{s.f()}for(var f=this.batchManager.getAtlases(),v=0;v<f.length;v++)f[v].bufferIfNeeded(r);for(var h=0;h<f.length;h++)r.activeTexture(r.TEXTURE0+h),r.bindTexture(r.TEXTURE_2D,f[h].texture),r.uniform1i(o.uTextures[h],h);r.uniform1f(o.uZoom,lm(this.r)),r.uniformMatrix3fv(o.uPanZoomMatrix,!1,this.panZoomMatrix),r.uniform1i(o.uAtlasSize,this.batchManager.getAtlasSize());var c=Nr(this.bgColor,1);r.uniform4fv(o.uBGColor,c),r.drawArraysInstanced(r.TRIANGLES,0,n,i),r.bindVertexArray(null),r.bindTexture(r.TEXTURE_2D,null),this.debug&&this.batchDebugInfo.push({count:i,atlasCount:f.length}),this.startBatch()}}},{key:"getDebugInfo",value:function(){var r=this.atlasManager.getDebugInfo(),a=r.reduce(function(o,s){return o+s.atlasCount},0),n=this.batchDebugInfo,i=n.reduce(function(o,s){return o+s.count},0);return{atlasInfo:r,totalAtlases:a,wrappedCount:this.wrappedCount,simpleCount:this.simpleCount,batchCount:n.length,batchInfo:n,totalInstances:i}}}])})(),Zv={};Zv.initWebgl=function(t,e){var r=this,a=r.data.contexts[r.WEBGL];t.bgColor=Nm(r),t.webglTexSize=Math.min(t.webglTexSize,a.getParameter(a.MAX_TEXTURE_SIZE)),t.webglTexRows=Math.min(t.webglTexRows,54),t.webglTexRowsNodes=Math.min(t.webglTexRowsNodes,54),t.webglBatchSize=Math.min(t.webglBatchSize,16384),t.webglTexPerBatch=Math.min(t.webglTexPerBatch,a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)),r.webglDebug=t.webglDebug,r.webglDebugShowAtlases=t.webglDebugShowAtlases,r.pickingFrameBuffer=mm(a),r.pickingFrameBuffer.needsDraw=!0,r.drawing=new Rm(r,a,t);var n=function(v){return function(h){return r.getTextAngle(h,v)}},i=function(v){return function(h){var c=h.pstyle(v);return c&&c.value}},o=function(v){return function(h){return h.pstyle("".concat(v,"-opacity")).value>0}},s=function(v){var h=v.pstyle("text-events").strValue==="yes";return h?Yn.USE_BB:Yn.IGNORE},l=function(v){var h=v.position(),c=h.x,d=h.y,g=v.outerWidth(),y=v.outerHeight();return{w:g,h:y,x1:c-g/2,y1:d-y/2}};r.drawing.addAtlasCollection("node",{texRows:t.webglTexRowsNodes}),r.drawing.addAtlasCollection("label",{texRows:t.webglTexRows}),r.drawing.addTextureAtlasRenderType("node-body",{collection:"node",getKey:e.getStyleKey,getBoundingBox:e.getElementBox,drawElement:e.drawElement}),r.drawing.addSimpleShapeRenderType("node-body",{getBoundingBox:l,isSimple:vm,shapeProps:{shape:"shape",color:"background-color",opacity:"background-opacity",radius:"corner-radius",border:!0}}),r.drawing.addSimpleShapeRenderType("node-overlay",{getBoundingBox:l,isVisible:o("overlay"),shapeProps:{shape:"overlay-shape",color:"overlay-color",opacity:"overlay-opacity",padding:"overlay-padding",radius:"overlay-corner-radius"}}),r.drawing.addSimpleShapeRenderType("node-underlay",{getBoundingBox:l,isVisible:o("underlay"),shapeProps:{shape:"underlay-shape",color:"underlay-color",opacity:"underlay-opacity",padding:"underlay-padding",radius:"underlay-corner-radius"}}),r.drawing.addTextureAtlasRenderType("label",{collection:"label",getTexPickingMode:s,getKey:Uo(e.getLabelKey,null),getBoundingBox:Ho(e.getLabelBox,null),drawClipped:!0,drawElement:e.drawLabel,getRotation:n(null),getRotationPoint:e.getLabelRotationPoint,getRotationOffset:e.getLabelRotationOffset,isVisible:i("label")}),r.drawing.addTextureAtlasRenderType("edge-source-label",{collection:"label",getTexPickingMode:s,getKey:Uo(e.getSourceLabelKey,"source"),getBoundingBox:Ho(e.getSourceLabelBox,"source"),drawClipped:!0,drawElement:e.drawSourceLabel,getRotation:n("source"),getRotationPoint:e.getSourceLabelRotationPoint,getRotationOffset:e.getSourceLabelRotationOffset,isVisible:i("source-label")}),r.drawing.addTextureAtlasRenderType("edge-target-label",{collection:"label",getTexPickingMode:s,getKey:Uo(e.getTargetLabelKey,"target"),getBoundingBox:Ho(e.getTargetLabelBox,"target"),drawClipped:!0,drawElement:e.drawTargetLabel,getRotation:n("target"),getRotationPoint:e.getTargetLabelRotationPoint,getRotationOffset:e.getTargetLabelRotationOffset,isVisible:i("target-label")});var u=Ka(function(){console.log("garbage collect flag set"),r.data.gc=!0},1e4);r.onUpdateEleCalcs(function(f,v){var h=!1;v&&v.length>0&&(h|=r.drawing.invalidate(v)),h&&u()}),Pm(r)};function Nm(t){var e=t.cy.container(),r=e&&e.style&&e.style.backgroundColor||"white";return Cf(r)}function Qv(t,e){var r=t._private.rscratch;return Ot(r,"labelWrapCachedLines",e)||[]}var Uo=function(e,r){return function(a){var n=e(a),i=Qv(a,r);return i.length>1?i.map(function(o,s){return"".concat(n,"_").concat(s)}):n}},Ho=function(e,r){return function(a,n){var i=e(a);if(typeof n=="string"){var o=n.indexOf("_");if(o>0){var s=Number(n.substring(o+1)),l=Qv(a,r),u=i.h/l.length,f=u*s,v=i.y1+f;return{x1:i.x1,w:i.w,y1:v,h:u,yOffset:f}}}return i}};function Pm(t){{var e=t.render;t.render=function(i){i=i||{};var o=t.cy;t.webgl&&(o.zoom()>qv?(Om(t),e.call(t,i)):(Im(t),jv(t,i,Pa.SCREEN)))}}{var r=t.matchCanvasSize;t.matchCanvasSize=function(i){r.call(t,i),t.pickingFrameBuffer.setFramebufferAttachmentSizes(t.canvasWidth,t.canvasHeight),t.pickingFrameBuffer.needsDraw=!0}}t.findNearestElements=function(i,o,s,l){return Gm(t,i,o)};{var a=t.invalidateCachedZSortedEles;t.invalidateCachedZSortedEles=function(){a.call(t),t.pickingFrameBuffer.needsDraw=!0}}{var n=t.notify;t.notify=function(i,o){n.call(t,i,o),i==="viewport"||i==="bounds"?t.pickingFrameBuffer.needsDraw=!0:i==="background"&&t.drawing.invalidate(o,{type:"node-body"})}}}function Om(t){var e=t.data.contexts[t.WEBGL];e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)}function Im(t){var e=function(a){a.save(),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,t.canvasWidth,t.canvasHeight),a.restore()};e(t.data.contexts[t.NODE]),e(t.data.contexts[t.DRAG])}function Bm(t){var e=t.canvasWidth,r=t.canvasHeight,a=Is(t),n=a.pan,i=a.zoom,o=zo();Nn(o,o,[n.x,n.y]),os(o,o,[i,i]);var s=zo();wm(s,e,r);var l=zo();return bm(l,s,o),l}function Jv(t,e){var r=t.canvasWidth,a=t.canvasHeight,n=Is(t),i=n.pan,o=n.zoom;e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,r,a),e.translate(i.x,i.y),e.scale(o,o)}function Fm(t,e){t.drawSelectionRectangle(e,function(r){return Jv(t,r)})}function km(t){var e=t.data.contexts[t.NODE];e.save(),Jv(t,e),e.strokeStyle="rgba(0, 0, 0, 0.3)",e.beginPath(),e.moveTo(-1e3,0),e.lineTo(1e3,0),e.stroke(),e.beginPath(),e.moveTo(0,-1e3),e.lineTo(0,1e3),e.stroke(),e.restore()}function zm(t){var e=function(n,i,o){for(var s=n.atlasManager.getAtlasCollection(i),l=t.data.contexts[t.NODE],u=s.atlases,f=0;f<u.length;f++){var v=u[f],h=v.canvas;if(h){var c=h.width,d=h.height,g=c*f,y=h.height*o,p=.4;l.save(),l.scale(p,p),l.drawImage(h,g,y),l.strokeStyle="black",l.rect(g,y,c,d),l.stroke(),l.restore()}}},r=0;e(t.drawing,"node",r++),e(t.drawing,"label",r++)}function Vm(t,e,r,a,n){var i,o,s,l,u=Is(t),f=u.pan,v=u.zoom;{var h=fm(t,f,v,e,r),c=vt(h,2),d=c[0],g=c[1],y=6;i=d-y/2,o=g-y/2,s=y,l=y}if(s===0||l===0)return[];var p=t.data.contexts[t.WEBGL];p.bindFramebuffer(p.FRAMEBUFFER,t.pickingFrameBuffer),t.pickingFrameBuffer.needsDraw&&(p.viewport(0,0,p.canvas.width,p.canvas.height),jv(t,null,Pa.PICKING),t.pickingFrameBuffer.needsDraw=!1);var m=s*l,b=new Uint8Array(m*4);p.readPixels(i,o,s,l,p.RGBA,p.UNSIGNED_BYTE,b),p.bindFramebuffer(p.FRAMEBUFFER,null);for(var E=new Set,C=0;C<m;C++){var L=b.slice(C*4,C*4+4),D=cm(L)-1;D>=0&&E.add(D)}return E}function Gm(t,e,r){var a=Vm(t,e,r),n=t.getCachedZSortedEles(),i,o,s=Bt(a),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,f=n[u];if(!i&&f.isNode()&&(i=f),!o&&f.isEdge()&&(o=f),i&&o)break}}catch(v){s.e(v)}finally{s.f()}return[i,o].filter(Boolean)}function qo(t,e,r){var a=t.drawing;e+=1,r.isNode()?(a.drawNode(r,e,"node-underlay"),a.drawNode(r,e,"node-body"),a.drawTexture(r,e,"label"),a.drawNode(r,e,"node-overlay")):(a.drawEdgeLine(r,e),a.drawEdgeArrow(r,e,"source"),a.drawEdgeArrow(r,e,"target"),a.drawTexture(r,e,"label"),a.drawTexture(r,e,"edge-source-label"),a.drawTexture(r,e,"edge-target-label"))}function jv(t,e,r){var a;t.webglDebug&&(a=performance.now());var n=t.drawing,i=0;if(r.screen&&t.data.canvasNeedsRedraw[t.SELECT_BOX]&&Fm(t,e),t.data.canvasNeedsRedraw[t.NODE]||r.picking){var o=t.data.contexts[t.WEBGL];r.screen?(o.clearColor(0,0,0,0),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA)):o.disable(o.BLEND),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),o.viewport(0,0,o.canvas.width,o.canvas.height);var s=Bm(t),l=t.getCachedZSortedEles();if(i=l.length,n.startFrame(s,r),r.screen){for(var u=0;u<l.nondrag.length;u++)qo(t,u,l.nondrag[u]);for(var f=0;f<l.drag.length;f++)qo(t,f,l.drag[f])}else if(r.picking)for(var v=0;v<l.length;v++)qo(t,v,l[v]);n.endFrame(),r.screen&&t.webglDebugShowAtlases&&(km(t),zm(t)),t.data.canvasNeedsRedraw[t.NODE]=!1,t.data.canvasNeedsRedraw[t.DRAG]=!1}if(t.webglDebug){var h=performance.now(),c=!1,d=Math.ceil(h-a),g=n.getDebugInfo(),y=["".concat(i," elements"),"".concat(g.totalInstances," instances"),"".concat(g.batchCount," batches"),"".concat(g.totalAtlases," atlases"),"".concat(g.wrappedCount," wrapped textures"),"".concat(g.simpleCount," simple shapes")].join(", ");if(c)console.log("WebGL (".concat(r.name,") - time ").concat(d,"ms, ").concat(y));else{console.log("WebGL (".concat(r.name,") - frame time ").concat(d,"ms")),console.log("Totals:"),console.log("  ".concat(y)),console.log("Texture Atlases Used:");var p=g.atlasInfo,m=Bt(p),b;try{for(m.s();!(b=m.n()).done;){var E=b.value;console.log("  ".concat(E.type,": ").concat(E.keyCount," keys, ").concat(E.atlasCount," atlases"))}}catch(C){m.e(C)}finally{m.f()}console.log("")}}t.data.gc&&(console.log("Garbage Collect!"),t.data.gc=!1,n.gc())}var Mr={};Mr.drawPolygonPath=function(t,e,r,a,n,i){var o=a/2,s=n/2;t.beginPath&&t.beginPath(),t.moveTo(e+o*i[0],r+s*i[1]);for(var l=1;l<i.length/2;l++)t.lineTo(e+o*i[l*2],r+s*i[l*2+1]);t.closePath()};Mr.drawRoundPolygonPath=function(t,e,r,a,n,i,o){o.forEach(function(s){return Iv(t,s)}),t.closePath()};Mr.drawRoundRectanglePath=function(t,e,r,a,n,i){var o=a/2,s=n/2,l=i==="auto"?Er(a,n):Math.min(i,s,o);t.beginPath&&t.beginPath(),t.moveTo(e,r-s),t.arcTo(e+o,r-s,e+o,r,l),t.arcTo(e+o,r+s,e,r+s,l),t.arcTo(e-o,r+s,e-o,r,l),t.arcTo(e-o,r-s,e,r-s,l),t.lineTo(e,r-s),t.closePath()};Mr.drawBottomRoundRectanglePath=function(t,e,r,a,n,i){var o=a/2,s=n/2,l=i==="auto"?Er(a,n):i;t.beginPath&&t.beginPath(),t.moveTo(e,r-s),t.lineTo(e+o,r-s),t.lineTo(e+o,r),t.arcTo(e+o,r+s,e,r+s,l),t.arcTo(e-o,r+s,e-o,r,l),t.lineTo(e-o,r-s),t.lineTo(e,r-s),t.closePath()};Mr.drawCutRectanglePath=function(t,e,r,a,n,i,o){var s=a/2,l=n/2,u=o==="auto"?ws():o;t.beginPath&&t.beginPath(),t.moveTo(e-s+u,r-l),t.lineTo(e+s-u,r-l),t.lineTo(e+s,r-l+u),t.lineTo(e+s,r+l-u),t.lineTo(e+s-u,r+l),t.lineTo(e-s+u,r+l),t.lineTo(e-s,r+l-u),t.lineTo(e-s,r-l+u),t.closePath()};Mr.drawBarrelPath=function(t,e,r,a,n){var i=a/2,o=n/2,s=e-i,l=e+i,u=r-o,f=r+o,v=Xo(a,n),h=v.widthOffset,c=v.heightOffset,d=v.ctrlPtOffsetPct*h;t.beginPath&&t.beginPath(),t.moveTo(s,u+c),t.lineTo(s,f-c),t.quadraticCurveTo(s+d,f,s+h,f),t.lineTo(l-h,f),t.quadraticCurveTo(l-d,f,l,f-c),t.lineTo(l,u+c),t.quadraticCurveTo(l-d,u,l-h,u),t.lineTo(s+h,u),t.quadraticCurveTo(s+d,u,s,u+c),t.closePath()};var df=Math.sin(0),gf=Math.cos(0),ss={},us={},eh=Math.PI/40;for(Pr=0*Math.PI;Pr<2*Math.PI;Pr+=eh)ss[Pr]=Math.sin(Pr),us[Pr]=Math.cos(Pr);var Pr;Mr.drawEllipsePath=function(t,e,r,a,n){if(t.beginPath&&t.beginPath(),t.ellipse)t.ellipse(e,r,a/2,n/2,0,0,2*Math.PI);else for(var i,o,s=a/2,l=n/2,u=0*Math.PI;u<2*Math.PI;u+=eh)i=e-s*ss[u]*df+s*us[u]*gf,o=r+l*us[u]*df+l*ss[u]*gf,u===0?t.moveTo(i,o):t.lineTo(i,o);t.closePath()};var en={};en.createBuffer=function(t,e){var r=document.createElement("canvas");return r.width=t,r.height=e,[r,r.getContext("2d")]};en.bufferCanvasImage=function(t){var e=this.cy,r=e.mutableElements(),a=r.boundingBox(),n=this.findContainerClientCoords(),i=t.full?Math.ceil(a.w):n[2],o=t.full?Math.ceil(a.h):n[3],s=xe(t.maxWidth)||xe(t.maxHeight),l=this.getPixelRatio(),u=1;if(t.scale!==void 0)i*=t.scale,o*=t.scale,u=t.scale;else if(s){var f=1/0,v=1/0;xe(t.maxWidth)&&(f=u*t.maxWidth/i),xe(t.maxHeight)&&(v=u*t.maxHeight/o),u=Math.min(f,v),i*=u,o*=u}s||(i*=l,o*=l,u*=l);var h=document.createElement("canvas");h.width=i,h.height=o,h.style.width=i+"px",h.style.height=o+"px";var c=h.getContext("2d");if(i>0&&o>0){c.clearRect(0,0,i,o),c.globalCompositeOperation="source-over";var d=this.getCachedZSortedEles();if(t.full)c.translate(-a.x1*u,-a.y1*u),c.scale(u,u),this.drawElements(c,d),c.scale(1/u,1/u),c.translate(a.x1*u,a.y1*u);else{var g=e.pan(),y={x:g.x*u,y:g.y*u};u*=e.zoom(),c.translate(y.x,y.y),c.scale(u,u),this.drawElements(c,d),c.scale(1/u,1/u),c.translate(-y.x,-y.y)}t.bg&&(c.globalCompositeOperation="destination-over",c.fillStyle=t.bg,c.rect(0,0,i,o),c.fill())}return h};function Um(t,e){for(var r=atob(t),a=new ArrayBuffer(r.length),n=new Uint8Array(a),i=0;i<r.length;i++)n[i]=r.charCodeAt(i);return new Blob([a],{type:e})}function pf(t){var e=t.indexOf(",");return t.substr(e+1)}function th(t,e,r){var a=function(){return e.toDataURL(r,t.quality)};switch(t.output){case"blob-promise":return new va(function(n,i){try{e.toBlob(function(o){o!=null?n(o):i(new Error("`canvas.toBlob()` sent a null value in its callback"))},r,t.quality)}catch(o){i(o)}});case"blob":return Um(pf(a()),r);case"base64":return pf(a());default:return a()}}en.png=function(t){return th(t,this.bufferCanvasImage(t),"image/png")};en.jpg=function(t){return th(t,this.bufferCanvasImage(t),"image/jpeg")};var rh={};rh.nodeShapeImpl=function(t,e,r,a,n,i,o,s){switch(t){case"ellipse":return this.drawEllipsePath(e,r,a,n,i);case"polygon":return this.drawPolygonPath(e,r,a,n,i,o);case"round-polygon":return this.drawRoundPolygonPath(e,r,a,n,i,o,s);case"roundrectangle":case"round-rectangle":return this.drawRoundRectanglePath(e,r,a,n,i,s);case"cutrectangle":case"cut-rectangle":return this.drawCutRectanglePath(e,r,a,n,i,o,s);case"bottomroundrectangle":case"bottom-round-rectangle":return this.drawBottomRoundRectanglePath(e,r,a,n,i,s);case"barrel":return this.drawBarrelPath(e,r,a,n,i)}};var Hm=ah,Ge=ah.prototype;Ge.CANVAS_LAYERS=3;Ge.SELECT_BOX=0;Ge.DRAG=1;Ge.NODE=2;Ge.WEBGL=3;Ge.CANVAS_TYPES=["2d","2d","2d","webgl2"];Ge.BUFFER_COUNT=3;Ge.TEXTURE_BUFFER=0;Ge.MOTIONBLUR_BUFFER_NODE=1;Ge.MOTIONBLUR_BUFFER_DRAG=2;function ah(t){var e=this,r=e.cy.window(),a=r.document;t.webgl&&(Ge.CANVAS_LAYERS=e.CANVAS_LAYERS=4,console.log("webgl rendering enabled")),e.data={canvases:new Array(Ge.CANVAS_LAYERS),contexts:new Array(Ge.CANVAS_LAYERS),canvasNeedsRedraw:new Array(Ge.CANVAS_LAYERS),bufferCanvases:new Array(Ge.BUFFER_COUNT),bufferContexts:new Array(Ge.CANVAS_LAYERS)};var n="-webkit-tap-highlight-color",i="rgba(0,0,0,0)";e.data.canvasContainer=a.createElement("div");var o=e.data.canvasContainer.style;e.data.canvasContainer.style[n]=i,o.position="relative",o.zIndex="0",o.overflow="hidden";var s=t.cy.container();s.appendChild(e.data.canvasContainer),s.style[n]=i;var l={"-webkit-user-select":"none","-moz-user-select":"-moz-none","user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)","outline-style":"none"};Fh()&&(l["-ms-touch-action"]="none",l["touch-action"]="none");for(var u=0;u<Ge.CANVAS_LAYERS;u++){var f=e.data.canvases[u]=a.createElement("canvas"),v=Ge.CANVAS_TYPES[u];e.data.contexts[u]=f.getContext(v),e.data.contexts[u]||rt("Could not create canvas of type "+v),Object.keys(l).forEach(function($){f.style[$]=l[$]}),f.style.position="absolute",f.setAttribute("data-id","layer"+u),f.style.zIndex=String(Ge.CANVAS_LAYERS-u),e.data.canvasContainer.appendChild(f),e.data.canvasNeedsRedraw[u]=!1}e.data.topCanvas=e.data.canvases[0],e.data.canvases[Ge.NODE].setAttribute("data-id","layer"+Ge.NODE+"-node"),e.data.canvases[Ge.SELECT_BOX].setAttribute("data-id","layer"+Ge.SELECT_BOX+"-selectbox"),e.data.canvases[Ge.DRAG].setAttribute("data-id","layer"+Ge.DRAG+"-drag"),e.data.canvases[Ge.WEBGL]&&e.data.canvases[Ge.WEBGL].setAttribute("data-id","layer"+Ge.WEBGL+"-webgl");for(var u=0;u<Ge.BUFFER_COUNT;u++)e.data.bufferCanvases[u]=a.createElement("canvas"),e.data.bufferContexts[u]=e.data.bufferCanvases[u].getContext("2d"),e.data.bufferCanvases[u].style.position="absolute",e.data.bufferCanvases[u].setAttribute("data-id","buffer"+u),e.data.bufferCanvases[u].style.zIndex=String(-u-1),e.data.bufferCanvases[u].style.visibility="hidden";e.pathsEnabled=!0;var h=Lt(),c=function(H){return{x:(H.x1+H.x2)/2,y:(H.y1+H.y2)/2}},d=function(H){return{x:-H.w/2,y:-H.h/2}},g=function(H){var Y=H[0]._private,Q=Y.oldBackgroundTimestamp===Y.backgroundTimestamp;return!Q},y=function(H){return H[0]._private.nodeKey},p=function(H){return H[0]._private.labelStyleKey},m=function(H){return H[0]._private.sourceLabelStyleKey},b=function(H){return H[0]._private.targetLabelStyleKey},E=function(H,Y,Q,oe,te){return e.drawElement(H,Y,Q,!1,!1,te)},C=function(H,Y,Q,oe,te){return e.drawElementText(H,Y,Q,oe,"main",te)},L=function(H,Y,Q,oe,te){return e.drawElementText(H,Y,Q,oe,"source",te)},D=function(H,Y,Q,oe,te){return e.drawElementText(H,Y,Q,oe,"target",te)},R=function(H){return H.boundingBox(),H[0]._private.bodyBounds},O=function(H){return H.boundingBox(),H[0]._private.labelBounds.main||h},M=function(H){return H.boundingBox(),H[0]._private.labelBounds.source||h},P=function(H){return H.boundingBox(),H[0]._private.labelBounds.target||h},w=function(H,Y){return Y},x=function(H){return c(R(H))},T=function(H,Y,Q){var oe=H?H+"-":"";return{x:Y.x+Q.pstyle(oe+"text-margin-x").pfValue,y:Y.y+Q.pstyle(oe+"text-margin-y").pfValue}},A=function(H,Y,Q){var oe=H[0]._private.rscratch;return{x:oe[Y],y:oe[Q]}},S=function(H){return T("",A(H,"labelX","labelY"),H)},I=function(H){return T("source",A(H,"sourceLabelX","sourceLabelY"),H)},B=function(H){return T("target",A(H,"targetLabelX","targetLabelY"),H)},k=function(H){return d(R(H))},z=function(H){return d(M(H))},F=function(H){return d(P(H))},V=function(H){var Y=O(H),Q=d(O(H));if(H.isNode()){switch(H.pstyle("text-halign").value){case"left":Q.x=-Y.w-(Y.leftPad||0);break;case"right":Q.x=-(Y.rightPad||0);break}switch(H.pstyle("text-valign").value){case"top":Q.y=-Y.h-(Y.topPad||0);break;case"bottom":Q.y=-(Y.botPad||0);break}}return Q},Z=e.data.eleTxrCache=new Ma(e,{getKey:y,doesEleInvalidateKey:g,drawElement:E,getBoundingBox:R,getRotationPoint:x,getRotationOffset:k,allowEdgeTxrCaching:!1,allowParentTxrCaching:!1}),q=e.data.lblTxrCache=new Ma(e,{getKey:p,drawElement:C,getBoundingBox:O,getRotationPoint:S,getRotationOffset:V,isVisible:w}),_=e.data.slbTxrCache=new Ma(e,{getKey:m,drawElement:L,getBoundingBox:M,getRotationPoint:I,getRotationOffset:z,isVisible:w}),K=e.data.tlbTxrCache=new Ma(e,{getKey:b,drawElement:D,getBoundingBox:P,getRotationPoint:B,getRotationOffset:F,isVisible:w}),U=e.data.lyrTxrCache=new Yv(e);e.onUpdateEleCalcs(function(H,Y){Z.invalidateElements(Y),q.invalidateElements(Y),_.invalidateElements(Y),K.invalidateElements(Y),U.invalidateElements(Y);for(var Q=0;Q<Y.length;Q++){var oe=Y[Q]._private;oe.oldBackgroundTimestamp=oe.backgroundTimestamp}});var J=function(H){for(var Y=0;Y<H.length;Y++)U.enqueueElementRefinement(H[Y].ele)};Z.onDequeue(J),q.onDequeue(J),_.onDequeue(J),K.onDequeue(J),t.webgl&&e.initWebgl(t,{getStyleKey:y,getLabelKey:p,getSourceLabelKey:m,getTargetLabelKey:b,drawElement:E,drawLabel:C,drawSourceLabel:L,drawTargetLabel:D,getElementBox:R,getLabelBox:O,getSourceLabelBox:M,getTargetLabelBox:P,getElementRotationPoint:x,getElementRotationOffset:k,getLabelRotationPoint:S,getSourceLabelRotationPoint:I,getTargetLabelRotationPoint:B,getLabelRotationOffset:V,getSourceLabelRotationOffset:z,getTargetLabelRotationOffset:F})}Ge.redrawHint=function(t,e){var r=this;switch(t){case"eles":r.data.canvasNeedsRedraw[Ge.NODE]=e;break;case"drag":r.data.canvasNeedsRedraw[Ge.DRAG]=e;break;case"select":r.data.canvasNeedsRedraw[Ge.SELECT_BOX]=e;break;case"gc":r.data.gc=!0;break}};var qm=typeof Path2D<"u";Ge.path2dEnabled=function(t){if(t===void 0)return this.pathsEnabled;this.pathsEnabled=!!t};Ge.usePaths=function(){return qm&&this.pathsEnabled};Ge.setImgSmoothing=function(t,e){t.imageSmoothingEnabled!=null?t.imageSmoothingEnabled=e:(t.webkitImageSmoothingEnabled=e,t.mozImageSmoothingEnabled=e,t.msImageSmoothingEnabled=e)};Ge.getImgSmoothing=function(t){return t.imageSmoothingEnabled!=null?t.imageSmoothingEnabled:t.webkitImageSmoothingEnabled||t.mozImageSmoothingEnabled||t.msImageSmoothingEnabled};Ge.makeOffscreenCanvas=function(t,e){var r;if((typeof OffscreenCanvas>"u"?"undefined":dt(OffscreenCanvas))!=="undefined")r=new OffscreenCanvas(t,e);else{var a=this.cy.window(),n=a.document;r=n.createElement("canvas"),r.width=t,r.height=e}return r};[Wv,tr,lr,Os,Yr,Lr,Mt,Zv,Mr,en,rh].forEach(function(t){Ne(Ge,t)});var Ym=[{name:"null",impl:Nv},{name:"base",impl:Uv},{name:"canvas",impl:Hm}],Wm=[{type:"layout",extensions:py},{type:"renderer",extensions:Ym}],nh={},ih={};function oh(t,e,r){var a=r,n=function(R){_e("Can not register `"+e+"` for `"+t+"` since `"+R+"` already exists in the prototype and can not be overridden")};if(t==="core"){if(Ua.prototype[e])return n(e);Ua.prototype[e]=r}else if(t==="collection"){if(wt.prototype[e])return n(e);wt.prototype[e]=r}else if(t==="layout"){for(var i=function(R){this.options=R,r.call(this,R),Ye(this._private)||(this._private={}),this._private.cy=R.cy,this._private.listeners=[],this.createEmitter()},o=i.prototype=Object.create(r.prototype),s=[],l=0;l<s.length;l++){var u=s[l];o[u]=o[u]||function(){return this}}o.start&&!o.run?o.run=function(){return this.start(),this}:!o.start&&o.run&&(o.start=function(){return this.run(),this});var f=r.prototype.stop;o.stop=function(){var D=this.options;if(D&&D.animate){var R=this.animations;if(R)for(var O=0;O<R.length;O++)R[O].stop()}return f?f.call(this):this.emit("layoutstop"),this},o.destroy||(o.destroy=function(){return this}),o.cy=function(){return this._private.cy};var v=function(R){return R._private.cy},h={addEventFields:function(R,O){O.layout=R,O.cy=v(R),O.target=R},bubble:function(){return!0},parent:function(R){return v(R)}};Ne(o,{createEmitter:function(){return this._private.emitter=new ri(h,this),this},emitter:function(){return this._private.emitter},on:function(R,O){return this.emitter().on(R,O),this},one:function(R,O){return this.emitter().one(R,O),this},once:function(R,O){return this.emitter().one(R,O),this},removeListener:function(R,O){return this.emitter().removeListener(R,O),this},removeAllListeners:function(){return this.emitter().removeAllListeners(),this},emit:function(R,O){return this.emitter().emit(R,O),this}}),Ke.eventAliasesOn(o),a=i}else if(t==="renderer"&&e!=="null"&&e!=="base"){var c=sh("renderer","base"),d=c.prototype,g=r,y=r.prototype,p=function(){c.apply(this,arguments),g.apply(this,arguments)},m=p.prototype;for(var b in d){var E=d[b],C=y[b]!=null;if(C)return n(b);m[b]=E}for(var L in y)m[L]=y[L];d.clientFunctions.forEach(function(D){m[D]=m[D]||function(){rt("Renderer does not implement `renderer."+D+"()` on its prototype")}}),a=p}else if(t==="__proto__"||t==="constructor"||t==="prototype")return rt(t+" is an illegal type to be registered, possibly lead to prototype pollutions");return Sf({map:nh,keys:[t,e],value:a})}function sh(t,e){return Df({map:nh,keys:[t,e]})}function Xm(t,e,r,a,n){return Sf({map:ih,keys:[t,e,r,a],value:n})}function $m(t,e,r,a){return Df({map:ih,keys:[t,e,r,a]})}var ls=function(){if(arguments.length===2)return sh.apply(null,arguments);if(arguments.length===3)return oh.apply(null,arguments);if(arguments.length===4)return $m.apply(null,arguments);if(arguments.length===5)return Xm.apply(null,arguments);rt("Invalid extension access syntax")};Ua.prototype.extension=ls;Wm.forEach(function(t){t.extensions.forEach(function(e){oh(t.type,e.name,e.impl)})});var Wn=function(){if(!(this instanceof Wn))return new Wn;this.length=0},Hr=Wn.prototype;Hr.instanceString=function(){return"stylesheet"};Hr.selector=function(t){var e=this.length++;return this[e]={selector:t,properties:[]},this};Hr.css=function(t,e){var r=this.length-1;if(Me(t))this[r].properties.push({name:t,value:e});else if(Ye(t))for(var a=t,n=Object.keys(a),i=0;i<n.length;i++){var o=n[i],s=a[o];if(s!=null){var l=yt.properties[o]||yt.properties[Xn(o)];if(l!=null){var u=l.name,f=s;this[r].properties.push({name:u,value:f})}}}return this};Hr.style=Hr.css;Hr.generateStyle=function(t){var e=new yt(t);return this.appendToStyle(e)};Hr.appendToStyle=function(t){for(var e=0;e<this.length;e++){var r=this[e],a=r.selector,n=r.properties;t.selector(a);for(var i=0;i<n.length;i++){var o=n[i];t.css(o.name,o.value)}}return t};var Km="3.33.1",sr=function(e){if(e===void 0&&(e={}),Ye(e))return new Ua(e);if(Me(e))return ls.apply(ls,arguments)};sr.use=function(t){var e=Array.prototype.slice.call(arguments,1);return e.unshift(sr),t.apply(null,e),this};sr.warnings=function(t){return Of(t)};sr.version=Km;sr.stylesheet=sr.Stylesheet=Wn;var lh=mh(uh());sr.use(lh.default);window.cytoscape=sr;})();
/*! Bundled license information:

cytoscape/dist/cytoscape.esm.mjs:
  (*!
  Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
  Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
  Licensed under The MIT License (http://opensource.org/licenses/MIT)
  *)
  (*!
  Event object based on jQuery events, MIT license
  
  https://jquery.org/license/
  https://tldrlegal.com/license/mit-license
  https://github.com/jquery/jquery/blob/master/src/event.js
  *)
  (*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
  (*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License *)
*/
/* Generated by Spago v1.0.4 */
(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i2 = 0; i2 < l; i2++) {
        var f = fs[i2];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ (function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  })();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map113 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map113(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map113 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map113($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map113 = map(dictFunctor);
    return function(x) {
      return map113($$const(x));
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map35 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map35($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure110 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply2(pure110(f))(a2);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = typeof Array.prototype.flatMap === "function" ? function(arr) {
    return function(f) {
      return arr.flatMap(f);
    };
  } : function(arr) {
    return function(f) {
      var result = [];
      var l = arr.length;
      for (var i2 = 0; i2 < l; i2++) {
        var xs = f(arr[i2]);
        var k = xs.length;
        for (var j = 0; j < k; j++) {
          result.push(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind19 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind19(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq3) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq3 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };
  var unsafeSet = function(label5) {
    return function(value15) {
      return function(rec) {
        var copy2 = {};
        for (var key2 in rec) {
          if ({}.hasOwnProperty.call(rec, key2)) {
            copy2[key2] = rec[key2];
          }
        }
        copy2[label5] = value15;
        return copy2;
      };
    };
  };
  var unsafeDelete = function(label5) {
    return function(rec) {
      var copy2 = {};
      for (var key2 in rec) {
        if (key2 !== label5 && {}.hasOwnProperty.call(rec, key2)) {
          copy2[key2] = rec[key2];
        }
      }
      return copy2;
    };
  };

  // output/Data.Eq/index.js
  var eqUnit = {
    eq: function(v) {
      return function(v1) {
        return true;
      };
    }
  };
  var eqString = {
    eq: eqStringImpl
  };
  var eqRowNil = {
    eqRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return true;
        };
      };
    }
  };
  var eqRecord = function(dict) {
    return dict.eqRecord;
  };
  var eqRec = function() {
    return function(dictEqRecord) {
      return {
        eq: eqRecord(dictEqRecord)($$Proxy.value)
      };
    };
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eqRowCons = function(dictEqRecord) {
    var eqRecord1 = eqRecord(dictEqRecord);
    return function() {
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        return function(dictEq) {
          var eq3 = eq(dictEq);
          return {
            eqRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail2 = eqRecord1($$Proxy.value)(ra)(rb);
                  var key2 = reflectSymbol2($$Proxy.value);
                  var get6 = unsafeGet(key2);
                  return eq3(get6(ra))(get6(rb)) && tail2;
                };
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ (function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  })();
  var GT = /* @__PURE__ */ (function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  })();
  var EQ = /* @__PURE__ */ (function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  })();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordUnit = {
    compare: function(v) {
      return function(v1) {
        return EQ.value;
      };
    },
    Eq0: function() {
      return eqUnit;
    }
  };
  var ordString = /* @__PURE__ */ (function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  })();
  var ordInt = /* @__PURE__ */ (function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  })();
  var ordChar = /* @__PURE__ */ (function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  })();
  var compare = function(dict) {
    return dict.compare;
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0) return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0) return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ (function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  })();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq3 = eq(dictEq);
    return function(dictEq1) {
      var eq14 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq3(x.value0)(y.value0) && eq14(x.value1)(y.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare3 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x) {
          return function(y) {
            var v = compare3(x.value0)(y.value0);
            if (v instanceof LT) {
              return LT.value;
            }
            ;
            if (v instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x.value1)(y.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify_ = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value15) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value15);
  };
  var replicatePolyfill = function(count, value15) {
    var result = [];
    var n = 0;
    for (var i2 = 0; i2 < count; i2++) {
      result[n++] = value15;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = /* @__PURE__ */ (function() {
    function Cons2(head3, tail2) {
      this.head = head3;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head3) {
      return function(tail2) {
        return new Cons2(head3, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr6, xs) {
      return listToArray(foldr6(curryCons)(emptyList)(xs));
    };
  })();
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just, nothing, xs, i2) {
    return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (f(xs[i2])) return just(i2);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i2, l) {
    if (i2 < 0 || i2 >= l.length) return nothing;
    var l1 = l.slice();
    l1.splice(i2, 1);
    return just(l1);
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var anyImpl = function(p2, xs) {
    var len = xs.length;
    for (var i2 = 0; i2 < len; i2++) {
      if (p2(xs[i2])) return true;
    }
    return false;
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind19 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind19(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind19 = bind(dictMonad.Bind1());
    var pure21 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind19(f)(function(f$prime) {
          return bind19(a2)(function(a$prime) {
            return pure21(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ (function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  })();
  var Just = /* @__PURE__ */ (function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  })();
  var maybe$prime = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v(unit);
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe$prime = function(a2) {
    return maybe$prime(a2)(identity3);
  };
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq3 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq3(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ (function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  })();
  var altMaybe = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ (function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  })();
  var Right = /* @__PURE__ */ (function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  })();
  var note = function(a2) {
    return maybe(new Left(a2))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ (function() {
    return either($$const(Nothing.value))(Just.create);
  })();
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map3(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a2) {
      return function(f) {
        return f(a2);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ (function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  })();

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_2 = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ (function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  })();
  var Done = /* @__PURE__ */ (function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  })();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do2() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!(function __do3() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            })()) {
            }
            ;
            return {};
          })();
          return map4(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i2 = 0, l = as.length; i2 < l; i2++) {
          f(as[i2])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var functorST = {
    map: map_
  };

  // output/Data.Array.ST/foreign.js
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var thawImpl = copyImpl;
  var pushImpl = function(a2, xs) {
    return xs.push(a2);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do2() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = /* @__PURE__ */ runSTFn2(pushImpl);

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity4);
    };
  };
  var bifunctorTuple = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return new Tuple(f(v.value0), g(v.value1));
        };
      };
    }
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 38, column 1 - line 40, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure21 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond2(f($454));
        })(pure21(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append7(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b2) {
        return fn(a2, b2);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(i2)(xs[i2]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ (function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map35) {
        return function(pure21) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure21([]);
                  case 1:
                    return map35(array1)(f(array[bot]));
                  case 2:
                    return apply2(map35(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map35(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map35(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  })();

  // output/Data.Traversable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity5);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value15 = b2;
              while (true) {
                var maybe2 = f(value15);
                if (isNothing2(maybe2)) return result;
                var tuple = fromJust5(maybe2);
                result.push(fst2(tuple));
                value15 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value15 = b2;
              while (true) {
                var tuple = f(value15);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2)) return result;
                value15 = fromJust5(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var map5 = /* @__PURE__ */ map(functorMaybe);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
  var toUnfoldable = function(dictUnfoldable) {
    var unfoldr3 = unfoldr(dictUnfoldable);
    return function(xs) {
      var len = length(xs);
      var f = function(i2) {
        if (i2 < len) {
          return new Just(new Tuple(unsafeIndex1(xs)(i2), i2 + 1 | 0));
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Array (line 163, column 3 - line 165, column 26): " + [i2.constructor.name]);
      };
      return unfoldr3(f)(0);
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var take = function(n) {
    return function(xs) {
      var $152 = n < 1;
      if ($152) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var singleton2 = function(a2) {
    return [a2];
  };
  var $$null = function(xs) {
    return length(xs) === 0;
  };
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var index = /* @__PURE__ */ (function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  })();
  var head = function(xs) {
    return index(xs)(0);
  };
  var fromFoldable = function(dictFoldable) {
    return runFn2(fromFoldableImpl)(foldr(dictFoldable));
  };
  var findIndex = /* @__PURE__ */ (function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  })();
  var find2 = function(f) {
    return function(xs) {
      return map5(unsafeIndex1(xs))(findIndex(f)(xs));
    };
  };
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var deleteAt = /* @__PURE__ */ (function() {
    return runFn4(_deleteAt)(Just.create)(Nothing.value);
  })();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe = function(f) {
    return concatMap((function() {
      var $189 = maybe([])(singleton2);
      return function($190) {
        return $189(f($190));
      };
    })());
  };
  var any2 = /* @__PURE__ */ runFn2(anyImpl);

  // output/Effect.Aff/foreign.js
  var Aff = (function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = (function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    })();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status2 = SUSPENDED;
      var step3 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status2) {
            case STEP_BIND:
              status2 = CONTINUE;
              try {
                step3 = bhead(step3);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status2 = RETURN;
                fail2 = util.left(e);
                step3 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step3)) {
                status2 = RETURN;
                fail2 = step3;
                step3 = null;
              } else if (bhead === null) {
                status2 = RETURN;
              } else {
                status2 = STEP_BIND;
                step3 = util.fromRight(step3);
              }
              break;
            case CONTINUE:
              switch (step3.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step3._2;
                  status2 = CONTINUE;
                  step3 = step3._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status2 = RETURN;
                    step3 = util.right(step3._1);
                  } else {
                    status2 = STEP_BIND;
                    step3 = step3._1;
                  }
                  break;
                case SYNC:
                  status2 = STEP_RESULT;
                  step3 = runSync(util.left, util.right, step3._1);
                  break;
                case ASYNC:
                  status2 = PENDING;
                  step3 = runAsync(util.left, step3._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status2 = STEP_RESULT;
                        step3 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status2 = RETURN;
                  fail2 = util.left(step3._1);
                  step3 = null;
                  break;
                // Enqueue the Catch so that we can call the error handler later on
                // in case of an exception.
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step3 = step3._1;
                  break;
                // Enqueue the Bracket so that we can call the appropriate handlers
                // after resource acquisition.
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step3 = step3._1;
                  break;
                case FORK:
                  status2 = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step3._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step3._1) {
                    tmp.run();
                  }
                  step3 = util.right(tmp);
                  break;
                case SEQ:
                  status2 = CONTINUE;
                  step3 = sequential3(util, supervisor, step3._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status2 = COMPLETED;
                step3 = interrupt || fail2 || step3;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  // We cannot recover from an unmasked interrupt. Otherwise we should
                  // continue stepping, or run the exception handler if an exception
                  // was raised.
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status2 = RETURN;
                    } else if (fail2) {
                      status2 = CONTINUE;
                      step3 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  // We cannot resume from an unmasked interrupt or exception.
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status2 = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status2 = STEP_BIND;
                      step3 = util.fromRight(step3);
                    }
                    break;
                  // If we have a bracket, we should enqueue the handlers,
                  // and continue with the success branch only if the fiber has
                  // not been interrupted. If the bracket acquisition failed, we
                  // should not run either.
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step3);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status2 = CONTINUE;
                        step3 = attempt._3(result);
                      }
                    }
                    break;
                  // Enqueue the appropriate handler. We increase the bracket count
                  // because it should not be cancelled.
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step3 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step3 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step3 = attempt._1.completed(util.fromRight(step3))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    step3 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status2 = RETURN;
                    step3 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step3));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step3) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step3);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status2 = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status2 === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step3)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status2 === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status2) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status2 = COMPLETED;
              step3 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status2 === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step3(error4)), attempts, interrupt);
                }
                status2 = RETURN;
                step3 = null;
                fail2 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status2 = RETURN;
                step3 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status2 === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status2 === SUSPENDED;
        },
        run: function() {
          if (status2 === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error4, par2, cb2) {
        var step3 = par2;
        var head3 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop: while (true) {
          tmp = null;
          switch (step3.tag) {
            case FORKED:
              if (step3._3 === EMPTY) {
                tmp = fibers[step3._1];
                kills2[count++] = tmp.kill(error4, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head3 === null) {
                break loop;
              }
              step3 = head3._2;
              if (tail2 === null) {
                head3 = null;
              } else {
                head3 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step3 = step3._2;
              break;
            case APPLY:
            case ALT:
              if (head3) {
                tail2 = new Aff2(CONS, head3, tail2);
              }
              head3 = step3;
              step3 = step3._1;
              break;
          }
        }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head3, tail2) {
        var fail2, step3, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step3 = null;
        } else {
          step3 = result;
          fail2 = null;
        }
        loop: while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head3 === null) {
            cb(fail2 || step3)();
            return;
          }
          if (head3._3 !== EMPTY) {
            return;
          }
          switch (head3.tag) {
            case MAP:
              if (fail2 === null) {
                head3._3 = util.right(head3._1(util.fromRight(step3)));
                step3 = head3._3;
              } else {
                head3._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head3._1._3;
              rhs = head3._2._3;
              if (fail2) {
                head3._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, fail2 === lhs ? head3._2 : head3._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(fail2, null, null);
                    } else {
                      join3(fail2, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step3 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head3._3 = step3;
              }
              break;
            case ALT:
              lhs = head3._1._3;
              rhs = head3._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail2 = step3 === lhs ? rhs : lhs;
                step3 = null;
                head3._3 = fail2;
              } else {
                head3._3 = step3;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, step3 === lhs ? head3._2 : head3._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(step3, null, null);
                    } else {
                      join3(step3, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head3 = null;
          } else {
            head3 = tail2._1;
            tail2 = tail2._2;
          }
        }
      }
      function resolve5(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status2 = CONTINUE;
        var step3 = par;
        var head3 = null;
        var tail2 = null;
        var tmp, fid;
        loop: while (true) {
          tmp = null;
          fid = null;
          switch (status2) {
            case CONTINUE:
              switch (step3.tag) {
                case MAP:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(MAP, step3._1, EMPTY, EMPTY);
                  step3 = step3._2;
                  break;
                case APPLY:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(APPLY, EMPTY, step3._2, EMPTY);
                  step3 = step3._1;
                  break;
                case ALT:
                  if (head3) {
                    tail2 = new Aff2(CONS, head3, tail2);
                  }
                  head3 = new Aff2(ALT, EMPTY, step3._2, EMPTY);
                  step3 = step3._1;
                  break;
                default:
                  fid = fiberId++;
                  status2 = RETURN;
                  tmp = step3;
                  step3 = new Aff2(FORKED, fid, new Aff2(CONS, head3, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve5(step3)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head3 === null) {
                break loop;
              }
              if (head3._1 === EMPTY) {
                head3._1 = step3;
                status2 = CONTINUE;
                step3 = head3._2;
                head3._2 = EMPTY;
              } else {
                head3._2 = step3;
                step3 = head3;
                if (tail2 === null) {
                  head3 = null;
                } else {
                  head3 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
        root = step3;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  })();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value15) {
          return Aff.Pure(f(value15));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map35 = map(Monad0.Bind1().Apply0().Functor0());
    var pure21 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map35(Right.create)(a2))(function($52) {
        return pure21(Left.create($52));
      });
    };
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map6 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map113 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map113(map6(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind19 = bind(dictMonad.Bind1());
    var pure21 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind19(v)(either(function($193) {
            return pure21(Left.create($193));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: (function() {
        var $194 = pure(dictMonad.Applicative0());
        return function($195) {
          return ExceptT($194(Right.create($195)));
        };
      })(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: (function() {
        var $204 = pure(dictMonad.Applicative0());
        return function($205) {
          return ExceptT($204(Left.create($205)));
        };
      })(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var parallel4 = parallel(dictParallel);
    return function(dictApplicative) {
      var traverse_7 = traverse_(dictApplicative);
      return function(dictFoldable) {
        var traverse_14 = traverse_7(dictFoldable);
        return function(f) {
          var $51 = traverse_14(function($53) {
            return parallel4(f($53));
          });
          return function($52) {
            return sequential3($51($52));
          };
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictApplicative) {
      var parTraverse_2 = parTraverse_1(dictApplicative);
      return function(dictFoldable) {
        return parTraverse_2(dictFoldable)(identity6);
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map7 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ (function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  })();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Apply0: function() {
      return applyAff;
    },
    Apply1: function() {
      return applyParAff;
    }
  };
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var applicativeParAff = {
    pure: function($76) {
      return parallel2(pure22($76));
    },
    Apply0: function() {
      return applyParAff;
    }
  };
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v(err), v1(err)]);
        };
      };
    }
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($77) {
    return Canceler($$const(liftEffect2($77)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map7(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map7(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/FFI.Resize/foreign.js
  function makeResizable(handleId, panelId, direction) {
    var handle = document.getElementById(handleId);
    var panel = document.getElementById(panelId);
    if (!handle || !panel) return;
    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      var startX = e.clientX;
      var startW = panel.offsetWidth;
      var onMove = (ev) => {
        var delta = direction === "left" ? ev.clientX - startX : startX - ev.clientX;
        var newW = Math.max(200, Math.min(600, startW + delta));
        panel.style.width = newW + "px";
      };
      var onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  }
  var initResize = () => {
    requestAnimationFrame(() => {
      makeResizable("repo-resize-handle", "repo-panel", "left");
    });
  };

  // output/FFI.Url/foreign.js
  var getRepoParam = () => {
    var params = new URLSearchParams(window.location.search);
    var repo = params.get("repo");
    return repo || "";
  };
  var setRepoParam = (repo) => () => {
    var url2 = new URL(window.location);
    if (repo === "") {
      url2.searchParams.delete("repo");
    } else {
      url2.searchParams.set("repo", repo);
    }
    history.replaceState(null, "", url2);
  };

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.ParentNode/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map8(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.Common/index.js
  var ClassName = function(x) {
    return x;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }
  function _setTitle(title3, doc) {
    doc.title = title3;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ (function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  })();
  var Interactive = /* @__PURE__ */ (function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  })();
  var Complete = /* @__PURE__ */ (function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  })();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map9 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var setTitle = function(newTitle) {
    return function(doc) {
      return function() {
        return _setTitle(newTitle, doc);
      };
    };
  };
  var readyState = function(doc) {
    return map9((function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    })())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value15) {
    var tag = Object.prototype.toString.call(value15);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value15);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var runEffectFn2 = function runEffectFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum1 = fromEnum(dictBoundedEnum);
    var bottom2 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum1(bottom2);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ (function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  })();

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }
  function localStorage(window2) {
    return function() {
      return window2.localStorage;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.EventTypes/index.js
  var input = "input";
  var domcontentloaded = "DOMContentLoaded";

  // output/Halogen.Aff.Util/index.js
  var bind2 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure3 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure1 = /* @__PURE__ */ pure(applicativeEffect);
  var map10 = /* @__PURE__ */ map(functorEffect);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query3) {
    return bind2(liftEffect3(bindFlipped4(composeKleisliFlipped2((function() {
      var $16 = querySelector(query3);
      return function($17) {
        return $16(toParentNode($17));
      };
    })())(document2))(windowImpl)))(function(mel) {
      return pure3(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure1(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do2() {
      var rs = bindFlipped4(readyState)(bindFlipped4(document2)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map10(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard2(bindAff)(awaitLoad)(function() {
    return bind2(selectElement("body"))(function(body4) {
      return maybe(throwError2(error("Could not find body")))(pure3)(body4);
    });
  });

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ (function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  })();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          return function(x) {
            return function(acc) {
              return append7(f(i2)(x))(acc);
            };
          };
        })(mempty3);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex3(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex3(Tuple.create);
        return function($296) {
          return $294($295($296));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
    var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    return function(dictApplicative) {
      var sequence12 = sequence2(dictApplicative);
      return function(f) {
        var $174 = mapWithIndex4(f);
        return function($175) {
          return sequence12($174($175));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ (function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  })();
  var singleton3 = function(dictPlus) {
    var empty9 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty9);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ (function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  })();
  var Cons = /* @__PURE__ */ (function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  })();
  var NonEmptyList = function(x) {
    return x;
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = (function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        })();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ (function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  })();

  // output/Data.Map.Internal/index.js
  var $runtime_lazy3 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var map11 = /* @__PURE__ */ map(functorMaybe);
  var Leaf = /* @__PURE__ */ (function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  })();
  var Node = /* @__PURE__ */ (function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  })();
  var IterLeaf = /* @__PURE__ */ (function() {
    function IterLeaf2() {
    }
    ;
    IterLeaf2.value = new IterLeaf2();
    return IterLeaf2;
  })();
  var IterEmit = /* @__PURE__ */ (function() {
    function IterEmit2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    IterEmit2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new IterEmit2(value0, value1, value22);
        };
      };
    };
    return IterEmit2;
  })();
  var IterNode = /* @__PURE__ */ (function() {
    function IterNode2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    IterNode2.create = function(value0) {
      return function(value1) {
        return new IterNode2(value0, value1);
      };
    };
    return IterNode2;
  })();
  var IterDone = /* @__PURE__ */ (function() {
    function IterDone2() {
    }
    ;
    IterDone2.value = new IterDone2();
    return IterDone2;
  })();
  var IterNext = /* @__PURE__ */ (function() {
    function IterNext2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    IterNext2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new IterNext2(value0, value1, value22);
        };
      };
    };
    return IterNext2;
  })();
  var Split = /* @__PURE__ */ (function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  })();
  var SplitLast = /* @__PURE__ */ (function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  })();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + (function() {
          var $280 = l.value0 > r.value0;
          if ($280) {
            return l.value0;
          }
          ;
          return r.value0;
        })() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
  };
  var toMapIter = /* @__PURE__ */ (function() {
    return flip(IterNode.create)(IterLeaf.value);
  })();
  var stepWith = function(f) {
    return function(next) {
      return function(done) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v instanceof IterLeaf) {
              $tco_done = true;
              return done(unit);
            }
            ;
            if (v instanceof IterEmit) {
              $tco_done = true;
              return next(v.value0, v.value1, v.value2);
            }
            ;
            if (v instanceof IterNode) {
              $copy_v = f(v.value1)(v.value0);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 940, column 8 - line 946, column 20): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2;
      };
    };
  };
  var singleton4 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ (function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton4(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
    };
  })();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy3("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(793)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(796)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 791, column 5 - line 799, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 787, column 34 - line 799, column 30): " + [m.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(786);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var $lazy_unsafeUnionWith = /* @__PURE__ */ $runtime_lazy3("unsafeUnionWith", "Data.Map.Internal", function() {
    return function(comp, app, l, r) {
      if (l instanceof Leaf) {
        return r;
      }
      ;
      if (r instanceof Leaf) {
        return l;
      }
      ;
      if (r instanceof Node) {
        var v = unsafeSplit(comp, r.value2, l);
        var l$prime = $lazy_unsafeUnionWith(809)(comp, app, v.value1, r.value4);
        var r$prime = $lazy_unsafeUnionWith(810)(comp, app, v.value2, r.value5);
        if (v.value0 instanceof Just) {
          return unsafeBalancedNode(r.value2, app(v.value0.value0)(r.value3), l$prime, r$prime);
        }
        ;
        if (v.value0 instanceof Nothing) {
          return unsafeBalancedNode(r.value2, r.value3, l$prime, r$prime);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 811, column 5 - line 815, column 46): " + [v.value0.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 804, column 42 - line 815, column 46): " + [l.constructor.name, r.constructor.name]);
    };
  });
  var unsafeUnionWith = /* @__PURE__ */ $lazy_unsafeUnionWith(803);
  var unionWith = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(app) {
      return function(m1) {
        return function(m2) {
          return unsafeUnionWith(compare3, app, m1, m2);
        };
      };
    };
  };
  var union = function(dictOrd) {
    return unionWith(dictOrd)($$const);
  };
  var pop = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(m) {
        var v = unsafeSplit(compare3, k, m);
        return map11(function(a2) {
          return new Tuple(a2, unsafeJoinNodes(v.value1, v.value2));
        })(v.value0);
      };
    };
  };
  var member = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return false;
          }
          ;
          if (v instanceof Node) {
            var v1 = compare3(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return true;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 7 - line 462, column 19): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 456, column 8 - line 462, column 19): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var lookup = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Node) {
            var v1 = compare3(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value3);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 283, column 7 - line 286, column 22): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 8 - line 286, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var iterMapL = /* @__PURE__ */ (function() {
    var go2 = function($copy_iter) {
      return function($copy_v) {
        var $tco_var_iter = $copy_iter;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(iter, v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return iter;
          }
          ;
          if (v instanceof Node) {
            if (v.value5 instanceof Leaf) {
              $tco_var_iter = new IterEmit(v.value2, v.value3, iter);
              $copy_v = v.value4;
              return;
            }
            ;
            $tco_var_iter = new IterEmit(v.value2, v.value3, new IterNode(v.value5, iter));
            $copy_v = v.value4;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 951, column 13 - line 958, column 48): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_iter, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2;
  })();
  var stepAscCps = /* @__PURE__ */ stepWith(iterMapL);
  var stepAsc = /* @__PURE__ */ (function() {
    return stepAscCps(function(k, v, next) {
      return new IterNext(k, v, next);
    })($$const(IterDone.value));
  })();
  var eqMapIter = function(dictEq) {
    var eq14 = eq(dictEq);
    return function(dictEq1) {
      var eq22 = eq(dictEq1);
      return {
        eq: /* @__PURE__ */ (function() {
          var go2 = function($copy_a) {
            return function($copy_b) {
              var $tco_var_a = $copy_a;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(a2, b2) {
                var v = stepAsc(a2);
                if (v instanceof IterNext) {
                  var v2 = stepAsc(b2);
                  if (v2 instanceof IterNext && (eq14(v.value0)(v2.value0) && eq22(v.value1)(v2.value1))) {
                    $tco_var_a = v.value2;
                    $copy_b = v2.value2;
                    return;
                  }
                  ;
                  $tco_done = true;
                  return false;
                }
                ;
                if (v instanceof IterDone) {
                  $tco_done = true;
                  return true;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 859, column 14 - line 868, column 13): " + [v.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_a, $copy_b);
              }
              ;
              return $tco_result;
            };
          };
          return go2;
        })()
      };
    };
  };
  var stepUnfoldr = /* @__PURE__ */ (function() {
    var step3 = function(k, v, next) {
      return new Just(new Tuple(new Tuple(k, v), next));
    };
    return stepAscCps(step3)(function(v) {
      return Nothing.value;
    });
  })();
  var toUnfoldable2 = function(dictUnfoldable) {
    var $784 = unfoldr(dictUnfoldable)(stepUnfoldr);
    return function($785) {
      return $784(toMapIter($785));
    };
  };
  var insert = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton4(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare3(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(169);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(175);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append14 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty3;
          }
          ;
          if (v instanceof Node) {
            return append14(go2(v.value4))(append14(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(192)(m$prime.value4, f(m$prime.value2)(m$prime.value3)($lazy_go(192)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 189, column 26 - line 192, column 45): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(189);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(198)(f(m$prime.value2)($lazy_go(198)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 195, column 26 - line 198, column 45): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(195);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append14 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty3;
          }
          ;
          if (v instanceof Node) {
            return append14(go2(v.value4))(append14(f(v.value2)(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 201, column 10 - line 204, column 30): " + [v.constructor.name]);
        };
        return go2;
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var keys = /* @__PURE__ */ (function() {
    return foldrWithIndex(foldableWithIndexMap)(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  })();
  var values = /* @__PURE__ */ (function() {
    return foldr(foldableMap)(Cons.create)(Nil.value);
  })();
  var eqMap = function(dictEq) {
    var eqMapIter1 = eqMapIter(dictEq);
    return function(dictEq1) {
      var eq14 = eq(eqMapIter1(dictEq1));
      return {
        eq: function(xs) {
          return function(ys) {
            if (xs instanceof Leaf) {
              if (ys instanceof Leaf) {
                return true;
              }
              ;
              return false;
            }
            ;
            if (xs instanceof Node) {
              if (ys instanceof Node && xs.value1 === ys.value1) {
                return eq14(toMapIter(xs))(toMapIter(ys));
              }
              ;
              return false;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 94, column 14 - line 105, column 16): " + [xs.constructor.name]);
          };
        }
      };
    };
  };
  var empty2 = /* @__PURE__ */ (function() {
    return Leaf.value;
  })();
  var fromFoldable2 = function(dictOrd) {
    var insert14 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert14(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };
  var $$delete = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go2(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go2(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            return unsafeJoinNodes(v.value4, v.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 7 - line 501, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 8 - line 501, column 43): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var alter = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = unsafeSplit(compare3, k, m);
          var v2 = f(v.value0);
          if (v2 instanceof Nothing) {
            return unsafeJoinNodes(v.value1, v.value2);
          }
          ;
          if (v2 instanceof Just) {
            return unsafeBalancedNode(k, v2.value0, v.value1, v.value2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 514, column 3 - line 518, column 41): " + [v2.constructor.name]);
        };
      };
    };
  };

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ (function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  })();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v) {
      return function(v1) {
        return v.value0(v.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v) {
      return function(v1) {
        return v.value1(v.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup(ordTuple2);
  var insert1 = /* @__PURE__ */ insert(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v);
            };
          };
        };
      };
    };
  };
  var lookup2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v);
            };
          };
        };
      };
    };
  };
  var insert2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(val) {
              return function(v) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(val)(v);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty3 = empty2;

  // output/Data.String.Common/foreign.js
  var toLower = function(s) {
    return s.toLowerCase();
  };
  var trim = function(s) {
    return s.trim();
  };

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ (function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  })();
  var InputCheckbox = /* @__PURE__ */ (function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  })();
  var InputColor = /* @__PURE__ */ (function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  })();
  var InputDate = /* @__PURE__ */ (function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  })();
  var InputDatetimeLocal = /* @__PURE__ */ (function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  })();
  var InputEmail = /* @__PURE__ */ (function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  })();
  var InputFile = /* @__PURE__ */ (function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  })();
  var InputHidden = /* @__PURE__ */ (function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  })();
  var InputImage = /* @__PURE__ */ (function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  })();
  var InputMonth = /* @__PURE__ */ (function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  })();
  var InputNumber = /* @__PURE__ */ (function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  })();
  var InputPassword = /* @__PURE__ */ (function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  })();
  var InputRadio = /* @__PURE__ */ (function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  })();
  var InputRange = /* @__PURE__ */ (function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  })();
  var InputReset = /* @__PURE__ */ (function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  })();
  var InputSearch = /* @__PURE__ */ (function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  })();
  var InputSubmit = /* @__PURE__ */ (function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  })();
  var InputTel = /* @__PURE__ */ (function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  })();
  var InputText = /* @__PURE__ */ (function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  })();
  var InputTime = /* @__PURE__ */ (function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  })();
  var InputUrl = /* @__PURE__ */ (function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  })();
  var InputWeek = /* @__PURE__ */ (function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  })();
  var renderInputType = function(v) {
    if (v instanceof InputButton) {
      return "button";
    }
    ;
    if (v instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v instanceof InputColor) {
      return "color";
    }
    ;
    if (v instanceof InputDate) {
      return "date";
    }
    ;
    if (v instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v instanceof InputEmail) {
      return "email";
    }
    ;
    if (v instanceof InputFile) {
      return "file";
    }
    ;
    if (v instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v instanceof InputImage) {
      return "image";
    }
    ;
    if (v instanceof InputMonth) {
      return "month";
    }
    ;
    if (v instanceof InputNumber) {
      return "number";
    }
    ;
    if (v instanceof InputPassword) {
      return "password";
    }
    ;
    if (v instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v instanceof InputRange) {
      return "range";
    }
    ;
    if (v instanceof InputReset) {
      return "reset";
    }
    ;
    if (v instanceof InputSearch) {
      return "search";
    }
    ;
    if (v instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v instanceof InputTel) {
      return "tel";
    }
    ;
    if (v instanceof InputText) {
      return "text";
    }
    ;
    if (v instanceof InputTime) {
      return "time";
    }
    ;
    if (v instanceof InputUrl) {
      return "url";
    }
    ;
    if (v instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ (function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  })();
  var Action = /* @__PURE__ */ (function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  })();

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ (function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  })();
  var unStep = unsafeCoerce2;
  var step2 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map12 = /* @__PURE__ */ map(functorArray);
  var map13 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ (function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  })();
  var Elem = /* @__PURE__ */ (function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  })();
  var Keyed = /* @__PURE__ */ (function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  })();
  var Widget = /* @__PURE__ */ (function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  })();
  var Grafted = /* @__PURE__ */ (function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  })();
  var Graft = /* @__PURE__ */ (function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  })();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map12(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map12(map13(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key2, obj) {
    return obj[key2];
  }
  function unsafeHasAny(key2, obj) {
    return obj.hasOwnProperty(key2);
  }
  function unsafeSetAny(key2, val, obj) {
    obj[key2] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name15, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name15);
    } else {
      return doc.createElement(name15);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener2(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener2(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.Element/index.js
  var toNode2 = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy4 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy4("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy4("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy4("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        var v1 = length(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step2(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy4("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step2(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy4("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value15) {
    return typeof value15;
  }
  function tagOf(value15) {
    return Object.prototype.toString.call(value15).slice(8, -1);
  }

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Int/index.js
  var fromNumber = /* @__PURE__ */ (function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  })();

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ (function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  })();
  var $$null2 = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };

  // output/Data.List.NonEmpty/index.js
  var singleton5 = /* @__PURE__ */ (function() {
    var $200 = singleton3(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  })();
  var cons2 = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton6 = function(c) {
    return c;
  };
  var length5 = function(s) {
    return s.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i2 = s.indexOf(x);
          return i2 === -1 ? nothing : just(i2);
        };
      };
    };
  };
  var take3 = function(n) {
    return function(s) {
      return s.substr(0, n);
    };
  };
  var drop2 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s) {
      if (i2 >= 0 && i2 < s.length) return s.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var indexOf = /* @__PURE__ */ (function() {
    return _indexOf(Just.create)(Nothing.value);
  })();
  var contains = function(pat) {
    var $23 = indexOf(pat);
    return function($24) {
      return isJust($23($24));
    };
  };

  // output/Foreign/index.js
  var TypeMismatch = /* @__PURE__ */ (function() {
    function TypeMismatch3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return function(value1) {
        return new TypeMismatch3(value0, value1);
      };
    };
    return TypeMismatch3;
  })();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton5($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure110 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value15) {
        if (tagOf(value15) === tag) {
          return pure110(unsafeFromForeign(value15));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value15)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value15.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function _fmapObject(m0, f) {
    var m = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m[k] = f(m0[k]);
      }
    }
    return m;
  }
  function _mapWithKey(m0, f) {
    var m = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m[k] = f(k)(m0[k]);
      }
    }
    return m;
  }
  function _foldM(bind19) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind19(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys2 = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var foldr3 = /* @__PURE__ */ foldr(foldableArray);
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var values2 = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var toUnfoldable3 = function(dictUnfoldable) {
    var $89 = toUnfoldable(dictUnfoldable);
    var $90 = toArrayWithKey(Tuple.create);
    return function($91) {
      return $89($90($91));
    };
  };
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do2() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var mapWithKey = function(f) {
    return function(m) {
      return _mapWithKey(m, f);
    };
  };
  var lookup3 = /* @__PURE__ */ (function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  })();
  var insert3 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var functorObject = {
    map: function(f) {
      return function(m) {
        return _fmapObject(m, f);
      };
    }
  };
  var functorWithIndexObject = {
    mapWithIndex: mapWithKey,
    Functor0: function() {
      return functorObject;
    }
  };
  var fromFoldable4 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable(dictFoldable);
    return function(l) {
      return runST(function __do2() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void4(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };
  var fold2 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
    var append14 = append(dictMonoid.Semigroup0());
    var mempty3 = mempty(dictMonoid);
    return function(f) {
      return fold2(function(acc) {
        return function(k) {
          return function(v) {
            return append14(acc)(f(k)(v));
          };
        };
      })(mempty3);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold2(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m) {
          return foldr3(f)(z)(values2(m));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var foldableWithIndexObject = {
    foldlWithIndex: function(f) {
      return fold2(flip(f));
    },
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m) {
          return foldr3(uncurry(f))(z)(toArrayWithKey(Tuple.create)(m));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMap2(dictMonoid);
    },
    Foldable0: function() {
      return foldableObject;
    }
  };
  var traversableWithIndexObject = {
    traverseWithIndex: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply2 = apply(Apply0);
      var map35 = map(Apply0.Functor0());
      var pure110 = pure(dictApplicative);
      return function(f) {
        return function(ms) {
          return fold2(function(acc) {
            return function(k) {
              return function(v) {
                return apply2(map35(flip(insert3(k)))(acc))(f(k)(v));
              };
            };
          })(pure110(empty4))(ms);
        };
      };
    },
    FunctorWithIndex0: function() {
      return functorWithIndexObject;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexObject;
    },
    Traversable2: function() {
      return traversableObject;
    }
  };
  var traversableObject = {
    traverse: function(dictApplicative) {
      var $96 = traverseWithIndex(traversableWithIndexObject)(dictApplicative);
      return function($97) {
        return $96($$const($97));
      };
    },
    sequence: function(dictApplicative) {
      return traverse(traversableObject)(dictApplicative)(identity7);
    },
    Functor0: function() {
      return functorObject;
    },
    Foldable1: function() {
      return foldableObject;
    }
  };

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy5 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ (function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  })();
  var Removed = /* @__PURE__ */ (function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  })();
  var Attribute = /* @__PURE__ */ (function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  })();
  var Property = /* @__PURE__ */ (function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  })();
  var Handler = /* @__PURE__ */ (function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  })();
  var Ref = /* @__PURE__ */ (function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  })();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key2, el) {
    var v = hasAttribute(nullImpl, key2, el);
    if (v) {
      return removeAttribute(nullImpl, key2, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key2, el));
    if (v1 === "string") {
      return unsafeSetAny(key2, "", el);
    }
    ;
    if (key2 === "rowSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    if (key2 === "colSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    return unsafeSetAny(key2, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener2(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup3("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do2() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener2(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy5("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x) {
    return x;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text5 = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var handler = /* @__PURE__ */ (function() {
    return Handler.create;
  })();
  var element = function(ns) {
    return function(name15) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name15, props, children2);
        };
      };
    };
  };
  var attr = function(ns) {
    return function(v) {
      return Attribute.create(ns)(v);
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ (function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  })();
  var Lift = /* @__PURE__ */ (function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  })();
  var Ap = /* @__PURE__ */ (function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  })();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ (function() {
    return Lift.create;
  })();
  var goLeft = function(dictApplicative) {
    var pure21 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure21(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons2(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply2(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure21 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure21(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton5(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity8);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ (function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  })();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ (function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  })();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc3 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null3 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ (function() {
    return new CatQueue(Nil.value, Nil.value);
  })();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ (function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  })();
  var CatCons = /* @__PURE__ */ (function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  })();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc3(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr4 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl6 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl6(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, (function() {
        var $66 = $$null3(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr4(link)(CatNil.value)(v.value1);
      })()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ (function() {
    return CatNil.value;
  })();
  var append3 = link;
  var semigroupCatList = {
    append: append3
  };
  var snoc4 = function(cat) {
    return function(a2) {
      return append3(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy6 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var append4 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ (function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  })();
  var Return = /* @__PURE__ */ (function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  })();
  var Bind = /* @__PURE__ */ (function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  })();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append4(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)((function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        })())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc4(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy6("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure4 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure4($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map113 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map113(Done.create)(pure110(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map113(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var ChildQuery = /* @__PURE__ */ (function() {
    function ChildQuery3(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ChildQuery3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ChildQuery3(value0, value1, value22);
        };
      };
    };
    return ChildQuery3;
  })();
  var unChildQueryBox = unsafeCoerce2;
  var mkChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void5 = /* @__PURE__ */ $$void(functorEffect);
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void5(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create3 = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do2() {
          modify_2(function(v) {
            return append5(v)([k]);
          })(subscribers)();
          return modify_2(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind3(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var lookup4 = /* @__PURE__ */ lookup2();
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ (function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  })();
  var Subscribe = /* @__PURE__ */ (function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  })();
  var Unsubscribe = /* @__PURE__ */ (function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  })();
  var Lift2 = /* @__PURE__ */ (function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  })();
  var ChildQuery2 = /* @__PURE__ */ (function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  })();
  var Raise = /* @__PURE__ */ (function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  })();
  var Par = /* @__PURE__ */ (function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  })();
  var Fork = /* @__PURE__ */ (function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  })();
  var Join = /* @__PURE__ */ (function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  })();
  var Kill = /* @__PURE__ */ (function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  })();
  var GetRef = /* @__PURE__ */ (function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  })();
  var HalogenM = function(x) {
    return x;
  };
  var subscribe2 = function(es) {
    return liftF(new Subscribe(function(v) {
      return es;
    }, identity9));
  };
  var raise = function(o) {
    return liftF(new Raise(o, unit));
  };
  var query = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(q2) {
              return liftF(new ChildQuery2(mkChildQueryBox(new ChildQuery(function(dictApplicative) {
                var pure110 = pure(dictApplicative);
                return function(k) {
                  var $177 = maybe(pure110(Nothing.value))(k);
                  var $178 = lookup23(label5)(p2);
                  return function($179) {
                    return $177($178($179));
                  };
                };
              }, q2, identity9))));
            };
          };
        };
      };
    };
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: (function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      })(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: (function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      })(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ (function() {
    function Initialize3(value0) {
      this.value0 = value0;
    }
    ;
    Initialize3.create = function(value0) {
      return new Initialize3(value0);
    };
    return Initialize3;
  })();
  var Finalize = /* @__PURE__ */ (function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  })();
  var Receive = /* @__PURE__ */ (function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  })();
  var Action2 = /* @__PURE__ */ (function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  })();
  var Query = /* @__PURE__ */ (function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  })();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy7 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy7("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map14 = /* @__PURE__ */ map(functorHalogenM);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup5 = /* @__PURE__ */ lookup2();
  var pop3 = /* @__PURE__ */ pop2();
  var insert4 = /* @__PURE__ */ insert2();
  var ComponentSlot = /* @__PURE__ */ (function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  })();
  var ThunkSlot = /* @__PURE__ */ (function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  })();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map14(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ (function() {
    return {
      handleAction: $$const(pure5(unit)),
      handleQuery: $$const(pure5(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  })();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup5(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert14 = insert4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert14(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ (function() {
    return element(Nothing.value);
  })();
  var h2 = /* @__PURE__ */ element2("h2");
  var h2_ = /* @__PURE__ */ h2([]);
  var h3 = /* @__PURE__ */ element2("h3");
  var h3_ = /* @__PURE__ */ h3([]);
  var input2 = function(props) {
    return element2("input")(props)([]);
  };
  var li = /* @__PURE__ */ element2("li");
  var li_ = /* @__PURE__ */ li([]);
  var p = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p([]);
  var span3 = /* @__PURE__ */ element2("span");
  var ul = /* @__PURE__ */ element2("ul");
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");
  var a = /* @__PURE__ */ element2("a");

  // output/Halogen.HTML.Properties/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var rel4 = /* @__PURE__ */ prop22("rel");
  var target5 = /* @__PURE__ */ prop22("target");
  var type_17 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value12 = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var placeholder3 = /* @__PURE__ */ prop22("placeholder");
  var id2 = /* @__PURE__ */ prop22("id");
  var href4 = /* @__PURE__ */ prop22("href");
  var class_ = /* @__PURE__ */ (function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap2($37));
    };
  })();
  var attr2 = /* @__PURE__ */ (function() {
    return attr(Nothing.value);
  })();

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p2)(component)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p2)(component)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.Query/index.js
  var $$void6 = /* @__PURE__ */ $$void(functorHalogenM);
  var query2 = /* @__PURE__ */ query();
  var tell2 = function() {
    return function(dictIsSymbol) {
      var query1 = query2(dictIsSymbol);
      return function(dictOrd) {
        var query22 = query1(dictOrd);
        return function(slot3) {
          return function(label5) {
            return function(req) {
              return $$void6(query22(slot3)(label5)(req(unit)));
            };
          };
        };
      };
    };
  };

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork2 = function(dict) {
    return dict.fork;
  };

  // output/Effect.Console/foreign.js
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do2() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty3)();
            var childrenOut = $$new(empty3)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty2))();
            var forks = $$new(empty2)();
            var ds = {
              component,
              state: component.initialState(input3),
              refs: empty2,
              children: empty3,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup6 = /* @__PURE__ */ lookup(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork2(monadForkAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var pure6 = /* @__PURE__ */ pure(applicativeAff);
  var map16 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel3 = /* @__PURE__ */ parallel(parallelAff);
  var map17 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map22 = /* @__PURE__ */ map(functorMaybe);
  var insert5 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete2 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do2() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped5(lookup6(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect4(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect4(f))(function(result) {
          return bind12(liftEffect4(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_3(v.initializers))(function() {
                return pure6(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        return liftEffect4(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render3) {
    return function(ref2) {
      return function(q2) {
        return bind12(liftEffect4(read(ref2)))(function(v) {
          return evalM(render3)(ref2)(v["component"]["eval"](new Query(map16(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render3) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect4(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel3(bind12(liftEffect4(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render3)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map17(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure6(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect4(write({
                    component: v2.component,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers,
                    state: v3.value1
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render3(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure6(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render3)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return discard1(liftEffect4(modify_2(map22(insert5(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure6(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure6(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp((function() {
                var $119 = evalM(render3)(ref2);
                return function($120) {
                  return parallel3($119($120));
                };
              })())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect4(read(ref2)))(function(v2) {
                  return bind12(liftEffect4($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect4(function __do2() {
                      modify_2($$delete2(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render3)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect4(unlessM2(read(doneRef))(modify_2(insert12(fid)(fiber))(v2.forks))))(function() {
                        return pure6(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return pure6(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render3) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect4(flip(modify_2)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers,
              refs: alter2($$const(v.value1))(v.value0)(st.refs)
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind12(liftEffect4(read(ref2)))(function(v1) {
            return evalM(render3)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork2(monadForkAff);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard4(bindAff);
  var parSequence_4 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure7 = /* @__PURE__ */ pure(applicativeEffect);
  var map18 = /* @__PURE__ */ map(functorEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void7 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ (function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  })();
  var handlePending = function(ref2) {
    return function __do2() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)((function() {
        var $59 = traverse_5(fork4);
        return function($60) {
          return handleAff($59(reverse2($60)));
        };
      })())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do2() {
      bindFlipped6(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped6(traverse_33((function() {
        var $61 = killFiber(error("finalized"));
        return function($62) {
          return handleAff($61($62));
        };
      })()))(read(v.forks))();
      return write(empty2)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render3)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_2(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_4(reverse2(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect5(function __do2() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do2() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped6(unDriverStateX((function() {
                    var $63 = render3(lchs);
                    return function($64) {
                      return $63((function(v) {
                        return v.selfRef;
                      })($64));
                    };
                  })()))(read($$var2))();
                  bindFlipped6(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot3) {
                  return function __do2() {
                    var childrenIn = map18(slot3.pop)(read(childrenInRef))();
                    var $$var2 = (function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do3() {
                            flip(write)(st.handlerRef)((function() {
                              var $65 = maybe(pure12(unit))(handler3);
                              return function($66) {
                                return $65(slot3.output($66));
                              };
                            })())();
                            return handleAff(evalM(render3)(st.selfRef)(st["component"]["eval"](new Receive(slot3.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)((function() {
                          var $67 = maybe(pure12(unit))(handler3);
                          return function($68) {
                            return $67(slot3.output($68));
                          };
                        })())(slot3.input)(slot3.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    })();
                    var isDuplicate = map18(function($69) {
                      return isJust(slot3.get($69));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_2(slot3.set($$var2))(childrenOutRef)();
                    return bind4(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure7(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render3 = function(lchs) {
          return function($$var2) {
            return function __do2() {
              var v = read($$var2)();
              var shouldProcessHandlers = map18(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty3)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = (function() {
                var $70 = queueOrRun(v.pendingHandlers);
                var $71 = evalF(render3)(v.selfRef);
                return function($72) {
                  return $70($$void7($71($72)));
                };
              })();
              var childHandler = (function() {
                var $73 = queueOrRun(v.pendingQueries);
                return function($74) {
                  return $73(handler3(Action.create($74)));
                };
              })();
              var rendering = renderSpec2.render(function($75) {
                return handleAff(handler3($75));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do3() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_2)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers,
                  rendering: new Just(rendering),
                  children: children2
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do3() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23((function() {
                    var $76 = traverse_5(fork4);
                    return function($77) {
                      return handleAff($76(reverse2($77)));
                    };
                  })())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $52 = maybe(false)($$null2)(mmore);
                  if ($52) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do2() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render3)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_2(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do3() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind13(liftEffect5(read(disposed)))(function(v) {
                if (v) {
                  return pure12(Nothing.value);
                }
                ;
                return evalQ(render3)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do2() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do3() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect5(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect5($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do2() {
              var sio = create3();
              var dsx = bindFlipped6(read)(runComponent(lchs)((function() {
                var $78 = notify(sio.listener);
                return function($79) {
                  return liftEffect5($78($79));
                };
              })())(i2)(component))();
              return unDriverStateX(function(st) {
                return pure7({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map19 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ (function() {
    var $6 = map19(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  })();
  var nextSibling = /* @__PURE__ */ (function() {
    var $15 = map19(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  })();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy8 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void8 = /* @__PURE__ */ $$void(functorEffect);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map20 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void8(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void8(appendChild(v)(v2.value0));
        }
        ;
        return pure8(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do2() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document3) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap3)(spec);
          var $lazy_patch = $runtime_lazy8("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot3) {
              if (st instanceof Just) {
                if (slot3 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot3.value0);
                }
                ;
                if (slot3 instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot3.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot3.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot3);
            };
          });
          var $lazy_render = $runtime_lazy8("render", "Halogen.VDom.Driver", function() {
            return function(slot3) {
              if (slot3 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot3.value0);
              }
              ;
              if (slot3 instanceof ThunkSlot) {
                var step3 = buildThunk2(slot3.value0);
                return mkStep(new Step(extract2(step3), new Just(step3), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot3.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy8("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch = $lazy_patch(91);
          var render3 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render3;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document3
        };
      };
    };
  };
  var renderSpec = function(document3) {
    return function(container) {
      var render3 = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do2() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document3);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void8(appendChild(node)(toNode(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do2() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render3,
        renderChild: identity10,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component) {
    return function(i2) {
      return function(element3) {
        return bind14(liftEffect6(map20(toDocument)(bindFlipped7(document2)(windowImpl))))(function(document3) {
          return runUI(renderSpec(document3)(element3))(component)(i2);
        });
      };
    };
  };

  // output/Data.Argonaut.Core/foreign.js
  function id3(x) {
    return x;
  }
  var jsonNull = null;
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null) return isNull3();
    else if (typeof j === "boolean") return isBool(j);
    else if (typeof j === "number") return isNum(j);
    else if (typeof j === "string") return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else return isObj(j);
  }

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ (function() {
    return verbJsonType(Nothing.value)(Just.create);
  })();
  var isJsonType = /* @__PURE__ */ verbJsonType(false)(/* @__PURE__ */ $$const(true));
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonNull = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson(f, $$const(d), $$const(d), $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var isNull2 = /* @__PURE__ */ isJsonType(caseJsonNull);
  var caseJsonBoolean = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), f, $$const(d), $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonArray = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
      };
    };
  };
  var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);

  // output/Data.Argonaut.Decode.Error/index.js
  var show1 = /* @__PURE__ */ show(showInt);
  var TypeMismatch2 = /* @__PURE__ */ (function() {
    function TypeMismatch3(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return new TypeMismatch3(value0);
    };
    return TypeMismatch3;
  })();
  var UnexpectedValue = /* @__PURE__ */ (function() {
    function UnexpectedValue2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue2.create = function(value0) {
      return new UnexpectedValue2(value0);
    };
    return UnexpectedValue2;
  })();
  var AtIndex = /* @__PURE__ */ (function() {
    function AtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtIndex2.create = function(value0) {
      return function(value1) {
        return new AtIndex2(value0, value1);
      };
    };
    return AtIndex2;
  })();
  var AtKey = /* @__PURE__ */ (function() {
    function AtKey2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtKey2.create = function(value0) {
      return function(value1) {
        return new AtKey2(value0, value1);
      };
    };
    return AtKey2;
  })();
  var Named = /* @__PURE__ */ (function() {
    function Named2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Named2.create = function(value0) {
      return function(value1) {
        return new Named2(value0, value1);
      };
    };
    return Named2;
  })();
  var MissingValue = /* @__PURE__ */ (function() {
    function MissingValue2() {
    }
    ;
    MissingValue2.value = new MissingValue2();
    return MissingValue2;
  })();
  var printJsonDecodeError = function(err) {
    var go2 = function(v) {
      if (v instanceof TypeMismatch2) {
        return "  Expected value of type '" + (v.value0 + "'.");
      }
      ;
      if (v instanceof UnexpectedValue) {
        return "  Unexpected value " + (stringify(v.value0) + ".");
      }
      ;
      if (v instanceof AtIndex) {
        return "  At array index " + (show1(v.value0) + (":\n" + go2(v.value1)));
      }
      ;
      if (v instanceof AtKey) {
        return "  At object key '" + (v.value0 + ("':\n" + go2(v.value1)));
      }
      ;
      if (v instanceof Named) {
        return "  Under '" + (v.value0 + ("':\n" + go2(v.value1)));
      }
      ;
      if (v instanceof MissingValue) {
        return "  No value was found.";
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 37, column 8 - line 43, column 44): " + [v.constructor.name]);
    };
    return "An error occurred while decoding a JSON value:\n" + go2(err);
  };

  // output/Data.Set/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var foldMap3 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr5 = /* @__PURE__ */ foldr(foldableList);
  var union3 = function(dictOrd) {
    return coerce3(union(dictOrd));
  };
  var toList = function(v) {
    return keys(v);
  };
  var singleton8 = function(a2) {
    return singleton4(a2)(unit);
  };
  var member2 = function(dictOrd) {
    return coerce3(member(dictOrd));
  };
  var insert7 = function(dictOrd) {
    var insert14 = insert(dictOrd);
    return function(a2) {
      return function(v) {
        return insert14(a2)(unit)(v);
      };
    };
  };
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap3(dictMonoid);
      return function(f) {
        var $98 = foldMap12(f);
        return function($99) {
          return $98(toList($99));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $100 = foldl2(f)(x);
        return function($101) {
          return $100(toList($101));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $102 = foldr5(f)(x);
        return function($103) {
          return $102(toList($103));
        };
      };
    }
  };
  var eqSet = function(dictEq) {
    var eq3 = eq(eqMap(dictEq)(eqUnit));
    return {
      eq: function(v) {
        return function(v1) {
          return eq3(v)(v1);
        };
      }
    };
  };
  var empty7 = empty2;

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i2 = 0; i2 < n; ++i2) {
            var o = iter.next();
            if (o.done) return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map21 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons5 = function(s) {
    var v = length5(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map21(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons5(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length5(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length7 = function($74) {
    return length(toCodePointArray($74));
  };
  var indexOf2 = function(p2) {
    return function(s) {
      return map21(function(i2) {
        return length7(take3(i2)(s));
      })(indexOf(p2)(s));
    };
  };
  var fromCharCode2 = /* @__PURE__ */ (function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton6($75($76));
    };
  })();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div3(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton9 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(v) {
    return function(v1) {
      if (v < 1) {
        return "";
      }
      ;
      var v2 = uncons5(v1);
      if (v2 instanceof Just) {
        return singleton9(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
      }
      ;
      return v1;
    };
  };
  var take4 = /* @__PURE__ */ _take(takeFallback);
  var drop4 = function(n) {
    return function(s) {
      return drop2(length5(take4(n)(s)))(s);
    };
  };

  // output/Data.Argonaut.Decode.Decoders/index.js
  var pure9 = /* @__PURE__ */ pure(applicativeEither);
  var map23 = /* @__PURE__ */ map(functorEither);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(bindEither);
  var traverse5 = /* @__PURE__ */ traverse(traversableObject)(applicativeEither);
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEither);
  var getFieldOptional$prime = function(decoder) {
    return function(obj) {
      return function(str) {
        var decode = function(json3) {
          var $35 = isNull2(json3);
          if ($35) {
            return pure9(Nothing.value);
          }
          ;
          return map23(Just.create)(lmap2(AtKey.create(str))(decoder(json3)));
        };
        return maybe(pure9(Nothing.value))(decode)(lookup3(str)(obj));
      };
    };
  };
  var getField = function(decoder) {
    return function(obj) {
      return function(str) {
        return maybe(new Left(new AtKey(str, MissingValue.value)))((function() {
          var $48 = lmap2(AtKey.create(str));
          return function($49) {
            return $48(decoder($49));
          };
        })())(lookup3(str)(obj));
      };
    };
  };
  var decodeString = /* @__PURE__ */ (function() {
    return caseJsonString(new Left(new TypeMismatch2("String")))(Right.create);
  })();
  var decodeNumber = /* @__PURE__ */ (function() {
    return caseJsonNumber(new Left(new TypeMismatch2("Number")))(Right.create);
  })();
  var decodeJObject = /* @__PURE__ */ (function() {
    var $50 = note(new TypeMismatch2("Object"));
    return function($51) {
      return $50(toObject($51));
    };
  })();
  var decodeJArray = /* @__PURE__ */ (function() {
    var $52 = note(new TypeMismatch2("Array"));
    return function($53) {
      return $52(toArray($53));
    };
  })();
  var decodeInt = /* @__PURE__ */ composeKleisliFlipped3(/* @__PURE__ */ (function() {
    var $84 = note(new TypeMismatch2("Integer"));
    return function($85) {
      return $84(fromNumber($85));
    };
  })())(decodeNumber);
  var decodeForeignObject = function(decoder) {
    return composeKleisliFlipped3((function() {
      var $86 = lmap2(Named.create("ForeignObject"));
      var $87 = traverse5(decoder);
      return function($88) {
        return $86($87($88));
      };
    })())(decodeJObject);
  };
  var decodeBoolean = /* @__PURE__ */ (function() {
    return caseJsonBoolean(new Left(new TypeMismatch2("Boolean")))(Right.create);
  })();
  var decodeArray = function(decoder) {
    return composeKleisliFlipped3((function() {
      var $89 = lmap2(Named.create("Array"));
      var $90 = traverseWithIndex2(function(i2) {
        var $92 = lmap2(AtIndex.create(i2));
        return function($93) {
          return $92(decoder($93));
        };
      });
      return function($91) {
        return $89($90($91));
      };
    })())(decodeJArray);
  };

  // output/Record/index.js
  var insert8 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(a2) {
            return function(r) {
              return unsafeSet(reflectSymbol2(l))(a2)(r);
            };
          };
        };
      };
    };
  };
  var get2 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol2(l))(r);
        };
      };
    };
  };
  var $$delete4 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(r) {
            return unsafeDelete(reflectSymbol2(l))(r);
          };
        };
      };
    };
  };

  // output/Data.Argonaut.Decode.Class/index.js
  var bind5 = /* @__PURE__ */ bind(bindEither);
  var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
  var map24 = /* @__PURE__ */ map(functorMaybe);
  var gDecodeJsonNil = {
    gDecodeJson: function(v) {
      return function(v1) {
        return new Right({});
      };
    }
  };
  var gDecodeJson = function(dict) {
    return dict.gDecodeJson;
  };
  var decodeRecord = function(dictGDecodeJson) {
    var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
    return function() {
      return {
        decodeJson: function(json3) {
          var v = toObject(json3);
          if (v instanceof Just) {
            return gDecodeJson1(v.value0)($$Proxy.value);
          }
          ;
          if (v instanceof Nothing) {
            return new Left(new TypeMismatch2("Object"));
          }
          ;
          throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v.constructor.name]);
        }
      };
    };
  };
  var decodeJsonString = {
    decodeJson: decodeString
  };
  var decodeJsonJson = /* @__PURE__ */ (function() {
    return {
      decodeJson: Right.create
    };
  })();
  var decodeJsonInt = {
    decodeJson: decodeInt
  };
  var decodeJsonField = function(dict) {
    return dict.decodeJsonField;
  };
  var gDecodeJsonCons = function(dictDecodeJsonField) {
    var decodeJsonField1 = decodeJsonField(dictDecodeJsonField);
    return function(dictGDecodeJson) {
      var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var insert10 = insert8(dictIsSymbol)()();
        return function() {
          return function() {
            return {
              gDecodeJson: function(object2) {
                return function(v) {
                  var fieldName = reflectSymbol2($$Proxy.value);
                  var fieldValue = lookup3(fieldName)(object2);
                  var v1 = decodeJsonField1(fieldValue);
                  if (v1 instanceof Just) {
                    return bind5(lmap3(AtKey.create(fieldName))(v1.value0))(function(val) {
                      return bind5(gDecodeJson1(object2)($$Proxy.value))(function(rest) {
                        return new Right(insert10($$Proxy.value)(val)(rest));
                      });
                    });
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return new Left(new AtKey(fieldName, MissingValue.value));
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
                };
              }
            };
          };
        };
      };
    };
  };
  var decodeJsonBoolean = {
    decodeJson: decodeBoolean
  };
  var decodeJson = function(dict) {
    return dict.decodeJson;
  };
  var decodeForeignObject2 = function(dictDecodeJson) {
    return {
      decodeJson: decodeForeignObject(decodeJson(dictDecodeJson))
    };
  };
  var decodeFieldId = function(dictDecodeJson) {
    var decodeJson12 = decodeJson(dictDecodeJson);
    return {
      decodeJsonField: function(j) {
        return map24(decodeJson12)(j);
      }
    };
  };
  var decodeArray2 = function(dictDecodeJson) {
    return {
      decodeJson: decodeArray(decodeJson(dictDecodeJson))
    };
  };

  // output/Data.Argonaut.Decode.Combinators/index.js
  var getFieldOptional$prime2 = function(dictDecodeJson) {
    return getFieldOptional$prime(decodeJson(dictDecodeJson));
  };
  var getField2 = function(dictDecodeJson) {
    return getField(decodeJson(dictDecodeJson));
  };

  // output/Data.Argonaut.Encode.Encoders/index.js
  var map25 = /* @__PURE__ */ map(functorArray);
  var encodeString = id3;
  var encodeMaybe = function(encoder) {
    return function(v) {
      if (v instanceof Nothing) {
        return jsonNull;
      }
      ;
      if (v instanceof Just) {
        return encoder(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Encode.Encoders (line 31, column 23 - line 33, column 22): " + [v.constructor.name]);
    };
  };
  var encodeInt = function($53) {
    return id3(toNumber($53));
  };
  var encodeBoolean = id3;
  var encodeArray = function(encoder) {
    var $58 = map25(encoder);
    return function($59) {
      return id3($58($59));
    };
  };

  // output/Data.Argonaut.Encode.Class/index.js
  var gEncodeJsonNil = {
    gEncodeJson: function(v) {
      return function(v1) {
        return empty4;
      };
    }
  };
  var gEncodeJson = function(dict) {
    return dict.gEncodeJson;
  };
  var encodeRecord = function(dictGEncodeJson) {
    var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
    return function() {
      return {
        encodeJson: function(rec) {
          return id3(gEncodeJson1(rec)($$Proxy.value));
        }
      };
    };
  };
  var encodeJsonJson = {
    encodeJson: /* @__PURE__ */ identity(categoryFn)
  };
  var encodeJsonJString = {
    encodeJson: encodeString
  };
  var encodeJsonJBoolean = {
    encodeJson: encodeBoolean
  };
  var encodeJsonInt = {
    encodeJson: encodeInt
  };
  var encodeJson = function(dict) {
    return dict.encodeJson;
  };
  var encodeJsonArray = function(dictEncodeJson) {
    return {
      encodeJson: encodeArray(encodeJson(dictEncodeJson))
    };
  };
  var encodeJsonMaybe = function(dictEncodeJson) {
    return {
      encodeJson: encodeMaybe(encodeJson(dictEncodeJson))
    };
  };
  var gEncodeJsonCons = function(dictEncodeJson) {
    var encodeJson12 = encodeJson(dictEncodeJson);
    return function(dictGEncodeJson) {
      var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var get6 = get2(dictIsSymbol)();
        return function() {
          return {
            gEncodeJson: function(row) {
              return function(v) {
                return insert3(reflectSymbol2($$Proxy.value))(encodeJson12(get6($$Proxy.value)(row)))(gEncodeJson1(row)($$Proxy.value));
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail2, succ, s) {
    try {
      return succ(JSON.parse(s));
    } catch (e) {
      return fail2(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Web.Storage.Storage/foreign.js
  function _getItem(key2) {
    return function(storage) {
      return function() {
        return storage.getItem(key2);
      };
    };
  }
  function setItem(key2) {
    return function(value15) {
      return function(storage) {
        return function() {
          storage.setItem(key2, value15);
        };
      };
    };
  }
  function removeItem(key2) {
    return function(storage) {
      return function() {
        storage.removeItem(key2);
      };
    };
  }

  // output/Web.Storage.Storage/index.js
  var map26 = /* @__PURE__ */ map(functorEffect);
  var getItem = function(s) {
    var $5 = map26(toMaybe);
    var $6 = _getItem(s);
    return function($7) {
      return $5($6($7));
    };
  };

  // output/Persist/index.js
  var gEncodeJsonCons2 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonJString));
  var encodeJson2 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(encodeJsonInt)(/* @__PURE__ */ gEncodeJsonCons2(/* @__PURE__ */ gEncodeJsonCons2(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonInt))(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "tutorialStep";
    }
  })())({
    reflectSymbol: function() {
      return "tutorialId";
    }
  })())({
    reflectSymbol: function() {
      return "selectedNodeId";
    }
  })())({
    reflectSymbol: function() {
      return "depth";
    }
  })())());
  var bind15 = /* @__PURE__ */ bind(bindMaybe);
  var decodeJson2 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeForeignObject2(decodeJsonJson));
  var getFieldOptional$prime3 = /* @__PURE__ */ getFieldOptional$prime2(decodeJsonString);
  var getField3 = /* @__PURE__ */ getField2(decodeJsonInt);
  var getFieldOptional$prime1 = /* @__PURE__ */ getFieldOptional$prime2(decodeJsonInt);
  var pure13 = /* @__PURE__ */ pure(applicativeMaybe);
  var encodeJson1 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeJsonArray(encodeJsonJson));
  var map27 = /* @__PURE__ */ map(functorArray);
  var gEncodeJsonCons1 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJString);
  var encodeJson22 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(encodeJsonJBoolean)(/* @__PURE__ */ gEncodeJsonCons1(/* @__PURE__ */ gEncodeJsonCons1(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "title";
    }
  })())({
    reflectSymbol: function() {
      return "id";
    }
  })())({
    reflectSymbol: function() {
      return "hasToken";
    }
  })())());
  var bind22 = /* @__PURE__ */ bind(bindEither);
  var getField1 = /* @__PURE__ */ getField2(decodeJsonString);
  var map110 = /* @__PURE__ */ map(functorEither);
  var getFieldOptional$prime22 = /* @__PURE__ */ getFieldOptional$prime2(decodeJsonBoolean);
  var pure23 = /* @__PURE__ */ pure(applicativeEither);
  var decodeJson1 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeArray2(decodeJsonJson));
  var tokenKey = function(repoId) {
    return "graph-browser:token:" + repoId;
  };
  var storageKey = function(title3) {
    return "graph-browser:" + title3;
  };
  var save = function(title3) {
    return function(st) {
      return function __do2() {
        var w = windowImpl();
        var storage = localStorage(w)();
        var json3 = encodeJson2({
          selectedNodeId: st.selectedNodeId,
          depth: st.depth,
          tutorialId: st.tutorialId,
          tutorialStep: st.tutorialStep
        });
        return setItem(storageKey(title3))(stringify(json3))(storage)();
      };
    };
  };
  var restore = function(title3) {
    return function __do2() {
      var w = windowImpl();
      var storage = localStorage(w)();
      var mRaw = getItem(storageKey(title3))(storage)();
      return bind15(mRaw)(function(raw) {
        return bind15(hush(jsonParser(raw)))(function(json3) {
          return bind15(hush(decodeJson2(json3)))(function(obj) {
            return bind15(hush(getFieldOptional$prime3(obj)("selectedNodeId")))(function(selectedNodeId) {
              return bind15(hush(getField3(obj)("depth")))(function(depth) {
                return bind15(hush(getFieldOptional$prime3(obj)("tutorialId")))(function(tutorialId) {
                  return bind15(hush(getFieldOptional$prime1(obj)("tutorialStep")))(function(tutorialStep) {
                    return pure13({
                      selectedNodeId,
                      depth,
                      tutorialId,
                      tutorialStep
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
  };
  var repoListKey = "graph-browser:repos";
  var saveRepoList = function(repos) {
    return function __do2() {
      var w = windowImpl();
      var storage = localStorage(w)();
      var json3 = encodeJson1(map27(function(r) {
        return encodeJson22({
          id: r.id,
          title: r.title,
          hasToken: r.hasToken
        });
      })(repos));
      return setItem(repoListKey)(stringify(json3))(storage)();
    };
  };
  var loadRepoList = /* @__PURE__ */ (function() {
    var decodeEntry = function(json3) {
      return hush(bind22(decodeJson2(json3))(function(obj) {
        return bind22(getField1(obj)("id"))(function(id4) {
          return bind22(getField1(obj)("title"))(function(title3) {
            return bind22(map110(fromMaybe(false))(getFieldOptional$prime22(obj)("hasToken")))(function(hasToken) {
              return pure23({
                id: id4,
                title: title3,
                hasToken
              });
            });
          });
        });
      }));
    };
    return function __do2() {
      var w = windowImpl();
      var storage = localStorage(w)();
      var mRaw = getItem(repoListKey)(storage)();
      return fromMaybe([])(bind15(mRaw)(function(raw) {
        return bind15(hush(jsonParser(raw)))(function(json3) {
          return bind15(hush(decodeJson1(json3)))(function(arr) {
            return pure13(mapMaybe(decodeEntry)(arr));
          });
        });
      }));
    };
  })();
  var deleteRepo = function(repoId) {
    return function __do2() {
      var w = windowImpl();
      var storage = localStorage(w)();
      removeItem(storageKey(repoId))(storage)();
      removeItem(tokenKey(repoId))(storage)();
      var repos = loadRepoList();
      var filtered = filter(function(r) {
        return r.id !== repoId;
      })(repos);
      return saveRepoList(filtered)();
    };
  };

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ (function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  })();
  var GET2 = /* @__PURE__ */ (function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  })();
  var HEAD = /* @__PURE__ */ (function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  })();
  var POST2 = /* @__PURE__ */ (function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  })();
  var PUT = /* @__PURE__ */ (function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  })();
  var DELETE = /* @__PURE__ */ (function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  })();
  var TRACE = /* @__PURE__ */ (function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  })();
  var CONNECT = /* @__PURE__ */ (function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  })();
  var PROPFIND = /* @__PURE__ */ (function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  })();
  var PROPPATCH = /* @__PURE__ */ (function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  })();
  var MKCOL = /* @__PURE__ */ (function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  })();
  var COPY = /* @__PURE__ */ (function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  })();
  var MOVE = /* @__PURE__ */ (function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  })();
  var LOCK = /* @__PURE__ */ (function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  })();
  var UNLOCK = /* @__PURE__ */ (function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  })();
  var PATCH = /* @__PURE__ */ (function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  })();
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET2) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST2) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };

  // output/Data.String.CaseInsensitive/index.js
  var compare2 = /* @__PURE__ */ compare(ordString);
  var CaseInsensitiveString = function(x) {
    return x;
  };
  var eqCaseInsensitiveString = {
    eq: function(v) {
      return function(v1) {
        return toLower(v) === toLower(v1);
      };
    }
  };
  var ordCaseInsensitiveString = {
    compare: function(v) {
      return function(v1) {
        return compare2(toLower(v))(toLower(v1));
      };
    },
    Eq0: function() {
      return eqCaseInsensitiveString;
    }
  };

  // output/JS.Fetch.Headers/foreign.js
  function unsafeFromRecord(r) {
    return new Headers(r);
  }
  function _toArray(tuple, headers2) {
    return Array.from(headers2.entries(), function(pair) {
      return tuple(pair[0])(pair[1]);
    });
  }

  // output/JS.Fetch.Headers/index.js
  var toArray3 = /* @__PURE__ */ (function() {
    return runFn2(_toArray)(Tuple.create);
  })();
  var fromRecord = function() {
    return unsafeFromRecord;
  };

  // output/Fetch.Internal.Headers/index.js
  var toHeaders = /* @__PURE__ */ (function() {
    var $7 = fromFoldable2(ordCaseInsensitiveString)(foldableArray);
    var $8 = map(functorArray)(lmap(bifunctorTuple)(CaseInsensitiveString));
    return function($9) {
      return $7($8(toArray3($9)));
    };
  })();

  // output/JS.Fetch.Request/foreign.js
  function _unsafeNew(url2, options2) {
    try {
      return new Request(url2, options2);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  // output/Fetch.Internal.Request/index.js
  var fromRecord2 = /* @__PURE__ */ fromRecord();
  var show2 = /* @__PURE__ */ show(showMethod);
  var toCoreRequestOptionsHelpe = {
    convertHelper: function(v) {
      return function(v1) {
        return {};
      };
    }
  };
  var toCoreRequestOptionsConve8 = function() {
    return {
      convertImpl: function(v) {
        return fromRecord2;
      }
    };
  };
  var toCoreRequestOptionsConve9 = {
    convertImpl: function(v) {
      return show2;
    }
  };
  var $$new2 = function() {
    return function(url2) {
      return function(options2) {
        return function() {
          return _unsafeNew(url2, options2);
        };
      };
    };
  };
  var convertImpl = function(dict) {
    return dict.convertImpl;
  };
  var convertHelper = function(dict) {
    return dict.convertHelper;
  };
  var toCoreRequestOptionsHelpe1 = function(dictToCoreRequestOptionsConverter) {
    var convertImpl1 = convertImpl(dictToCoreRequestOptionsConverter);
    return function() {
      return function() {
        return function() {
          return function(dictIsSymbol) {
            var $$delete5 = $$delete4(dictIsSymbol)()();
            var get6 = get2(dictIsSymbol)();
            var insert10 = insert8(dictIsSymbol)()();
            return function(dictToCoreRequestOptionsHelper) {
              var convertHelper1 = convertHelper(dictToCoreRequestOptionsHelper);
              return function() {
                return function() {
                  return {
                    convertHelper: function(v) {
                      return function(r) {
                        var tail2 = convertHelper1($$Proxy.value)($$delete5($$Proxy.value)(r));
                        var head3 = convertImpl1($$Proxy.value)(get6($$Proxy.value)(r));
                        return insert10($$Proxy.value)(head3)(tail2);
                      };
                    }
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  var toCoreRequestOptionsRowRo = function() {
    return function() {
      return function(dictToCoreRequestOptionsHelper) {
        return {
          convert: convertHelper(dictToCoreRequestOptionsHelper)($$Proxy.value)
        };
      };
    };
  };
  var convert = function(dict) {
    return dict.convert;
  };

  // output/JS.Fetch.Response/foreign.js
  function headers(resp) {
    return resp.headers;
  }
  function ok(resp) {
    return resp.ok;
  }
  function redirected(resp) {
    return resp.redirected;
  }
  function status(resp) {
    return resp.status;
  }
  function statusText(resp) {
    return resp.statusText;
  }
  function url(resp) {
    return resp.url;
  }
  function body2(resp) {
    return function() {
      return resp.body;
    };
  }
  function arrayBuffer(resp) {
    return function() {
      return resp.arrayBuffer();
    };
  }
  function blob(resp) {
    return function() {
      return resp.blob();
    };
  }
  function text6(resp) {
    return function() {
      return resp.text();
    };
  }
  function json(resp) {
    return function() {
      return resp.json();
    };
  }

  // output/Control.Monad.Except/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap4(runExceptT($3));
  };

  // output/Promise.Internal/foreign.js
  function thenOrCatch(k, c, p2) {
    return p2.then(k, c);
  }
  function resolve(a2) {
    return Promise.resolve(a2);
  }

  // output/Promise.Rejection/foreign.js
  function _toError(just, nothing, ref2) {
    if (ref2 instanceof Error) {
      return just(ref2);
    }
    return nothing;
  }

  // output/Promise.Rejection/index.js
  var toError = /* @__PURE__ */ (function() {
    return runFn3(_toError)(Just.create)(Nothing.value);
  })();

  // output/Promise/index.js
  var thenOrCatch2 = function() {
    return function(k) {
      return function(c) {
        return function(p2) {
          return function() {
            return thenOrCatch(mkEffectFn1(k), mkEffectFn1(c), p2);
          };
        };
      };
    };
  };
  var resolve2 = function() {
    return resolve;
  };

  // output/Promise.Aff/index.js
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
  var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
  var map28 = /* @__PURE__ */ map(functorEffect);
  var resolve3 = /* @__PURE__ */ resolve2();
  var alt5 = /* @__PURE__ */ alt(altMaybe);
  var map111 = /* @__PURE__ */ map(functorMaybe);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var bind6 = /* @__PURE__ */ bind(bindAff);
  var liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var toAff$prime = function(customCoerce) {
    return function(p2) {
      return makeAff(function(cb) {
        return voidRight2(mempty2)(thenOrCatch3(function(a2) {
          return map28(resolve3)(cb(new Right(a2)));
        })(function(e) {
          return map28(resolve3)(cb(new Left(customCoerce(e))));
        })(p2));
      });
    };
  };
  var coerce4 = function(rej) {
    return fromMaybe$prime(function(v) {
      return error("Promise failed, couldn't extract JS Error or String");
    })(alt5(toError(rej))(map111(error)(hush(runExcept(readString2(unsafeToForeign(rej)))))));
  };
  var toAff = /* @__PURE__ */ toAff$prime(coerce4);
  var toAffE = function(f) {
    return bind6(liftEffect7(f))(toAff);
  };

  // output/Fetch.Internal.Response/index.js
  var text7 = function(response) {
    return toAffE(text6(response));
  };
  var json2 = function(response) {
    return toAffE(json(response));
  };
  var blob2 = function(response) {
    return toAffE(blob(response));
  };
  var arrayBuffer2 = function(response) {
    return toAffE(arrayBuffer(response));
  };
  var convert2 = function(response) {
    return {
      headers: toHeaders(headers(response)),
      ok: ok(response),
      redirected: redirected(response),
      status: status(response),
      statusText: statusText(response),
      url: url(response),
      text: text7(response),
      json: json2(response),
      body: body2(response),
      arrayBuffer: arrayBuffer2(response),
      blob: blob2(response)
    };
  };

  // output/JS.Fetch/foreign.js
  function _fetch(a2, b2) {
    return fetch(a2, b2);
  }

  // output/JS.Fetch/index.js
  var fetchWithOptions = function() {
    return runEffectFn2(_fetch);
  };

  // output/JS.Fetch.AbortController/foreign.js
  var newImpl3 = function() {
    return new AbortController();
  };
  function abort(controller) {
    return function() {
      return controller.abort();
    };
  }
  function signal(controller) {
    return controller.signal;
  }

  // output/Fetch/index.js
  var $$void9 = /* @__PURE__ */ $$void(functorEffect);
  var thenOrCatch4 = /* @__PURE__ */ thenOrCatch2();
  var map29 = /* @__PURE__ */ map(functorEffect);
  var resolve4 = /* @__PURE__ */ resolve2();
  var bind7 = /* @__PURE__ */ bind(bindAff);
  var liftEffect8 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var $$new4 = /* @__PURE__ */ $$new2();
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindAff);
  var fetchWithOptions2 = /* @__PURE__ */ fetchWithOptions();
  var pure14 = /* @__PURE__ */ pure(applicativeAff);
  var toAbortableAff = function(abortController) {
    return function(p2) {
      return makeAff(function(cb) {
        return function __do2() {
          $$void9(thenOrCatch4(function(a2) {
            return map29(resolve4)(cb(new Right(a2)));
          })(function(e) {
            return map29(resolve4)(cb(new Left(coerce4(e))));
          })(p2))();
          return effectCanceler(abort(abortController));
        };
      });
    };
  };
  var fetch2 = function() {
    return function() {
      return function(dictToCoreRequestOptions) {
        var convert3 = convert(dictToCoreRequestOptions);
        return function(url2) {
          return function(r) {
            return bind7(liftEffect8($$new4(url2)(convert3(r))))(function(request2) {
              return bind7(liftEffect8(newImpl3))(function(abortController) {
                var signal2 = signal(abortController);
                return bind7(bindFlipped8(toAbortableAff(abortController))(liftEffect8(fetchWithOptions2(request2)({
                  signal: signal2
                }))))(function(cResponse) {
                  return pure14(convert2(cResponse));
                });
              });
            });
          };
        };
      };
    };
  };

  // output/RepoDiscovery/index.js
  var bind8 = /* @__PURE__ */ bind(bindEither);
  var getField4 = /* @__PURE__ */ getField2(decodeJsonString);
  var pure10 = /* @__PURE__ */ pure(applicativeEither);
  var decodeJson3 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeForeignObject2(decodeJsonJson));
  var bind16 = /* @__PURE__ */ bind(bindAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var fetch3 = /* @__PURE__ */ fetch2()();
  var toCoreRequestOptionsRowRo2 = /* @__PURE__ */ toCoreRequestOptionsRowRo()();
  var toCoreRequestOptionsHelpe12 = /* @__PURE__ */ toCoreRequestOptionsHelpe1(toCoreRequestOptionsConve9)()()()({
    reflectSymbol: function() {
      return "method";
    }
  })(toCoreRequestOptionsHelpe)()();
  var fetch1 = /* @__PURE__ */ fetch3(/* @__PURE__ */ toCoreRequestOptionsRowRo2(toCoreRequestOptionsHelpe12));
  var fetch22 = /* @__PURE__ */ fetch3(/* @__PURE__ */ toCoreRequestOptionsRowRo2(/* @__PURE__ */ toCoreRequestOptionsHelpe1(/* @__PURE__ */ toCoreRequestOptionsConve8())()()()({
    reflectSymbol: function() {
      return "headers";
    }
  })(toCoreRequestOptionsHelpe12)()()));
  var pure15 = /* @__PURE__ */ pure(applicativeAff);
  var bind23 = /* @__PURE__ */ bind(bindMaybe);
  var alt6 = /* @__PURE__ */ alt(altMaybe);
  var takeUntil = function(sep) {
    return function(str) {
      var v = indexOf2(sep)(str);
      if (v instanceof Just) {
        return take4(v.value0)(str);
      }
      ;
      if (v instanceof Nothing) {
        return str;
      }
      ;
      throw new Error("Failed pattern match at RepoDiscovery (line 189, column 3 - line 191, column 19): " + [v.constructor.name]);
    };
  };
  var stripTrailingSlash = function(str) {
    var len = length7(str);
    var $52 = len > 0 && drop4(len - 1 | 0)(str) === "/";
    if ($52) {
      return take4(len - 1 | 0)(str);
    }
    ;
    return str;
  };
  var stripSuffix2 = function(suffix) {
    return function(str) {
      var strLen = length7(str);
      var sLen = length7(suffix);
      var $53 = strLen >= sLen && drop4(strLen - sLen | 0)(str) === suffix;
      if ($53) {
        return take4(strLen - sLen | 0)(str);
      }
      ;
      return str;
    };
  };
  var stripPrefix2 = function(prefix) {
    return function(str) {
      var $54 = take4(length7(prefix))(str) === prefix;
      if ($54) {
        return new Just(drop4(length7(prefix))(str));
      }
      ;
      return Nothing.value;
    };
  };
  var splitFirst = function(sep) {
    return function(str) {
      var v = indexOf2(sep)(str);
      if (v instanceof Just) {
        return new Just({
          before: take4(v.value0)(str),
          after: drop4(v.value0 + length7(sep) | 0)(str)
        });
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at RepoDiscovery (line 198, column 3 - line 204, column 23): " + [v.constructor.name]);
    };
  };
  var parseManifest = function(base2) {
    return function(body4) {
      var decodeManifest = function(obj) {
        return bind8(getField4(obj)("config"))(function(config) {
          return bind8(getField4(obj)("graph"))(function(graph) {
            return bind8(getField4(obj)("tutorials"))(function(tutorials) {
              return pure10({
                configUrl: base2 + config,
                graphUrl: base2 + graph,
                tutorialIndexUrl: base2 + tutorials,
                baseUrl: base2
              });
            });
          });
        });
      };
      var v = jsonParser(body4);
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Right) {
        var v1 = decodeJson3(v.value0);
        if (v1 instanceof Left) {
          return new Left(printJsonDecodeError(v1.value0));
        }
        ;
        if (v1 instanceof Right) {
          var v2 = decodeManifest(v1.value0);
          if (v2 instanceof Left) {
            return new Left(printJsonDecodeError(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at RepoDiscovery (line 135, column 11 - line 137, column 37): " + [v2.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at RepoDiscovery (line 132, column 7 - line 137, column 37): " + [v1.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at RepoDiscovery (line 129, column 3 - line 137, column 37): " + [v.constructor.name]);
    };
  };
  var tryFetchManifest = function(mToken) {
    return function(baseUrl) {
      return function(url2) {
        return bind16($$try3(bind16((function() {
          if (mToken instanceof Nothing) {
            return fetch1(url2)({
              method: GET2.value
            });
          }
          ;
          if (mToken instanceof Just) {
            return fetch22(url2)({
              method: GET2.value,
              headers: {
                Authorization: "token " + mToken.value0
              }
            });
          }
          ;
          throw new Error("Failed pattern match at RepoDiscovery (line 114, column 13 - line 119, column 10): " + [mToken.constructor.name]);
        })())(function(resp) {
          return bind16(resp.text)(function(body4) {
            return pure15(body4);
          });
        })))(function(result) {
          if (result instanceof Left) {
            return pure15(new Left("fetch failed"));
          }
          ;
          if (result instanceof Right) {
            return pure15(parseManifest(baseUrl)(result.value0));
          }
          ;
          throw new Error("Failed pattern match at RepoDiscovery (line 122, column 3 - line 125, column 40): " + [result.constructor.name]);
        });
      };
    };
  };
  var mkRepoSource = function(owner) {
    return function(repo) {
      return {
        owner,
        repo,
        rawBaseUrl: "https://raw.githubusercontent.com/" + (owner + ("/" + repo)),
        pagesBaseUrl: "https://" + (owner + (".github.io/" + (repo + "/")))
      };
    };
  };
  var parseGitHubPagesUrl = function(str) {
    return bind23(stripPrefix2("https://")(str))(function(rest) {
      var parts = splitFirst(".github.io/")(rest);
      if (parts instanceof Just) {
        var repo = stripTrailingSlash(takeUntil("/")(parts.value0.after));
        var $72 = parts.value0.before === "" || repo === "";
        if ($72) {
          return Nothing.value;
        }
        ;
        return new Just(mkRepoSource(parts.value0.before)(repo));
      }
      ;
      if (parts instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at RepoDiscovery (line 65, column 3 - line 71, column 23): " + [parts.constructor.name]);
    });
  };
  var parseGitHubUrl = function(str) {
    return bind23(stripPrefix2("https://github.com/")(str))(function(rest) {
      var cleaned = stripTrailingSlash(rest);
      var parts = splitFirst("/")(cleaned);
      if (parts instanceof Just) {
        var repo = stripSuffix2(".git")(takeUntil("/")(parts.value0.after));
        var $77 = parts.value0.before === "" || repo === "";
        if ($77) {
          return Nothing.value;
        }
        ;
        return new Just(mkRepoSource(parts.value0.before)(repo));
      }
      ;
      if (parts instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at RepoDiscovery (line 53, column 3 - line 59, column 23): " + [parts.constructor.name]);
    });
  };
  var parseOwnerSlashRepo = function(str) {
    var parts = splitFirst("/")(str);
    if (parts instanceof Just) {
      var $82 = contains("/")(parts.value0.after);
      if ($82) {
        return Nothing.value;
      }
      ;
      var $83 = parts.value0.before === "" || parts.value0.after === "";
      if ($83) {
        return Nothing.value;
      }
      ;
      return new Just(mkRepoSource(parts.value0.before)(parts.value0.after));
    }
    ;
    if (parts instanceof Nothing) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at RepoDiscovery (line 39, column 3 - line 46, column 23): " + [parts.constructor.name]);
  };
  var normalizeInput = function(input3) {
    var trimmed = trim(input3);
    return alt6(parseOwnerSlashRepo(trimmed))(alt6(parseGitHubUrl(trimmed))(parseGitHubPagesUrl(trimmed)));
  };
  var conventionUrls = function(src9) {
    return {
      configUrl: src9.pagesBaseUrl + "data/config.json",
      graphUrl: src9.pagesBaseUrl + "data/graph.json",
      tutorialIndexUrl: src9.pagesBaseUrl + "data/tutorials/index.json",
      baseUrl: src9.pagesBaseUrl
    };
  };
  var discoverDataUrlsAuth = function(mToken) {
    return function(src9) {
      return bind16(tryFetchManifest(mToken)(src9.pagesBaseUrl)(src9.rawBaseUrl + "/main/.graph-browser.json"))(function(mainResult) {
        if (mainResult instanceof Right) {
          return pure15(new Right(mainResult.value0));
        }
        ;
        if (mainResult instanceof Left) {
          return bind16(tryFetchManifest(mToken)(src9.pagesBaseUrl)(src9.rawBaseUrl + "/master/.graph-browser.json"))(function(masterResult) {
            if (masterResult instanceof Right) {
              return pure15(new Right(masterResult.value0));
            }
            ;
            if (masterResult instanceof Left) {
              return pure15(new Right(conventionUrls(src9)));
            }
            ;
            throw new Error("Failed pattern match at RepoDiscovery (line 103, column 7 - line 105, column 52): " + [masterResult.constructor.name]);
          });
        }
        ;
        throw new Error("Failed pattern match at RepoDiscovery (line 98, column 3 - line 105, column 52): " + [mainResult.constructor.name]);
      });
    };
  };
  var discoverDataUrls = /* @__PURE__ */ (function() {
    return discoverDataUrlsAuth(Nothing.value);
  })();

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key2, value15) {
    return value15 == null ? f : s(value15[key2]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail2 = fail(dictMonad);
    var pure21 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value15) {
        return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value15))), pure21, k, value15);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.UIEvent.KeyboardEvent.EventTypes/index.js
  var keyup = "keyup";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click2 = "click";

  // output/Halogen.HTML.Events/index.js
  var map30 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var readString3 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var keyHandler = unsafeCoerce2;
  var handler$prime = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return map30(Action.create)(f(ev));
      });
    };
  };
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ (function() {
    var $15 = handler2(click2);
    return function($16) {
      return $15(mouseHandler($16));
    };
  })();
  var onKeyUp = /* @__PURE__ */ (function() {
    var $25 = handler2(keyup);
    return function($26) {
      return $25(keyHandler($26));
    };
  })();
  var addForeignPropHandler = function(key2) {
    return function(prop3) {
      return function(reader) {
        return function(f) {
          var go2 = function(a2) {
            return composeKleisliFlipped4(reader)(readProp2(prop3))(unsafeToForeign(a2));
          };
          return handler$prime(key2)(composeKleisli2(currentTarget)(function(e) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f($85));
            })(runExcept(go2(e)));
          }));
        };
      };
    };
  };
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input)("value")(readString3);

  // output/Web.UIEvent.KeyboardEvent/foreign.js
  function key(e) {
    return e.key;
  }

  // output/RepoManager/index.js
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_3 = /* @__PURE__ */ modify_(monadStateHalogenM);
  var pure11 = /* @__PURE__ */ pure(applicativeHalogenM);
  var when4 = /* @__PURE__ */ when(applicativeHalogenM);
  var bind9 = /* @__PURE__ */ bind(bindHalogenM);
  var get3 = /* @__PURE__ */ get(monadStateHalogenM);
  var eq12 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqString));
  var type_19 = /* @__PURE__ */ type_17(isPropInputType);
  var value13 = /* @__PURE__ */ value12(isPropString);
  var map31 = /* @__PURE__ */ map(functorArray);
  var SetRepos = /* @__PURE__ */ (function() {
    function SetRepos2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SetRepos2.create = function(value0) {
      return function(value1) {
        return new SetRepos2(value0, value1);
      };
    };
    return SetRepos2;
  })();
  var SetActive = /* @__PURE__ */ (function() {
    function SetActive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SetActive2.create = function(value0) {
      return function(value1) {
        return new SetActive2(value0, value1);
      };
    };
    return SetActive2;
  })();
  var SetError = /* @__PURE__ */ (function() {
    function SetError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    SetError2.create = function(value0) {
      return function(value1) {
        return new SetError2(value0, value1);
      };
    };
    return SetError2;
  })();
  var RepoSelected = /* @__PURE__ */ (function() {
    function RepoSelected2(value0) {
      this.value0 = value0;
    }
    ;
    RepoSelected2.create = function(value0) {
      return new RepoSelected2(value0);
    };
    return RepoSelected2;
  })();
  var RepoAdded = /* @__PURE__ */ (function() {
    function RepoAdded2(value0) {
      this.value0 = value0;
    }
    ;
    RepoAdded2.create = function(value0) {
      return new RepoAdded2(value0);
    };
    return RepoAdded2;
  })();
  var RepoDeleted = /* @__PURE__ */ (function() {
    function RepoDeleted2(value0) {
      this.value0 = value0;
    }
    ;
    RepoDeleted2.create = function(value0) {
      return new RepoDeleted2(value0);
    };
    return RepoDeleted2;
  })();
  var SetInput = /* @__PURE__ */ (function() {
    function SetInput2(value0) {
      this.value0 = value0;
    }
    ;
    SetInput2.create = function(value0) {
      return new SetInput2(value0);
    };
    return SetInput2;
  })();
  var Submit = /* @__PURE__ */ (function() {
    function Submit2() {
    }
    ;
    Submit2.value = new Submit2();
    return Submit2;
  })();
  var KeyPress = /* @__PURE__ */ (function() {
    function KeyPress2(value0) {
      this.value0 = value0;
    }
    ;
    KeyPress2.create = function(value0) {
      return new KeyPress2(value0);
    };
    return KeyPress2;
  })();
  var Select = /* @__PURE__ */ (function() {
    function Select2(value0) {
      this.value0 = value0;
    }
    ;
    Select2.create = function(value0) {
      return new Select2(value0);
    };
    return Select2;
  })();
  var Delete = /* @__PURE__ */ (function() {
    function Delete2(value0) {
      this.value0 = value0;
    }
    ;
    Delete2.create = function(value0) {
      return new Delete2(value0);
    };
    return Delete2;
  })();
  var handleQuery = function(v) {
    if (v instanceof SetRepos) {
      return discard5(modify_3(function(v1) {
        var $29 = {};
        for (var $30 in v1) {
          if ({}.hasOwnProperty.call(v1, $30)) {
            $29[$30] = v1[$30];
          }
          ;
        }
        ;
        $29.repos = v.value0;
        return $29;
      }))(function() {
        return pure11(new Just(v.value1));
      });
    }
    ;
    if (v instanceof SetActive) {
      return discard5(modify_3(function(v1) {
        var $34 = {};
        for (var $35 in v1) {
          if ({}.hasOwnProperty.call(v1, $35)) {
            $34[$35] = v1[$35];
          }
          ;
        }
        ;
        $34.activeId = v.value0;
        return $34;
      }))(function() {
        return pure11(new Just(v.value1));
      });
    }
    ;
    if (v instanceof SetError) {
      return discard5(modify_3(function(v1) {
        var $39 = {};
        for (var $40 in v1) {
          if ({}.hasOwnProperty.call(v1, $40)) {
            $39[$40] = v1[$40];
          }
          ;
        }
        ;
        $39.error = v.value0;
        return $39;
      }))(function() {
        return pure11(new Just(v.value1));
      });
    }
    ;
    throw new Error("Failed pattern match at RepoManager (line 155, column 15 - line 164, column 21): " + [v.constructor.name]);
  };
  var handleAction = function(v) {
    if (v instanceof SetInput) {
      return modify_3(function(v2) {
        var $45 = {};
        for (var $46 in v2) {
          if ({}.hasOwnProperty.call(v2, $46)) {
            $45[$46] = v2[$46];
          }
          ;
        }
        ;
        $45.inputValue = v.value0;
        return $45;
      });
    }
    ;
    if (v instanceof KeyPress) {
      return when4(key(v.value0) === "Enter")(handleAction(Submit.value));
    }
    ;
    if (v instanceof Submit) {
      return bind9(get3)(function(state3) {
        return when4(state3.inputValue !== "")(discard5(modify_3(function(v2) {
          var $50 = {};
          for (var $51 in v2) {
            if ({}.hasOwnProperty.call(v2, $51)) {
              $50[$51] = v2[$51];
            }
            ;
          }
          ;
          $50.inputValue = "";
          $50.error = Nothing.value;
          return $50;
        }))(function() {
          return raise(new RepoAdded(state3.inputValue));
        }));
      });
    }
    ;
    if (v instanceof Select) {
      return raise(new RepoSelected(v.value0));
    }
    ;
    if (v instanceof Delete) {
      return raise(new RepoDeleted(v.value0));
    }
    ;
    throw new Error("Failed pattern match at RepoManager (line 134, column 16 - line 149, column 32): " + [v.constructor.name]);
  };
  var cls = function($59) {
    return class_(ClassName($59));
  };
  var renderRepoItem = function(activeId) {
    return function(entry) {
      return div2([cls("repo-item" + (function() {
        var $55 = eq12(activeId)(new Just(entry.id));
        if ($55) {
          return " active";
        }
        ;
        return "";
      })()), onClick(function(v) {
        return new Select(entry);
      })])([span3([cls("repo-item-title")])([text5((function() {
        var $56 = entry.title === "";
        if ($56) {
          return entry.id;
        }
        ;
        return entry.title;
      })())]), span3([cls("repo-item-id")])([text5(entry.id)]), button([cls("repo-delete-btn"), onClick(function(v) {
        return new Delete(entry);
      })])([text5("x")])]);
    };
  };
  var render = function(state3) {
    return div2([id2("repo-panel"), cls("repo-panel")])([div2([cls("repo-form")])([input2([cls("repo-input"), type_19(InputText.value), placeholder3("owner/repo"), value13(state3.inputValue), onValueInput(SetInput.create), onKeyUp(KeyPress.create)]), button([cls("repo-add-btn"), onClick(function(v) {
      return Submit.value;
    })])([text5("Add")])]), (function() {
      if (state3.error instanceof Nothing) {
        return text5("");
      }
      ;
      if (state3.error instanceof Just) {
        return div2([cls("repo-error")])([text5(state3.error.value0)]);
      }
      ;
      throw new Error("Failed pattern match at RepoManager (line 86, column 7 - line 90, column 28): " + [state3.error.constructor.name]);
    })(), div2([cls("repo-list")])(map31(renderRepoItem(state3.activeId))(state3.repos)), div2([id2("repo-resize-handle"), cls("repo-resize-handle")])([])]);
  };
  var repoManager = /* @__PURE__ */ (function() {
    return mkComponent({
      initialState: function(v) {
        return {
          repos: [],
          activeId: Nothing.value,
          inputValue: "",
          error: Nothing.value
        };
      },
      render,
      "eval": mkEval({
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction,
        handleQuery
      })
    });
  })();

  // output/FFI.Cytoscape/foreign.js
  var _cy = null;
  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b2 = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b2 + "," + alpha + ")";
  }
  function kindStyles(kinds) {
    var styles = [];
    for (var kind2 in kinds) {
      var def = kinds[kind2];
      styles.push({
        selector: "node." + kind2,
        style: {
          "background-color": hexToRgba(def.color, 0.13),
          "border-color": def.color,
          shape: def.shape || "ellipse"
        }
      });
    }
    return styles;
  }
  function baseStyle(kinds) {
    return [
      {
        selector: "node",
        style: {
          label: "data(label)",
          "text-wrap": "wrap",
          "text-max-width": "140px",
          "font-size": "11px",
          "font-family": "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          color: "#f0f6fc",
          "text-valign": "center",
          "text-halign": "center",
          width: "60px",
          height: "60px",
          "border-width": 2,
          "text-outline-color": "#0d1117",
          "text-outline-width": 2
        }
      },
      ...kindStyles(kinds),
      {
        selector: "edge",
        style: {
          width: 1.5,
          "line-color": "#30363d",
          "target-arrow-color": "#30363d",
          "target-arrow-shape": "triangle",
          "arrow-scale": 0.8,
          "curve-style": "bezier",
          label: "data(label)",
          "font-size": "11px",
          "font-family": "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          color: "#c9d1d9",
          "text-rotation": "autorotate",
          "text-outline-color": "#0d1117",
          "text-outline-width": 2,
          "text-opacity": 0,
          opacity: 0.6
        }
      },
      {
        selector: "node.root",
        style: {
          "border-width": 4,
          "border-color": "#f0f6fc",
          "z-index": 10
        }
      },
      {
        selector: "edge.neighbor",
        style: {
          "text-opacity": 1,
          "line-color": "#8b949e",
          "target-arrow-color": "#8b949e",
          width: 2,
          opacity: 1
        }
      }
    ];
  }
  function runLayout(callback) {
    if (!_cy) return;
    var origWarn = console.warn;
    console.warn = function(msg) {
      if (typeof msg === "string" && msg.indexOf("invalid endpoints") !== -1)
        return;
      if (typeof msg === "string" && msg.indexOf("custom wheel sensitivity") !== -1)
        return;
      origWarn.apply(console, arguments);
    };
    var n = _cy.nodes().length;
    var edgeLen = n <= 10 ? 350 : n <= 20 ? 250 : 180;
    var repulsion = n <= 10 ? 5e4 : n <= 20 ? 25e3 : 8e3;
    var sep = n <= 10 ? 250 : n <= 20 ? 180 : 120;
    _cy.layout({
      name: "fcose",
      quality: "proof",
      randomize: true,
      animate: true,
      animationDuration: 500,
      fit: true,
      padding: 80,
      nodeSeparation: sep,
      idealEdgeLength: edgeLen,
      edgeElasticity: 0.05,
      nodeRepulsion: repulsion,
      gravity: 0.08,
      gravityRange: 1.2,
      numIter: 5e3,
      stop: function() {
        console.warn = origWarn;
        if (callback) callback();
      }
    }).run();
  }
  var initCytoscape = (containerId) => (kinds) => () => {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (_cy) {
      _cy.destroy();
      _cy = null;
    }
    _cy = cytoscape({
      container,
      elements: [],
      style: baseStyle(kinds),
      layout: { name: "preset" },
      minZoom: 0.15,
      maxZoom: 3
    });
  };
  var setFocusElements = (elements) => () => {
    if (!_cy) return;
    _cy.elements().remove();
    _cy.add(elements);
    runLayout();
    _cy.edges().style("text-opacity", 1);
    _cy.edges().style("opacity", 1);
  };
  var onNodeTap = (callback) => () => {
    if (!_cy) return;
    _cy.on("tap", "node", function(evt) {
      callback(evt.target.id())();
    });
  };
  var onNodeHover = (callback) => () => {
    if (!_cy) return;
    _cy.on("mouseover", "node", function(evt) {
      callback(evt.target.id())();
    });
  };
  var onEdgeHover = (callback) => () => {
    if (!_cy) return;
    _cy.on("mouseover", "edge", function(evt) {
      var d = evt.target.data();
      callback(d.source)(d.target)(d.label || "")(d.description || "")();
    });
  };
  var markRoot = (nodeId) => () => {
    if (!_cy) return;
    _cy.nodes().removeClass("root");
    _cy.edges().removeClass("neighbor");
    var node = _cy.getElementById(nodeId);
    if (node.nonempty()) {
      node.addClass("root");
      node.connectedEdges().addClass("neighbor");
    }
  };
  var fitAll = () => {
    if (!_cy) return;
    _cy.animate({ fit: { padding: 60 }, duration: 300 });
  };

  // output/Graph.Cytoscape/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var fromFoldable6 = /* @__PURE__ */ fromFoldable(foldableList);
  var map32 = /* @__PURE__ */ map(functorArray);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var mkNodeEl = function(node) {
    return unsafeToForeign({
      group: "nodes",
      data: {
        id: node.id,
        label: node.label,
        kind: node.kind,
        nodeGroup: node.group
      },
      classes: node.kind
    });
  };
  var mkEdgeEl = function(i2) {
    return function(edge) {
      return unsafeToForeign({
        group: "edges",
        data: {
          id: "e" + show3(i2),
          source: edge.source,
          target: edge.target,
          label: edge.label,
          description: edge.description
        }
      });
    };
  };
  var toElements = function(graph) {
    var edgeEls = mapWithIndex2(mkEdgeEl)(graph.edges);
    var allNodes = fromFoldable6(values(graph.nodes));
    var nodeEls = map32(mkNodeEl)(allNodes);
    return unsafeToForeign(append12(nodeEls)(edgeEls));
  };

  // output/Graph.Build/index.js
  var foldl3 = /* @__PURE__ */ foldl(foldableArray);
  var insert9 = /* @__PURE__ */ insert(ordString);
  var alter3 = /* @__PURE__ */ alter(ordString);
  var insert13 = /* @__PURE__ */ insert7(ordString);
  var buildGraph = function(nodes) {
    return function(edges) {
      var nodeMap = foldl3(function(m) {
        return function(n) {
          return insert9(n.id)(n)(m);
        };
      })(empty2)(nodes);
      var fwd = foldl3(function(m) {
        return function(e) {
          return alter3(function(existing) {
            return new Just(insert13(e.target)(fromMaybe(empty7)(existing)));
          })(e.source)(m);
        };
      })(empty2)(edges);
      var bwd = foldl3(function(m) {
        return function(e) {
          return alter3(function(existing) {
            return new Just(insert13(e.source)(fromMaybe(empty7)(existing)));
          })(e.target)(m);
        };
      })(empty2)(edges);
      return {
        nodes: nodeMap,
        edges,
        forward: fwd,
        backward: bwd
      };
    };
  };

  // output/Graph.Decode/index.js
  var bind10 = /* @__PURE__ */ bind(bindEither);
  var decodeForeignObject3 = /* @__PURE__ */ decodeForeignObject2(decodeJsonJson);
  var decodeJson4 = /* @__PURE__ */ decodeJson(decodeForeignObject3);
  var getField5 = /* @__PURE__ */ getField2(decodeJsonString);
  var pure16 = /* @__PURE__ */ pure(applicativeEither);
  var map33 = /* @__PURE__ */ map(functorEither);
  var decodeArray3 = /* @__PURE__ */ decodeArray2(decodeJsonJson);
  var getFieldOptional$prime4 = /* @__PURE__ */ getFieldOptional$prime2(decodeArray3);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeEither);
  var getFieldOptional$prime12 = /* @__PURE__ */ getFieldOptional$prime2(decodeJsonString);
  var getField12 = /* @__PURE__ */ getField2(decodeArray3);
  var getField22 = /* @__PURE__ */ getField2(decodeForeignObject3);
  var toUnfoldable6 = /* @__PURE__ */ toUnfoldable3(unfoldableArray);
  var fromFoldable7 = /* @__PURE__ */ fromFoldable2(ordString)(foldableArray);
  var lmap$prime = function(v) {
    if (v instanceof Left) {
      return new Left(printJsonDecodeError(v.value0));
    }
    ;
    if (v instanceof Right) {
      return new Right(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Graph.Decode (line 94, column 1 - line 97, column 21): " + [v.constructor.name]);
  };
  var decodeLink = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField5(obj)("label")))(function(label5) {
        return bind10(lmap$prime(getField5(obj)("url")))(function(url2) {
          return pure16({
            label: label5,
            url: url2
          });
        });
      });
    });
  };
  var decodeNode = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField5(obj)("id")))(function(id4) {
        return bind10(lmap$prime(getField5(obj)("label")))(function(label5) {
          return bind10(lmap$prime(getField5(obj)("kind")))(function(kind2) {
            return bind10(lmap$prime(getField5(obj)("group")))(function(group4) {
              return bind10(lmap$prime(getField5(obj)("description")))(function(description) {
                return bind10(lmap$prime(map33(fromMaybe([]))(getFieldOptional$prime4(obj)("links"))))(function(rawLinks) {
                  return bind10(traverse2(decodeLink)(rawLinks))(function(links) {
                    return pure16({
                      id: id4,
                      label: label5,
                      kind: kind2,
                      group: group4,
                      description,
                      links
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  };
  var decodeKindDef = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField5(obj)("label")))(function(label5) {
        return bind10(lmap$prime(getField5(obj)("color")))(function(color) {
          return bind10(lmap$prime(getField5(obj)("shape")))(function(shape2) {
            return pure16({
              label: label5,
              color,
              shape: shape2
            });
          });
        });
      });
    });
  };
  var decodeEdge = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField5(obj)("source")))(function(source2) {
        return bind10(lmap$prime(getField5(obj)("target")))(function(target7) {
          return bind10(lmap$prime(getField5(obj)("label")))(function(label5) {
            return bind10(lmap$prime(map33(fromMaybe(""))(getFieldOptional$prime12(obj)("description"))))(function(description) {
              return pure16({
                source: source2,
                target: target7,
                label: label5,
                description
              });
            });
          });
        });
      });
    });
  };
  var decodeGraph = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField12(obj)("nodes")))(function(rawNodes) {
        return bind10(lmap$prime(getField12(obj)("edges")))(function(rawEdges) {
          return bind10(traverse2(decodeNode)(rawNodes))(function(nodes) {
            return bind10(traverse2(decodeEdge)(rawEdges))(function(edges) {
              return pure16(buildGraph(nodes)(edges));
            });
          });
        });
      });
    });
  };
  var decodeConfig = function(json3) {
    return bind10(lmap$prime(decodeJson4(json3)))(function(obj) {
      return bind10(lmap$prime(getField5(obj)("title")))(function(title3) {
        return bind10(lmap$prime(getField5(obj)("description")))(function(description) {
          return bind10(lmap$prime(getField5(obj)("sourceUrl")))(function(sourceUrl) {
            return bind10(lmap$prime(getField22(obj)("kinds")))(function(kindsObj) {
              return bind10(traverse2(function(v) {
                return bind10(decodeKindDef(v.value1))(function(def) {
                  return pure16(new Tuple(v.value0, def));
                });
              })(toUnfoldable6(kindsObj)))(function(kindPairs) {
                return pure16({
                  title: title3,
                  description,
                  sourceUrl,
                  kinds: fromFoldable7(kindPairs)
                });
              });
            });
          });
        });
      });
    });
  };

  // output/Graph.Operations/index.js
  var member3 = /* @__PURE__ */ member2(ordString);
  var fromFoldable8 = /* @__PURE__ */ fromFoldable(foldableList);
  var foldl4 = /* @__PURE__ */ foldl(foldableSet);
  var lookup8 = /* @__PURE__ */ lookup(ordString);
  var union4 = /* @__PURE__ */ union3(ordString);
  var eq2 = /* @__PURE__ */ eq(/* @__PURE__ */ eqSet(eqString));
  var subgraph = function(keep) {
    return function(graph) {
      var keptNodes = filter(function(n) {
        return member3(n.id)(keep);
      })(fromFoldable8(values(graph.nodes)));
      var keptEdges = filter(function(e) {
        return member3(e.source)(keep) && member3(e.target)(keep);
      })(graph.edges);
      return buildGraph(keptNodes)(keptEdges);
    };
  };
  var neighborhood = function(depth) {
    return function(root) {
      return function(graph) {
        var go2 = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v === 0) {
                $tco_done = true;
                return v1;
              }
              ;
              var newNeighbors = foldl4(function(acc) {
                return function(nid) {
                  var fwd = fromMaybe(empty7)(lookup8(nid)(graph.forward));
                  var bwd = fromMaybe(empty7)(lookup8(nid)(graph.backward));
                  return union4(acc)(union4(fwd)(bwd));
                };
              })(empty7)(v1);
              var expanded = union4(v1)(newNeighbors);
              var $13 = eq2(expanded)(v1);
              if ($13) {
                $tco_done = true;
                return v1;
              }
              ;
              $tco_var_v = v - 1 | 0;
              $copy_v1 = expanded;
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go2(depth)(singleton8(root));
      };
    };
  };

  // output/Graph.Search/index.js
  var lookup9 = /* @__PURE__ */ lookup(ordString);
  var fromFoldable9 = /* @__PURE__ */ fromFoldable(foldableList);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var NodeResult = /* @__PURE__ */ (function() {
    function NodeResult2(value0) {
      this.value0 = value0;
    }
    ;
    NodeResult2.create = function(value0) {
      return new NodeResult2(value0);
    };
    return NodeResult2;
  })();
  var EdgeResult = /* @__PURE__ */ (function() {
    function EdgeResult2(value0) {
      this.value0 = value0;
    }
    ;
    EdgeResult2.create = function(value0) {
      return new EdgeResult2(value0);
    };
    return EdgeResult2;
  })();
  var search2 = function(v) {
    return function(v1) {
      if (v === "") {
        return [];
      }
      ;
      var q2 = toLower(v);
      var matchesAny = any2(function(s) {
        return contains(q2)(toLower(s));
      });
      var matchNode = function(node) {
        var $8 = matchesAny([node.label, node.description, node.kind]);
        if ($8) {
          return new Just(new NodeResult(node));
        }
        ;
        return Nothing.value;
      };
      var lookupLabel = function(nid) {
        var v2 = lookup9(nid)(v1.nodes);
        if (v2 instanceof Just) {
          return v2.value0.label;
        }
        ;
        if (v2 instanceof Nothing) {
          return nid;
        }
        ;
        throw new Error("Failed pattern match at Graph.Search (line 72, column 21 - line 74, column 19): " + [v2.constructor.name]);
      };
      var matchEdge = function(edge) {
        var tgtLabel = lookupLabel(edge.target);
        var srcLabel = lookupLabel(edge.source);
        var $11 = matchesAny([edge.label, edge.description, srcLabel, tgtLabel]);
        if ($11) {
          return new Just(new EdgeResult({
            edge,
            sourceLabel: srcLabel,
            targetLabel: tgtLabel
          }));
        }
        ;
        return Nothing.value;
      };
      var edgeResults = mapMaybe(matchEdge)(v1.edges);
      var allNodes = fromFoldable9(values(v1.nodes));
      var nodeResults = mapMaybe(matchNode)(allNodes);
      return append6(nodeResults)(edgeResults);
    };
  };

  // output/Graph.Types/index.js
  var emptyGraph = {
    nodes: empty2,
    edges: [],
    forward: empty2,
    backward: empty2
  };
  var emptyConfig = {
    title: "Knowledge Graph",
    description: "",
    sourceUrl: "",
    kinds: empty2
  };

  // output/Tutorial/index.js
  var bind11 = /* @__PURE__ */ bind(bindEither);
  var decodeJson5 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeForeignObject2(decodeJsonJson));
  var getField6 = /* @__PURE__ */ getField2(decodeJsonString);
  var getField13 = /* @__PURE__ */ getField2(decodeJsonInt);
  var pure17 = /* @__PURE__ */ pure(applicativeEither);
  var getField23 = /* @__PURE__ */ getField2(/* @__PURE__ */ decodeArray2(decodeJsonJson));
  var traverse3 = /* @__PURE__ */ traverse(traversableArray)(applicativeEither);
  var lmap$prime2 = function(v) {
    if (v instanceof Left) {
      return new Left(printJsonDecodeError(v.value0));
    }
    ;
    if (v instanceof Right) {
      return new Right(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Tutorial (line 53, column 1 - line 53, column 49): " + [v.constructor.name]);
  };
  var decodeStop = function(json3) {
    return bind11(lmap$prime2(decodeJson5(json3)))(function(obj) {
      return bind11(lmap$prime2(getField6(obj)("node")))(function(node) {
        return bind11(lmap$prime2(getField13(obj)("depth")))(function(depth) {
          return bind11(lmap$prime2(getField6(obj)("title")))(function(title3) {
            return bind11(lmap$prime2(getField6(obj)("narrative")))(function(narrative) {
              return pure17({
                node,
                depth,
                title: title3,
                narrative
              });
            });
          });
        });
      });
    });
  };
  var decodeTutorial = function(json3) {
    return bind11(lmap$prime2(decodeJson5(json3)))(function(obj) {
      return bind11(lmap$prime2(getField6(obj)("id")))(function(id4) {
        return bind11(lmap$prime2(getField6(obj)("title")))(function(title3) {
          return bind11(lmap$prime2(getField6(obj)("description")))(function(description) {
            return bind11(lmap$prime2(getField23(obj)("stops")))(function(rawStops) {
              return bind11(traverse3(decodeStop)(rawStops))(function(stops) {
                return pure17({
                  id: id4,
                  title: title3,
                  description,
                  stops
                });
              });
            });
          });
        });
      });
    });
  };

  // output/Viewer/index.js
  var add2 = /* @__PURE__ */ add(semiringInt);
  var bind17 = /* @__PURE__ */ bind(bindHalogenM);
  var get4 = /* @__PURE__ */ get(monadStateHalogenM);
  var liftEffect9 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectHalogenM(monadEffectAff));
  var map34 = /* @__PURE__ */ map(functorMaybe);
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var for_3 = /* @__PURE__ */ for_(applicativeHalogenM)(foldableMaybe);
  var bind24 = /* @__PURE__ */ bind(bindMaybe);
  var alter4 = /* @__PURE__ */ alter(ordString);
  var foldl5 = /* @__PURE__ */ foldl(foldableArray);
  var toUnfoldable7 = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
  var lookup10 = /* @__PURE__ */ lookup(ordString);
  var bind32 = /* @__PURE__ */ bind(bindAff);
  var fetch4 = /* @__PURE__ */ fetch2()()(/* @__PURE__ */ toCoreRequestOptionsRowRo()()(/* @__PURE__ */ toCoreRequestOptionsHelpe1(toCoreRequestOptionsConve9)()()()({
    reflectSymbol: function() {
      return "method";
    }
  })(toCoreRequestOptionsHelpe)()()));
  var pure18 = /* @__PURE__ */ pure(applicativeAff);
  var gDecodeJsonCons2 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString));
  var decodeJson6 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeArray2(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons2(gDecodeJsonNil)({
    reflectSymbol: function() {
      return "title";
    }
  })()())({
    reflectSymbol: function() {
      return "id";
    }
  })()())({
    reflectSymbol: function() {
      return "file";
    }
  })()())({
    reflectSymbol: function() {
      return "description";
    }
  })()())()));
  var fromFoldable10 = /* @__PURE__ */ fromFoldable4(foldableArray);
  var map112 = /* @__PURE__ */ map(functorArray);
  var show4 = /* @__PURE__ */ show(showInt);
  var append13 = /* @__PURE__ */ append(semigroupArray);
  var type_20 = /* @__PURE__ */ type_17(isPropInputType);
  var value14 = /* @__PURE__ */ value12(isPropString);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorArray);
  var pure19 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify_4 = /* @__PURE__ */ modify_(monadStateHalogenM);
  var liftAff2 = /* @__PURE__ */ liftAff(/* @__PURE__ */ monadAffHalogenM(monadAffAff));
  var $$void10 = /* @__PURE__ */ $$void(functorHalogenM);
  var when5 = /* @__PURE__ */ when(applicativeHalogenM);
  var NodeTarget = /* @__PURE__ */ (function() {
    function NodeTarget2(value0) {
      this.value0 = value0;
    }
    ;
    NodeTarget2.create = function(value0) {
      return new NodeTarget2(value0);
    };
    return NodeTarget2;
  })();
  var ExternalTarget = /* @__PURE__ */ (function() {
    function ExternalTarget2(value0) {
      this.value0 = value0;
    }
    ;
    ExternalTarget2.create = function(value0) {
      return new ExternalTarget2(value0);
    };
    return ExternalTarget2;
  })();
  var Initialize2 = /* @__PURE__ */ (function() {
    function Initialize3() {
    }
    ;
    Initialize3.value = new Initialize3();
    return Initialize3;
  })();
  var NodeTapped = /* @__PURE__ */ (function() {
    function NodeTapped2(value0) {
      this.value0 = value0;
    }
    ;
    NodeTapped2.create = function(value0) {
      return new NodeTapped2(value0);
    };
    return NodeTapped2;
  })();
  var NodeHovered = /* @__PURE__ */ (function() {
    function NodeHovered2(value0) {
      this.value0 = value0;
    }
    ;
    NodeHovered2.create = function(value0) {
      return new NodeHovered2(value0);
    };
    return NodeHovered2;
  })();
  var EdgeHovered = /* @__PURE__ */ (function() {
    function EdgeHovered2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    EdgeHovered2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new EdgeHovered2(value0, value1, value22, value32);
          };
        };
      };
    };
    return EdgeHovered2;
  })();
  var SetDepth = /* @__PURE__ */ (function() {
    function SetDepth2(value0) {
      this.value0 = value0;
    }
    ;
    SetDepth2.create = function(value0) {
      return new SetDepth2(value0);
    };
    return SetDepth2;
  })();
  var SetSearch = /* @__PURE__ */ (function() {
    function SetSearch2(value0) {
      this.value0 = value0;
    }
    ;
    SetSearch2.create = function(value0) {
      return new SetSearch2(value0);
    };
    return SetSearch2;
  })();
  var SelectSearchResult = /* @__PURE__ */ (function() {
    function SelectSearchResult2(value0) {
      this.value0 = value0;
    }
    ;
    SelectSearchResult2.create = function(value0) {
      return new SelectSearchResult2(value0);
    };
    return SelectSearchResult2;
  })();
  var FitAll = /* @__PURE__ */ (function() {
    function FitAll2() {
    }
    ;
    FitAll2.value = new FitAll2();
    return FitAll2;
  })();
  var NavigateTo = /* @__PURE__ */ (function() {
    function NavigateTo2(value0) {
      this.value0 = value0;
    }
    ;
    NavigateTo2.create = function(value0) {
      return new NavigateTo2(value0);
    };
    return NavigateTo2;
  })();
  var ToggleTutorialMenu = /* @__PURE__ */ (function() {
    function ToggleTutorialMenu2() {
    }
    ;
    ToggleTutorialMenu2.value = new ToggleTutorialMenu2();
    return ToggleTutorialMenu2;
  })();
  var StartTutorial = /* @__PURE__ */ (function() {
    function StartTutorial2(value0) {
      this.value0 = value0;
    }
    ;
    StartTutorial2.create = function(value0) {
      return new StartTutorial2(value0);
    };
    return StartTutorial2;
  })();
  var TutorialNext = /* @__PURE__ */ (function() {
    function TutorialNext2() {
    }
    ;
    TutorialNext2.value = new TutorialNext2();
    return TutorialNext2;
  })();
  var TutorialPrev = /* @__PURE__ */ (function() {
    function TutorialPrev2() {
    }
    ;
    TutorialPrev2.value = new TutorialPrev2();
    return TutorialPrev2;
  })();
  var TutorialRecenter = /* @__PURE__ */ (function() {
    function TutorialRecenter2() {
    }
    ;
    TutorialRecenter2.value = new TutorialRecenter2();
    return TutorialRecenter2;
  })();
  var ExitTutorial = /* @__PURE__ */ (function() {
    function ExitTutorial2() {
    }
    ;
    ExitTutorial2.value = new ExitTutorial2();
    return ExitTutorial2;
  })();
  var splitOn = function(sep) {
    return function(str) {
      var sepLen = length7(sep);
      var go2 = function($copy_v) {
        return function($copy_v1) {
          var $tco_var_v = $copy_v;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v, v1) {
            if (v === "") {
              $tco_done = true;
              return reverse(v1);
            }
            ;
            var v2 = indexOf2(sep)(v);
            if (v2 instanceof Nothing) {
              $tco_done = true;
              return reverse(cons(v)(v1));
            }
            ;
            if (v2 instanceof Just) {
              var before = take4(v2.value0)(v);
              var after = drop4(v2.value0 + sepLen | 0)(v);
              $tco_var_v = after;
              $copy_v1 = cons(before)(v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Viewer (line 539, column 5 - line 546, column 43): " + [v2.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_v, $copy_v1);
          }
          ;
          return $tco_result;
        };
      };
      return go2(str)([]);
    };
  };
  var splitParagraphs = function(s) {
    return filter(function(v) {
      return v !== "";
    })(splitOn("\n\n")(s));
  };
  var setDocTitle = function(title3) {
    return function __do2() {
      var w = windowImpl();
      var doc = document2(w)();
      return setTitle(title3)(doc)();
    };
  };
  var resolveUrl = function(base2) {
    return function(path) {
      var $150 = take4(4)(path) === "http";
      if ($150) {
        return path;
      }
      ;
      return base2 + path;
    };
  };
  var persistState = /* @__PURE__ */ bind17(get4)(function(state3) {
    return liftEffect9(save(state3.config.title)({
      selectedNodeId: map34(function(v) {
        return v.id;
      })(state3.selected),
      depth: state3.depth,
      tutorialId: (function() {
        if (state3.tutorial instanceof Just) {
          return new Just(state3.tutorial.value0.id);
        }
        ;
        if (state3.tutorial instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 1024, column 19 - line 1026, column 27): " + [state3.tutorial.constructor.name]);
      })(),
      tutorialStep: (function() {
        if (state3.tutorialActive) {
          return new Just(state3.tutorialStep);
        }
        ;
        return Nothing.value;
      })()
    }));
  });
  var renderGraph = /* @__PURE__ */ bind17(get4)(function(state3) {
    var visible = (function() {
      if (state3.selected instanceof Just) {
        var hood = neighborhood(state3.depth)(state3.selected.value0.id)(state3.graph);
        return subgraph(hood)(state3.graph);
      }
      ;
      if (state3.selected instanceof Nothing) {
        return state3.graph;
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 920, column 15 - line 928, column 29): " + [state3.selected.constructor.name]);
    })();
    return discard6(liftEffect9(setFocusElements(toElements(visible))))(function() {
      return discard6(for_3(state3.selected)(function(node) {
        return liftEffect9(markRoot(node.id));
      }))(function() {
        return persistState;
      });
    });
  });
  var parseLink = function(str) {
    return bind24(indexOf2("]")(str))(function(closeBracket) {
      var linkText = take4(closeBracket - 1 | 0)(drop4(1)(str));
      var afterClose = drop4(closeBracket + 1 | 0)(str);
      return bind24((function() {
        var v = indexOf2("(")(afterClose);
        if (v instanceof Just && v.value0 === 0) {
          return new Just(0);
        }
        ;
        return Nothing.value;
      })())(function(openParen) {
        var afterParen = drop4(1)(afterClose);
        return bind24(indexOf2(")")(afterParen))(function(closeParen) {
          var targetStr = take4(closeParen)(afterParen);
          var consumed = (((closeBracket + 1 | 0) + 1 | 0) + closeParen | 0) + 1 | 0;
          var target7 = (function() {
            var $158 = take4(5)(targetStr) === "node:";
            if ($158) {
              return new NodeTarget(drop4(5)(targetStr));
            }
            ;
            return new ExternalTarget(targetStr);
          })();
          return new Just({
            text: linkText,
            target: target7,
            consumed
          });
        });
      });
    });
  };
  var mostConnectedNode = function(graph) {
    var orZero = function(v) {
      if (v instanceof Nothing) {
        return 0;
      }
      ;
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 964, column 3 - line 964, column 21): " + [v.constructor.name]);
    };
    var countEdge = function(m) {
      return function(edge) {
        var m1 = alter4((function() {
          var $368 = add2(1);
          return function($369) {
            return Just.create($368(orZero($369)));
          };
        })())(edge.source)(m);
        var m2 = alter4((function() {
          var $370 = add2(1);
          return function($371) {
            return Just.create($370(orZero($371)));
          };
        })())(edge.target)(m1);
        return m2;
      };
    };
    var counts = foldl5(countEdge)(empty2)(graph.edges);
    var best = foldl5(function(acc) {
      return function(v) {
        if (acc instanceof Nothing) {
          return new Just(new Tuple(v.value0, v.value1));
        }
        ;
        if (acc instanceof Just) {
          var $163 = v.value1 > acc.value0.value1;
          if ($163) {
            return new Just(new Tuple(v.value0, v.value1));
          }
          ;
          return acc;
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 943, column 11 - line 948, column 25): " + [acc.constructor.name]);
      };
    })(Nothing.value)(toUnfoldable7(counts));
    if (best instanceof Just) {
      return lookup10(best.value0.value0)(graph.nodes);
    }
    ;
    if (best instanceof Nothing) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Viewer (line 953, column 5 - line 956, column 25): " + [best.constructor.name]);
  };
  var lookupKind = function(cfg) {
    return function(kid) {
      var v = lookup10(kid)(cfg.kinds);
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      if (v instanceof Nothing) {
        return {
          label: kid,
          color: "#8b949e",
          shape: "ellipse"
        };
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 1075, column 22 - line 1078, column 55): " + [v.constructor.name]);
    };
  };
  var loadTutorialFile = function(file) {
    return bind32(fetch4(file)({
      method: GET2.value
    }))(function(resp) {
      return bind32(resp.text)(function(body4) {
        return pure18((function() {
          var v = jsonParser(body4);
          if (v instanceof Left) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Right) {
            return decodeTutorial(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 996, column 8 - line 998, column 38): " + [v.constructor.name]);
        })());
      });
    });
  };
  var loadGraphData = function(url2) {
    return bind32(fetch4(url2)({
      method: GET2.value
    }))(function(resp) {
      return bind32(resp.text)(function(body4) {
        return pure18((function() {
          var v = jsonParser(body4);
          if (v instanceof Left) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Right) {
            return decodeGraph(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 1012, column 8 - line 1014, column 35): " + [v.constructor.name]);
        })());
      });
    });
  };
  var loadConfig = function(url2) {
    return bind32(fetch4(url2)({
      method: GET2.value
    }))(function(resp) {
      return bind32(resp.text)(function(body4) {
        return pure18((function() {
          var v = jsonParser(body4);
          if (v instanceof Left) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Right) {
            return decodeConfig(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 1004, column 8 - line 1006, column 36): " + [v.constructor.name]);
        })());
      });
    });
  };
  var lmapShow = function(v) {
    if (v instanceof Left) {
      return new Left(printJsonDecodeError(v.value0));
    }
    ;
    if (v instanceof Right) {
      return new Right(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Viewer (line 1056, column 1 - line 1056, column 52): " + [v.constructor.name]);
  };
  var loadTutorialIndex = function(url2) {
    return bind32(fetch4(url2)({
      method: GET2.value
    }))(function(resp) {
      return bind32(resp.text)(function(body4) {
        return pure18((function() {
          var v = jsonParser(body4);
          if (v instanceof Left) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Right) {
            return lmapShow(decodeJson6(v.value0));
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 988, column 8 - line 990, column 45): " + [v.constructor.name]);
        })());
      });
    });
  };
  var kindsToForeign = function(cfg) {
    return unsafeToForeign(fromFoldable10(map112(function(v) {
      return new Tuple(v.value0, unsafeToForeign(v.value1));
    })(toUnfoldable7(cfg.kinds))));
  };
  var kindLabel = function(cfg) {
    return function(kid) {
      return lookupKind(cfg)(kid).label;
    };
  };
  var kindColor = function(cfg) {
    return function(kid) {
      return lookupKind(cfg)(kid).color;
    };
  };
  var currentStop = function(state3) {
    return bind24(state3.tutorial)(function(t) {
      return index(t.stops)(state3.tutorialStep);
    });
  };
  var cls2 = function($372) {
    return class_(ClassName($372));
  };
  var depthBtn = function(n) {
    return function(current) {
      return button([cls2("depth-btn" + (function() {
        var $193 = n === current;
        if ($193) {
          return " active";
        }
        ;
        return "";
      })()), onClick(function(v) {
        return new SetDepth(n);
      })])([text5(show4(n))]);
    };
  };
  var parseNarrative = function(str) {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v === "") {
            $tco_done = true;
            return reverse(v1);
          }
          ;
          var v2 = indexOf2("[")(v);
          if (v2 instanceof Nothing) {
            $tco_done = true;
            return reverse(cons(text5(v))(v1));
          }
          ;
          if (v2 instanceof Just) {
            var rest = drop4(v2.value0)(v);
            var before = take4(v2.value0)(v);
            var v3 = parseLink(rest);
            if (v3 instanceof Nothing) {
              $tco_var_v = drop4(1)(rest);
              $copy_v1 = cons(text5(before + "["))(v1);
              return;
            }
            ;
            if (v3 instanceof Just) {
              var linkEl = (function() {
                if (v3.value0.target instanceof NodeTarget) {
                  return span3([cls2("narrative-node-link"), onClick(function(v4) {
                    return new NavigateTo(v3.value0.target.value0);
                  })])([text5(v3.value0.text)]);
                }
                ;
                if (v3.value0.target instanceof ExternalTarget) {
                  return a([href4(v3.value0.target.value0), target5("_blank"), rel4("noopener"), cls2("narrative-ext-link")])([text5(v3.value0.text)]);
                }
                ;
                throw new Error("Failed pattern match at Viewer (line 475, column 26 - line 490, column 43): " + [v3.value0.target.constructor.name]);
              })();
              var beforeEl = (function() {
                var $201 = before === "";
                if ($201) {
                  return [];
                }
                ;
                return [text5(before)];
              })();
              var after = drop4(v3.value0.consumed)(rest);
              $tco_var_v = after;
              $copy_v1 = cons(linkEl)(append13(beforeEl)(v1));
              return;
            }
            ;
            throw new Error("Failed pattern match at Viewer (line 461, column 11 - line 495, column 20): " + [v3.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 452, column 5 - line 495, column 20): " + [v2.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(str)([]);
  };
  var renderEdgeDetail = function(edge) {
    return div_([span3([cls2("badge badge-mechanism")])([text5("relationship")]), div2([cls2("edge-detail")])([div2([cls2("edge-endpoint")])([span3([cls2("edge-role")])([text5("From")]), span3([cls2("edge-name")])([text5(edge.sourceLabel)])]), div2([cls2("edge-label")])([text5(edge.label)]), div2([cls2("edge-endpoint")])([span3([cls2("edge-role")])([text5("To")]), span3([cls2("edge-name")])([text5(edge.targetLabel)])])]), p([cls2("description")])([text5(edge.description)])]);
  };
  var renderEmptyState = function(cfg) {
    return div2([cls2("empty-state")])([h2_([text5(cfg.title)]), p_([text5("Hover a node to see details. Click to re-center.")]), button([cls2("tutorial-start-btn"), onClick(function(v) {
      return ToggleTutorialMenu.value;
    })])([text5("Take a guided tour")])]);
  };
  var renderLegend = function(cfg) {
    return div2([cls2("legend")])([text5("Hover to inspect. Click to re-center. "), (function() {
      var $207 = cfg.sourceUrl === "";
      if ($207) {
        return text5("");
      }
      ;
      return a([href4(cfg.sourceUrl), target5("_blank"), rel4("noopener"), cls2("legend-link")])([text5("Source")]);
    })()]);
  };
  var renderNodeDetail = function(cfg) {
    return function(graph) {
      return function(node) {
        var renderLinks = function(v) {
          if (v.length === 0) {
            return text5("");
          }
          ;
          return ul([cls2("links")])(map112(function(l) {
            return li_([a([href4(l.url), target5("_blank"), rel4("noopener")])([text5(l.label)])]);
          })(v));
        };
        var outEdges = filter(function(e) {
          return e.source === node.id;
        })(graph.edges);
        var mkConn = function(edge) {
          var targetId = (function() {
            var $209 = edge.source === node.id;
            if ($209) {
              return edge.target;
            }
            ;
            return edge.source;
          })();
          var targetNode = lookup10(targetId)(graph.nodes);
          var targetLabel = (function() {
            if (targetNode instanceof Just) {
              return targetNode.value0.label;
            }
            ;
            if (targetNode instanceof Nothing) {
              return targetId;
            }
            ;
            throw new Error("Failed pattern match at Viewer (line 635, column 21 - line 637, column 28): " + [targetNode.constructor.name]);
          })();
          return div2([cls2("connection-item"), onClick(function(v) {
            return new NavigateTo(targetId);
          })])([span3([cls2("conn-label")])([text5(edge.label)]), span3([cls2("conn-node")])([text5(targetLabel)])]);
        };
        var renderConnections = function(v) {
          return function(v1) {
            if (v1.length === 0) {
              return text5("");
            }
            ;
            return div2([cls2("connections")])([h3_([text5(v)]), div_(map112(mkConn)(v1))]);
          };
        };
        var inEdges = filter(function(e) {
          return e.target === node.id;
        })(graph.edges);
        return div_([span3([cls2("badge badge-" + node.kind)])([text5(kindLabel(cfg)(node.kind))]), p([cls2("description")])([text5(node.description)]), renderLinks(node.links), renderConnections("Connects to")(outEdges), renderConnections("Connected from")(inEdges)]);
      };
    };
  };
  var renderSearchResult = function(cfg) {
    return function(result) {
      if (result instanceof NodeResult) {
        return div2([cls2("search-result-item"), onClick(function(v) {
          return new SelectSearchResult(result);
        })])([span3([cls2("search-dot"), attr2("style")("background:" + kindColor(cfg)(result.value0.kind))])([]), span3([cls2("search-result-label")])([text5(result.value0.label)]), span3([cls2("search-result-kind")])([text5(kindLabel(cfg)(result.value0.kind))])]);
      }
      ;
      if (result instanceof EdgeResult) {
        return div2([cls2("search-result-item"), onClick(function(v) {
          return new SelectSearchResult(result);
        })])([span3([cls2("search-dot"), attr2("style")("background:#8b949e")])([]), span3([cls2("search-result-label")])([text5(result.value0.sourceLabel + (" \u2192 " + result.value0.targetLabel))]), span3([cls2("search-result-kind")])([text5(result.value0.edge.label)])]);
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 247, column 33 - line 281, column 8): " + [result.constructor.name]);
    };
  };
  var renderSearchBox = function(state3) {
    return div2([cls2("search-container")])([input2([cls2("search-input"), type_20(InputText.value), placeholder3("Search nodes, edges, descriptions..."), value14(state3.searchQuery), onValueInput(SetSearch.create)]), (function() {
      var $220 = $$null(state3.searchResults);
      if ($220) {
        return text5("");
      }
      ;
      return div2([cls2("search-results")])(mapFlipped2(take(12)(state3.searchResults))(renderSearchResult(state3.config)));
    })()]);
  };
  var renderTutorialContent = function(state3) {
    var v = currentStop(state3);
    if (v instanceof Nothing) {
      return text5("");
    }
    ;
    if (v instanceof Just) {
      var total = (function() {
        if (state3.tutorial instanceof Just) {
          return length(state3.tutorial.value0.stops);
        }
        ;
        if (state3.tutorial instanceof Nothing) {
          return 0;
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 340, column 17 - line 342, column 23): " + [state3.tutorial.constructor.name]);
      })();
      var stepNum = state3.tutorialStep + 1 | 0;
      var onDetour = (function() {
        if (state3.selected instanceof Just) {
          return state3.selected.value0.id !== v.value0.node;
        }
        ;
        if (state3.selected instanceof Nothing) {
          return false;
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 346, column 22 - line 348, column 29): " + [state3.selected.constructor.name]);
      })();
      return div2([cls2("tutorial-content")])([div2([cls2("tutorial-topbar")])([div2([cls2("tutorial-nav")])([(function() {
        var $226 = state3.tutorialStep > 0;
        if ($226) {
          return button([cls2("tutorial-nav-btn"), onClick(function(v1) {
            return TutorialPrev.value;
          })])([text5("Prev")]);
        }
        ;
        return text5("");
      })(), span3([cls2("tutorial-progress")])([text5(show4(stepNum) + (" / " + show4(total)))]), (function() {
        if (onDetour) {
          return button([cls2("tutorial-nav-btn recenter"), onClick(function(v1) {
            return TutorialRecenter.value;
          })])([text5("Refocus")]);
        }
        ;
        return text5("");
      })(), (function() {
        var $228 = stepNum < total;
        if ($228) {
          return button([cls2("tutorial-nav-btn active"), onClick(function(v1) {
            return TutorialNext.value;
          })])([text5("Next")]);
        }
        ;
        return button([cls2("tutorial-nav-btn"), onClick(function(v1) {
          return ExitTutorial.value;
        })])([text5("Finish")]);
      })(), button([cls2("tutorial-exit"), onClick(function(v1) {
        return ExitTutorial.value;
      })])([text5("Exit")])])]), div2([cls2("tutorial-narrative")])(map112(function(para) {
        return p([cls2("tutorial-para")])(parseNarrative(para));
      })(splitParagraphs(v.value0.narrative))), (function() {
        if (state3.hoveredNode instanceof Nothing) {
          return text5("");
        }
        ;
        if (state3.hoveredNode instanceof Just) {
          return div2([cls2("tutorial-hovered-node")])([div2([cls2("tutorial-hovered-divider")])([]), span3([cls2("badge badge-" + state3.hoveredNode.value0.kind)])([text5(kindLabel(state3.config)(state3.hoveredNode.value0.kind))]), h3([cls2("tutorial-hovered-label")])([text5(state3.hoveredNode.value0.label)]), p([cls2("tutorial-hovered-desc")])([text5(state3.hoveredNode.value0.description)]), (function() {
            var $230 = $$null(state3.hoveredNode.value0.links);
            if ($230) {
              return text5("");
            }
            ;
            return ul([cls2("links")])(map112(function(l) {
              return li_([a([href4(l.url), target5("_blank"), rel4("noopener")])([text5(l.label)])]);
            })(state3.hoveredNode.value0.links));
          })()]);
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 402, column 13 - line 438, column 20): " + [state3.hoveredNode.constructor.name]);
      })()]);
    }
    ;
    throw new Error("Failed pattern match at Viewer (line 336, column 3 - line 439, column 12): " + [v.constructor.name]);
  };
  var renderSidebar = function(state3) {
    var sidebarTitle = (function() {
      if (state3.tutorialActive) {
        var v = currentStop(state3);
        if (v instanceof Just) {
          return v.value0.title;
        }
        ;
        if (v instanceof Nothing) {
          return "Tutorial";
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 306, column 7 - line 308, column 30): " + [v.constructor.name]);
      }
      ;
      if (state3.hoveredEdge instanceof Just) {
        return state3.hoveredEdge.value0.label;
      }
      ;
      if (state3.hoveredEdge instanceof Nothing) {
        if (state3.selected instanceof Nothing) {
          return state3.config.title;
        }
        ;
        if (state3.selected instanceof Just) {
          return state3.selected.value0.label;
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 311, column 18 - line 313, column 26): " + [state3.selected.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 309, column 10 - line 313, column 26): " + [state3.hoveredEdge.constructor.name]);
    })();
    return div2([cls2("sidebar")])([div2([cls2("sidebar-header")])([h2_([text5(sidebarTitle)])]), div2([cls2("sidebar-content")])([(function() {
      if (state3.tutorialActive) {
        return renderTutorialContent(state3);
      }
      ;
      if (state3.hoveredEdge instanceof Just) {
        return renderEdgeDetail(state3.hoveredEdge.value0);
      }
      ;
      if (state3.hoveredEdge instanceof Nothing) {
        if (state3.selected instanceof Nothing) {
          return renderEmptyState(state3.config);
        }
        ;
        if (state3.selected instanceof Just) {
          return renderNodeDetail(state3.config)(state3.graph)(state3.selected.value0);
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 295, column 24 - line 300, column 21): " + [state3.selected.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Viewer (line 293, column 16 - line 300, column 21): " + [state3.hoveredEdge.constructor.name]);
    })()])]);
  };
  var renderTutorialMenu = function(entries) {
    var mkEntry = function(entry) {
      return div2([cls2("tour-menu-item"), onClick(function(v) {
        return new StartTutorial(entry.file);
      })])([div2([cls2("tour-menu-title")])([text5(entry.title)]), div2([cls2("tour-menu-desc")])([text5(entry.description)])]);
    };
    return div2([cls2("tour-menu")])(map112(mkEntry)(entries));
  };
  var renderControls = function(state3) {
    return div2([cls2("controls")])([div2([cls2("tour-menu-wrapper")])([button([cls2("control-btn" + (function() {
      if (state3.tutorialActive) {
        return " active";
      }
      ;
      return "";
    })()), onClick(function(v) {
      if (state3.tutorialActive) {
        return ExitTutorial.value;
      }
      ;
      return ToggleTutorialMenu.value;
    })])([text5((function() {
      if (state3.tutorialActive) {
        return "Exit Tour";
      }
      ;
      return "Guided Tours";
    })())]), (function() {
      if (state3.showTutorialMenu) {
        return renderTutorialMenu(state3.tutorialIndex);
      }
      ;
      return text5("");
    })()]), button([cls2("control-btn"), onClick(function(v) {
      return FitAll.value;
    })])([text5("Fit View")]), div2([cls2("depth-control")])([span3([cls2("depth-label")])([text5("Depth:")]), depthBtn(1)(state3.depth), depthBtn(2)(state3.depth), depthBtn(3)(state3.depth), button([cls2("depth-btn" + (function() {
      var $249 = state3.depth >= 99;
      if ($249) {
        return " active";
      }
      ;
      return "";
    })()), onClick(function(v) {
      return new SetDepth(99);
    })])([text5("All")])])]);
  };
  var render2 = function(state3) {
    return div2([cls2("app")])([div2([cls2("graph-container")])([div2([id2("cy")])([]), renderControls(state3), renderSearchBox(state3), renderLegend(state3.config)]), renderSidebar(state3)]);
  };
  var applyTutorialStop = /* @__PURE__ */ bind17(get4)(function(state3) {
    var v = currentStop(state3);
    if (v instanceof Nothing) {
      return pure19(unit);
    }
    ;
    if (v instanceof Just) {
      var node = lookup10(v.value0.node)(state3.graph.nodes);
      return discard6(modify_4(function(v1) {
        var $251 = {};
        for (var $252 in v1) {
          if ({}.hasOwnProperty.call(v1, $252)) {
            $251[$252] = v1[$252];
          }
          ;
        }
        ;
        $251.selected = node;
        $251.depth = v.value0.depth;
        $251.hoveredEdge = Nothing.value;
        return $251;
      }))(function() {
        return renderGraph;
      });
    }
    ;
    throw new Error("Failed pattern match at Viewer (line 972, column 3 - line 981, column 18): " + [v.constructor.name]);
  });
  var handleAction2 = function(v) {
    if (v instanceof Initialize2) {
      return bind17(get4)(function(state0) {
        return bind17(liftAff2(loadConfig(state0.dataUrls.configUrl)))(function(cfgResult) {
          return discard6((function() {
            if (cfgResult instanceof Left) {
              return pure19(unit);
            }
            ;
            if (cfgResult instanceof Right) {
              return discard6(modify_4(function(v1) {
                var $258 = {};
                for (var $259 in v1) {
                  if ({}.hasOwnProperty.call(v1, $259)) {
                    $258[$259] = v1[$259];
                  }
                  ;
                }
                ;
                $258.config = cfgResult.value0;
                return $258;
              }))(function() {
                return liftEffect9(setDocTitle(cfgResult.value0.title));
              });
            }
            ;
            throw new Error("Failed pattern match at Viewer (line 676, column 5 - line 680, column 43): " + [cfgResult.constructor.name]);
          })())(function() {
            return bind17(get4)(function(state3) {
              return discard6(liftEffect9(initCytoscape("cy")(kindsToForeign(state3.config))))(function() {
                return bind17(liftEffect9(create3))(function(tapSub) {
                  return discard6(liftEffect9(onNodeTap(function(nodeId) {
                    return notify(tapSub.listener)(new NodeTapped(nodeId));
                  })))(function() {
                    return discard6($$void10(subscribe2(tapSub.emitter)))(function() {
                      return bind17(liftEffect9(create3))(function(hoverSub) {
                        return discard6(liftEffect9(onNodeHover(function(nodeId) {
                          return notify(hoverSub.listener)(new NodeHovered(nodeId));
                        })))(function() {
                          return discard6($$void10(subscribe2(hoverSub.emitter)))(function() {
                            return bind17(liftEffect9(create3))(function(edgeSub) {
                              return discard6(liftEffect9(onEdgeHover(function(src9) {
                                return function(tgt) {
                                  return function(lbl) {
                                    return function(desc) {
                                      return notify(edgeSub.listener)(new EdgeHovered(src9, tgt, lbl, desc));
                                    };
                                  };
                                };
                              })))(function() {
                                return discard6($$void10(subscribe2(edgeSub.emitter)))(function() {
                                  return bind17(liftAff2(loadGraphData(state0.dataUrls.graphUrl)))(function(result) {
                                    return discard6((function() {
                                      if (result instanceof Left) {
                                        return modify_4(function(v1) {
                                          var $263 = {};
                                          for (var $264 in v1) {
                                            if ({}.hasOwnProperty.call(v1, $264)) {
                                              $263[$264] = v1[$264];
                                            }
                                            ;
                                          }
                                          ;
                                          $263.error = new Just(result.value0);
                                          return $263;
                                        });
                                      }
                                      ;
                                      if (result instanceof Right) {
                                        var start2 = mostConnectedNode(result.value0);
                                        return modify_4(function(v1) {
                                          var $267 = {};
                                          for (var $268 in v1) {
                                            if ({}.hasOwnProperty.call(v1, $268)) {
                                              $267[$268] = v1[$268];
                                            }
                                            ;
                                          }
                                          ;
                                          $267.graph = result.value0;
                                          $267.selected = start2;
                                          return $267;
                                        });
                                      }
                                      ;
                                      throw new Error("Failed pattern match at Viewer (line 701, column 5 - line 709, column 12): " + [result.constructor.name]);
                                    })())(function() {
                                      return bind17(liftAff2(loadTutorialIndex(state0.dataUrls.tutorialIndexUrl)))(function(idxResult) {
                                        return discard6((function() {
                                          if (idxResult instanceof Left) {
                                            return pure19(unit);
                                          }
                                          ;
                                          if (idxResult instanceof Right) {
                                            return modify_4(function(v1) {
                                              var $273 = {};
                                              for (var $274 in v1) {
                                                if ({}.hasOwnProperty.call(v1, $274)) {
                                                  $273[$274] = v1[$274];
                                                }
                                                ;
                                              }
                                              ;
                                              $273.tutorialIndex = idxResult.value0;
                                              return $273;
                                            });
                                          }
                                          ;
                                          throw new Error("Failed pattern match at Viewer (line 712, column 5 - line 715, column 44): " + [idxResult.constructor.name]);
                                        })())(function() {
                                          return bind17(get4)(function(state22) {
                                            return bind17(liftEffect9(restore(state22.config.title)))(function(mPersisted) {
                                              return discard6((function() {
                                                if (mPersisted instanceof Nothing) {
                                                  return pure19(unit);
                                                }
                                                ;
                                                if (mPersisted instanceof Just) {
                                                  var node = bind24(mPersisted.value0.selectedNodeId)(function(nid) {
                                                    return lookup10(nid)(state22.graph.nodes);
                                                  });
                                                  return discard6(modify_4(function(v1) {
                                                    var $278 = {};
                                                    for (var $279 in v1) {
                                                      if ({}.hasOwnProperty.call(v1, $279)) {
                                                        $278[$279] = v1[$279];
                                                      }
                                                      ;
                                                    }
                                                    ;
                                                    $278.selected = node;
                                                    $278.depth = mPersisted.value0.depth;
                                                    return $278;
                                                  }))(function() {
                                                    if (mPersisted.value0.tutorialId instanceof Nothing) {
                                                      return pure19(unit);
                                                    }
                                                    ;
                                                    if (mPersisted.value0.tutorialId instanceof Just) {
                                                      var mEntry = find2(function(e) {
                                                        return e.id === mPersisted.value0.tutorialId.value0;
                                                      })(state22.tutorialIndex);
                                                      if (mEntry instanceof Nothing) {
                                                        return pure19(unit);
                                                      }
                                                      ;
                                                      if (mEntry instanceof Just) {
                                                        var tUrl = resolveUrl(state0.dataUrls.baseUrl)(mEntry.value0.file);
                                                        return bind17(liftAff2(loadTutorialFile(tUrl)))(function(tutResult) {
                                                          if (tutResult instanceof Left) {
                                                            return pure19(unit);
                                                          }
                                                          ;
                                                          if (tutResult instanceof Right) {
                                                            var step3 = (function() {
                                                              if (mPersisted.value0.tutorialStep instanceof Just) {
                                                                return mPersisted.value0.tutorialStep.value0;
                                                              }
                                                              ;
                                                              if (mPersisted.value0.tutorialStep instanceof Nothing) {
                                                                return 0;
                                                              }
                                                              ;
                                                              throw new Error("Failed pattern match at Viewer (line 747, column 30 - line 749, column 37): " + [mPersisted.value0.tutorialStep.constructor.name]);
                                                            })();
                                                            return modify_4(function(v1) {
                                                              var $287 = {};
                                                              for (var $288 in v1) {
                                                                if ({}.hasOwnProperty.call(v1, $288)) {
                                                                  $287[$288] = v1[$288];
                                                                }
                                                                ;
                                                              }
                                                              ;
                                                              $287.tutorial = new Just(tutResult.value0);
                                                              $287.tutorialStep = step3;
                                                              $287.tutorialActive = true;
                                                              return $287;
                                                            });
                                                          }
                                                          ;
                                                          throw new Error("Failed pattern match at Viewer (line 743, column 17 - line 754, column 24): " + [tutResult.constructor.name]);
                                                        });
                                                      }
                                                      ;
                                                      throw new Error("Failed pattern match at Viewer (line 736, column 13 - line 754, column 24): " + [mEntry.constructor.name]);
                                                    }
                                                    ;
                                                    throw new Error("Failed pattern match at Viewer (line 729, column 9 - line 754, column 24): " + [mPersisted.value0.tutorialId.constructor.name]);
                                                  });
                                                }
                                                ;
                                                throw new Error("Failed pattern match at Viewer (line 719, column 5 - line 754, column 24): " + [mPersisted.constructor.name]);
                                              })())(function() {
                                                return renderGraph;
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
    ;
    if (v instanceof NodeTapped) {
      return bind17(get4)(function(state3) {
        var node = lookup10(v.value0)(state3.graph.nodes);
        return discard6(modify_4(function(v1) {
          var $294 = {};
          for (var $295 in v1) {
            if ({}.hasOwnProperty.call(v1, $295)) {
              $294[$295] = v1[$295];
            }
            ;
          }
          ;
          $294.selected = node;
          return $294;
        }))(function() {
          if (state3.tutorialActive) {
            return discard6(liftEffect9(markRoot(v.value0)))(function() {
              return persistState;
            });
          }
          ;
          return renderGraph;
        });
      });
    }
    ;
    if (v instanceof NodeHovered) {
      return bind17(get4)(function(state3) {
        var node = lookup10(v.value0)(state3.graph.nodes);
        return discard6((function() {
          if (state3.tutorialActive) {
            return modify_4(function(v1) {
              var $300 = {};
              for (var $301 in v1) {
                if ({}.hasOwnProperty.call(v1, $301)) {
                  $300[$301] = v1[$301];
                }
                ;
              }
              ;
              $300.hoveredNode = node;
              $300.hoveredEdge = Nothing.value;
              return $300;
            });
          }
          ;
          return modify_4(function(v1) {
            var $303 = {};
            for (var $304 in v1) {
              if ({}.hasOwnProperty.call(v1, $304)) {
                $303[$304] = v1[$304];
              }
              ;
            }
            ;
            $303.selected = node;
            $303.hoveredEdge = Nothing.value;
            return $303;
          });
        })())(function() {
          return liftEffect9(markRoot(v.value0));
        });
      });
    }
    ;
    if (v instanceof EdgeHovered) {
      return bind17(get4)(function(state3) {
        var tgtNode = lookup10(v.value1)(state3.graph.nodes);
        var tgtLabel = (function() {
          if (tgtNode instanceof Just) {
            return tgtNode.value0.label;
          }
          ;
          if (tgtNode instanceof Nothing) {
            return v.value1;
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 786, column 18 - line 788, column 25): " + [tgtNode.constructor.name]);
        })();
        var srcNode = lookup10(v.value0)(state3.graph.nodes);
        var srcLabel = (function() {
          if (srcNode instanceof Just) {
            return srcNode.value0.label;
          }
          ;
          if (srcNode instanceof Nothing) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 783, column 18 - line 785, column 25): " + [srcNode.constructor.name]);
        })();
        return bind17(get4)(function(state$prime) {
          if (state$prime.tutorialActive) {
            return modify_4(function(v1) {
              var $312 = {};
              for (var $313 in v1) {
                if ({}.hasOwnProperty.call(v1, $313)) {
                  $312[$313] = v1[$313];
                }
                ;
              }
              ;
              $312.hoveredNode = Nothing.value;
              $312.hoveredEdge = new Just({
                sourceLabel: srcLabel,
                targetLabel: tgtLabel,
                label: v.value2,
                description: v.value3
              });
              return $312;
            });
          }
          ;
          return modify_4(function(v1) {
            var $315 = {};
            for (var $316 in v1) {
              if ({}.hasOwnProperty.call(v1, $316)) {
                $315[$316] = v1[$316];
              }
              ;
            }
            ;
            $315.hoveredNode = Nothing.value;
            $315.hoveredEdge = new Just({
              sourceLabel: srcLabel,
              targetLabel: tgtLabel,
              label: v.value2,
              description: v.value3
            });
            $315.selected = Nothing.value;
            return $315;
          });
        });
      });
    }
    ;
    if (v instanceof SetDepth) {
      return discard6(modify_4(function(v1) {
        var $322 = {};
        for (var $323 in v1) {
          if ({}.hasOwnProperty.call(v1, $323)) {
            $322[$323] = v1[$323];
          }
          ;
        }
        ;
        $322.depth = v.value0;
        return $322;
      }))(function() {
        return renderGraph;
      });
    }
    ;
    if (v instanceof SetSearch) {
      return bind17(get4)(function(state3) {
        var results = search2(v.value0)(state3.graph);
        return modify_4(function(v1) {
          var $326 = {};
          for (var $327 in v1) {
            if ({}.hasOwnProperty.call(v1, $327)) {
              $326[$327] = v1[$327];
            }
            ;
          }
          ;
          $326.searchQuery = v.value0;
          $326.searchResults = results;
          return $326;
        });
      });
    }
    ;
    if (v instanceof SelectSearchResult) {
      return bind17(get4)(function(state3) {
        if (v.value0 instanceof NodeResult) {
          return discard6(modify_4(function(v1) {
            var $331 = {};
            for (var $332 in v1) {
              if ({}.hasOwnProperty.call(v1, $332)) {
                $331[$332] = v1[$332];
              }
              ;
            }
            ;
            $331.selected = new Just(v.value0.value0);
            $331.searchQuery = "";
            $331.searchResults = [];
            $331.hoveredEdge = Nothing.value;
            return $331;
          }))(function() {
            return renderGraph;
          });
        }
        ;
        if (v.value0 instanceof EdgeResult) {
          var node = lookup10(v.value0.value0.edge.source)(state3.graph.nodes);
          return discard6(modify_4(function(v1) {
            var $335 = {};
            for (var $336 in v1) {
              if ({}.hasOwnProperty.call(v1, $336)) {
                $335[$336] = v1[$336];
              }
              ;
            }
            ;
            $335.selected = node;
            $335.hoveredEdge = new Just({
              sourceLabel: v.value0.value0.sourceLabel,
              targetLabel: v.value0.value0.targetLabel,
              label: v.value0.value0.edge.label,
              description: v.value0.value0.edge.description
            });
            $335.searchQuery = "";
            $335.searchResults = [];
            return $335;
          }))(function() {
            return renderGraph;
          });
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 826, column 5 - line 851, column 22): " + [v.value0.constructor.name]);
      });
    }
    ;
    if (v instanceof FitAll) {
      return liftEffect9(fitAll);
    }
    ;
    if (v instanceof ToggleTutorialMenu) {
      return modify_4(function(s) {
        var $343 = {};
        for (var $344 in s) {
          if ({}.hasOwnProperty.call(s, $344)) {
            $343[$344] = s[$344];
          }
          ;
        }
        ;
        $343.showTutorialMenu = !s.showTutorialMenu;
        return $343;
      });
    }
    ;
    if (v instanceof StartTutorial) {
      return bind17(get4)(function(state3) {
        var url2 = resolveUrl(state3.dataUrls.baseUrl)(v.value0);
        return bind17(liftAff2(loadTutorialFile(url2)))(function(result) {
          if (result instanceof Left) {
            return pure19(unit);
          }
          ;
          if (result instanceof Right) {
            return discard6(modify_4(function(v1) {
              var $348 = {};
              for (var $349 in v1) {
                if ({}.hasOwnProperty.call(v1, $349)) {
                  $348[$349] = v1[$349];
                }
                ;
              }
              ;
              $348.tutorial = new Just(result.value0);
              $348.tutorialStep = 0;
              $348.tutorialActive = true;
              $348.showTutorialMenu = false;
              return $348;
            }))(function() {
              return applyTutorialStop;
            });
          }
          ;
          throw new Error("Failed pattern match at Viewer (line 864, column 5 - line 873, column 26): " + [result.constructor.name]);
        });
      });
    }
    ;
    if (v instanceof TutorialNext) {
      return bind17(get4)(function(state3) {
        if (state3.tutorial instanceof Just) {
          return when5(state3.tutorialStep < (length(state3.tutorial.value0.stops) - 1 | 0))(discard6(modify_4(function(s) {
            var $354 = {};
            for (var $355 in s) {
              if ({}.hasOwnProperty.call(s, $355)) {
                $354[$355] = s[$355];
              }
              ;
            }
            ;
            $354.tutorialStep = s.tutorialStep + 1 | 0;
            return $354;
          }))(function() {
            return applyTutorialStop;
          }));
        }
        ;
        if (state3.tutorial instanceof Nothing) {
          return pure19(unit);
        }
        ;
        throw new Error("Failed pattern match at Viewer (line 877, column 5 - line 888, column 27): " + [state3.tutorial.constructor.name]);
      });
    }
    ;
    if (v instanceof TutorialPrev) {
      return bind17(get4)(function(state3) {
        return when5(state3.tutorialStep > 0)(discard6(modify_4(function(s) {
          var $358 = {};
          for (var $359 in s) {
            if ({}.hasOwnProperty.call(s, $359)) {
              $358[$359] = s[$359];
            }
            ;
          }
          ;
          $358.tutorialStep = s.tutorialStep - 1 | 0;
          return $358;
        }))(function() {
          return applyTutorialStop;
        }));
      });
    }
    ;
    if (v instanceof TutorialRecenter) {
      return applyTutorialStop;
    }
    ;
    if (v instanceof ExitTutorial) {
      return discard6(modify_4(function(v1) {
        var $361 = {};
        for (var $362 in v1) {
          if ({}.hasOwnProperty.call(v1, $362)) {
            $361[$362] = v1[$362];
          }
          ;
        }
        ;
        $361.tutorialActive = false;
        $361.depth = 99;
        $361.hoveredNode = Nothing.value;
        return $361;
      }))(function() {
        return renderGraph;
      });
    }
    ;
    if (v instanceof NavigateTo) {
      return bind17(get4)(function(state3) {
        var node = lookup10(v.value0)(state3.graph.nodes);
        return discard6(modify_4(function(v1) {
          var $364 = {};
          for (var $365 in v1) {
            if ({}.hasOwnProperty.call(v1, $365)) {
              $364[$365] = v1[$365];
            }
            ;
          }
          ;
          $364.selected = node;
          return $364;
        }))(function() {
          return renderGraph;
        });
      });
    }
    ;
    throw new Error("Failed pattern match at Viewer (line 671, column 16 - line 912, column 16): " + [v.constructor.name]);
  };
  var viewer = /* @__PURE__ */ (function() {
    return mkComponent({
      initialState: function(urls) {
        return {
          config: emptyConfig,
          graph: emptyGraph,
          dataUrls: urls,
          selected: Nothing.value,
          hoveredNode: Nothing.value,
          hoveredEdge: Nothing.value,
          depth: 99,
          searchQuery: "",
          searchResults: [],
          tutorialIndex: [],
          tutorial: Nothing.value,
          tutorialStep: 0,
          tutorialActive: false,
          showTutorialMenu: false,
          error: Nothing.value
        };
      },
      render: render2,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction: handleAction2,
        initialize: new Just(Initialize2.value)
      })
    });
  })();

  // output/Main/index.js
  var repoManagerIsSymbol = {
    reflectSymbol: function() {
      return "repoManager";
    }
  };
  var slot2 = /* @__PURE__ */ slot()(repoManagerIsSymbol)(ordUnit);
  var slot_2 = /* @__PURE__ */ slot_()({
    reflectSymbol: function() {
      return "viewer";
    }
  })(ordUnit);
  var pure20 = /* @__PURE__ */ pure(applicativeHalogenM);
  var bind18 = /* @__PURE__ */ bind(bindHalogenM);
  var liftAff3 = /* @__PURE__ */ liftAff(/* @__PURE__ */ monadAffHalogenM(monadAffAff));
  var discard7 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_5 = /* @__PURE__ */ modify_(monadStateHalogenM);
  var $$void11 = /* @__PURE__ */ $$void(functorHalogenM);
  var tell3 = /* @__PURE__ */ tell2()(repoManagerIsSymbol)(ordUnit);
  var liftEffect10 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectHalogenM(monadEffectAff));
  var get5 = /* @__PURE__ */ get(monadStateHalogenM);
  var eq13 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(/* @__PURE__ */ eqRec()(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(eqRowNil)()({
    reflectSymbol: function() {
      return "title";
    }
  })(eqString))()({
    reflectSymbol: function() {
      return "id";
    }
  })(eqString))()({
    reflectSymbol: function() {
      return "hasToken";
    }
  })(eqBoolean))));
  var when6 = /* @__PURE__ */ when(applicativeHalogenM);
  var AppInit = /* @__PURE__ */ (function() {
    function AppInit2() {
    }
    ;
    AppInit2.value = new AppInit2();
    return AppInit2;
  })();
  var HandleRepo = /* @__PURE__ */ (function() {
    function HandleRepo2(value0) {
      this.value0 = value0;
    }
    ;
    HandleRepo2.create = function(value0) {
      return new HandleRepo2(value0);
    };
    return HandleRepo2;
  })();
  var cls3 = function($101) {
    return class_(ClassName($101));
  };
  var _viewer = /* @__PURE__ */ (function() {
    return $$Proxy.value;
  })();
  var _repoManager = /* @__PURE__ */ (function() {
    return $$Proxy.value;
  })();
  var appRender = function(state3) {
    return div2([cls3("app-shell")])([slot2(_repoManager)(unit)(repoManager)(unit)(HandleRepo.create), div2([cls3("main-area")])([(function() {
      if (state3.dataUrls instanceof Nothing) {
        return div2([cls3("empty-main")])([text5("Add a repository to get started")]);
      }
      ;
      if (state3.dataUrls instanceof Just) {
        return slot_2(_viewer)(unit)(viewer)(state3.dataUrls.value0);
      }
      ;
      throw new Error("Failed pattern match at Main (line 76, column 11 - line 83, column 55): " + [state3.dataUrls.constructor.name]);
    })()])]);
  };
  var selectRepo = function(entry) {
    var v = normalizeInput(entry.id);
    if (v instanceof Nothing) {
      return pure20(unit);
    }
    ;
    if (v instanceof Just) {
      return bind18(liftAff3(discoverDataUrls(v.value0)))(function(result) {
        if (result instanceof Left) {
          return pure20(unit);
        }
        ;
        if (result instanceof Right) {
          return discard7(modify_5(function(v1) {
            var $64 = {};
            for (var $65 in v1) {
              if ({}.hasOwnProperty.call(v1, $65)) {
                $64[$65] = v1[$65];
              }
              ;
            }
            ;
            $64.activeRepo = new Just(entry);
            $64.dataUrls = new Just(result.value0);
            return $64;
          }))(function() {
            return discard7($$void11(tell3(_repoManager)(unit)(SetActive.create(new Just(entry.id)))))(function() {
              return liftEffect10(setRepoParam(entry.id));
            });
          });
        }
        ;
        throw new Error("Failed pattern match at Main (line 190, column 7 - line 199, column 49): " + [result.constructor.name]);
      });
    }
    ;
    throw new Error("Failed pattern match at Main (line 186, column 3 - line 199, column 49): " + [v.constructor.name]);
  };
  var appHandleAction = function(v) {
    if (v instanceof AppInit) {
      return discard7(liftEffect10(initResize))(function() {
        return bind18(liftEffect10(loadRepoList))(function(repos) {
          return discard7(modify_5(function(v12) {
            var $70 = {};
            for (var $71 in v12) {
              if ({}.hasOwnProperty.call(v12, $71)) {
                $70[$71] = v12[$71];
              }
              ;
            }
            ;
            $70.repos = repos;
            return $70;
          }))(function() {
            return discard7($$void11(tell3(_repoManager)(unit)(SetRepos.create(repos))))(function() {
              return bind18(liftEffect10(getRepoParam))(function(repoParam) {
                var $73 = repoParam !== "";
                if ($73) {
                  return appHandleAction(new HandleRepo(new RepoAdded(repoParam)));
                }
                ;
                var v12 = head(repos);
                if (v12 instanceof Nothing) {
                  return pure20(unit);
                }
                ;
                if (v12 instanceof Just) {
                  return selectRepo(v12.value0);
                }
                ;
                throw new Error("Failed pattern match at Main (line 105, column 7 - line 107, column 37): " + [v12.constructor.name]);
              });
            });
          });
        });
      });
    }
    ;
    if (v instanceof HandleRepo) {
      if (v.value0 instanceof RepoAdded) {
        var v1 = normalizeInput(v.value0.value0);
        if (v1 instanceof Nothing) {
          return $$void11(tell3(_repoManager)(unit)(SetError.create(new Just("Invalid repo format. Use owner/repo"))));
        }
        ;
        if (v1 instanceof Just) {
          return discard7(modify_5(function(v2) {
            var $78 = {};
            for (var $79 in v2) {
              if ({}.hasOwnProperty.call(v2, $79)) {
                $78[$79] = v2[$79];
              }
              ;
            }
            ;
            $78.loading = true;
            return $78;
          }))(function() {
            return discard7($$void11(tell3(_repoManager)(unit)(SetError.create(Nothing.value))))(function() {
              return bind18(liftAff3(discoverDataUrls(v1.value0)))(function(result) {
                if (result instanceof Left) {
                  return discard7(modify_5(function(v2) {
                    var $82 = {};
                    for (var $83 in v2) {
                      if ({}.hasOwnProperty.call(v2, $83)) {
                        $82[$83] = v2[$83];
                      }
                      ;
                    }
                    ;
                    $82.loading = false;
                    return $82;
                  }))(function() {
                    return $$void11(tell3(_repoManager)(unit)(SetError.create(new Just(result.value0))));
                  });
                }
                ;
                if (result instanceof Right) {
                  var entry = {
                    id: v1.value0.owner + ("/" + v1.value0.repo),
                    title: "",
                    hasToken: false
                  };
                  return bind18(get5)(function(state3) {
                    var exists = any2(function(r) {
                      return r.id === entry.id;
                    })(state3.repos);
                    var newRepos = (function() {
                      if (exists) {
                        return state3.repos;
                      }
                      ;
                      return snoc(state3.repos)(entry);
                    })();
                    return discard7(modify_5(function(v2) {
                      var $87 = {};
                      for (var $88 in v2) {
                        if ({}.hasOwnProperty.call(v2, $88)) {
                          $87[$88] = v2[$88];
                        }
                        ;
                      }
                      ;
                      $87.repos = newRepos;
                      $87.activeRepo = new Just(entry);
                      $87.dataUrls = new Just(result.value0);
                      $87.loading = false;
                      return $87;
                    }))(function() {
                      return discard7(liftEffect10(saveRepoList(newRepos)))(function() {
                        return discard7($$void11(tell3(_repoManager)(unit)(SetRepos.create(newRepos))))(function() {
                          return $$void11(tell3(_repoManager)(unit)(SetActive.create(new Just(entry.id))));
                        });
                      });
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Main (line 120, column 11 - line 150, column 47): " + [result.constructor.name]);
              });
            });
          });
        }
        ;
        throw new Error("Failed pattern match at Main (line 111, column 7 - line 150, column 47): " + [v1.constructor.name]);
      }
      ;
      if (v.value0 instanceof RepoSelected) {
        return selectRepo(v.value0.value0);
      }
      ;
      if (v.value0 instanceof RepoDeleted) {
        return discard7(liftEffect10(deleteRepo(v.value0.value0.id)))(function() {
          return bind18(get5)(function(state3) {
            var wasActive = eq13(state3.activeRepo)(new Just(v.value0.value0));
            var newRepos = filter(function(r) {
              return r.id !== v.value0.value0.id;
            })(state3.repos);
            return discard7(modify_5(function(v12) {
              var $96 = {};
              for (var $97 in v12) {
                if ({}.hasOwnProperty.call(v12, $97)) {
                  $96[$97] = v12[$97];
                }
                ;
              }
              ;
              $96.repos = newRepos;
              $96.activeRepo = (function() {
                if (wasActive) {
                  return Nothing.value;
                }
                ;
                return state3.activeRepo;
              })();
              $96.dataUrls = (function() {
                if (wasActive) {
                  return Nothing.value;
                }
                ;
                return state3.dataUrls;
              })();
              return $96;
            }))(function() {
              return discard7(liftEffect10(saveRepoList(newRepos)))(function() {
                return discard7($$void11(tell3(_repoManager)(unit)(SetRepos.create(newRepos))))(function() {
                  return when6(wasActive)(discard7($$void11(tell3(_repoManager)(unit)(SetActive.create(Nothing.value))))(function() {
                    return liftEffect10(setRepoParam(""));
                  }));
                });
              });
            });
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Main (line 109, column 24 - line 179, column 41): " + [v.value0.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Main (line 91, column 19 - line 179, column 41): " + [v.constructor.name]);
  };
  var appComponent = /* @__PURE__ */ (function() {
    return mkComponent({
      initialState: function(v) {
        return {
          repos: [],
          activeRepo: Nothing.value,
          dataUrls: Nothing.value,
          loading: false
        };
      },
      render: appRender,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction: appHandleAction,
        initialize: new Just(AppInit.value)
      })
    });
  })();
  var main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind(bindAff)(awaitBody)(function(body4) {
    return runUI2(appComponent)(unit)(body4);
  }));

  // <stdin>
  main2();
})();
