
export const svgInherit = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" >
<path d="
    M 15,15
    L 25,0
    L 35,15
    L 15,15
    M 25,15
    L 25,45
" stroke="currentColor" strokeWidth="1" fill="#fff"></path>
</svg>

export const svgOneToOne = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" >
  <path d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
  " stroke="currentColor" strokeWidth="1" fill="#fff"></path>
  <circle id="mycircle" cx="10" cy="10" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
  <circle id="mycircle" cx="40" cy="20" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
</svg>

export const svgOneToMany = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" >
  <path d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 43,20
      L 50,16
      M 43,20
      L 50,24
  " stroke="currentColor" strokeWidth="1" fill="#fff"></path>
  <circle id="mycircle" cx="10" cy="10" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
  <circle id="mycircle" cx="40" cy="20" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
</svg>

export const svgManyToOne = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" >
  <path d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 7,10
      L 0,6
      M 7,10
      L 0,14
  " stroke="currentColor" strokeWidth="1" fill="#fff"></path>
  <circle id="mycircle" cx="10" cy="10" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
  <circle id="mycircle" cx="40" cy="20" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
</svg>

export const svgManyToMany = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" >
  <path d="
      M 0,10
      L 25,10
      L 25,20
      L 50,20
      M 43,20
      L 50,16
      M 43,20
      L 50,24
      M 7,10
      L 0,6
      M 7,10
      L 0,14
  " stroke="currentColor" strokeWidth="1" fill="#fff"></path>
  <circle id="mycircle" cx="10" cy="10" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
  <circle id="mycircle" cx="40" cy="20" r="3" strokeWidth="1" stroke="currentColor" fill="#fff" />
</svg>
