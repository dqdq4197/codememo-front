import styled from 'styled-components';


export const Input = styled.input.attrs(props => ({
    type: props.type ? props.type : 'text',
    size: props.size || "1em",
    placeholder : props.name === "email" ? "heesu@blog.com": props.name ,

  }))`
    color: ${({theme}) => theme.palette.basic};
    font-size: ${props => props.fontSize};
    border:none;
    border-radius: 10px;
    font-weight:bold;
    &:focus { 
        outline:none;
        background:${({theme}) => theme.Common.inputFocusBgColor}; 
    }
    &:hover {
      background:${({theme}) => theme.Common.inputFocusBgColor};
    }
    width:${props => props.width || '100%' };
    background:${props => props.bgcolor || 'transparent'};
    margin: ${props => props.margin || '0rem'};
    padding: ${props => props.padding};
    padding-left:${props =>props.paddingLeft};
    transition: background .2s;
    height:${props => props.height || '1rem'};
  `;

  type TextAreaProps ={
      fontSize?:string;
      width?:string;
      size?:string;
      padding?:string;
      marginLeft?:string;
  }

  export const TextArea = styled.textarea`
    color: ${({theme}) => theme.palette.basic};
    font-size: ${(props:TextAreaProps) => props.fontSize || '1rem'};
    border:none;
    border-radius: 10px;
    font-weight:bold;
    &:focus { 
      outline:none;
      background:${({theme}) => theme.Common.inputFocusBgColor}; 
    }
    &:hover {
      background:${({theme}) => theme.Common.inputFocusBgColor};
    }
    width:${props => props.width || '55%' };
    background:transparent;
    margin: ${props => props.size || '0rem'};
    padding: ${props => props.padding || '1rem'};
    transition: background .2s;
    height:170px;
    resize:none;
    margin-left:${props => props.marginLeft || '0'};
  `;