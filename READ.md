CC21-Fakebook-API
===
### <span style="color:lightblue">env guide</span>
PORT=  
DATBASE_URL=  
JWT_SECRET=   
===

### <span style="color:lightblue">Service</span>

|path |method |authen |
|:-- |:-: |:-: |
|/api/auth/login|post|-|-|-| {identity, password}
|/api/auth/register|post|-|-|-| {identity, firstName, lastName, password, confirmPassword}
|/api/auth/me|get|y|-|-|-|
|/api/post|get|y|-|-|-|
|/api/post|post|y|-|-|{message, image(file)}
|/api/post|put|y|:id|-|{message, image(file)}
|/api/post|delete|y|:id|-|-
|/api/comment|post|y|-|-|{message, postId}
|/api/like|post|y|-|-|{postId}
|/api/like|delete|y|:id|-|-
