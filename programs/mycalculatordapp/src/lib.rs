use anchor_lang::prelude::*;

declare_id!("51SM3759uCrzG1PJn7vawysoMktzhuqGbmG5gMTu7Wru");

#[program]
pub mod mycalculatordapp {
    use super::*;
    pub fn create(_ctx: Context<Create>,init_message:String) -> Result<()> {
        let calculator = &mut _ctx.accounts.calculator;
        calculator.greeting = init_message; 
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init,payer=user, space=264)]
    pub calculator:Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program:Program<'info, System>
}

#[account]
pub struct Calculator{
    pub greeting:String,
    pub result:i64,
    pub reminder :i64
}