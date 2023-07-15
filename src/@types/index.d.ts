
//1) IMPORT THE LIBRARY YOU WANT TO MODIFY
import {Knex} from 'knex'

//2) DECLARE THE MODULE YOU WANT TO EXTEND
declare module 'knex/types/tables' {
    // 3 EXPORT THE MODIFIED ALREADY EXISTING INTERFACE
    export interface Tables{
        // ADD A NEW TABLE NAMED 'transactions' INTO NEXT AVAILABLE TABLES WITH
        // AN SPECIFIC OBJECT TYPING 'id, title, amount, created_at, and session_id'
        transactions: {
            id: string
            title: string
            amount: number
            created_at: string
            session_id?: string
        }
    }
}
