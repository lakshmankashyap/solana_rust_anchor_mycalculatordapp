import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";

// describe("mycalculatordapp", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

import assert from 'assert';

const {SystemProgram} = anchor.web3

describe('mycalculatorapp',()=>{

  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;;
  
  it('Creates a calculator', async()=>{
    await program.rpc.create('Welcomes to Solana',{
      accounts:{
        calculator:calculator.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId
      },
      signers:[calculator]
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === 'Welcomes to Solana')
  })

   
  it('Adds two numbers', async()=>{
    await program.rpc.add( new anchor.BN(2),new anchor.BN(3),{
      accounts:{
        calculator:calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(5)))
  })

  it('Subtractions two numbers', async()=>{
    await program.rpc.subtract( new anchor.BN(32),new anchor.BN(33),{
      accounts:{
        calculator:calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(-1)))
  })

  it('Multiplies two numbers', async()=>{
    await program.rpc.multiply( new anchor.BN(2),new anchor.BN(3),{
      accounts:{
        calculator:calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(6)))
  })

  it('Divides two numbers', async()=>{
    await program.rpc.divide( new anchor.BN(10),new anchor.BN(3),{
      accounts:{
        calculator:calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(3)))
    assert.ok(account.reminder.eq(new anchor.BN(1)))
  })
})