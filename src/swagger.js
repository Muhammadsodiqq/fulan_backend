export default {
    openapi: "3.0.3", 
    info: {
      title: "Online education system API", 
      description: "Online education system API Documentation", 
      version: "1.0.0", 
      contact: {
        name: "Muhamad", 
      },
    },
    // servers:["http://localhost:8080"],
    apis:["**/*Route.js"],
    paths:{
        "/users/sign-up":{
            post:{
                summary:"Register New User",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    },
                                    name:{
                                        type:"string"
                                    },
                                    surname:{
                                        type:"string"
                                    },
                                    password:{
                                        type:"number"
                                    }
                                },
                                example:{
                                    phone:"998935186781",
                                    name:"Olim",
                                    surname:"olimjonovich",
                                    password:"123456"
                                }
                            }
                        }
                    }
                },
                responses:{
                    '200':{
                        description:"User Created",
                    },
                    '400':{
                        description:"User did not created"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        
        "/users/validate-code":{
            post:{
                summary:"Validate sent code to user",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"code-validation-id",
                    value:"92bd06bb-0996-4976-acc8-ff9e26c1990d",
                    schema:{
                        type:"string",
                    }
                }],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    code:{
                                        type:"string"
                                    },
                                },
                                example:{
                                    code:"208547",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code is valid",
                    },
                    '401':{
                        description:"Code is invalid"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/set-role":{
            post:{
                summary:"set user's role",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    role:{
                                        type:"string"
                                    }
                                },
                                example:{
                                    role:"student",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/login":{
            post:{
                summary:"Login User with sending sms to user phone number",
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    },
                                    password:{
                                        type:"password"
                                    }
                                },
                                example:{
                                    phone:"998935186780",
                                    password:"password"
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/set-motivate":{
            post:{
                summary:"set user's motivation text",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    motive:{
                                        type:"string"
                                    }
                                },
                                example:{
                                    motive:"Lorem 200",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/get":{
            get:{
                summary:"get user's personal Data",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/":{
            get:{
                summary:"get only checked students  Data",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/activate":{
            post:{
                summary:"for check students from admin panel",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },
                {
                    "in":"header",
                    required:true,
                    name:"user-id",
                    value:"721cc21c-6377-4d76-acf1-a93d1675ed6e",
                    schema:{
                        type:"string",
                    }
                }],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    data:{
                                        type:"boolean"
                                    }
                                },
                                example:{
                                    data:true,
                                }
                            }
                        }
                    }
                },
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/get/all-students":{
            get:{
                summary:"get All students Data from admin panel",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/set-file":{
            post:{
                summary:"for upload file",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },
            {
                "in":"formData",
                required:true,
                name:"file",
                type: "file"

            }],
                
                responses:{
                    '201':{
                        description:"Code sent to user",
                    },
                    '401':{
                        description:"Code  not sent to user"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            }
        },
        "/users/get/all-sponsor":{
            get:{
                summary:"get All sponsors Data from admin panel",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/get-student":{
            get:{
                summary:"get one student's personal Data",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },
                {
                    "in":"header",
                    required:true,
                    name:"user-id",
                    value:"721cc21c-6377-4d76-acf1-a93d1675ed6e",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
        },
        "/users/get-sponsor":{
            get:{
                summary:"get one sponsor's personal Data",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },
                {
                    "in":"header",
                    required:true,
                    name:"user-id",
                    value:"721cc21c-6377-4d76-acf1-a93d1675ed6e",
                    schema:{
                        type:"string",
                    }
                }],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
            
        },
        "/files/getFile":{
            get:{
                summary:"get user's files",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },
                ],
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
            
        },
        "/users/set-admin":{
            post:{
                summary:"set admin",
                parameters:[{
                    "in":"header",
                    required:true,
                    name:"Authorization",
                    value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3NDMxNDJmLTEzMDUtNGRhMy1hNTQxLWM1MTEwYjVjZGFhYSIsImlhdCI6MTYyMjg1NTgwNX0.lyj6SvyBlpdZ2OrJN1GInnXsRRXhZty2Rj1xoT_2nwI",
                    schema:{
                        type:"string",
                    }
                },],
                requestBody:{
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    phone:{
                                        type:"string"
                                    }
                                },
                                example:{
                                    data:"998917910420",
                                }
                            }
                        }
                    }
                },
                responses:{
                    '202':{
                        description:"User Personale Data edited",
                    },
                    '400':{
                        description:"User Personal Data did not edited"
                    },
                    '500':{
                        description:"Internal server error"
                    }
                }
            },
            
            
        },

    },
        
}